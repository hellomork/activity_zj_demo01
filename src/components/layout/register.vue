<template>
  <div class="login">
    <el-dialog
      title="注册"
      :visible.sync="flag"
      width="400"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-position="top">
        <el-form-item label="手机号码" prop="mobile">
          <el-input placeholder="请输入手机号码" @input="change($event)" v-model="form.mobile" maxlength="11"/>
        </el-form-item>
        <el-form-item prop="verifyCodes" label="验证码" class="code rcode">
          <el-input v-model="form.verifyCodes" @input="change($event)" placeholder="验证码"/>
          <div class="code-img">
            <el-button type="primary" v-if="success && seconds === 0" @click="reGetCode">重新获取</el-button>
            <el-button type="primary" plain v-if="!success" @click="getCode">获取</el-button>
            <el-button type="info" disabled id="seconds" v-show="success && seconds>0">{{seconds}}s</el-button>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password" @input="change($event)" placeholder="请输入新密码"/>
        </el-form-item>
        <el-form-item label="确认密码"  prop="checkPwd">
          <el-input placeholder="请确认密码" type="password" @input="change($event)" v-model="form.checkPwd"/>
        </el-form-item>
        <el-form-item label class="btn">
          <p style="font-size:14px;text-align:left;">
            <el-checkbox v-model="hasAgree" style="margin:0;"></el-checkbox>
            <!-- <a style="color:#AA481F;" href="../../../static/file/konws.pdf" target="_blank"> -->
            <a style="color:#AA481F;" @click="goKnowsPdf()" target="_blank">
            《用户服务协议》</a>
          </p>
        </el-form-item>
        <el-form-item label class="btn">
          <el-button type="primary" @click="confirm">注册</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { judgeMobile } from '@/api/interface/interface-list/user'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pwd) {
        return callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkMobile = (rule, value, callback) => {
      var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (!value) {
        return callback(new Error('请输入手机号'))
      } else if (!reg.test(value)) {
        setTimeout(() => {
          return callback(new Error('手机号不合法'))
        }, 500)
      } else {
        callback()
      }
    }
    
    var checkPsw = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('新密码不能为空'))
      } else {
        var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
        if (!regex.test(value)) {
          return callback(new Error('密码不合法（必须包含字母、数字且不少于8位）'))
        }
        callback()
      }
    }
    return {
      form: {},
      seconds: 120,
      success: false,
      pdfUrl: '',
      rules: {
        mobile: [
          { required: true, validator: checkMobile, trigger: 'blur' }
        ],
        pwd: [
          { required: true, validator: checkPsw, trigger: 'blur' }
        ],
        checkPwd: [
          { required: true, validator: checkPwd, trigger: 'blur' }
        ],
        verifyCodes: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      hasAgree: false
    }
  },
  computed: {
    flag() {
      return this.registerFlag
    },
    ...mapGetters(['projectName', 'registerFlag'])
  },
  methods: {
    change(e) {
      this.$forceUpdate()
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.hasAgree) {
            this.$apis.register(this.form).then(res => {
              if (res.data.status.returnCode === 100) {
                this.$message.success('注册成功，请重新登录！')
                setTimeout(() => {
                  window.location.reload()
                }, 1500)
              } else if (res.data.status.returnCode === 308) {
                this.$message.error('用户已存在，请更换手机号！')
                return false
              } else if (res.data.status.returnCode === 307) {
                this.$message.error('验证码错误！')
                return false
              }
            })
          } else {
            this.$message.error('请阅读用户协议并且勾选')
            return false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goKnowsPdf() {
      const knowsUrl = 'http://' + window.location.host + '/zhejiang/konws.pdf'
      window.open(knowsUrl)
    },
    handleClose() {
      this.$refs['form'].resetFields()
      this.$store.commit('SET_REGISTERSTATE', false)
      // this.$emit('changeFlag', false)
    },
    getCode() {
      const _this = this
      if (this.form.mobile) {
        var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        if (!reg.test(this.form.mobile)) {
          this.$message.error('手机号不合法')
          return false
        } else {
          this.$apis.judgeMobile({ mobile: this.form.mobile }).then(res => {
            if (res.data.data.list.length > 0) {
              this.$message.error('手机号已被注册，请更换手机号！')
              return false
            } else {
              _this.$apis.getMsgCode({ mobile: _this.form.mobile }).then(res => {
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
            }
          })
        }
      } else {
        this.$message.error('请填写手机号')
        return false
      }
    },
    reGetCode() {
      const _this = this
      if (this.form.mobile) {
        var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        if (!reg.test(this.form.mobile)) {
          this.$message.error('手机号不合法')
          return false
        } else {
          this.$apis.judgeMobile({ mobile: this.form.mobile }).then(res => {
            if (res.data.data.list.length > 0) {
              this.$message.error('手机号已被注册，请更换手机号！')
              return false
            } else {
              _this.$apis.getMsgCode({ mobile: _this.form.mobile }).then(res => {
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
            }
          })
        }
      } else {
        this.$message.error('请填写手机号')
        return false
      }
    }
  },
  mounted() {
    this.pdfUrl = window.location.origin + '/' + this.projectName + '/static/file/knows.pdf'
  }
}
</script>
<style lang="scss" scoped>
</style>
