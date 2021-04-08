<template>
  <div id="supplyPatentMessageAddAndEdit">
    <div class="container">
      <h2>专利供应登记</h2>
      <a-spin size="large" :spinning="spinning">
        <a-form-model :model="portalPatent" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules"
                      ref="ruleForm">
          <a-row class="main-h3 my-row">
            <h3>基本信息</h3>
          </a-row>

          <div v-if="disabled && isAdmin()">
            <a-form-model-item label="所属公司" prop="orgName">
              <a-input v-model="portalPatent.orgName" id="orgName" :disabled="disabled"/>
            </a-form-model-item>
            <a-form-model-item label="真实姓名" prop="realName">
              <a-input v-model="portalPatent.realName" id="realName" :disabled="disabled"/>
            </a-form-model-item>
            <a-form-model-item label="手机号码" prop="phone">
              <a-input v-model="portalPatent.phone" id="phone" :disabled="disabled"/>
            </a-form-model-item>
          </div>

          <a-form-model-item label="类型">
            <span style="font-size: 16px;">{{ projectTypeName }}</span>
          </a-form-model-item>

          <a-form-model-item label="申请号" prop="applyNo">
            <a-row display="flex">
              <a-col :span="20">
                <a-input v-model="portalPatent.applyNo" placeholder="请输入搜索内容" :disabled="disabled"
                         id="applyNo"></a-input>
                <span class="hint-span">提示：目前只支持中国专利，示例：CN201930045138.7</span>
              </a-col>
              <a-col :span="4">
                <a-button type="primary" class="my-btn" @click="onSearch" :disabled="disabled">查询</a-button>
              </a-col>
            </a-row>
          </a-form-model-item>

          <a-form-model-item label="申请日">
            <a-date-picker
              v-model="portalPatent.applyDate"
              format="YYYY-MM-DD"
              style="width: 100%"
              :disabled="true"
            />
          </a-form-model-item>

          <a-form-model-item label="专利类型">
            <j-dict-select-tag :disabled="true" type="radio" v-model="portalPatent.patentType" dictCode="patent_type"/>
          </a-form-model-item>

          <a-form-model-item label="申请人">
            <a-input :disabled="true" v-model="portalPatent.applyer"></a-input>
          </a-form-model-item>

          <a-form-model-item label="公开号">
            <a-input :disabled="true" v-model="portalPatent.announcementCode"></a-input>
          </a-form-model-item>

          <a-form-model-item label="公开日">
            <a-date-picker
              v-model="portalPatent.announcementDay"
              format="YYYY-MM-DD"
              style="width: 100%"
              :disabled="true"
            />
          </a-form-model-item>

          <a-form-model-item label="法律状态">
            <j-dict-select-tag :disabled="true" type="radio" v-model="portalPatent.status" dictCode="patent_status"
            />
          </a-form-model-item>

          <a-form-model-item label="专利权人">
            <a-input v-model="portalPatent.patenter" :disabled="true"></a-input>
          </a-form-model-item>

          <a-row class="main-h3 my-row">
            <h3>专利供应内容</h3>
          </a-row>

          <a-form-model-item label="专利简介" prop="patentRemark" ref="patentRemark">
            <j-editor v-model="portalPatent.patentRemark" id="patentRemark" @input="changeTag('patentRemark')"
                      :disabled="disabled"/>
          </a-form-model-item>

          <a-row class="main-h3 my-row">
            <h3>专利供应详情</h3>
          </a-row>

          <a-form-model-item label="专利名称">
            <a-input :disabled="true" v-model="portalPatent.patentName" id="patentName"></a-input>
          </a-form-model-item>

          <a-form-model-item label="专利图片" prop="patentImgUrl" ref="patentImgUrl">
            <span id="patentImgUrl">
              支持上传jpg/jpeg/png/bmp格式文件，文件不能超过2Mb，建议尺寸282*156px
            </span>
            <j-more-upload fileType="jpg,jpeg,png,bmp,gif" fileSize="2" fileNum="1"
                           v-model="portalPatent.patentImgUrl"
                           listType="picture-card" :my-upload="false"
                           @change="changeTag('patentImgUrl')" :disabled="disabled"></j-more-upload>
          </a-form-model-item>

          <a-form-model-item label="展示有效期" prop="selectDate" ref="selectDate">
            <a-input hidden v-model="portalPatent.selectDate"/>
            <a-date-picker
              v-model="portalPatent.startDate"
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
              v-model="portalPatent.deadlineDate"
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
            <a-input hidden v-model="portalPatent.typeAndPrice"></a-input>
            <j-dict-select-tag type="radio" v-model="portalPatent.transactionPrice"
                               dictCode="transaction_price" placeholder="请选择交易价格" id="typeAndPrice"
                               :disabled="disabled"/>
            <a-input-number v-model="portalPatent.money" placeholder="请输入交易价格" style="width: 50%" :max="9999999999"
                            :min="0" :disabled="disabled" :precision="2"/>
            元
          </a-form-model-item>


          <a-form-model-item label="意向运营方式" prop="intendedOperationMode" ref="intendedOperationMode">
            <j-dict-select-tag type="radio" v-model="portalPatent.intendedOperationMode"
                               dictCode="patent_transaction_type" id="intendedOperationMode"
                               @input="changeTag('intendedOperationMode')" :disabled="disabled"/>
          </a-form-model-item>

          <a-form-model-item label="所属行业" prop="belongIndustry">
            <tree-select-for-dict
              :dict="'belong_industry_not'"
              v-model="portalPatent.belongIndustry"
              placeholder="请选择所属行业"
              :disabled="disabled"
              id="belongIndustry"
              :alreadyLoadValue="alreadyLoadValue"
              :disabledParent="true"
              :treeCheckStrictly="true">
            </tree-select-for-dict>

          </a-form-model-item>

          <a-form-model-item label="技术领域" prop="technicalField" ref="technicalField">
            <j-dict-select-tag :disabled="disabled" type="list" v-model="portalPatent.technicalField"
                               dictCode="technical_field" placeholder="请选择技术领域" @input="changeTag('technicalField')"
                               id="technicalField"/>
          </a-form-model-item>
          <a-form-model-item label="合作区域" ref="cooperationArea" prop="cooperationArea">
            <j-dict-select-tag :disabled="disabled" type="radio" v-model="portalPatent.cooperationArea"
                               dictCode="cooperation_area" placeholder="请选择合作区域" @input="changeTag('cooperationArea')"
                               id="cooperationArea"/>
          </a-form-model-item>


          <a-form-model-item label="相关证明" prop="qlzm" ref="qlzm">
            <a-row class="my-prove-row">
              <a-col :span="24">
              <span class="prove-span" id="qlzm">
                申请人与主体认证名称不一致的，需上传权利证明若不是自己独有的专利，还需上传转让委托声明（只能上传jpg/png格式文件，文件不能超过2Mb）
              </span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <span class="prove-title">权利证明<span style="color: red">*</span></span>
                <j-more-upload fileType="jpg,jpeg,png" fileSize="2" fileNum="1" v-model="portalPatent.qlzm"
                               listType="picture-card" @change="changeTag('qlzm')"></j-more-upload>
                <span class="prove-span">
                (上传自己为独有权利人的证<br/>明，受理通知书或授权证书)
              </span>
              </a-col>
              <a-col :span="12">
                <span class="prove-title">委托证明</span>
                <j-more-upload fileType="jpg,jpeg,png" fileSize="2" fileNum="1" v-model="portalPatent.wtzm"
                               listType="picture-card"></j-more-upload>
                <span class="prove-span">
                (上传转让委托声明)<br/>点击此处 <a :href="downUrl" target="_blank" :download="downNm">下载转让委托声明</a>
              </span>
              </a-col>
            </a-row>


          </a-form-model-item>

          <!--<a-form-model-item label="委托证明" prop="sqwtzm" ref="sqwtzm" v-if="portalPatent.projectType === '2'">-->
          <!--<a-row class="my-prove-row">-->
          <!--<span class="prove-span" id="sqwtzm">-->
          <!--知识产权受托方需上传相应的授权委托书（只能上传jpg/png格式文件，文件不能超过2Mb）-->
          <!--</span>-->
          <!--</a-row>-->
          <!--<a-row>-->
          <!--<j-more-upload fileType="jpg,jpeg,png" fileSize="2" fileNum="1" v-model="portalPatent.sqwtzm"-->
          <!--listType="picture-card" @change="changeTag('sqwtzm')" :disabled="disabled"></j-more-upload>-->
          <!--<span class="prove-span">-->
          <!--(上传转让委托声明)<br/>点击此处 <a :href="downUrl" target="_blank" :download="downNm">下载授权委托声明</a>-->
          <!--</span>-->
          <!--</a-row>-->
          <!--</a-form-model-item>-->

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
                <a-textarea v-model="form.auditOpinion" rows="4" :placeholder="viewDisabled?'':'请输入审批意见'"
                            :disabled="viewDisabled"/>
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
        <project-submit-prompt-modal ref="promptModal" :is-high="false" :item-id="itemId"
                                     :modal-status="modalStatus"></project-submit-prompt-modal>
      </a-spin>
    </div>

  </div>
