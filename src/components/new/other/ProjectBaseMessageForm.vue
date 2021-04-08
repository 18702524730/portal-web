<template>
  <div id="projectBaseMessageForm">
    <a-spin size="large" :spinning="spinning">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" ref="ruleForm">
        <a-form-model-item label="项目联系人" prop="contracts">
          <a-input v-model="form.contracts" placeholder="请输入项目联系人"/>
        </a-form-model-item>
        <a-form-model-item label="联系方式" prop="contractsNumber" has-feedback>
          <a-input v-model="form.contractsNumber" placeholder="如:13000000000或010-12345678"/>
        </a-form-model-item>
        <a-form-model-item label="联系邮箱" prop="contractsEmail" v-if="haveEmail" has-feedback>
          <a-input v-model="form.contractsEmail" placeholder="请输入联系邮箱"/>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 12, offset: 6 }" class="my-submit">
          <a-button type="primary" @click="onSubmit" class="my-btn">
            下一步
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
  import { postAction, getActionUpdateKeyword } from '@/api/manage'
  import pick from 'lodash.pick'

  export default {
    name: 'ProjectBaseMessageForm',
    props: {
      haveEmail: {
        type: Boolean,
        default: true
      },
      state: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        spinning: false,
        btnNotCan: false,
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
        form: {
          contracts: '',
          contractsNumber: '',
          contractsEmail: '',
          projectType: this.$route.query.type,
          id: ''
        },
        rules: {
          contracts: [
            { required: true, message: '请输入正确项目联系人', trigger: 'blur', min: 1, max: 20 }
          ],
          contractsNumber: [
            {
              required: true,
              message: '请输入正确联系方式',
              trigger: 'blur',
              validator: this.handlePhoneOrMobile
            }
          ],
          contractsEmail: [
            { required: true, message: '请输入正确联系邮箱', trigger: 'blur', type: 'email' }
          ]
        },
        url: '/project/portalProject/draft',
        projectUrl: '/zscq/portal/projectInfolist',
        checkUrl: '/project/portalProject/projectInfoCheck',

        highProjectAdd: '/project/portalProject/projectEngagement/add'
      }
    },
    created() {
      // 如果有id 可能 是编辑或者草稿
      if (this.$route.query && this.$route.query.projectId) {
        this.loadData()
      }
    },
    methods: {
      async loadData() {
        this.spinning = true
        const param = { projectId: this.$route.query.projectId }
        const res = await getActionUpdateKeyword(this.projectUrl, param)
        if (res.success) {
          Object.assign(this.form, res.result)
        } else {
          this.$message.error(res.message)
        }
        this.spinning = false
        console.info(res)
        console.info('youlaile ')
      },
      async submitData() {
        this.btnNotCan = true
        let notUpdate = true
        if (this.form.projectStatus === '3') {
          // 这是 审核通过的订单，提交之前先校验
          const pres = await postAction(this.checkUrl, this.form)
          notUpdate = pres.success
        }
        let res = {}
        if (!notUpdate) {
          // 修改了 需要提示
          const that = this
          that.$confirm({
            title: '确认提交项目',
            content: '审核通过项目修改后再提交，需要重新审核',
            onOk: async function() {
              that.spinning = true
              res = await postAction(that.url, that.form)
              that.jumpTo(res)
              that.spinning = false
            }
          })
        } else {
          // 直接 修改
          this.spinning = true
          res = await postAction(this.url, this.form)
          this.jumpTo(res)
          this.spinning = false
        }
        this.btnNotCan = false
      },
      async submitAdd() {
        this.btnNotCan = true
        this.spinning = true
        const param = pick(this.form, 'contracts', 'contractsNumber')
        param.type = this.$route.query.type
        const res = await postAction(this.highProjectAdd, param)
        if (res.success) {
          console.info(res)
          this.$emit('func')
        }
        this.spinning = false
        this.btnNotCan = false
      },
      jumpTo(res) {
        if (!res.success) {
          this.$message.error('请求失败')
        } else {
          let name = ''
          switch (this.form.projectType) {
            case '1':
              name = 'HighProjectPublishBase'
              break
            case '2':
              name = 'EscrowProjectRegisterBase'
              break
            case '3':
              name = 'SelfHelpProjectRegisterBase'
              break
            default:
              break
          }
          this.$router.push({ name: name, query: { type: this.form.projectType, projectId: res.message } })
        }
      },
      onSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            if (this.state) {
              // 不是洽谈
              this.submitData()
            } else {
              this.submitAdd()
            }

          } else {
            return false
          }
        })
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
      },
      handlePhoneOrMobile(rule, value, callback) {
        /* eslint-disable */
        const regex = /^1[3456789]\d{9}$/
        const regex2 = /^(0\d{2,3}\-)?([2-9]\d{6,7})+(\-\d{1,6})?$/
        if (regex.test(value) || regex2.test(value)) {
          callback()
        } else {
          callback('请输入正确联系方式')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #projectBaseMessageForm {
    .my-submit {
      /deep/ .ant-form-item-control {
        text-align: left;
      }
      .my-btn {
        padding: 0 40px;
      }
    }
  }
</style>