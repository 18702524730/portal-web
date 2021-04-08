<template>
  <div id="loginSkip">
    <a-modal
      style="top:30%"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :bodyStyle="bodyStyle"
      :footer="null"
      id="main-modal"
      width="400px"
      :zIndex="9999999999999">
      <template slot="title">
        <a-row>
          <a-col :span="12">
            <div style="text-align: left"><span style="font-size: 20px;line-height: 47px">{{loginTypeName}}</span></div>
          </a-col>
          <a-col :span="10">
            <img :src="imgType" style="float: right;cursor: pointer" @click="displayDiv">
          </a-col>
        </a-row>
      </template>

      <div v-if="beginStatus">
        <a-row class="begin-row begin-row2">
          <p>个人/企业/服务机构用户：</p>
        </a-row>
        <a-row>
          <a-button size="large" type="primary" htmlType="submit" class="login-button ixm-button ixm-button2"
                    @click.stop.prevent="getIxmUrl">
            <img src="@/assets/images/system/announcement/ixm-logo.png"><span
            style="text-align: center;color: #FFFFFF;font-size: 16px">i厦门市民通行证登录<span>（推荐）</span></span>
          </a-button>
        </a-row>
        <a-row class="begin-row">
          <p>其他用户：</p>
        </a-row>
        <a-row>
          <a-button size="large" type="primary" htmlType="submit" class="login-button login-button2" style="font-size: 14px"
                    @click.stop.prevent="beginStatus = false">平台账号登录
          </a-button>
        </a-row>
      </div>

      <a-form :form="form" class="user-layout-login" ref="formLogin" id="formLogin">
        <div v-if="!beginStatus">
          <div v-if="isWeb">
            <a-form-item>
              <a-input size="large"
                       v-decorator="['username',validatorRules.username,{ validator: this.handleUsernameOrEmail }]"
                       type="text" placeholder="请输入用户名">
                <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input v-decorator="['password',validatorRules.password]" size="large" type="password"
                       autocomplete="false"
                       placeholder="请输入登录密码">
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>
          </div>

          <div v-else>
            <a-form-item>
              <a-input
                v-decorator="['mobile',validatorRules.mobile]"
                size="large"
                type="text"
                placeholder="请输入手机号">
                <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>

            <a-row :gutter="16">
              <a-col class="gutter-row" :span="16">
                <a-form-item>
                  <a-input
                    v-decorator="['captcha',validatorRules.captcha]"
                    size="large"
                    type="text"
                    placeholder="请输入验证码">
                    <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="8">
                <a-button
                  class="getCaptcha"
                  tabindex="-1"
                  :disabled="state.smsSendBtn"
                  @click.stop.prevent="getCaptcha"
                  v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"></a-button>
              </a-col>
            </a-row>
          </div>

          <a-row v-if="device != 'mobile'">
            <a-col :span="24">
              <a-form-item style="margin-bottom: 10px;">
                <j-slider @onSuccess="handleJSliderSuccess"/>
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item style="margin-bottom: 0;">
            <a-button size="large" type="primary" htmlType="submit" class="login-button" :loading="loginBtn"
                      @click.stop.prevent="handleSubmit" :disabled="loginBtn">登录
            </a-button>
          </a-form-item>

          <a-form-item style="margin-top: 0.5rem;">
            <a-button size="large" type="primary" htmlType="submit" class="login-button ixm-button"
                      @click.stop.prevent="getIxmUrl">
              <img src="@/assets/images/system/announcement/ixm-logo.png"><span
              style="text-align: center;color: #FFFFFF">i厦门市民通行证登录（推荐）</span>
            </a-button>
            <!--<span>-->
            <!--<a :href="getIxmUrl()">-->

            <!--</a>-->
            <!--</span>-->
          </a-form-item>
        </div>

        <a-form-item style="margin-top: -1.5rem;margin-bottom: 0">
          <a :href="registerUrl" style="color: #4a4a48" class="forge-password">
            新用户注册
          </a>
          <a :href="forgetUrl" style="float: right;color: #4a4a48" class="forge-password">
            忘记密码
          </a>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import bus from '@/assets/eventBus'
  import { mapActions } from 'vuex'
  import { timeFix } from '@/utils/util'
  import Vue from 'vue'
  import { postAction, putAction } from '@/api/manage'
  import { encryption, getEncryptedString } from '@/utils/encryption/aesEncrypt'
  import { mixinDevice } from '@/utils/mixin.js'
  import JSlider from './JSlider'
  import {
    USER_INFO,
    ENCRYPTED_STRING,
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import store from '@/store/'

  export default {
    name: 'LoginSkip',
    components: { JSlider },
    inject: ['reload'],
    props: {
      keyRoute: {
        type: String,
        default: ''
      }
    },
    mixins: [mixinDevice],
    data() {
      return {
        registerUrl: window._CONFIG['registerUrl'],
        forgetUrl: window._CONFIG['forgetUrl'],
        isWeb: true,
        customActiveKey: 'tab1',
        bodyStyle: {
          'font-family': 'Microsoft YaHei',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'font-size': '16px',
          'font-weight': '400',
          'font-style': 'normal',
          'padding': '24px 24px 10px'
        },
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        requiredTwoStepCaptcha: false,
        stepCaptchaVisible: false,
        form: this.$form.createForm(this),
        encryptedString: {
          key: 'Xmzscq3234567889',
          iv: 'Xmzscq3234567889'
        },
        state: {
          time: 180,
          smsSendBtn: false
        },
        formLogin: {
          username: '',
          password: '',
          captcha: '',
          mobile: '',
          rememberMe: true
        },
        validatorRules: {
          username: {
            rules: [{
              required: true,
              message: '请输入用户名!',
              validator: 'click'
            }]
          },
          password: {
            rules: [{
              required: true,
              message: '请输入密码!',
              validator: 'click'
            }]
          },
          mobile: {
            rules: [{
              required: true,
              message: '请输入正确格式的手机号码!',
              pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
            }]
          },
          captcha: { rules: [{ required: true, message: '请输入验证码!' }] },
          inputCode: {
            rules: [{
              required: true,
              message: '请输入验证码!'
            }, {
              validator: this.validateInputCode
            }]
          }
        },
        verifiedCode: '',
        inputCodeContent: '',
        inputCodeNull: true,

        departList: [],
        departVisible: false,
        departSelected: '',
        currentUsername: '',
        validate_status: '',

        visible: false,
        confirmLoading: false,

        isReload: true,
        jslider: {
          value: false
        },
        isNeedGoto: false,
        isNeedGotoHome: false,
        gotoRouter: { name: 'Home' },
        gotuQuery: { query: '' },

        beginStatus: true
      }
    },
    created() {
    },
    computed: {
      loginTypeName() {
        if (this.beginStatus){
          return '登录'
        }
        if (this.isWeb) {
          return '账号登录'
        } else {
          return '手机号登录'
        }
      },
      imgType() {
        if (this.isWeb) {
          return require('@/assets/images/system/announcement/iphone.png')
        } else {
          return require('@/assets/images/system/announcement/web.png')
        }
      }
    },
    methods: {
      ...mapActions(['Login', 'Logout', 'PhoneLogin']),
      handleJSliderSuccess(value) {
        this.jslider.value = value
      },
      getIxmUrl() {
        window.open(window._CONFIG['ixmURL'])
      },
      displayDiv() {
        this.beginStatus = false
        this.isWeb = !this.isWeb
      },
      handleUsernameOrEmail(rule, value, callback) {
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        if (regex.test(value)) {
          this.loginType = 0
        } else {
          this.loginType = 1
        }
        callback()
      },
      handleTabClick(key) {
        this.customActiveKey = key
        // this.form.resetFields()
      },
      handleSubmit() {
        const that = this
        const loginParams = {
          remember_me: that.formLogin.rememberMe
        }
        that.loginBtn = true
        // 使用账户密码登录
        if (that.isWeb) {
          that.form.validateFields(['username', 'password'], {
            force: true
          }, (err, values) => {
            if (!err) {
              loginParams.username = values.username
              loginParams.password = encryption(values.password, that.encryptedString.key, that.encryptedString.iv)
              if (!that.jslider.value && that.device !== 'mobile') {
                this.cmsFailed('请拖动滑块验证！')
                that.loginBtn = false
                return false
              }
              that.Login(loginParams).then((res) => {
                that.departConfirm(res)
                Vue.ls.set(window._CONFIG['roleCookieName'], res['result']['roleInfo'], 7 * 24 * 60 * 60 * 1000)
              }).catch((err) => {
                that.requestFailed(err)
              })
            } else {
              that.loginBtn = false
            }
          })
          // 使用手机号登录
        } else {
          that.form.validateFields(['mobile', 'captcha'], {
            force: true
          }, (err, values) => {
            if (!err) {
              if (!that.jslider.value && that.device !== 'mobile') {
                this.cmsFailed('请拖动滑块验证！')
                that.loginBtn = false
                return false
              }
              loginParams.mobile = values.mobile
              loginParams.captcha = values.captcha
              that.PhoneLogin(loginParams).then((res) => {
                this.departConfirm(res)
              }).catch((err) => {
                that.requestFailed(err)
              })

            } else {
              that.loginBtn = false
            }
          })
        }
      },
      getCaptcha(e) {
        e.preventDefault()
        const that = this
        this.form.validateFields(['mobile'], {
          force: true
        }, (err, values) => {
          if (!values.mobile) {
            that.cmsFailed('请输入手机号')
          } else if (!that.jslider.value && that.device !== 'mobile') {
            that.cmsFailed('请拖动滑块验证！')
          } else if (!err) {
            this.state.smsSendBtn = true
            const interval = window.setInterval(() => {
              if (that.state.time-- <= 0) {
                that.state.time = 180
                that.state.smsSendBtn = false
                window.clearInterval(interval)
              }
            }, 1000)

            const hide = this.$message.loading('验证码发送中..', 0)
            const smsParams = {}
            smsParams.mobile = values.mobile
            smsParams.smsmode = '0'
            postAction('/sys/sms', smsParams)
              .then(res => {
                if (!res.success) {
                  setTimeout(hide, 0)
                  this.cmsFailed(res.message)
                }
                console.log(res)
                setTimeout(hide, 500)
              })
              .catch(err => {
                setTimeout(hide, 1)
                clearInterval(interval)
                that.state.time = 180
                that.state.smsSendBtn = false
                this.requestFailed(err)
              })
          }
        })
      },
      stepCaptchaSuccess() {
        this.loginSuccess()
      },
      stepCaptchaCancel() {
        this.Logout().then(() => {
          this.loginBtn = false
          this.stepCaptchaVisible = false
        })
      },
      loginSuccess() {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
        this.$emit('func')
        this.$emit('message')
        this.handleCancel()
        if (this.keyRoute !== undefined && this.keyRoute !== '') {
          this.$router.push({ name: this.keyRoute })
        }
        if (this.isReload) {
          this.reload()
        } else {
          bus.$emit('transmitData')
        }
        if (this.isNeedGotoHome) {
          const token = Vue.ls.get(ACCESS_TOKEN)
          const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token
          window.open(newUrl, '_blank')
          this.isNeedGotoHome = false
        }

        if (this.isNeedGoto) {
          if (this.gotuQuery) {
            this.$router.push({ name: this.gotoRouter.name, query: this.gotuQuery.query ? this.gotuQuery.query : '' })
          } else {
            this.$router.push(this.gotoRouter)
          }
          this.isNeedGoto = false
        }
      },
      cmsFailed(err) {
        this.$notification['error']({
          message: '登录失败',
          description: err,
          duration: 4
        })
      },
      requestFailed(err) {
        this.$notification['error']({
          message: '登录失败',
          description: ((err.response || {}).data || {}).message || err.message || '请求出现错误，请稍后再试',
          duration: 4
        })
        this.loginBtn = false
      },
      validateMobile(rule, value, callback) {
        if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)) {
          callback()
        } else {
          callback('您的手机号码格式不正确!')
        }

      },
      validateInputCode(rule, value, callback) {
        if (!value || this.verifiedCode === this.inputCodeContent) {
          callback()
        } else {
          callback('您输入的验证码不正确!')
        }
      },
      generateCode(value) {
        this.verifiedCode = value.toLowerCase()
      },
      inputCodeChange(e) {
        this.inputCodeContent = e.target.value
        if (!e.target.value || e.target.value === 0 || e.target.value === '0') {
          this.inputCodeNull = true
        } else {
          this.inputCodeContent = this.inputCodeContent.toLowerCase()
          this.inputCodeNull = false
        }
      },
      departConfirm(res) {
        if (res.success) {
          const multiDepart = res.result.multi_depart
          // 0:无部门 1:一个部门 2:多个部门
          if (multiDepart === 0 || multiDepart === '0') {
            this.loginSuccess()
          } else if (multiDepart === 2 || multiDepart === '2') {
            this.departVisible = true
            this.currentUsername = this.form.getFieldValue('username')
            this.departList = res.result.departs
          } else {
            this.loginSuccess()
          }
        } else {
          this.requestFailed(res)
          this.Logout()
        }
      },
      departOk() {
        if (!this.departSelected) {
          this.validate_status = 'error'
          return false
        }
        const obj = {
          orgCode: this.departSelected,
          username: this.form.getFieldValue('username')
        }
        putAction('/sys/selectDepart', obj).then(res => {
          if (res.success) {
            const userInfo = res.result.userInfo
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            store.commit('SET_INFO', userInfo)
            this.departClear()
            this.loginSuccess()
          } else {
            this.requestFailed(res)
            this.Logout().then(() => {
              this.departClear()
            })
          }
        })
      },
      departClear() {
        this.departList = []
        this.departSelected = ''
        this.currentUsername = ''
        this.departVisible = false
        this.validate_status = ''
      },
      departChange(value) {
        this.validate_status = 'success'
        this.departSelected = value
      },
      getRouterData() {
        this.$nextTick(() => {
          this.form.setFieldsValue({})
        })
      },
      getEncrypte() {
        var encryptedString = Vue.ls.get(ENCRYPTED_STRING)
        if (encryptedString == null) {
          getEncryptedString().then((data) => {
            this.encryptedString = data
          })
        } else {
          this.encryptedString = encryptedString
        }
      },
      close() {
        this.$emit('close')
        this.visible = false
        this.beginStatus = true
        this.isWeb = true
      },
      showModal(reload) {
        this.visible = true
        this.isReload = reload
        this.getRouterData()
      },
      showModalGoHome(reload) {
        this.visible = true
        this.isReload = reload
        this.isNeedGotoHome = true
        this.getRouterData()
      },
      showModalAndGoto(gotoRouter, gotuQuery) {
        this.visible = true
        this.isNeedGoto = true
        this.gotoRouter = gotoRouter
        this.gotuQuery = gotuQuery
        this.getRouterData()
      },
      handleOk(e) {
        this.confirmLoading = true
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
        }, 2000)
      },
      handleCancel(e) {
        this.loginBtn = false
        this.close()
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/ .ant-modal-header{
    padding: 13px 24px;
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .ixm-button {
    background-color: #2c54ef;
    border-color: #2c54ef;
    .span-bold {
      font-weight: bold;
    }
  }
  button.ixm-button2{
    height: 56px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .login-button2{
    margin-bottom: 3em;
  }

  .begin-row{
    p{
      font-size: 14px;
      margin-bottom: 5px;
      color: rgb(74, 74, 72);
    }
  }
  .begin-row2{

  }
</style>