</template>

<script>
  import { getActionUpdateKeyword, httpAction } from '@/api/manage'
  import JMoreUpload from '../../../components/general/JMoreUpload'
  import moment from 'moment'
  import JDictSelectTag from '../../../components/general/JDictSelectTag'
  import TreeSelectForDict from '../../../components/general/TreeSelectForDict'
  import JEditor from '../../../components/general/JEditor'
  import { judgeState } from '@/utils/util'

  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import ProjectSubmitPromptModal from '../../../components/new/other/ProjectSubmitPromptModal'
  import { isAdmin } from '@/utils/role'

  export default {
    name: 'SupplyPatentMessageAddAndEdit',
    components: {
      ProjectSubmitPromptModal,
      JEditor,
      TreeSelectForDict,
      JDictSelectTag,
      JMoreUpload
    },
    data() {
      const validatePass = (rule, value, callback) => {
        debugger
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

        portalPatent: {
          orgName: '',
          realName: '',
          phone: '',

          applyNo: '',
          patentName: '',
          applyer: '',
          applyDate: undefined,
          announcementDay: undefined,
          announcementCode: '',
          patentType: '',
          patenter: '',
          status: '',

          patentRemark: '',
          patentImgUrl: '',
          startDate: undefined,
          deadlineDate: undefined,

          transactionPrice: '',
          money: '',
          intendedOperationMode: '',
          belongIndustry: '',

          technicalField: '',
          cooperationArea: '',
          qlzm: '',
          wtzm: '',
          sqwtzm: '',

          typeAndPrice: '',
          selectDate: '',

          projectType: this.$route.query.projectType,
          id: this.$route.query.projectId
        },
        type: this.$route.query.type,
        rules: {
          applyNo: [{ required: true, max: 40, message: '请输入申请号,长度在40字以内!' }],
          patentRemark: [{ required: true, message: '请输入专利简介!' }],
          patentImgUrl: [
            { required: true, message: '请选择专利图片!' }
          ],
          startDate: [{ required: true, message: '请选择展示有效期!' }],

          transactionPrice: [{ required: true, message: '请选择交易价格!' }],
          intendedOperationMode: [{ required: true, message: '请选择意向运营方式!' }],
          belongIndustry: [
            { required: true, message: '请选择所属行业!' }
          ],
          technicalField: [{ required: true, message: '请选择技术领域!' }],
          cooperationArea: [{ required: true, message: '请选择合作区域!' }],

          typeAndPrice: [
            { validator: validatePass, required: true }
          ],
          selectDate: [
            { validator: endAndStart, required: true }
          ],

          qlzm: [
            { required: true, message: '请选择权利证明!' }
          ],
          sqwtzm: [
            { required: true, message: '请选择授权委托证明!' }
          ]

        },

        url: '/trusteeship/portalPatentTrusteeship/queryByApplyNo',
        addUrl: '/patent/portalSupplyPatent/add',
        editUrl: '/patent/portalSupplyPatent/edit',

        auditAction: '/patent/portalSupplyPatent/auditAction',
        patentUrl: '/patent/portalSupplyPatent/queryById',
        checkUrl: '/patent/portalSupplyPatent/patentInfoCheck',
        getUserInfo: '/sys/user/queryByUserName',
        commitUrl: '',
        alreadySearch: false,

        itemId: '',
        method: 'post'
      }
    },
    created() {
      if (!judgeState()) {
        this.$router.push({ name: 'TradingCenter' })
        return false
      }
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
      onSearch() {
        const applyNo = this.portalPatent.applyNo
        this.$refs.ruleForm.validateField('applyNo', valid => {
          if (!valid) {
            this.spinning = true
            getActionUpdateKeyword(this.url, { applyNo: applyNo, functionBlock: '4' }).then((res) => {
              if (res.success) {
                this.spinning = false
                const result = res['result']['obj']
                if (result == null) {
                  this.$message.warning('没有此专利！')
                  this.resetPatentValues()
                  return
                } else {
                  const obj = result
                  const allRes = {
                    patentName: obj['title'],
                    applyer: obj['applicant'],
                    applyDate: obj['applicationDate'],
                    announcementDay: obj['publicationDate'],
                    announcementCode: obj['publicationDocNum'],
                    patentType: obj['type'],
                    patenter: obj['assignee'],
                    status: obj['validate']
                  }
                  this.portalPatent = Object.assign(this.portalPatent, allRes)
                  // 查询成功
                  this.alreadySearch = true
                }
              }
              if (res.code === 510 || res.code === 500) {
                this.spinning = false
                this.$message.warning(res.message)
                this.resetPatentValues()
              }
            }).finally(() => {
              this.spinning = false
            })
          }
        })
      },
      resetPatentValues() {
        const allRes = {
          patentName: '',
          applyer: '',
          applyDate: '',
          announcementDay: '',
          announcementCode: '',
          patentType: '',
          patenter: '',
          status: ''
        }
        this.portalPatent = Object.assign(this.portalPatent, allRes)
        this.alreadySearch = false
      },
      moment,
      disabledDate(current) {
        return current && current < moment().startOf('day')
      },
      disabledStartDate(startValue) {
        const endValue = this.portalPatent.deadlineDate
        if (!startValue || !endValue) {
          return (startValue && startValue < moment().startOf('day'))
        }
        return startValue.valueOf() > endValue.valueOf()
      },
      disabledEndDate(endValue) {
        const startValue = this.portalPatent.startDate
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
          name: 'SupplyPatentDetails',
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
        const param = { id: this.$route.query.projectId }
        const res = await getActionUpdateKeyword(this.patentUrl, param)
        if (res.success) {
          if (!res.result.deadlineDate) {
            res.result.deadlineDate = undefined
          }
          if (!res.result.startDate) {
            res.result.startDate = undefined
          }
          Object.assign(this.portalPatent, res.result)
          this.alreadyLoadValue = true

          if (this.portalPatent.pantentStatus === '6') {
            // 审核不通过
            this.form.auditStatus = false
          }
          if (this.portalPatent.projectType === '1') {
            // 高端
            this.modalStatus = this.portalPatent.pantentStatus
          }
          this.form.auditOpinion = this.portalPatent.auditOpinion

          if (this.disabled) {
            if (res.result.createBy) {
              const userRes = await getActionUpdateKeyword(this.getUserInfo, { username: res.result.createBy })
              if (userRes.success) {
                this.portalPatent.realName = userRes.result.realName
                this.portalPatent.phone = userRes.result.phone
                this.portalPatent.orgName = userRes.result.orgName
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
        let notUpdate = true
        if (this.portalPatent.pantentStatus === '3') {
          // 这是 审核通过的订单，提交之前先校验
          const pres = await httpAction(this.checkUrl, this.portalPatent, 'post')
          notUpdate = pres.success
        }
        let res = {}
        if (!notUpdate) {
          // 修改了 需要提示
          const that = this
          that.$confirm({
            title: '确认提交专利',
            content: '审核通过专利修改后再提交，需要重新审核',
            onOk: async function() {
              that.spinning = true
              res = await httpAction(that.commitUrl, that.portalPatent, that.method)
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
          res = await httpAction(this.commitUrl, this.portalPatent, this.method)
          if (res.success) {
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
        if (!this.alreadySearch) {
          this.$message.warning('输入申请号之后，请点击查询！')
          return
        }
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
      }
    },
    computed: {
      projectTypeName() {
        let name = ''
        switch (this.portalPatent.projectType) {
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
      'portalPatent': {
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
      'portalPatent.transactionPrice': {
        handler(data) {
          if (data === null) {
            return false
          }
          const valueAmount = (this.portalPatent.transactionPrice === null ? '' : this.portalPatent.transactionPrice) + '-' + (this.portalPatent.money === null ? '' : this.portalPatent.money)
          this.portalPatent.typeAndPrice = valueAmount
          this.changeTag('typeAndPrice')
        }
      },
      'portalPatent.money': {
        handler(data) {
          if (data === null) {
            return false
          }
          const valueAmount = (this.portalPatent.transactionPrice === null ? '' : this.portalPatent.transactionPrice) + '-' + (this.portalPatent.money === null ? '' : this.portalPatent.money)
          this.portalPatent.typeAndPrice = valueAmount
          this.changeTag('typeAndPrice')
        }
      },
      'portalPatent.startDate': {
        handler(data) {
          const selectDate = (this.portalPatent.startDate === null ? '' : this.portalPatent.startDate) + '~' + (this.portalPatent.deadlineDate === null ? '' : this.portalPatent.deadlineDate)
          this.portalPatent.selectDate = selectDate
          this.changeTag('selectDate')
        }
      },
      'portalPatent.deadlineDate': {
        handler(data) {
          const selectDate = (this.portalPatent.startDate === null ? '' : this.portalPatent.startDate) + '~' + (this.portalPatent.deadlineDate === null ? '' : this.portalPatent.deadlineDate)
          this.portalPatent.selectDate = selectDate
          this.changeTag('selectDate')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #supplyPatentMessageAddAndEdit {
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
      color: #FFAA51;
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

    .my-btn {
      width: 100%;
    }
    .hint-span {
      font-size: 12px;
    }
    .my-prove-row {
      line-height: 28px;
    }
    .prove-span {
      font-size: 14px;
      color: #FFAA51;
      line-height: 28px !important;
    }
    .prove-title {
      color: #999999;
    }
  }
</style>