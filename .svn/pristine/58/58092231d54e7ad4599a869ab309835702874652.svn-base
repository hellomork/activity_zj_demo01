<template>
  <div class="login">
    <el-dialog
      title="欢迎登录浙江省文化馆"
      :visible.sync="flag"
      width="400"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-position="top">
        <el-form-item label="账号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入账号" @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password" placeholder="请输入密码" @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label class="code" prop="verifyCodes">
          <el-input v-model="form.verifyCodes" placeholder="验证码" @keyup.enter.native="handleLogin" @input="change($event)"></el-input>
          <div class="code-img" @click="changePic">
            <img :src="codeSrc" />
            <span>看不清换一张</span>
          </div>
        </el-form-item>
        <el-form-item label class="btn">
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>

        <div class="forget">
          <p @click="forgetPsw">忘记密码？</p>
          <p>没有帐号？<span @click="register">立即注册</span></p>
        </div>

        <div class="third-login">
          <p>第三方帐号登录</p>
          <div class="login-bar">
            <a class="wechat" @click="thirdLogin('PCW')">
              <svg-icon icon-class="wechat"></svg-icon>
            </a>
            <!-- <a class="qq" @click="thirdLogin('QQ')">
              <svg-icon icon-class="qq"></svg-icon>
            </a>
            <a class="sina" @click="thirdLogin('WB')">
              <svg-icon icon-class="weibo"></svg-icon>
            </a> -->
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var checkPsw = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      codeSrc: '',
      rules: {
        mobile: [
          { required: true, validator: checkMobile, trigger: 'blur' }
        ],
        pwd: [
          { required: true, validator: checkPsw, trigger: 'blur' }
        ],
        verifyCodes: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    flag() {
      if (this.loginFlag) {
        this.changePic()
      }
      return this.loginFlag
    },
    ...mapGetters(['projectName', 'loginFlag'])
  },
  methods: {
    confirm() {},
    change(e) {
      this.$forceUpdate()
    },
    handleClose() {
      this.$refs['form'].resetFields()
      this.$store.commit('SET_LOGINSTATE', false)
      // this.$emit('changeFlag', false)
    },
    forgetPsw() {
      this.$store.commit('SET_LOGINSTATE', false)
      this.$emit('forgetPsw', true)
    },
    register() {
      this.$store.commit('SET_LOGINSTATE', false)
      this.$emit('register', true)
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
      this.form.verifyCodes = this.form.verifyCodes.toLocaleUpperCase()
      const _this = this
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('login', this.form)
            .then((res) => {
              if (res.status.returnCode === 307) {
                _this.$message.error('验证码输入错误')
                _this.changePic()
                return false
              } else if (res.status.returnCode === 303) {
                _this.$message.error('密码错误')
                _this.changePic()
                return false
              } else if (res.status.returnCode === 301) {
                _this.$message.error('账号不存在')
                _this.changePic()
                return false
              } else if (res.status.returnCode === 348) {
                _this.$message.error('密码错误已达3次，已锁定，请3分钟再次登录')
                _this.changePic()
                return false
              }
              window.location.reload()
            })
            .catch((res) => {
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 第三方登录
    thirdLogin(userType) {
      const params = {}
      // 前一个页面url()绑定手机页面url()错误页面url
      var url = ''
      var origin = window.location.origin
      url = window.location.href + ',,' + origin + '/' + '21pdfcontest' + '/pc_bind_mobile' + ',,' + origin + '/' + '21pdfcontest' + '/404'
      // + origin + '/' + this.projectName + '/bind_mobile'
      params.userType = userType
      params.preurl = url
      var openUrl = 'http://' + window.location.host + '/users/getAuthorizeCode.login?userType=' + userType + '&preurl=' + url
      window.location.href = openUrl

      // this.$apis.thirdLogin(params).then(res => {
      //   window.location.href = openUrl
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
