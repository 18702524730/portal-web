<template>
  <div id="trainOfflineApplyModal">
    <a-modal
      title="活动报名"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="800px"
      :footer="null"
      :maskClosable="false"
    >
      <a-row class="my-title">
        <span>* 为确保您能成功报名，请确保您的相关信息已完善准确。</span><a @click="aClick" v-if="!registerState">有账号直接登录-></a>
      </a-row>
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" ref="ruleForm" :rules="rules">
        <a-form-model-item label="姓名" prop="realname">
          <a-input v-model="form.realname" placeholder="请输入姓名"/>
        </a-form-model-item>
        <a-form-model-item label="手机号码" prop="phone">
          <a-input v-model="form.phone" placeholder="请输入手机号码"/>
        </a-form-model-item>


        <a-form-model-item label="短信验证码" v-if="!registerState" prop="captcha" ref="captcha">
          <a-row type="flex" align="middle">
            <a-col class="gutter-row" :span="16">
              <a-input
                v-model="form.captcha"
                type="text"
                placeholder="请输入验证码"
                @input="changeTag('captcha')">
                <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
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
        </a-form-model-item>


        <a-form-model-item label="公司名称" prop="orgName">
          <a-input v-model="form.orgName" placeholder="请输入公司名称"/>
        </a-form-model-item>

        <a-form-model-item label="职位" prop="post" ref="post">
          <j-dict-select-tag placeholder="请选择职位" type="list" dict-code="position"
                             v-model="form.post" @input="changeTag('post')"></j-dict-select-tag>
        </a-form-model-item>

        <a-form-model-item label="工作经验" prop="workExperience" ref="workExperience">
          <j-dict-select-tag placeholder="请选择工作经验" type="list" dict-code="work_experience"
                             v-model="form.workExperience" @input="changeTag('workExperience')"></j-dict-select-tag>
        </a-form-model-item>

        <a-form-model-item label="所在地" prop="locationArr">
          <a-cascader :options="dictLocation" placeholder="请选择项目所在地" v-model="form.locationArr"
                      :getPopupContainer="triggerNode => triggerNode.parentNode"/>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-row class="my-btn-group">
            <a-col :span="12">
              <a-button type="primary" @click="handleOk" size="large" class="my-btn">
                确认报名
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button size="large" class="my-btn" @click="handleCancel">
                取消
              </a-button>
            </a-col>
          </a-row>


        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
  import { judgeState } from '@/utils/util'
  import { mapGetters } from 'vuex'
  import { getActionUpdateKeyword, postAction } from '@/api/manage'
  import JDictSelectTag from '../../../components/general/JDictSelectTag'

  export default {
    name: 'TrainOfflineApplyModal',
    components: { JDictSelectTag },
    inject: ['headLogin'],
    data() {
      return {
        visible: false,
        confirmLoading: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        form: {
          realname: '',
          phone: '',
          captcha: '',
          orgName: '',
          post: '',
          workExperience: '',
          location: '',
          locationArr: [],

          userId: '',
          offlineSalonId: ''
        },
        url: {
          infoUrl: '/zscq/portal/training/getBaseInfo',
          applyUrl: '/zscq/portal/training/offlineSalonRegistration',
          smsUrl: '/zscq/portal/training/smsVerificationCode'
        },
        registerState: false,
        dictLocation: [],
        state: {
          time: 180,
          smsSendBtn: false
        },
        rules: {
          realname: [{
            required: true,
            message: '请输入姓名'
          }],
          phone: [{
            required: true,
            message: '请输入正确格式的手机号码!',
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
          }],
          captcha: [{ required: true, message: '请输入验证码!' }],
          orgName: [{ required: true, message: '请输入公司名称!', max: 50 }],
          post: [{ required: true, message: '请选择职位!' }],
          workExperience: [{ required: true, message: '请选择工作经验!' }],
          locationArr: [{ required: true, message: '请选择工作所在地!' }]
        }
      }
    },
    created() {
      this.loadInfo()
    },
    methods: {
      ...mapGetters(['userInfo']),
      changeTag(key) {
        this.$refs[`${key}`].onFieldChange()
      },
      async loadInfo() {
        this.confirmLoading = true
        const res = await getActionUpdateKeyword(this.url.infoUrl)
        if (res.success) {
          this.dictLocation = res.result.dictLocation
          console.info(this.dictLocation)
        }
        this.confirmLoading = false
        console.info(res)
        console.info('wahahaha')
      },
      showModal(id) {
        this.registerState = judgeState()
        if (this.registerState) {
          // 如果是登录用户，把userId赋值
          const user = this.userInfo()
          this.form.userId = user.id
          this.form.realname = user.realname
          this.form.phone = user.phone
          this.form.orgName = user.orgName === null ? '' : user.orgName
        }
        // 赋值活动id
        this.form.offlineSalonId = id
        this.visible = true
      },
      getCaptcha() {
        const that = this
        this.$refs.ruleForm.validateField('phone', valid => {
          if (!valid) {
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
            smsParams.mobile = this.form.phone
            smsParams.offlineSalonId = this.form.offlineSalonId
            getActionUpdateKeyword(this.url.smsUrl, smsParams)
              .then(res => {
                if (!res.success) {
                  setTimeout(hide, 0)
                  that.$message.warning(res.message)
                  that.state.time = 0
                  console.info('hahaahah')
                }
                console.log(res)
                setTimeout(hide, 500)
              })
              .catch(err => {
                setTimeout(hide, 1)
                clearInterval(interval)
                that.state.time = 180
                that.state.smsSendBtn = false
                this.$message.error(err)
              })
          } else {
            this.$message.warning('请输入手机号!')
          }
        })
      },
      handleCancel() {
        this.visible = false
        this.$refs.ruleForm.resetFields()
        this.state.time = 0
      },
      handleOk() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            debugger
            this.confirmLoading = true
            this.form.location = this.form.locationArr.join(',')
            console.info(this.form)
            postAction(this.url.applyUrl, this.form).then((res) => {
              if (!res.success) {
                this.$message.error(res.message)
              } else {
                this.$message.success('报名成功')
                // 刷新
                this.$emit('func')
                // 重置表单
                this.handleCancel()
              }
              this.confirmLoading = false
            }).finally(() => {
              this.confirmLoading = false
            })
          } else {
            return false
          }
        })
      },
      aClick() {
        this.handleCancel()
        this.headLogin()
      },
      onSubmit() {

      }
    }
  }
</script>

<style scoped lang="less">
  #trainOfflineApplyModal {

  }

  .my-title {
    text-align: center;
    span {
      color: #f59a23;
    }
    margin-bottom: 10px;
  }

  .my-btn-group {
    text-align: center;
    .my-btn {
      width: 60%;
    }
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 32px;
  }

</style>