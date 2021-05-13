<template>
      <div class="wx-login-bg">

    <div class="kada-wx-login">
        <!-- <div class="kada-wx-logoimg">
            <svg-icon icon-class="logo" />
        </div> -->
        <div class="kada-wx-img">
          <!-- <svg-icon icon-class="name" /> -->
          <img style="width:100%;" src="@/assets/img/shareicon.png" alt="">
        </div>
        <div class="kada-login-buttom">
            <div @click="thirdLogin('WX')" class="kada-login-wx">
                <p>微信登录</p>
            </div>
            <div @click="toPath('/mobile_login')" class="kada-login-mobile">
                <p>手机号登录</p>
            </div>
            <div @click="toPath('/register')" class="kada-login-mobile">
                <p>手机号注册</p>
            </div>
        </div>
        <div class="kada-login-other" v-show="false">
            <div class="kada-login-othertop">
                <p>其他方式</p>
            </div>
            <div @click="thirdLogin('QQ')" class="kada-login-othercom">
                <div class="kada-wx-svg">
                      <svg-icon icon-class="qq" />
                  </div>
                  <p>QQ</p>
            </div>
            <div @click="thirdLogin('WB')" class="kada-login-othercom">
                <div class="kada-wx-svg">
                      <svg-icon icon-class="weibo" />
                  </div>
                  <p>微博</p>
            </div>
            <!-- <div @click="show=true" class="kada-login-othercom">
                <div class="kada-wx-svg">
                      <svg-icon icon-class="face" />
                  </div>
                  <p>人脸</p>
            </div> -->
        </div>
        <!-- 人脸登录提示对话框 -->
        <van-popup closeable close-icon-position="top-right" v-model="show">
            <div class="kada-face-dialog">
                <h3>人脸登录</h3>
                <p>请确保已提前开通人脸登录</p>
                <img src="@/assets/img/photo.png" />
                <div class="kada-facedialog-buttom">
                    <p>开始拍摄</p>
                    <van-uploader
                      class="imageinput"
                      capture="user"
                    :after-read="afterRead"
                    :preview-image="false"
                    :max-count="1"/>
                </div>
            </div>
        </van-popup>
        <van-overlay :show="showloading">
          <van-loading size="24px" vertical>人脸传输识别中...</van-loading>
        </van-overlay>
    </div>
      </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { convertBase64UrlToBytes } from '@/utils'
export default {
  computed: {
    ...mapGetters(['backrouter'])
  },
  data() {
    return {
      show: false,
      showloading: false
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log(from)
    if (from.name !== null) {
      window.sessionStorage.setItem('beforeUrl', window.location.origin + '/21pdfcontest' + from.fullPath)
    }
    next()
  },
  methods: {
    toPath(path) {
      // var url = `${this.$route.fullPath}`
      // if (url.indexOf('redirect') > -1) {
      //   url = url.substring(url.indexOf('?'), url.length)
      // } else {
      //   url = ''
      // }
      // this.$router.push({
      //   path: path + url
      // })
      this.$router.push({
        path: path
      })
    },
    // 第三方登录
    thirdLogin(userType) {
      const params = {}
      // 前一个页面url()绑定手机页面url()错误页面url
      var url = ''
      var origin = window.location.origin

      var bUrl = window.sessionStorage.getItem('beforeUrl')
      if (bUrl.indexOf('?') > -1) {
        bUrl = bUrl.split('?')[0]
      }
      var backurl = 'http://www.zjart.com/21pdfcontest/pdf/list'
      if (this.backrouter !== null && this.backrouter !== '') {
        backurl = this.backrouter
      }
      url = bUrl + ',,' + origin + '/21pdfcontest/bind_mobile?redirect=' + backurl + ',,' + origin + '/wx/404'
      // + origin + '/' + this.projectName + '/bind_mobile'
      params.userType = userType
      params.preurl = url
      var openUrl = 'http://' + window.location.host + '/users/getAuthorizeCode.login?userType=' + userType + '&preurl=' + url
      window.location.href = openUrl
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const _this = this
      this.showloading = true
      this.show = false
      var canvas = document.createElement('CANVAS')
      var ctx = canvas.getContext('2d')
      var img = new Image()
      img.src = file.content
      img.crossOrigin = 'Anonymous'
      img.onload = function() {
        var width = img.width
        var height = img.height
        // 按比例压缩4倍
        var rate = (width < height ? width / height : height / width) / 5
        canvas.width = width * rate
        canvas.height = height * rate
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate)
        var dataURL = canvas.toDataURL('image/png')
        _this.faceInsert(dataURL)
        canvas = null
      }

      // params.bytes = convertBase64UrlToBytes(file.content)
    },

    faceInsert(dataURL) {
      const _this = this
      const params = {}
      params.bytes = convertBase64UrlToBytes(dataURL)
      this.$apis.faceLogin(params).then(res => {
        _this.showloading = false
        if (res.data.status.returnCode === 100) {
          _this.$toast.success('登录成功！')
          _this.updateUserInfo()
          setTimeout(() => {
            _this.$router.push({ name: 'index' })
          }, 1000)
        } else {
          _this.$toast.fail('登录失败！')
          return false
        }
      })
    },
    updateUserInfo() {
      this.$apis.getSession().then(res => {
        this.$store.commit('SET_USERINFO', res.data.data.list[0].user)
        // this.reload()
      })
    },
    // 压缩图片
    compress(img, Orientation) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // 瓦片canvas
      const tCanvas = document.createElement('canvas')
      const tctx = tCanvas.getContext('2d')
      // let initSize = img.src.length;
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = (width * height) / 4000000) > 1) {
        // console.log("大于400万像素");
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //    铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        const nw = ~~(width / count)
        const nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6: // 需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8: // 需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3: // 需要180度旋转
            this.rotateImg(img, 'right', canvas) // 转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      // 进行最小压缩
      const ndata = canvas.toDataURL('image/jpeg', 0.1)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    }
  }
}
</script>
