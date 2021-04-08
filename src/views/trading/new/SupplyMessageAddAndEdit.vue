<template>
  <div id="supplyMessageAddAndEdit">
    <div class="container">
      <h2>项目供应登记</h2>
      <a-spin size="large" :spinning="spinning">
        <a-form-model :model="portalProject" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules"
                      ref="ruleForm">
          <a-row class="main-h3 my-row">
            <h3>基本信息</h3>
          </a-row>

          <div v-if="disabled && isAdmin()">
            <a-form-model-item label="所属公司" prop="orgName">
              <a-input v-model="portalProject.orgName" id="orgName" :disabled="disabled"/>
            </a-form-model-item>
            <a-form-model-item label="真实姓名" prop="realName">
              <a-input v-model="portalProject.realName" id="realName" :disabled="disabled"/>
            </a-form-model-item>
            <a-form-model-item label="手机号码" prop="phone">
              <a-input v-model="portalProject.phone" id="phone" :disabled="disabled"/>
            </a-form-model-item>
          </div>

          <a-form-model-item label="类型">
            <span style="font-size: 16px;">{{ projectTypeName }}</span>
          </a-form-model-item>

          <a-form-model-item label="项目名称" prop="projectName">
            <a-input placeholder="请输入项目名称" v-model="portalProject.projectName" id="projectName"
                     :disabled="disabled"></a-input>
          </a-form-model-item>

          <a-form-model-item label="项目图片" prop="projectImgUrl" ref="projectImgUrl">
            <span id="projectImgUrl">
              支持上传jpg/jpeg/png/bmp格式文件，文件不能超过2Mb，建议尺寸282*156px
            </span>
            <j-more-upload fileType="jpg,jpeg,png,bmp,gif" fileSize="2" fileNum="1"
                           v-model="portalProject.projectImgUrl"
                           listType="picture-card" :my-upload="false"
                           @change="changeTag('projectImgUrl')" :disabled="disabled"></j-more-upload>
          </a-form-model-item>

          <a-form-model-item label="展示有效期" prop="selectDate" ref="selectDate">
            <a-input hidden v-model="portalProject.selectDate"/>
            <a-date-picker
              v-model="portalProject.startDate"
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
              v-model="portalProject.deadlineDate"
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
            <a-input hidden v-model="portalProject.typeAndPrice"></a-input>
            <j-dict-select-tag type="radio" v-model="portalProject.transactionPrice"
                               dictCode="transaction_price" placeholder="请选择交易价格" id="typeAndPrice"
                               :disabled="disabled"/>
            <a-input-number v-model="portalProject.money" placeholder="请输入交易价格" style="width: 50%" :max="9999999999"
                            :min="0" :disabled="disabled" :precision="2"/>
            元
          </a-form-model-item>

          <a-form-model-item label="意向运营方式" prop="intendedOperationMode" ref="intendedOperationMode">
            <j-dict-select-tag type="radio" v-model="portalProject.intendedOperationMode"
                               dictCode="intended_operation_mode" id="intendedOperationMode"
                               @input="changeTag('intendedOperationMode')" :disabled="disabled"/>
          </a-form-model-item>

          <a-form-model-item label="所属行业" prop="belongIndustry">
            <tree-select-for-dict
              :dict="'belong_industry_not'"
              v-model="portalProject.belongIndustry"
              placeholder="请选择所属行业"
              :disabled="disabled"
              id="belongIndustry"
              :alreadyLoadValue="alreadyLoadValue"
              :disabledParent="true"
              :treeCheckStrictly="true">
            </tree-select-for-dict>
          </a-form-model-item>

          <a-form-model-item label="项目所在地" prop="madeAreaCodes">
            <a-cascader :options="areaOptions" placeholder="请选择项目所在地" v-model="portalProject.madeAreaCodes"
                        id="madeAreaCodes" :disabled="disabled"/>
          </a-form-model-item>

          <a-row class="main-h3 my-row">
            <h3>项目供应内容</h3>
          </a-row>

          <div class="table-content">
            <a-row class="my-row">
              <a-row class="main-h4">
                <h4>
                  <span><b>* </b>专利</span>
                </h4>
              </a-row>
              <a-form-model-item prop="portalSupplyProjectPatents" :wrapper-col="allTWrapperCol"
                                 ref="portalSupplyProjectPatents">
                <a-row>
                  <project-patent-table :have-oper="!disabled" @func="openModal" ref="patentTable"
                                        :data.sync="portalProject.portalSupplyProjectPatents"
                                        id="portalSupplyProjectPatents"
                                        @changeTable="changeTag('portalSupplyProjectPatents')"></project-patent-table>
                </a-row>
              </a-form-model-item>
            </a-row>

            <a-row class="my-row">
              <a-row class="main-h4">
                <h4>
                  <span>其他知识产权</span>
                </h4>
              </a-row>
              <a-form-model-item prop="portalSupplyProjectZscqs" :wrapper-col="allTWrapperCol">
                <a-row>
                  <other-table :have-oper="!disabled" @func="openModal" ref="otherTable"
                               :data.sync="portalProject.portalSupplyProjectZscqs"
                               id="portalSupplyProjectZscqs"></other-table>
                </a-row>
              </a-form-model-item>
            </a-row>
          </div>

          <a-form-model-item label="项目简介" prop="projectRemark" ref="projectRemark">
            <j-editor v-model="portalProject.projectRemark" id="projectRemark" @input="changeTag('projectRemark')"
                      :disabled="disabled"/>
          </a-form-model-item>

          <a-form-model-item label="项目内容" prop="projectContent" ref="projectContent">
            <j-editor v-model="portalProject.projectContent" id="projectContent" @input="changeTag('projectContent')"
                      :disabled="disabled"/>
          </a-form-model-item>

          <a-form-model-item label="技术团队" prop="technologyTeam" ref="technologyTeam">
            <j-dict-select-tag placeholder="请选择技术团队" type="radio" dict-code="technology_team"
                               v-model="portalProject.technologyTeam"
                               @input="changeTag('technologyTeam')" :disabled="disabled"
                               id="technologyTeam"></j-dict-select-tag>
          </a-form-model-item>

          <a-row class="main-h3 my-row">
            <h3>项目供应描述</h3>
          </a-row>

          <a-form-model-item label="解决的技术问题" prop="sloveProblem">
            <a-input v-model="portalProject.sloveProblem" type="textarea" placeholder="请输入解决的技术问题，最多500个字符"
                     id="sloveProblem" :disabled="disabled"/>
          </a-form-model-item>

          <a-form-model-item label="技术领域/适用范围" prop="technicalField">
            <a-input v-model="portalProject.technicalField" type="textarea" placeholder="请输入技术领域或适用范围，最多500个字符"
                     id="technicalField" :disabled="disabled"/>
          </a-form-model-item>

          <a-form-model-item label="委托证明" prop="sqwtzm" ref="sqwtzm" v-if="portalProject.projectType === '2'">
            <a-row class="my-prove-row">
              <span class="prove-span" id="sqwtzm">
                知识产权受托方需上传相应的授权委托书（只能上传jpg/png格式文件，文件不能超过2Mb）
              </span>
            </a-row>
            <a-row>
              <j-more-upload fileType="jpg,jpeg,png" fileSize="2" fileNum="1" v-model="portalProject.sqwtzm"
                             listType="picture-card" @change="changeTag('sqwtzm')" :disabled="disabled"></j-more-upload>
              <span class="prove-span">
              (上传转让委托声明)<br/>点击此处 <a :href="downUrl" target="_blank" :download="downNm">下载转让委托声明</a>
              </span>
            </a-row>
          </a-form-model-item>

        </a-form-model>

        <a-row v-if="disabled">
          <a-row>
            <a-divider orientation="left">审核意见</a-divider>
            <a-form-model :model="form" :rules="rules2"
                          ref="ruleForm2">
              <a-form-model-item label="审核状态" prop="auditStatus">
                <a-switch v-model="form.auditStatus" checked-children="通过" un-checked-children="不通过"
                          :disabled="viewDisabled"/>
              </a-form-model-item>
              <a-form-model-item label="审批意见" prop="auditOpinion" has-feedback>
                <a-textarea v-model="form.auditOpinion" rows="4" :placeholder="viewDisabled?'':'请输入审批意见'" :disabled="viewDisabled"/>
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

        <patent-add-modal ref="patent" @func="addData"></patent-add-modal>
        <other-add-modal ref="other" @func="addData"></other-add-modal>
        <project-submit-prompt-modal ref="promptModal" :is-high="false" :item-id="itemId"
                                     :modal-status="modalStatus"></project-submit-prompt-modal>
      </a-spin>
    </div>

  </div>
