<template>
  <div class="bind-mobile">
    <div class="kada-container">
      <div class="bind-body">
        <div class="header">
          <img v-lazy="thirdUser.cover" alt />
          <p>{{thirdUser.nickname}}</p>
          <h3>注册并绑定手机号码</h3>
        </div>
        <!-- 第一步 -->
        <el-form
          :rules="rules1"
          :model="form1"
          label-width="79px"
          hide-required-asterisk
          ref="ruleForm"
          v-if="step === 1"
        >
        <el-form-item label="手机号码" prop="mobile">
            <el-input type="text" v-model="form1.mobile" autocomplete="off" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="校验码" prop="verifyCodes" class="getcode">
            <el-input type="text" v-model="form1.verifyCodes" autocomplete="off"></el-input>
            <div class="code">
              <el-button type="primary" v-if="success && seconds === 0" @click="reGetCode">重新获取</el-button>
              <el-button type="primary" plain v-if="!success" @click="getCode">获取</el-button>
              <el-button type="info" disabled id="seconds" v-show="success && seconds>0">{{seconds}}s</el-button>
            </div>
          </el-form-item>
          <div class="bottom-btn">
            <el-button type="primary" @click="toNext">下一步</el-button>
          </div>
        </el-form>
        <!-- 第二步骤 -->
        <el-form
          :rules="rules2"
          :model="form2"
          label-width="79px"
          hide-required-asterisk
          ref="ruleForm2"
          v-if="step === 2"
        >
          <el-form-item label="密码" prop="pwd">
            <el-input type="text" v-model="form2.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <div class="bottom-btn">
            <el-button type="primary" @click="bindMobile">注册并绑定</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { judgeMobile } from '@/api/interface/user'
import { mapGetters } from 'vuex'
export default {
  data() {
    var checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value))) {
          return callback(new Error('手机号不合法'))
        } else {
          judgeMobile({ mobile: value }).then(res => {
            if (res.data.data.list.length === 0) {
              callback()
            } else if (res.data.data.list.length > 0) {
              this.userInfo = res.data.data.list[0]
              if (this.thirdUser.loginType === 'QQ') {
                if (!this.userInfo.qqId) {
                  callback()
                } else {
                  return callback(new Error('该手机号已绑定其他QQ'))
                }
              } else if (this.thirdUser.loginType === 'PCW') {
                if (!this.userInfo.wxid) {
                  callback()
                } else {
                  return callback(new Error('该手机号已绑定其他微信'))
                }
              } else if (this.thirdUser.loginType === 'WB') {
                if (!this.userInfo.wbId) {
                  callback()
                } else {
                  return callback(new Error('该手机号已绑定其他微博'))
                }
              }
            }
          })
        }
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
        if (!regex.test(value)) {
          callback(new Error('密码不合法（必须包含字母、数字且不少于8位）'))
        } else {
          if (this.form2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form2.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules1: {
        mobile: [
          { required: true, validator: checkMobile, trigger: 'blur' }
        ]
      },
      form1: {},
      rules2: {
        pwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      form2: {},
      success: false,
      seconds: 120,
      step: 1,
      userType: '',
      userInfo: null
    }
  },
  computed: {
    ...mapGetters(['thirdUser'])
  },
  methods: {
    toNext() {
      const _this = this
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.userInfo) {
            const params = {}
            params.id = this.userInfo.id
            params.cover = this.thirdUser.cover
            if (this.thirdUser.loginType === 'QQ') {
              params.qqId = this.thirdUser.qqId
            } else if (this.thirdUser.loginType === 'PCW') {
              params.wxid = this.thirdUser.wxid
            } else if (this.thirdUser.loginType === 'WB') {
              params.wbId = this.thirdUser.wbId
            }
            this.$apis.bindMobileUpdate(params).then(res => {
              if (res.data.status.returnCode === 100) {
                _this.$message.success('绑定成功!')
                // _this.$router.push({ path: '/index' })
                var origin = window.location.origin
                window.location.href = origin + '/21pdfcontest/pdf/intro'
              }
            })
          } else {
            this.$apis.checkLoginCode({ code: this.form1.verifyCodes }).then(res => {
              if (res.data.status.returnCode === 100) {
                _this.step = 2
              }
            })
          }
        }
      })
    },
    getCode() {
      const _this = this
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$apis.getMsgCode({ mobile: this.form1.mobile }).then(res => {
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
    },
    reGetCode() {
      const _this = this
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$apis.getMsgCode({ mobile: this.form1.mobile }).then(res => {
            console.log('手机验证', res)
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
    },
    bindMobile() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          const params = {}
          const _this = this
          params.mobile = this.form1.mobile
          params.nickname = this.thirdUser.nickname
          params.cover = this.thirdUser.cover
          params.gender = this.thirdUser.gender
          params.pwd = this.form2.pwd
          params.verifyCodes = this.form2.verifyCodes
          params.lcCode = this.$store.state.app.setting.lcCode
          params.wxid = this.thirdUser.wxid
          params.qqId = this.thirdUser.qqId
          params.wbId = this.thirdUser.wbId
          this.$apis.bindMobile(params).then(res => {
            if (res.data.status.returnCode === 100) {
              _this.$message.success('绑定成功!')
              var origin = window.location.origin
              window.location.href = origin + '/21pdfcontest/pdf/intro'
              _this.$router.push({ name: 'pdf_intro' })
            }
          })
        }
      })
    }
  }
}
</script>
