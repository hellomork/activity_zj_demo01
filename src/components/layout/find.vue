<template>
  <div class="login">
    <el-dialog
      title="找回密码"
      :visible.sync="flag"
      width="400"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-position="top" :rules="rules">
        <el-form-item label="手机号码" prop="mobile">
          <el-input placeholder="请输入手机号码" @input="change($event)" v-model="form.mobile" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="校验码" class="code rcode" prop="verifyCodes">
          <el-input v-model="form.verifyCodes" placeholder="校验码" @input="change($event)"></el-input>
          <div class="code-img">
            <el-button type="primary" v-if="success && seconds === 0" @click="reGetCode">重新获取</el-button>
            <el-button type="primary" plain v-if="!success" @click="getCode">获取</el-button>
            <el-button type="info" disabled id="seconds" v-show="success && seconds>0">{{seconds}}s</el-button>
          </div>
        </el-form-item>
        <el-form-item label="新密码" prop="pwd">
          <el-input placeholder="请输入新密码" type="password" @input="change($event)" v-model="form.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="npwd">
          <el-input placeholder="请确认密码" type="password" @input="change($event)" v-model="form.npwd"></el-input>
        </el-form-item>
        <el-form-item label class="btn">
          <el-button type="primary" @click="confirm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
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
    return {
      form: {},
      seconds: 120,
      success: false,
      rules: {
        mobile: [
          { required: true, validator: checkMobile, trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        npwd: [
          { required: true, validator: checkPwd, trigger: 'blur' }
        ],
        verifyCodes: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    flag() {
      return this.dialogVisible
    }
  },
  methods: {
    confirm() {
      const _this = this
      const params = {}
      params.verifyCodes = this.form.verifyCodes
      params.mobile = this.form.mobile
      params.pwd = this.form.pwd
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$apis.resetPwd(params).then(res => {
            if (res.data.status.returnCode === 100) {
              _this.$message.success('修改成功，请重新登录！')
              setTimeout(() => {
                window.location.reload()
              }, 3000)
            } else if (res.data.status.returnCode === 307) {
              _this.$message.error('验证码错误')
              return false
            }
          })
        }
      })
    },
    change(e) {
      this.$forceUpdate()
    },
    handleClose() {
      this.$emit('changeFlag', false)
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
            } else {
              this.$message.error('该手机未注册，请检查输入是否正确！')
              return false
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
            } else {
              this.$message.error('该手机未注册，请检查输入是否正确！')
              return false
            }
          })
        }
      } else {
        this.$message.error('请填写手机号')
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