</template>

<script>
  import { getActionUpdateKeyword, httpAction } from '@/api/manage'
  import PatentAddModal from '../../../components/new/modal/PatentAddModal'
  import OtherAddModal from '../../../components/new/modal/OtherAddModal'
  import OtherTable from '../../../components/new/table/OtherTable'
  import ProjectPatentTable from '../../../components/new/table/ProjectPatentTable'
  import JMoreUpload from '../../../components/general/JMoreUpload'
  import moment from 'moment'
  import JDictSelectTag from '../../../components/general/JDictSelectTag'
  import TreeSelectForDict from '../../../components/general/TreeSelectForDict'
  import JEditor from '../../../components/general/JEditor'

  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import ProjectSubmitPromptModal from '../../../components/new/other/ProjectSubmitPromptModal'
  import { judgeState } from '@/utils/util'
  import { isAdmin } from '@/utils/role'

  export default {
    name: 'SupplyMessageAddAndEdit',
    components: {
      ProjectSubmitPromptModal,
      JEditor,
      TreeSelectForDict,
      JDictSelectTag,
      JMoreUpload,
      ProjectPatentTable,
      OtherTable,
      OtherAddModal,
      PatentAddModal
    },
    data() {

      const atLeastOne = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('至少添加一条专利信息'))
        }
        callback()
      }
      const validatePass = (rule, value, callback) => {
        if (value) {
          if (value === '-') {
            callback('请选择交易价格')
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
      return {
        modalStatus: '0',
        alreadyLoadValue: false,
        disabled: false,
        viewDisabled: false,
        spinning: false,
        btnNotCan: false,
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
        allTWrapperCol: { span: 24 },
        haveOper: true,
        endOpen: false,

        areaOptions: [],
        belongIndustryOptions: [],
        downUrl: '/tpls/知识产权转让委托声明20200410.docx',
        downNm: '知识产权转让委托声明20200410.docx',

        form: {
          auditStatus: true,
          auditOpinion: ''
        },
        rules2: {
          auditOpinion: [{
            required: false, max: 200, message: '请输入解决的技术问题,最多200个字符!'
          }]
        },
        portalProject: {
          orgName: '',
          realName: '',
          phone: '',

          projectName: '',
          projectImgUrl: '',
          startDate: undefined,
          deadlineDate: undefined,
          transactionPrice: '',
          money: '',
          intendedOperationMode: '',
          belongIndustry: '',
          madeAreaCodes: [],

          portalSupplyProjectPatents: [],
          portalSupplyProjectZscqs: [],

          projectRemark: '',
          projectContent: '',
          technologyTeam: '',
          sloveProblem: '',
          technicalField: '',
          sqwtzm: '',

          typeAndPrice: '',
          selectDate: '',

          projectType: this.$route.query.projectType,
          id: this.$route.query.projectId

        },
        type: this.$route.query.type,
        rules: {
          projectName: [
            { required: true, max: 40, message: '请输入项目名称,长度在40字以内!' }
          ],
          projectImgUrl: [
            { required: true, message: '请选择项目图片!' }
          ],
          startDate: [{ required: true, message: '请选择展示有效期!' }],
          transactionPrice: [{ required: true, message: '请选择交易价格!' }],
          typeAndPrice: [
            { validator: validatePass, required: true }
          ],
          intendedOperationMode: [{ required: true, message: '请选择意向运营方式!' }],
          belongIndustry: [
            { required: true, message: '请选择所属行业!' }
          ],
          madeAreaCodes: [{ required: true, message: '请选择项目所在地!' }],
          projectRemark: [{ required: true, message: '请输入项目简介!' }],
          projectContent: [{ required: true, message: '请输入项目内容!' }],
          technologyTeam: [{ required: true, message: '请选择技术团队!' }],
          sloveProblem: [{ required: true, max: 500, message: '请输入解决的技术问题，长度在500字以内!' }],
          technicalField: [{ required: true, max: 500, message: '请输入适用的领域/范围，长度在500字以内!' }],
          sqwtzm: [
            { required: true, message: '请选择授权委托证明!' }
          ],

          portalSupplyProjectPatents: [
            { validator: atLeastOne, trigger: 'change' }
          ],
          selectDate: [
            { validator: endAndStart, required: true }
          ],

          noPatentTechnology: [
            { max: 500, message: '最多500个字符' }
          ],
          supportingAssets: [
            { max: 50, message: '最多50个字符' }
          ]
        },


        addUrl: '/project/portalProject/add',
        editUrl: '/project/portalProject/edit',

        auditAction: '/project/portalProject/auditAction',
        projectUrl: '/zscq/portal/projectInfolist',
        checkUrl: '/project/portalProject/projectInfoCheck',
        getUserInfo: '/sys/user/queryByUserName',
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
      showModal() {
        this.$refs.promptModal.showModal()
      },
      moment,
      disabledDate(current) {
        return current && current < moment().startOf('day')
      },
      disabledStartDate(startValue) {
        const endValue = this.portalProject.deadlineDate
        if (!startValue || !endValue) {
          return (startValue && startValue < moment().startOf('day'))
        }
        return startValue.valueOf() > endValue.valueOf()
      },
      disabledEndDate(endValue) {
        const startValue = this.portalProject.startDate
        if (!endValue || !startValue) {
          return (endValue && endValue < moment().startOf('day'))
        }
        return startValue.valueOf() >= endValue.valueOf()
      },
      handleStartOpenChange(open) {
        if (!open) {
          this.endOpen = true
        }
      },
      handleEndOpenChange(open) {
        this.endOpen = open
      },
      changeTag(key) {
        this.$refs[`${key}`].onFieldChange()
      },
      addKey(itemArr) {
        for (const i in itemArr) {
          itemArr[i].key = i
        }
      },
      async handleAuditAction() {
        this.spinning = true
        const param = {
          id: this.$route.query.projectId,
          auditStatus: this.form.auditStatus,
          auditOpinion: this.form.auditOpinion
        }
        const res = await getActionUpdateKeyword(this.auditAction, param)
        console.info(res)
        console.info('审核完成')
        this.jumpCenter()
        this.$message.success('审核完成')
        this.spinning = false
      },
      handleViewAction() {
        const newpage = this.$router.resolve({
          name: 'SupplyProjectDetails',
          query: {
            id: this.$route.query.projectId
          }
        })
        window.open(newpage.href, '_blank')
      },
      jumpCenter() {
        const token = Vue.ls.get(ACCESS_TOKEN)

        let path = ''
        switch (this.$route.query.type) {
          case '1':
            path = '/project/portalProject/list'
            break
          case '2':
            path = '/patent/portalSupplyPatent/list'
            break
          case '3':
            path = '/trademark/requirementPatent/list'
            break
          default:
        }
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl, '_self')
      },
      async loadData() {
        this.spinning = true
        const param = { projectId: this.$route.query.projectId }
        const res = await getActionUpdateKeyword(this.projectUrl, param)
        if (res.success) {
          if (!res.result.deadlineDate) {
            res.result.deadlineDate = undefined
          }
          if (!res.result.startDate) {
            res.result.startDate = undefined
          }
          Object.assign(this.portalProject, res.result)
          this.alreadyLoadValue = true

          if (this.portalProject.projectStatus === '6') {
            // 审核不通过
            this.form.auditStatus = false
          }
          if (this.portalProject.projectType === '1') {
            // 高端
            this.modalStatus = this.portalProject.projectStatus
          }
          this.form.auditOpinion = this.portalProject.auditOpinion

          // 给原来子对象添加key
          this.addKey(this.portalProject.portalSupplyProjectPatents)
          this.addKey(this.portalProject.portalSupplyProjectZscqs)

          if (this.disabled) {
            if (res.result.createBy) {
              const userRes = await getActionUpdateKeyword(this.getUserInfo, { username: res.result.createBy })
              if (userRes.success) {
                this.portalProject.realName = userRes.result.realName
                this.portalProject.phone = userRes.result.phone
                this.portalProject.orgName = userRes.result.orgName
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
      async submitData(func) {
        this.btnNotCan = true
        // 保存之前先处理数组

        let notUpdate = true
        if (this.portalProject.projectStatus === '3') {
          // 这是 审核通过的订单，提交之前先校验
          const pres = await httpAction(this.checkUrl, this.portalProject, 'post')
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
              res = await httpAction(that.commitUrl, that.portalProject, that.method)
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
          console.info(this.portalProject)
          console.info('专利又出现问题了')
          this.spinning = true
          res = await httpAction(this.commitUrl, this.portalProject, this.method)
          if (res.success) {
            console.info(res)
            this.itemId = res.message
            if (func) {
              func(res)
            }
          } else {
            this.$message.warning(res.message)
          }
          this.spinning = false
        }
        this.btnNotCan = false
      },
      backTop() {
        // 上一步，先保存草稿，跳转到上一个页面
        this.$router.push({ name: 'SelectPublishProject', query: { type: this.$route.query.type } })
      },
      onSubmit() {
        // 先校验，再保存，最后跳转
        this.$refs.ruleForm.validate((valid, obj) => {
          if (valid) {
            this.submitData(this.showModal)
          } else {
            const key = Object.keys(obj)
            if (key && key.length > 0) {
              document.getElementById(key[0]).scrollIntoView()
            }

            return false
          }
        })
      },
      getCurrentStyle(current, today) {
        const style = {}
        if (current.date() === 1) {
          style.border = '1px solid #1890ff'
          style.borderRadius = '50%'
        }
        return style
      },
      loadDatas() {
        getActionUpdateKeyword('/portal/portalLocationCode/getAreaDatas').then((res) => {
          this.areaOptions = res
        })
      },
      openModal(type) {
        this.$refs[`${type}`].showModal()
      },
      addData(type, data) {
        this.$refs[`${type + 'Table'}`].addTableData(data)
      }
    },
    computed: {
      projectTypeName() {
        let name = ''
        switch (this.portalProject.projectType) {
          case '1':
            name = '高端'
            break
          case '2':
            name = '托管'
            break
          case '3':
            name = '自助'
            break
        }
        return name
      }
    },
    watch: {
      'portalProject': {
        handler(data) {
        },
        deep: true,
        immediate: true
      },
      '$route': {
        handler(data) {
          // 判断类型，add 还是 edit 还是 approve
          if (data.name.indexOf('Approval') > -1) {
            // 这是审批订单
            this.disabled = true
          } else if (data.name.indexOf('Add') > -1) {
            this.commitUrl = this.addUrl
            this.disabled = false
            this.method = 'post'
          } else if (data.name.indexOf('Edit') > -1) {
            this.commitUrl = this.editUrl
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
      'portalProject.transactionPrice': {
        handler(data) {
          if (data === null) {
            return false
          }
          const valueAmount = (this.portalProject.transactionPrice === null ? '' : this.portalProject.transactionPrice) + '-' + (this.portalProject.money === null ? '' : this.portalProject.money)
          this.portalProject.typeAndPrice = valueAmount
          this.changeTag('typeAndPrice')
        }
      },
      'portalProject.money': {
        handler(data) {
          if (data === null) {
            return false
          }
          const valueAmount = (this.portalProject.transactionPrice === null ? '' : this.portalProject.transactionPrice) + '-' + (this.portalProject.money === null ? '' : this.portalProject.money)
          this.portalProject.typeAndPrice = valueAmount
          this.changeTag('typeAndPrice')
        }
      },
      'portalProject.startDate': {
        handler(data) {
          const selectDate = (this.portalProject.startDate === null ? '' : this.portalProject.startDate) + '~' + (this.portalProject.deadlineDate === null ? '' : this.portalProject.deadlineDate)
          this.portalProject.selectDate = selectDate
          this.changeTag('selectDate')
        }
      },
      'portalProject.deadlineDate': {
        handler(data) {
          const selectDate = (this.portalProject.startDate === null ? '' : this.portalProject.startDate) + '~' + (this.portalProject.deadlineDate === null ? '' : this.portalProject.deadlineDate)
          this.portalProject.selectDate = selectDate
          this.changeTag('selectDate')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #supplyMessageAddAndEdit {
    .main-css();
    font-size: 16px;
    padding-bottom: 20px;
    h2 {
      text-align: center;
      margin: 50px 0 30px;
    }
    .main-h3 {
      h3 {
        font-size: 20px;
        color: #666666;
        span {
          font-size: 12px;
          color: #999999;
        }
      }
      margin-bottom: 20px;
    }
    .main-h4 {
      h4 {
        font-size: 16px;
      }
    }
    /deep/ .ant-form label {
      font-size: 16px;
      color: #666666;
    }
    .hint-span {
      padding-left: 20px;
    }

    .table-content {
      padding: 20px 50px;
      .my-row {
        margin-bottom: 20px;
      }
    }
    .my-btn-div {
      text-align: center;
      .my-btn-group {
        width: 50%;
      }
    }

    .my-prove-row {
      line-height: 28px;
    }
    .prove-span {
      font-size: 14px;
      color: #FFAA51;
      line-height: 28px !important;
    }
  }
</style>