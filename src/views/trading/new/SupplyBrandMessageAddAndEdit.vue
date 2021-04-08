<template>
  <div id="supplyBrandMessageAddAndEdit">
    <div class="container">
      <h2>商标供应登记</h2>
      <a-spin size="large" :spinning="spinning">
        <a-form-model :model="portalBrand" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules"
                      ref="ruleForm">
          <a-row class="main-h3 my-row">
            <h3>基本信息</h3>
          </a-row>
          <div v-if="disabled && isAdmin()">
            <a-form-model-item label="所属公司" prop="orgName">
              <a-input v-model="portalBrand.orgName" id="orgName" :disabled="disabled"/>
            </a-form-model-item>
            <a-form-model-item label="真实姓名" prop="realName">
              <a-input v-model="portalBrand.realName" id="realName" :disabled="disabled"/>
            </a-form-model-item>
            <a-form-model-item label="手机号码" prop="phone">
              <a-input v-model="portalBrand.phone" id="phone" :disabled="disabled"/>
            </a-form-model-item>
          </div>

          <a-form-model-item label="类型">
            <span style="font-size: 16px;">{{ projectTypeName }}</span>
          </a-form-model-item>

          <a-form-model-item label="商标名称" prop="trademarkName">
            <a-input :disabled="disabled" v-model="portalBrand.trademarkName" placeholder="请输入商标名称"
                     id="trademarkName"></a-input>
          </a-form-model-item>
          <a-form-model-item label="商标图片" prop="trademarkImgUrl" ref="trademarkImgUrl">
            <span id="trademarkImgUrl">
              支持上传jpg/jpeg/png/bmp格式文件，文件不能超过2Mb，建议尺寸282*156px
            </span>
            <j-more-upload fileType="jpg,jpeg,png,bmp,gif" fileSize="2" fileNum="1"
                           v-model="portalBrand.trademarkImgUrl"
                           listType="picture-card" :my-upload="false"
                           @change="changeTag('trademarkImgUrl')" :disabled="disabled"></j-more-upload>
          </a-form-model-item>

          <a-form-model-item label="交易价格" prop="typeAndPrice" ref="typeAndPrice">
            <a-input hidden v-model="portalBrand.typeAndPrice"></a-input>
            <j-dict-select-tag type="radio" v-model="portalBrand.transactionPrice"
                               dictCode="transaction_price" placeholder="请选择交易价格" id="typeAndPrice"
                               :disabled="disabled"/>
            <a-input-number v-model="portalBrand.money" placeholder="请输入交易价格" style="width: 50%" :max="9999999999"
                            :min="0" :disabled="disabled" :precision="2"/>
            元
          </a-form-model-item>

          <a-form-model-item label="商标类别" prop="trademarkType" ref="trademarkType">
            <j-dict-select-tag :disabled="disabled" type="list" v-model="portalBrand.trademarkType"
                               dictCode="trademark_type" placeholder="请选择商标类别" id="trademarkType"
                               @input="changeTag('trademarkType')"/>
          </a-form-model-item>
          <a-form-model-item label="组合类别" prop="combinationCategory" ref="combinationCategory">
            <j-dict-select-tag :disabled="disabled" type="list"
                               v-model="portalBrand.combinationCategory"
                               dictCode="combination_category" placeholder="请选择组合类别"
                               id="combinationCategory"
                               @input="changeTag('combinationCategory')"/>
          </a-form-model-item>
          <a-form-model-item label="所属行业" prop="belongIndustry">
            <tree-select-for-dict
              :dict="'belong_industry_not'"
              v-model="portalBrand.belongIndustry"
              placeholder="请选择所属行业"
              :disabled="disabled"
              id="belongIndustry"
              :alreadyLoadValue="alreadyLoadValue"
              :disabledParent="true"
              :treeCheckStrictly="true">
            </tree-select-for-dict>
          </a-form-model-item>

          <a-row class="main-h3 my-row">
            <h3>商标供应内容</h3>
          </a-row>

          <a-form-model-item label="商标简介" prop="trademarkRemark" ref="trademarkRemark">
            <j-editor v-model="portalBrand.trademarkRemark" id="trademarkRemark" @input="changeTag('trademarkRemark')"
                      :disabled="disabled"/>
          </a-form-model-item>

          <a-row class="main-h3 my-row">
            <h3>商标供应详情</h3>
          </a-row>

          <a-form-model-item label="商标供应描述" prop="trademarkDesc" ref="trademarkDesc">
            <j-editor v-model="portalBrand.trademarkDesc" id="trademarkDesc" @input="changeTag('trademarkDesc')"
                      :disabled="disabled"/>
          </a-form-model-item>

          <a-form-model-item label="适用的领域/范围" prop="applicableField">
            <a-textarea :disabled="disabled" v-model="portalBrand.applicableField"
                        placeholder="请输入适用的领域/范围" id="applicableField"></a-textarea>
          </a-form-model-item>

          <a-form-model-item label="委托证明" prop="sqwtzm" ref="sqwtzm" v-if="portalBrand.projectType === '2'">
            <a-row class="my-prove-row">
              <span class="prove-span">
                知识产权受托方需上传相应的授权委托书（只能上传jpg/png格式文件，文件不能超过2Mb）
              </span>
            </a-row>
            <a-row>
              <j-more-upload fileType="jpg,jpeg,png" fileSize="2" fileNum="1" v-model="portalBrand.sqwtzm"
                             listType="picture-card" @change="changeTag('sqwtzm')" :disabled="disabled"></j-more-upload>
              <span class="prove-span">
              (上传转让委托声明)<br/>点击此处 <a :href="downUrl" target="_blank" :download="downNm">下载授权委托声明</a>
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
  import JDictSelectTag from '../../../components/general/JDictSelectTag'
  import TreeSelectForDict from '../../../components/general/TreeSelectForDict'
  import JEditor from '../../../components/general/JEditor'
  import { judgeState } from '@/utils/util'

  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import ProjectSubmitPromptModal from '../../../components/new/other/ProjectSubmitPromptModal'
  import { isAdmin } from '@/utils/role'

  export default {
    name: 'SupplyBrandMessageAddAndEdit',
    components: {
      ProjectSubmitPromptModal,
      JEditor,
      TreeSelectForDict,
      JDictSelectTag,
      JMoreUpload
    },
    data() {
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

        portalBrand: {
          orgName: '',
          realName: '',
          phone: '',

          trademarkName: '',
          trademarkImgUrl: '',
          transactionPrice: '',
          money: '',
          trademarkType: '',
          combinationCategory: '',
          belongIndustry: '',
          trademarkRemark: '',
          trademarkDesc: '',
          applicableField: '',
          sqwtzm: '',

          typeAndPrice: '',

          projectType: this.$route.query.projectType,
          id: this.$route.query.projectId
        },
        type: this.$route.query.type,
        rules: {
          trademarkName: [{
            required: true, max: 30, message: '请输入商标名称,长度在30字以内!'
          }],
          trademarkImgUrl: [
            { required: true, message: '请选择商标图片!' }
          ],
          transactionPrice: [{ required: true, message: '请选择交易价格!' }],

          typeAndPrice: [
            { validator: validatePass, required: true }
          ],
          trademarkType: [{ required: true, message: '请选择商标分类!' }],
          combinationCategory: [{ required: true, message: '请选择组合类别!' }],
          belongIndustry: [
            { required: true, message: '请选择所属行业!' }
          ],
          trademarkRemark: [{ required: true, message: '请输入商标简介!' }],
          trademarkDesc: [{ required: true, message: '请输入商标供应描述!' }],
          applicableField: [{ required: true, max: 1000, message: '请输入适用的领域/范围,长度在1000字以内!' }],
          sqwtzm: [
            { required: true, message: '请选择授权委托证明!' }
          ]
        },

        url: '/trusteeship/portalPatentTrusteeship/queryByApplyNo',
        addUrl: '/trademark/portalSupplyTrademark/add',
        editUrl: '/trademark/portalSupplyTrademark/edit',

        auditAction: '/trademark/portalSupplyTrademark/auditAction',
        brandUrl: '/trademark/portalSupplyTrademark/queryById',
        checkUrl: '/trademark/portalSupplyTrademark/trademarkInfoCheck',
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
          name: 'SupplyBrandDetails',
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
        const res = await getActionUpdateKeyword(this.brandUrl, param)
        if (res.success) {
          Object.assign(this.portalBrand, res.result)
          this.alreadyLoadValue = true
          if (this.portalBrand.trademarkStatus === '6') {
            // 审核不通过
            this.form.auditStatus = false
          }
          if (this.portalBrand.projectType === '1') {
            // 高端
            this.modalStatus = this.portalBrand.trademarkStatus
          }
          this.form.auditOpinion = this.portalBrand.auditOpinion

          if (this.disabled) {
            if (res.result.createBy) {
              const userRes = await getActionUpdateKeyword(this.getUserInfo, { username: res.result.createBy })
              if (userRes.success) {
                this.portalBrand.realName = userRes.result.realName
                this.portalBrand.phone = userRes.result.phone
                this.portalBrand.orgName = userRes.result.orgName
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
        if (this.portalBrand.trademarkStatus === '3') {
          // 这是 审核通过的订单，提交之前先校验
          const pres = await httpAction(this.checkUrl, this.portalBrand, 'post')
          notUpdate = pres.success
        }
        let res = {}
        if (!notUpdate) {
          // 修改了 需要提示
          const that = this
          that.$confirm({
            title: '确认提交商标',
            content: '审核通过商标修改后再提交，需要重新审核',
            onOk: async function() {
              that.spinning = true
              res = await httpAction(that.commitUrl, that.portalBrand, that.method)
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
          res = await httpAction(this.commitUrl, this.portalBrand, this.method)
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
        switch (this.portalBrand.projectType) {
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
      'portalBrand': {
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
      'portalBrand.transactionPrice': {
        handler(data) {
          if (data === null) {
            return false
          }
          const valueAmount = (this.portalBrand.transactionPrice === null ? '' : this.portalBrand.transactionPrice) + '-' + (this.portalBrand.money === null ? '' : this.portalBrand.money)
          this.portalBrand.typeAndPrice = valueAmount
          this.changeTag('typeAndPrice')
        }
      },
      'portalBrand.money': {
        handler(data) {
          if (data === null) {
            return false
          }
          const valueAmount = (this.portalBrand.transactionPrice === null ? '' : this.portalBrand.transactionPrice) + '-' + (this.portalBrand.money === null ? '' : this.portalBrand.money)
          this.portalBrand.typeAndPrice = valueAmount
          this.changeTag('typeAndPrice')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #supplyBrandMessageAddAndEdit {
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