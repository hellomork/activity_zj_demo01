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
            />
            <van-field
                :class="{'kada-mobile-code1':codecolorflag==0,'kada-mobile-codeinput1':codecolorflag==1,'kada-mobile-codeerror1':codecolorflag==2}"
                v-model="form.verifyCodes"
                clearable
                @focus="changecolor(3,1)"
                @blur="changecolor(3,0)"
                placeholder="验证码"
            />
            <!-- 获取 -->
            <div v-if="!success" @click="getCode" class="kada-mobile-codebuttom">
                <p>获取</p>
            </div>
            <!-- 等待输入验证码 -->
            <div id="seconds" v-show="success && seconds>0" class="kada-mobile-codewait">
                <p>{{seconds}}S</p>
            </div>
            <!-- 重新获取 -->
            <div v-if="success && seconds === 0" @click="reGetCode" class="kada-mobile-codebuttom">
                <p>重新获取</p>
            </div>
            <van-field
                :class="{'kada-mobile-phone':pswcolorflag==0,'kada-mobile-phoneinput':pswcolorflag==1,'kada-mobile-phoneerror':pswcolorflag==2}"
                v-model="form.pwd"
                clearable
                type="password"
                @focus="changecolor(2,1)"
                @blur="changecolor(2,0)"
                placeholder="密码至少8位 支持数字/字母组合"
            />
            <van-field
                :class="{'kada-mobile-phone':pswcolorflag1==0,'kada-mobile-phoneinput':pswcolorflag1==1,'kada-mobile-phoneerror':pswcolorflag1==2}"
                v-model="form.checkPwd"
                clearable
                type="password"
                @focus="changecolor(4,1)"
                @blur="changecolor(4,0)"
                placeholder="请再次输入密码"
            />

        <!-- </van-cell-group> -->
        <!-- 手机图标 -->
        <div class="kada-wx-phone">
            <svg-icon icon-class="phone" />
        </div>
        <div class="kada-wx-psw">
            <svg-icon icon-class="vcode" />
        </div>
        <div class="kada-wx-psw1">
            <svg-icon icon-class="password" />
        </div>
        <div class="kada-wx-psw2">
            <svg-icon icon-class="password" />
        </div>
        <div v-show="codeerrorflag" class="kada-mobile-tips">
            <p>验证码输入错误</p>
        </div>
        <div v-show="usererrorflag" class="kada-mobile-tips">
            <p>手机号已被注册，请更换手机号！</p>
        </div>
        <div v-show="mobileerror" class="kada-mobile-tips">
            <p>手机号格式错误</p>
        </div>
        <div v-show="pswerrorflag1" class="kada-mobile-tips">
            <p>两次密码不一致</p>
        </div>
        <div class="User-service-agreement">
          <van-checkbox v-model="hasAgree" checked-color="#A9461C" shape="square" style="display:inline-block;vertical-align:middle;"></van-checkbox>
          <p @click="toPath('/agreement')">《用户服务协议》</p>
        </div>
        <div @click="confirm" class="kada-login-in">
            <p>注册</p>
        </div>

    </div>
</div>
</template>
<script>
export default {
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
      codeerrorflag: false,
      usererrorflag: false,
      pswerrorflag: false,
      pswerrorflag1: false,
      mobileerror: false,
      hasAgree: false
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
        if (this.form.mobile !== undefined) {
          var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
          if (!reg.test(this.form.mobile)) {
            this.mobileerror = true
            this.colorflag = 2
          } else {
            this.$apis.judgeMobile({ mobile: this.form.mobile }).then(res => {
              if (res.data.data.list.length > 0) {
                this.usererrorflag = true
                this.colorflag = 2
              }
            })
          }
        }
      } else if (id === 2) {
        this.pswcolorflag = flag
        this.pswerrorflag = false
      } else if (id === 3) {
        this.codecolorflag = flag
        this.codeerrorflag = false
      } else if (id === 4) {
        this.pswcolorflag1 = flag
        this.pswerrorflag1 = false
        if (flag === 0 && this.form.pwd !== this.form.checkPwd) {
          this.pswerrorflag1 = true
          this.pswcolorflag1 = 2
        }
      }
    },
    confirm() {
      const _this = this
      if (this.mobileerror) {
        this.$toast.fail('手机号格式错误！')
        return
      }
      if (this.form.mobile === undefined) {
        this.$toast.fail('手机号不能为空！')
        return
      } else if (this.form.verifyCodes === undefined) {
        this.$toast.fail('请输入验证码！')
        return
      } else if (this.form.pwd === undefined) {
        this.$toast.fail('密码不能为空！')
        return
      } else if (this.form.pwd !== this.form.checkPwd) {
        this.pswerrorflag1 = true
        return
      } else if (!this.hasAgree) {
        this.$toast.fail('请阅读用户协议并且勾选')
        return
      }
      var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
      if (!regex.test(this.form.pwd)) {
        this.$toast.fail('密码不合法（必须包含字母、数字且不少于8位）!')
        return
      }
      this.$apis.register(this.form).then(res => {
        if (res.data.status.returnCode === 100) {
          _this.$toast.success('注册成功，请重新登录！')
          // var url = `${this.$route.fullPath}`
          // if (url.indexOf('redirect') > -1) {
          //   url = url.substring(url.indexOf('?'), url.length)
          // } else {
          //   url = ''
          // }
          _this.$router.push({
            path: '/login'
          })
        } else if (res.data.status.returnCode === 308) {
          _this.usererrorflag = true
          _this.colorflag = 2
          return false
        } else if (res.data.status.returnCode === 307) {
          _this.codeerrorflag = true
          _this.codecolorflag = 2
          return false
        } else if (res.data.status.returnCode === 306) {
          _this.codeerrorflag = true
          _this.codecolorflag = 2
          return false
        }
      })
    },
    getCode() {
      const _this = this
      if (this.form.mobile) {
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
    }
  }
}
</script>
