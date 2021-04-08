<template>
  <div id="publishDemandRegister">
    <a-spin size="large" :spinning="spinning">
      <div class="container">
        <a-card>
          <h2>项目需求登记</h2>
          <a-row class="main-h3 my-row">
            <h3>需求基本信息</h3>
          </a-row>

          <div class="my-modal">
            <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" ref="ruleForm">

              <div v-if="disabled && isAdmin()">
                <a-form-model-item label="所属公司" prop="orgName">
                  <a-input v-model="form.orgName" id="orgName" :disabled="disabled"/>
                </a-form-model-item>
                <a-form-model-item label="真实姓名" prop="realName">
                  <a-input v-model="form.realName" id="realName" :disabled="disabled"/>
                </a-form-model-item>
                <a-form-model-item label="手机号码" prop="phone">
                  <a-input v-model="form.phone" id="phone" :disabled="disabled"/>
                </a-form-model-item>
              </div>


              <a-form-model-item label="需求标题" prop="requireName">
                <a-input v-model="form.requireName" placeholder="请输入需求标题" id="requireName" :disabled="disabled"/>
              </a-form-model-item>

              <a-form-model-item label="展示有效期" prop="selectDate" ref="selectDate">
                <a-input hidden v-model="form.selectDate"/>
                <a-date-picker
                  v-model="form.startDate"
                  :disabled-date="disabledStartDate"
                  format="YYYY-MM-DD"
                  placeholder="请选择开始日期"
                  @openChange="handleStartOpenChange"
                  style="width: 40%"
                  :disabled="disabled"
                  id="selectDate"
                />
                ~
                <a-date-picker
                  v-model="form.deadlineDate"
                  :disabled-date="disabledEndDate"
                  format="YYYY-MM-DD"
                  placeholder="请选择截止日期"
                  :open="endOpen"
                  @openChange="handleEndOpenChange"
                  style="width: 40%"
                  :disabled="disabled"
                />
              </a-form-model-item>

              <a-form-model-item label="交易价格" prop="typeAndPrice" ref="typeAndPrice">
                <a-input hidden v-model="form.typeAndPrice"></a-input>
                <j-dict-select-tag type="radio" v-model="form.transactionPrice"
                                   dictCode="transaction_price" placeholder="请选择交易价格" id="typeAndPrice"
                                   :disabled="disabled"/>
                <a-input-number v-model="form.money" placeholder="请输入交易价格" style="width: 50%" :max="9999999999"
                                :min="0" :disabled="disabled"  :precision="2"/>
                元
              </a-form-model-item>

              <a-form-model-item label="意向运营方式" prop="intendedOperationMode" ref="intendedOperationMode">
                <j-dict-select-tag type="radio" dict-code="intended_operation_mode"
                                   v-model="form.intendedOperationMode" id="intendedOperationMode"
                                   :disabled="disabled" @input="changeTag('intendedOperationMode')"></j-dict-select-tag>
              </a-form-model-item>
              <a-form-model-item label="所属行业" prop="belongIndustry">
                <tree-select-for-dict
                  :dict="'belong_industry_not'"
                  v-model="form.belongIndustry"
                  placeholder="请选择所属行业"
                  :disabled="disabled"
                  id="belongIndustry"
                  :alreadyLoadValue="alreadyLoadValue"
                  :disabledParent="true"
                  :treeCheckStrictly="true">
                </tree-select-for-dict>
              </a-form-model-item>
              <a-form-model-item label="项目所在地" prop="madeAreaCodes">
                <a-cascader :options="areaOptions" placeholder="请选择项目所在地" v-model="form.madeAreaCodes"
                            id="madeAreaCodes" :disabled="disabled"/>
              </a-form-model-item>

              <a-row class="main-h3 my-row my-other">
                <h3>项目需求内容</h3>
              </a-row>

              <a-form-model-item label="项目简介" prop="projectRemark" ref="projectRemark">
                <j-editor v-model="form.projectRemark" id="projectRemark" :disabled="disabled" @input="changeTag('projectRemark')"/>
              </a-form-model-item>
              <a-form-model-item label="需求内容" prop="requireContent">
                <j-editor v-model="form.requireContent" id="requireContent" :disabled="disabled"/>
              </a-form-model-item>

              <a-row class="main-h3 my-row my-other">
                <h3>项目需求描述</h3>
              </a-row>
              <a-form-model-item label="解决的技术问题" prop="sloveProblem">
                <a-input v-model="form.sloveProblem" type="textarea" placeholder="请输入解决的技术问题，最多500个字符"
                         id="sloveProblem" :disabled="disabled"/>
              </a-form-model-item>
              <a-form-model-item label="适用领域/范围" prop="technicalField">
                <a-input v-model="form.technicalField" type="textarea" placeholder="请输入适用领域/范围，最多500个字符"
                         id="technicalField" :disabled="disabled"/>
              </a-form-model-item>
              <a-form-model-item label="项目联系人" prop="contracts">
                <a-input v-model="form.contracts" placeholder="请输入项目联系人" id="contracts" :disabled="disabled"/>
              </a-form-model-item>
              <a-form-model-item label="联系方式" prop="contractsNumber">
                <a-input v-model="form.contractsNumber" placeholder="如:13000000000或010-12345678" id="contractsNumber"
                         :disabled="disabled"/>
              </a-form-model-item>
            </a-form-model>

            <a-row v-if="disabled">
              <a-row>
                <a-divider orientation="left">审核意见</a-divider>
                <a-form-model :model="form2" :rules="rules2"
                              ref="ruleForm2">
                  <a-form-model-item label="审核状态" prop="auditStatus">
                    <a-switch v-model="form2.auditStatus" checked-children="通过" un-checked-children="不通过"  :disabled="viewDisabled"/>
                  </a-form-model-item>
                  <a-form-model-item label="审批意见" prop="auditOpinion" has-feedback>
                    <a-textarea v-model="form2.auditOpinion" rows="4" :placeholder="viewDisabled?'':'请输入审批意见'"  :disabled="viewDisabled"/>
                  </a-form-model-item>
                </a-form-model>
              </a-row>
            </a-row>

            <a-row class="my-btn-div" justify="center" type="flex" v-if="!disabled">
              <a-col :span="6">
                <a-button type="primary" @click="backTop" class="my-btn-group" :disabled="btnNotCan">
                  上一步
                </a-button>
              </a-col>
              <a-col :span="6">
                <a-button type="primary" @click="onSubmit" class="my-btn-group" :disabled="btnNotCan">
                  提交
                </a-button>
              </a-col>
            </a-row>

            <a-row justify="center" type="flex" class="my-btn-div" v-else>
              <a-col :span="6">
                <a-button type="primary" class="my-btn-group" @click="handleAuditAction" v-if="!viewDisabled">审核</a-button>
                <a-button type="primary" class="my-btn-group" @click="handleViewAction" v-else>查看</a-button>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </div>
      <project-submit-prompt-modal ref="promptModal" :is-high="false" :item-id="itemId"
                                   :type="'demand'"></project-submit-prompt-modal>
    </a-spin>
  </div>
