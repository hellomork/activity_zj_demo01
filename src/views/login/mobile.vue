<template>
<div class="wx-login-bg">
    <div class="kada-wx-mobile">
        <!-- <van-cell-group> -->
            <van-field
                :class="{'kada-mobile-phonefirst':colorflag==0,'kada-mobile-phoneinputfirst':colorflag==1,'kada-mobile-phoneerrorfirst':colorflag==2}"
                v-model="form.mobile"
                clearable
                @focus="changecolor(1,1)"
                @blur="changecolor(1,0)"
                placeholder="请输入手机号"
                :error-message="errorMessage.userInput"
            />

            <van-field
                :class="{'kada-mobile-phone':pswcolorflag==0,'kada-mobile-phoneinput':pswcolorflag==1,'kada-mobile-phoneerror':pswcolorflag==2}"
                v-model="form.pwd"
                clearable
                type="password"
                @focus="changecolor(2,1)"
                @blur="changecolor(2,0)"
                placeholder="请输入密码"
                :error-message="errorMessage.pwdInput"
            />
            <div @click="changePic" class="kada-mobile-codeimg">
                <img :src="codeSrc" />
                <p>看不清换一张</p>
            </div>
            <van-field
                :class="{'kada-mobile-code':codecolorflag==0,'kada-mobile-codeinput':codecolorflag==1,'kada-mobile-codeerror':codecolorflag==2}"
                v-model="form.verifyCodes"
                clearable
                @focus="changecolor(3,1)"
                @blur="changecolor(3,0)"
                placeholder="验证码"
                :error-message="errorMessage.Codeinput"
            />

        <!-- </van-cell-group> -->
        <!-- 手机图标 -->
        <div class="kada-wx-phone">
            <svg-icon icon-class="phone" />
        </div>
        <div class="kada-wx-psw">
            <svg-icon icon-class="password" />
        </div>
        <div v-show="codeerrorflag" class="kada-mobile-tips">
            <p>验证码输入错误</p>
        </div>
        <div v-show="usererrorflag" class="kada-mobile-tips">
            <p>账号不存在</p>
        </div>
        <div v-show="pswerrorflag" class="kada-mobile-tips">
            <p>密码错误</p>
        </div>
        <div @click="handleLogin" class="kada-login-in">
            <p>登录</p>
        </div>

        <div @click="toPath('/forgotpsw')"  class="kada-login-forgotpsw">
          <p>忘记密码？</p>
        </div>
        <van-popup closeable close-icon-position="top-right" v-model="show">
            <div class="kada-mobile-dialog">
                <h3>提示信息</h3>
                <p>该手机号未注册，请点击下方按钮进行注册</p>
                <div @click="toPath('/register')" class="kada-dialog-buttom">
                    <p>去注册</p>
                </div>
            </div>
        </van-popup>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['backrouter'])
  },
  data() {
    return {
      show: false,
      form: {},
      colorflag: 0,
      pswcolorflag: 0,
      codecolorflag: 0,
      codeSrc: '',
      codeerrorflag: false,
      usererrorflag: false,
      pswerrorflag: false,
      errorMessage: { userInput: '', pwdInput: '', Codeinput: '' },
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    toPath(path) {
      this.$router.push({
        path: path
      })
    },
    changecolor(id, flag) {
      if (id === 1) {
        this.colorflag = flag
        this.usererrorflag = false
      } else if (id === 2) {
        this.pswcolorflag = flag
        this.pswerrorflag = false
      } else if (id === 3) {
        this.codecolorflag = flag
        this.codeerrorflag = false
      }
    },
    changePic() {
      const params = {}
      params.timeStamp = new Date().getTime()
      const _this = this
      this.$apis.getLoginPic(params).then(res => {
        _this.codeSrc = res.data.data.list[0]
      })
    },
    handleLogin() {
      //   this.form.verifyCodes = this.form.verifyCodes.toLocaleUpperCase()
      const _this = this
      if (this.form.mobile === undefined) {
        this.$toast.fail('手机号不能为空！')
        return
      } else if (this.form.pwd === undefined) {
        this.$toast.fail('密码不能为空！')
        return
      } else if (this.form.verifyCodes === undefined) {
        this.$toast.fail('请输入验证码！')
        return
      }
      this.form.verifyCodes = this.form.verifyCodes.toLocaleUpperCase()
      this.$apis.login(this.form).then((res) => {
        if (res.data.status.returnCode === 307) {
          _this.codeerrorflag = true
          _this.codecolorflag = 2
          _this.changePic()
          return false
        } else if (res.data.status.returnCode === 303) {
          _this.pswerrorflag = true
          _this.pswcolorflag = 2
          _this.changePic()
          return false
        } else if (res.data.status.returnCode === 301) {
          _this.usererrorflag = true
          _this.colorflag = 2
          _this.show = true
          _this.changePic()
          return false
        } else if (res.data.status.returnCode === 348) {
          _this.$toast.fail('密码错误已达3次，已锁定，请3分钟再次登录')
          _this.changePic()
          return false
        } else {
          _this.$apis.getSession().then(res => {
            _this.$store.commit('SET_USERINFO', res.data.data.list[0].user)
            if(res.data.data.list[0].pwdFlg===0){
              _this.$dialog.confirm({
                  title: '提示信息',
                  message: '您当前为初始密码，请修改密码！',
                  confirmButtonText: '去修改',
                  showCancelButton:false
                }).then(() => {
                    _this.$router.push({
                      name: 'edit_psw'
                    })
                }).catch(() => {
                  // on cancel
                })
            } else {
              if (_this.backrouter !== '') {
                _this.$router.push({
                  path: _this.backrouter
                })
              } else {
                _this.$router.push({
                  name: 'index'
                })
              }
            }
            // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          })
        }
      })
        .catch((res) => {
        })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  },
  created() {
    this.changePic()
  }
}
</script>
