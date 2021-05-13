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
                v-if="step === 1"
            />
            <van-field
                :class="{'kada-mobile-code1':codecolorflag==0,'kada-mobile-codeinput1':codecolorflag==1,'kada-mobile-codeerror1':codecolorflag==2}"
                v-model="form.verifyCodes"
                clearable
                @focus="changecolor(3,1)"
                @blur="changecolor(3,0)"
                placeholder="验证码"
                v-if="step === 1"
            />
            <!-- 获取 -->
            <div v-if="!success && step === 1" @click="getCode" class="kada-mobile-codebuttom">
                <p>获取</p>
            </div>
            <!-- 等待输入验证码 -->
            <div id="seconds" v-show="success && seconds>0 && step === 1" class="kada-mobile-codewait">
                <p>{{seconds}}S</p>
            </div>
            <!-- 重新获取 -->
            <div v-if="success && seconds === 0 && step === 1" @click="reGetCode" class="kada-mobile-codebuttom">
                <p>重新获取</p>
            </div>
            <van-field
                :class="{'kada-mobile-phonefirst':pswcolorflag==0,'kada-mobile-phoneinputfirst':pswcolorflag==1,'kada-mobile-phoneerrorfirst':pswcolorflag==2}"
                v-model="form.pwd"
                clearable
                type="password"
                @focus="changecolor(2,1)"
                @blur="changecolor(2,0)"
                placeholder="密码至少8位 支持数字/字母组合"
                v-if="step === 2"
            />
            <van-field
                :class="{'kada-mobile-phone':pswcolorflag1==0,'kada-mobile-phoneinput':pswcolorflag1==1,'kada-mobile-phoneerror':pswcolorflag1==2}"
                v-model="form.checkPwd"
                clearable
                type="password"
                @focus="changecolor(4,1)"
                @blur="changecolor(4,0)"
                placeholder="请再次输入密码"
                v-if="step === 2"
            />

        <!-- </van-cell-group> -->
        <!-- 手机图标 -->
        <div v-if="step === 1" class="kada-wx-phone">
            <svg-icon icon-class="phone" />
        </div>
        <div v-if="step === 1" class="kada-wx-psw">
            <svg-icon icon-class="vcode" />
        </div>
        <div v-if="step === 2" class="kada-wx-psw3">
            <svg-icon icon-class="password" />
        </div>
        <div v-if="step === 2" class="kada-wx-psw4">
            <svg-icon icon-class="password" />
        </div>
        <div class="kada-mobile-tips">
            <p>{{errormsg}}</p>
        </div>
        <div v-if="step === 1" @click="toNext" class="kada-login-in">
            <p>下一步</p>
        </div>
        <div v-show="step === 2" @click="bindMobile" class="kada-login-in">
            <p>完成</p>
        </div>
    </div>
 </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['thirdUser', 'backrouter'])
  },
  data() {
    return {
      show: false,
      form: {},
      seconds: 120,
      success: false,
      colorflag: 0,
      pswcolorflag: 0,
      pswcolorflag1: 0,
      codecolorflag: 0,
      codeSrc: '',
      errormsg: '',
      step: 1,
      userType: '',
      userInfo: null,
      canSendMig: false
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
        this.errormsg = ''
        if (this.form.mobile !== undefined) {
          var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
          if (!reg.test(this.form.mobile)) {
            this.errormsg = '手机号格式错误！'
            this.colorflag = 2
            return false
          } else {
            this.$apis.judgeMobile({ mobile: this.form.mobile }).then(res => {
              this.canSendMig = true
              if (res.data.data.list.length > 0) {
                this.userInfo = res.data.data.list[0]
                if (this.thirdUser.loginType === 'QQ') {
                  if (this.userInfo.qqId) {
                    this.canSendMig = false
                    this.colorflag = 2
                    this.errormsg = '该手机号已绑定其他QQ'
                    return false
                  }
                } else if (this.thirdUser.loginType === 'WX') {
                  if (this.userInfo.wxid) {
                    this.canSendMig = false
                    this.colorflag = 2
                    this.errormsg = '该手机号已绑定其他微信'
                    return false
                  }
                } else if (this.thirdUser.loginType === 'WB') {
                  if (this.userInfo.wbId) {
                    this.canSendMig = false
                    this.colorflag = 2
                    this.errormsg = '该手机号已绑定其他微博'
                    return false
                  }
                }
              }
            })
          }
        }
      } else if (id === 2) {
        this.pswcolorflag = flag
        this.errormsg = ''
      } else if (id === 3) {
        this.codecolorflag = flag
        this.errormsg = ''
      } else if (id === 4) {
        this.pswcolorflag1 = flag
        this.errormsg = ''
        if (flag === 0 && this.form.pwd !== this.form.checkPwd) {
          this.errormsg = '两次密码不一致!'
          this.pswcolorflag1 = 2
          return false
        }
      }
    },
    toNext() {
      const _this = this
      if (this.form.mobile === undefined) {
        this.$toast.fail('手机号不能为空！')
        return false
      } else if (this.form.verifyCodes === undefined) {
        this.$toast.fail('验证码不能为空！')
        return false
      }
      if (this.userInfo) {
        const params = {}
        params.id = this.userInfo.id
        params.verifyCodes = this.form.verifyCodes
        params.mobile = this.form.mobile
        if (this.thirdUser.loginType === 'QQ') {
          params.qqId = this.thirdUser.qqId
        } else if (this.thirdUser.loginType === 'WX') {
          params.wxid = this.thirdUser.wxid
        } else if (this.thirdUser.loginType === 'WB') {
          params.wbId = this.thirdUser.wbId
        }
        this.$apis.bindUpdateUserMobile(params).then(res => {
          if (res.data.status.returnCode === 100) {
            _this.$toast.success('绑定成功!')
            _this.updateUserInfo()

            var url = window.location.href
            var reg = new RegExp('%2F', 'g')
            url = url.replace(reg, '/')
            // url = url.replaceAll('%2F', '/')
            if (url.indexOf('?redirect=') > -1) {
              url = url.split('?redirect=')[1]
              _this.$router.push({
                path: url
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

            // _this.$router.push({ path: '/index' })
            // var origin = window.location.origin
            // window.location.href = origin + '/' + this.projectName + '/'
          }
        })
      } else {
        this.$apis.checkLoginCode({ code: this.form.verifyCodes }).then(res => {
          if (res.data.status.returnCode === 100) {
            _this.step = 2
          }
        })
      }
    },
    bindMobile() {
      const params = {}
      const _this = this
      if (this.form.pwd === undefined) {
        console.log('密码不能为空！')
        this.$toast.fail('密码不能为空！')
        return
      } else if (this.form.checkPwd === undefined) {
        this.$toast.fail('请再次输入密码！')
        return
      }
        var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
      if (!regex.test(this.form.pwd)) {
        this.$toast.fail('密码不合法（必须包含字母、数字且不少于8位）!')
        return
      }
      params.mobile = this.form.mobile
      params.nickname = this.thirdUser.nickname
      params.cover = this.thirdUser.cover
      params.gender = this.thirdUser.gender
      params.pwd = this.form.pwd
      params.verifyCodes = this.form.verifyCodes
      // params.lcCode = this.$store.state.app.setting.lcCode
      params.lcCode = window.localStorage.getItem('lcCode')
      params.wxid = this.thirdUser.wxid
      params.qqId = this.thirdUser.qqId
      params.wbId = this.thirdUser.wbId
      this.$apis.bindMobile(params).then(res => {
        if (res.data.status.returnCode === 100) {
          _this.$toast.success('绑定成功!')
          // var origin = window.location.origin
          // window.location.href = origin + '/' + this.projectName + '/'
          _this.updateUserInfo(() => {
            // _this.$router.push({ path: '/index' })
            var url = window.location.href
            var reg = new RegExp('%2F', 'g')
            url = url.replace(reg, '/')
            if (url.indexOf('?redirect=') > -1) {
              url = url.split('?redirect=')[1]
              _this.$router.push({
                path: url
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
          })
        }
      })
    },
    getCode() {
      const _this = this
      if (this.form.mobile && this.canSendMig) {
        this.$apis.getMsgCode({ mobile: this.form.mobile }).then(res => {
          if (res.data.status.returnCode === 100) {
            _this.success = true
            const interval = setInterval(() => {
              _this.seconds--
              if (_this.seconds === 0) {
                clearInterval(interval)
              }
            }, 1000)
          }
        })
      } else if (!this.canSendMig) {
        return false
      } else {
        this.$toast.fail('请填写手机号')
        return false
      }
    },
    reGetCode() {
      const _this = this
      if (this.form.mobile) {
        this.$apis.getMsgCode({ mobile: this.form.mobile }).then(res => {
          if (res.data.status.returnCode === 100) {
            _this.seconds = 120
            const interval = setInterval(() => {
              _this.seconds--
              if (_this.seconds === 0) {
                clearInterval(interval)
              }
            }, 1000)
          }
        })
      } else {
        this.$toast.fail('请填写手机号')
        return false
      }
    },
    updateUserInfo(callback) {
      this.$apis.getSession().then(res => {
        this.$store.commit('SET_USERINFO', res.data.data.list[0].user)
        // this.reload()
      })
      if (callback) {
        callback()
      }
    }
  },
  mounted() {

  }
}
</script>