</template>

<script>
  import JDictSelectTag from '@/components/general/JDictSelectTag'
  import JEditor from '@/components/general/JEditor'
  import { getActionUpdateKeyword, httpAction } from '@/api/manage'
  import moment from 'moment'
  import { judgeState } from '@/utils/util'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import TreeSelectForDict from '../../../components/general/TreeSelectForDict'
  import ProjectSubmitPromptModal from '../../../components/new/other/ProjectSubmitPromptModal'
  import { isAdmin } from '@/utils/role'

  export default {
    name: 'PublishDemandRegister',
    components: { ProjectSubmitPromptModal, TreeSelectForDict, JEditor, JDictSelectTag },
    data() {
      const endAndStart = (rule, value, callback) => {
        if (value) {
          if (value === '~') {
            callback('请选择展示有效期!')
          }
          const arr = value.split('~')
          if (arr.length > 0) {
            if (!arr[0] || arr[0] === 'undefined') {
              callback(new Error('请选择开始时间!'))
            } else if (!arr[1] || arr[1] === 'undefined') {
              callback(new Error('请选择结束时间!'))
            }
          }
          callback()
        } else {
          callback(new Error('请选择展示有效期!'))
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value) {
          if (value === '-') {
            callback('请选择交易价格!')
          }
          const arr = value.split('-')
          if (arr.length > 0 && arr[0] === '1' && arr[1] === '') {
            callback(new Error('选择非面议需要填写交易价格'))
          }
          callback()
        } else {
          callback(new Error('请选择交易价格!'))
        }
      }
      return {
        alreadyLoadValue: false,
        disabled: false,
        viewDisabled: false,
        btnNotCan: false,
        spinning: false,
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },

        form2: {
          auditStatus: true,
          auditOpinion: ''
        },
        rules2: {
          auditOpinion: [{
            required: false, max: 200, message: '请输入解决的技术问题,最多200个字符!'
          }]
        },

        form: {
          orgName: '',
          realName: '',
          phone: '',

          requireName: '',
          startDate: undefined,
          deadlineDate: undefined,
          transactionPrice: '',
          money: '',
          intendedOperationMode: '',
          belongIndustry: '',
          madeAreaCodes: [],
          projectRemark: '',
          requireContent: '',
          sloveProblem: '',
          technicalField: '',
          contracts: '',
          contractsNumber: '',

          typeAndPrice: '',
          selectDate: '',

          id: this.$route.query.projectId
        },
        areaOptions: [],
        rules: {
          requireName: [{ required: true, max: 30, message: '请输入需求标题，长度在30字以内!' }],
          startDate: [{ required: true, message: '请选择展示有效期!', validator: endAndStart }],
          transactionPrice: [{ required: true, message: '请选择交易金额!' }],
          intendedOperationMode: [{ required: true, message: '请选择意向运营方式!' }],
          belongIndustry: [{ required: true, message: '请选择所属行业!' }],
          madeAreaCodes: [{ required: true, message: '请选择项目所在地!' }],
          projectRemark: [{ required: true, message: '请输入项目简介!' }],
          requireContent: [{ message: '请输入需求内容!' }],
          sloveProblem: [{ max: 500, message: '请输入解决的技术问题，长度在500字以内!' }],
          technicalField: [{ max: 500, message: '请输入适用的领域/范围，长度在500字以内!' }],
          contracts: [{ required: true, max: 20, message: '请输入项目联系人，长度在20字以内!!' }],

          typeAndPrice: [
            { validator: validatePass, required: true }
          ],
          selectDate: [
            { validator: endAndStart, required: true }
          ],

          contractsNumber: [{ required: true, validator: this.handlePhoneOrMobile, message: '请输入正确联系方式!' }]
        },
        endOpen: false,
        url: {
          add: '/project/portalRequirement/add',
          auditAction: '/project/portalRequirement/auditAction',
          edit: '/project/portalRequirement/edit',
          projectUrl: '/project/portalRequirement/queryById',
          getUserInfo: '/sys/user/queryByUserName'
        },
        checkUrl: '/project/portalRequirement/projectInfoCheck',
        commitUrl: '',
        itemId: '',

        method: 'post'
      }
    },
    created() {
      if (!judgeState()) {
        this.$router.push({ name: 'TradingCenter' })
        return false
      }
      this.loadDatas()
      // 如果有id 可能 是编辑或者草稿
      if (this.$route.query && this.$route.query.projectId) {
        this.loadData()
      }
    },
    methods: {
      isAdmin,
      ...mapGetters(['userInfo']),
      changeTag(key) {
        this.$refs[`${key}`].onFieldChange()
      },
      showModal() {
        this.$refs.promptModal.showModal()
      },
      async loadData() {
        this.spinning = true
        const param = { id: this.$route.query.projectId }
        const res = await getActionUpdateKeyword(this.url.projectUrl, param)
        if (res.success) {
          if (!res.result.deadlineDate) {
            res.result.deadlineDate = undefined
          }
          if (!res.result.startDate) {
            res.result.startDate = undefined
          }
          Object.assign(this.form, res.result)
          this.alreadyLoadValue = true

          if (this.form.requireStatus === '6') {
            // 审核不通过
            this.form2.auditStatus = false
          }
          this.form2.auditOpinion = this.form.auditOpinion

          if (this.disabled) {
            if (res.result.createBy) {
              const userRes = await getActionUpdateKeyword(this.url.getUserInfo, { username: res.result.createBy })
              if (userRes.success) {
                this.form.realName = userRes.result.realName
                this.form.phone = userRes.result.phone
                this.form.orgName = userRes.result.orgName
              } else {
                this.$message.error(userRes.message)
              }
            }
          }
        } else {
          this.$message.error(res.message)
        }
        this.spinning = false
      },
      async handleAuditAction() {
        this.spinning = true
        const param = {
          id: this.$route.query.projectId,
          auditStatus: this.form2.auditStatus,
          auditOpinion: this.form2.auditOpinion
        }
        const res = await getActionUpdateKeyword(this.url.auditAction, param)
        console.info(res)
        console.info('审核完成')
        this.jumpCenter()
        this.$message.success('审核完成')
        this.spinning = false
      },
      handleViewAction(){
        const newpage = this.$router.resolve({
          name: 'ProjectDetails',
          query: {
            id: this.$route.query.projectId
          }
        })
        window.open(newpage.href, '_blank')
      },
      backTop() {
        // 上一步，先保存草稿，跳转到上一个页面
        this.$router.push({ name: 'SelectPublishDemandType', query: { type: this.$route.query.type } })
      },
      onChange() {
      },
      loadDatas() {
        getActionUpdateKeyword('/portal/portalLocationCode/getAreaDatas').then((res) => {
          this.areaOptions = res
        })
        this.form.contracts = this.userInfo().realname
        this.form.contractsNumber = this.userInfo().phone
      },
      moment,
      disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().startOf('day')
      },
      disabledStartDate(startValue) {
        const endValue = this.form.deadlineDate
        if (!startValue || !endValue) {
          return (startValue && startValue < moment().startOf('day'))
        }
        return startValue.valueOf() > endValue.valueOf()
      },
      disabledEndDate(endValue) {
        const startValue = this.form.startDate
        if (!endValue || !startValue) {
          return (endValue && endValue < moment().startOf('day'))
        }
        return startValue.valueOf() >= endValue.valueOf()
      },
      handlePhoneOrMobile(rule, value, callback) {
        /* eslint-disable */
        const regex = /^1[3456789]\d{9}$/
        const regex2 = /^(0\d{2,3}\-)?([2-9]\d{6,7})+(\-\d{1,6})?$/
        if (regex.test(value) || regex2.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确联系方式'))
        }
      },
      onSubmit() {
        this.$refs.ruleForm.validate((valid, obj) => {
          if (valid) {
            this.addDemand()

          } else {
            const key = Object.keys(obj)
            if (key && key.length > 0) {
              document.getElementById(key[0]).scrollIntoView()
            }
            return false
          }
        })
      },
      jumpCenter() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        let path = ''
        switch (this.$route.query.type) {
          case '1':
            path = '/project/portalRequirement/list'
            break
          case '2':
            path = '/patent/portalRequirementPatent/list'
            break
          case '3':
            path = '/trademark/portalRequirementTrademark/list'
            break
          default:
        }
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl, '_self')
      },
      async addDemand() {
        this.btnNotCan = true
        let notUpdate = true
        if (this.form.requireStatus === '3') {
          // 这是 审核通过的订单，提交之前先校验
          const pres = await httpAction(this.checkUrl, this.form, 'post')
          notUpdate = pres.success
        }
        let res = {}
        if (!notUpdate) {
          // 修改了 需要提示
          const that = this
          that.$confirm({
            title: '确认提交项目需求',
            content: '审核通过项目需求修改后再提交，需要重新审核',
            onOk: async function() {
              that.spinning = true
              res = await httpAction(that.commitUrl, that.form, that.method)
              if (res.success) {
                that.jumpCenter()
              } else {
                that.$message.warning(res.message)
              }
              that.spinning = false
            }
          })
        } else {
          // 直接 修改
          this.spinning = true
          res = await httpAction(this.commitUrl, this.form, this.method)
          if (res.success) {
            this.itemId = res.message
            this.showModal()
          } else {
            this.$message.warning(res.message)
          }
          this.spinning = false
        }
        this.btnNotCan = false
      },
      handleStartOpenChange(open) {
        if (!open) {
          this.endOpen = true
        }
      },
      handleEndOpenChange(open) {
        this.endOpen = open
      }
    },
    watch: {
      '$route': {
        handler(data) {
          // 判断类型，add 还是 edit 还是 approve
          if (data.name.indexOf('Approval') > -1) {
            // 这是审批订单
            this.disabled = true
          } else if (data.name.indexOf('Add') > -1) {
            this.commitUrl = this.url.add
            this.disabled = false
            this.method = 'post'
          } else if (data.name.indexOf('Edit') > -1) {
            this.commitUrl = this.url.edit
            this.disabled = false
            this.method = 'put'
          } else if (data.name.indexOf('View') > -1) {
            this.disabled = true
            this.viewDisabled = true
          }
        },
        deep: true,
        immediate: true
      },
      'form.transactionPrice': {
        handler(data) {
          if (data === null){
            return false
          }
          const valueAmount = (this.form.transactionPrice === null ? '' : this.form.transactionPrice) + '-' + (this.form.money === null ? '' : this.form.money)
          this.form.typeAndPrice = valueAmount
          this.changeTag('typeAndPrice')
        }
      },
      'form.money': {
        handler(data) {
          if (data === null){
            return false
          }
          const valueAmount = (this.form.transactionPrice === null ? '' : this.form.transactionPrice) + '-' + (this.form.money === null ? '' : this.form.money)
          this.form.typeAndPrice = valueAmount
          this.changeTag('typeAndPrice')
        }
      },
      'form.startDate': {
        handler(data) {
          const selectDate = (this.form.startDate === null ? '' : this.form.startDate) + '~' + (this.form.deadlineDate === null ? '' : this.form.deadlineDate)
          this.form.selectDate = selectDate
          this.changeTag('selectDate')
        }
      },
      'form.deadlineDate': {
        handler(data) {
          const selectDate = (this.form.startDate === null ? '' : this.form.startDate) + '~' + (this.form.deadlineDate === null ? '' : this.form.deadlineDate)
          this.form.selectDate = selectDate
          this.changeTag('selectDate')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #publishDemandRegister {
    background-color: @main-bg-color;
    padding-bottom: 20px;
    .main-css();
    h2 {
      text-align: center;
      margin: 50px 0 30px;
    }
    .my-modal {
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
    }

    .my-all-btn {
      text-align: center;
      .my-btn {
        padding: 0 30px;
      }
    }
    .my-other {
      margin-bottom: 20px;
    }
    .my-btn-div {
      text-align: center;
      .my-btn-group {
        width: 50%;
      }
    }
  }
</style>