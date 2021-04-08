<template>
  <div id="financialOnlineApply">
    <div class="container">
      <h2>在线申报</h2>
      <a-spin size="large" :spinning="spinning" v-if="!finished">
        <a-form-model :model="portalGuidingFundsApply" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules"
                      ref="ruleForm">
          <a-form-model-item label="企业名称" prop="enterpriseName">
            <a-input :disabled="disabled" v-model="portalGuidingFundsApply.enterpriseName"
                     placeholder="请输入企业名称"></a-input>
          </a-form-model-item>
          <a-form-model-item label="法定代表人/手机/所占股份" ref="nameAndPhoneAndProportion" prop="nameAndPhoneAndProportion">
            <a-input hidden v-model="portalGuidingFundsApply.nameAndPhoneAndProportion"/>
            <a-row :gutter="24">
              <a-col :span="7">
                <a-input :disabled="disabled" v-model="portalGuidingFundsApply.legalRepresentative"
                         placeholder="请输入法定代表人"></a-input>
              </a-col>
              <a-col :span="1">
                |
              </a-col>
              <a-col :span="7">
                <a-input :disabled="disabled" v-model="portalGuidingFundsApply.phone" placeholder="请输入手机号"></a-input>
              </a-col>
              <a-col :span="1">
                |
              </a-col>
              <a-col :span="7" class="my-input">
                <a-input-number :min="0" :step="0.01" :max="100" :precision="2" :disabled="disabled"
                                v-model="portalGuidingFundsApply.shareProportion"
                                placeholder="请输入所占股份"></a-input-number>
                %
              </a-col>
            </a-row>
          </a-form-model-item>

          <a-form-model-item label="融资需求/所占股份" ref="needAndProportion" prop="needAndProportion">
            <a-input hidden v-model="portalGuidingFundsApply.needAndProportion"/>
            <a-row :gutter="24">
              <a-col :span="11" class="my-input">
                <a-input-number :min="0" :step="0.0001" :precision="4" :max="999999999" :disabled="disabled"
                                v-model="portalGuidingFundsApply.financingNeeds"
                                placeholder="请输入企业融资需求"></a-input-number>
                万元
              </a-col>
              <a-col :span="1">
                |
              </a-col>
              <a-col :span="11" class="my-input">
                <a-input-number :min="0" :step="0.01" :max="100" :precision="2" :disabled="disabled"
                                v-model="portalGuidingFundsApply.financingShareProportion"
                                placeholder="请输入融资占股"></a-input-number>
                %
              </a-col>
            </a-row>
          </a-form-model-item>

          <a-form-model-item label="员工总数" ref="employeeNum" prop="employeeNum">
            <a-input-number :min="0" :max="999999999" :precision="0" :disabled="disabled"
                            v-model="portalGuidingFundsApply.employeeNum" placeholder="请输入员工总数"></a-input-number>
            人
          </a-form-model-item>

          <a-form-model-item label="申请表（加盖公章）" prop="applyFile" ref="applyFile">
            <div class="prove-span">
              《厦门市“一带一路”知识产权运营引导资金企业申报表》（加盖公章）
            </div>
            <j-more-upload fileType="doc,docx,pdf,zip,jpg,jpeg,png,rar" fileSize="20" fileNum="1"
                           v-model="portalGuidingFundsApply.applyFile"
                           listType="picture-card" @change="changeTag('applyFile')"
                           :disabled="disabled"></j-more-upload>
            <div class="file-type">
              可上传Word/Excel/PDF/压缩包/jpg/png格式文件，文件不能超过20Mb
            </div>

          </a-form-model-item>

          <a-form-model-item label="其他附件" prop="otherFile" ref="otherFile">
            <j-more-upload fileType="doc,docx,pdf,zip,jpg,jpeg,png,rar" fileSize="20" fileNum="1"
                           v-model="portalGuidingFundsApply.otherFile"
                           listType="picture-card" @change="changeTag('otherFile')"
                           :disabled="disabled"></j-more-upload>
            <div class="file-type">
              可上传Word/Excel/PDF/压缩包/jpg/png格式文件，文件不能超过20Mb
            </div>

          </a-form-model-item>
        </a-form-model>

        <a-row v-if="disabled">
          <a-row v-if="!details">
            <a-divider orientation="left">审核意见</a-divider>
            <a-form-model :model="form" :rules="rules2"
                          ref="ruleForm2">
              <a-form-model-item label="审核状态" prop="status">
                <a-switch v-model="form.status" checked-children="通过" un-checked-children="不通过"/>
              </a-form-model-item>
              <a-form-model-item label="审批意见" prop="auditOpinion" has-feedback>
                <a-textarea v-model="form.auditOpinion" rows="4" placeholder="请输入审批意见"/>
              </a-form-model-item>
            </a-form-model>
          </a-row>
        </a-row>

        <a-row class="my-btn-div" justify="center" type="flex" v-if="!disabled">
          <a-col :span="6">
            <a-button type="primary" @click="onSubmit" class="my-btn-group" :disabled="btnNotCan">
              提交
            </a-button>
          </a-col>
        </a-row>

        <a-row justify="center" type="flex" class="my-btn-div" v-else-if="!details">
          <a-col :span="6">
            <a-button type="primary" class="my-btn-group" @click="handleAuditAction">审核</a-button>
          </a-col>
        </a-row>
        <a-row justify="center" type="flex" class="my-btn-div" v-else>
          <a-col :span="6">
            <a-button class="my-btn-group" @click="backPage">查看一带一路引导资金</a-button>
          </a-col>
          <a-col :span="6">
            <a-button type="primary" class="my-btn-group" @click="viewPage">返回</a-button>
          </a-col>
        </a-row>
      </a-spin>
      <financial-online-apply-finish v-else :titleName="titleName"></financial-online-apply-finish>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword, httpAction } from '@/api/manage'
  import { judgeState } from '@/utils/util'

  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import JMoreUpload from '../../components/general/JMoreUpload'
  import FinancialOnlineApplyFinish from './FinancialOnlineApplyFinish'
  import { mapGetters } from 'vuex'

  export default {
    name: 'FinancialOnlineApply',
    components: { FinancialOnlineApplyFinish, JMoreUpload },
    data() {
      const validateNeedAndProportion = (rule, value, callback) => {
        if (value) {
          if (value === '-') {
            callback('请填写融资需求/所占股份!')
          }
          const arr = value.split('-')
          if (arr.length > 0) {
            const a = String(arr[0])
            const b = String(arr[1])
            if (a === 'null' || a === '' || a === 'undefined') {
              callback(new Error('请填写融资需求!'))
            } else if (b === 'null' || b === '' || b === 'undefined') {
              callback(new Error('请填写所占股份'))
            }
          }
          callback()
        } else {
          callback(new Error('请填写融资需求/所占股份!'))
        }
      }
      const validateThree = (rule, value, callback) => {
        if (value) {
          if (value === '##') {
            callback('请填写法定代表人/手机/所占股份!')
          }
          const arr = value.split('#')
          if (arr.length > 3) {
            callback(new Error('法定代表人不能包含特殊字符!'))
          } else if (arr.length === 3) {
            const a = String(arr[0])
            const b = String(arr[1])
            const c = String(arr[2])
            const flag = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(b)
            if (a === 'null' || a === '' || a === 'undefined') {
              callback(new Error('请填写法定代表人!'))
            } else if (!flag) {
              callback(new Error('请填写正确手机号!'))
            } else if (c === 'null' || c === '' || c === 'undefined') {
              callback(new Error('请填写所占股份!'))
            }
          }
          callback()
        } else {
          callback(new Error('请填写法定代表人/手机/所占股份!'))
        }
      }
      return {
        addUrl: '/guide/portalGuidingFundsApplyApply/add',
        editUrl: '/guide/portalGuidingFundsApplyApply/edit',

        auditUrl: '/guide/portalGuidingFundsApplyApply/audit',
        url: '/guide/portalGuidingFundsApplyApply/queryById',
        orgUrl: '/org/orgView/getDataByOrgId',
        spinning: false,
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
        otherWrapperCol: { span: 7 },
        disabled: true,
        method: 'post',

        commitUrl: '',
        form: {
          status: true,
          auditOpinion: ''
        },
        rules2: {
          auditOpinion: [{
            required: false, max: 200, message: '请输入解决的技术问题,最多200个字符!'
          }]
        },
        portalGuidingFundsApply: {
          enterpriseName: '',

          legalRepresentative: '',
          phone: '',
          shareProportion: '',

          financingNeeds: '',
          financingShareProportion: '',

          employeeNum: '',
          applyFile: '',
          otherFile: '',

          nameAndPhoneAndProportion: '',
          needAndProportion: ''
        },
        rules: {
          enterpriseName: [{ required: true, max: 60, message: '请输入企业名称,长度在60字以内!' }],
          employeeNum: [{ required: true, message: '请选择员工总数!', trigger: 'blur' }],
          applyFile: [{ required: true, message: '请上传申请表!' }],
          otherFile: [{ required: true, message: '请上传其他附件!' }],

          nameAndPhoneAndProportion: [{ validator: validateThree, required: true }],
          needAndProportion: [{ validator: validateNeedAndProportion, required: true }]
        },
        btnNotCan: false,
        itemId: '',
        finished: false,
        details: false,
        titleName: '提交',
        initLegal: false
      }
    },
    created() {
      if (!judgeState()) {
        this.$router.push({ name: 'FinancialService' })
        return false
      }
      // 如果有id 可能 是编辑或者草稿
      if (this.$route.query && this.$route.query.itemId) {
        this.loadData()
      } else {
        this.loadOrgData()
      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      changeTag(key) {
        this.$refs[`${key}`].onFieldChange()
      },
      async loadOrgData() {
        this.spinning = true
        const user = this.userInfo()
        const param = { orgId: user.orgId }
        const res = await getActionUpdateKeyword(this.orgUrl, param)
        if (res.success) {
          this.portalGuidingFundsApply.enterpriseName = res.result.orgName
          if (res.result.legalPersonName) {
            this.portalGuidingFundsApply.legalRepresentative = res.result.legalPersonName
          }
        } else {
          this.$message.error(res.message)
        }
        this.$nextTick(() => {
          this.initLegal = true
        })
        this.spinning = false
      },
      async loadData() {
        this.initLegal = true
        this.spinning = true
        const param = { id: this.$route.query.itemId }
        const res = await getActionUpdateKeyword(this.url, param)
        if (res.success) {
          Object.assign(this.portalGuidingFundsApply, res.result)

          if (this.portalGuidingFundsApply.status === '6') {
            // 审核不通过
            this.form.status = false
          }
          this.form.auditOpinion = this.portalGuidingFundsApply.auditOpinion
        } else {
          this.$message.error(res.message)
        }
        this.spinning = false
      },
      async handleAuditAction() {
        if (!this.form.status && (this.form.auditOpinion === '' || this.form.auditOpinion === undefined || this.form.auditOpinion === null)) {
          this.$message.warning('审核不通过需要填写审核意见！')
          return false
        }
        this.spinning = true
        const param = {
          id: this.$route.query.itemId,
          status: this.form.status,
          auditOpinion: this.form.auditOpinion
        }
        const res = await getActionUpdateKeyword(this.auditUrl, param)
        console.info(res)
        console.info('审核完成')
        this.$message.success('审核完成')
        this.jumpCenter()
        this.spinning = false
      },
      jumpCenter() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        setTimeout(function() {
          const path = '/guide/portalGuidingFundsApplyApply/list'
          const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
          window.open(newUrl, '_self')
        }, 500)
      },
      onSubmit() {
        this.$refs.ruleForm.validate((valid, obj) => {
          if (valid) {
            this.submitData()
          } else {
            return false
          }
        })
      },
      async submitData(func) {
        this.btnNotCan = true
        let res = {}
        // 直接 修改
        this.spinning = true
        res = await httpAction(this.commitUrl, this.portalGuidingFundsApply, this.method)
        if (res.success) {
          this.itemId = res.message
          this.finished = true
          if (func) {
            func(res)
          }
        } else {
          this.$message.warning(res.message)
        }
        this.spinning = false
        this.btnNotCan = false
      },
      backPage() {
        this.$router.push({ name: 'FinancialService' })
      },
      viewPage() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const path = '/guide/portalGuidingFundsApplyApply/list'
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl)
      }
    },
    watch: {
      '$route': {
        handler(data) {
          // 判断类型，add 还是 edit 还是 approve
          if (data.name.indexOf('Audit') > -1) {
            // 这是审批订单
            this.disabled = true
          } else if (data.name.indexOf('Add') > -1) {
            this.commitUrl = this.addUrl
            this.disabled = false
            this.method = 'post'
          } else if (data.name.indexOf('Edit') > -1) {
            this.commitUrl = this.editUrl
            this.titleName = '修改'
            this.disabled = false
            this.method = 'put'
          } else if (data.name.indexOf('Details') > -1) {
            this.disabled = true
            this.details = true
          }
        },
        deep: true,
        immediate: true
      },
      'portalGuidingFundsApply.financingNeeds': {
        handler(data) {
          const needAndProportion = (String(this.portalGuidingFundsApply.financingNeeds)) + '-' + (String(this.portalGuidingFundsApply.financingShareProportion))
          this.portalGuidingFundsApply.needAndProportion = needAndProportion
          this.changeTag('needAndProportion')
        }
      },
      'portalGuidingFundsApply.financingShareProportion': {
        handler(data) {
          const needAndProportion = (String(this.portalGuidingFundsApply.financingNeeds)) + '-' + (String(this.portalGuidingFundsApply.financingShareProportion))
          this.portalGuidingFundsApply.needAndProportion = needAndProportion
          this.changeTag('needAndProportion')
        }
      },
      'portalGuidingFundsApply.legalRepresentative': {
        handler(data) {
          const nameAndPhoneAndProportion = (String(this.portalGuidingFundsApply.legalRepresentative)) + '#' + (String(this.portalGuidingFundsApply.phone)) + '#' + (String(this.portalGuidingFundsApply.shareProportion))
          this.portalGuidingFundsApply.nameAndPhoneAndProportion = nameAndPhoneAndProportion
          debugger
          if (this.initLegal){
            this.changeTag('nameAndPhoneAndProportion')
          }
        }
      },
      'portalGuidingFundsApply.phone': {
        handler(data) {
          const nameAndPhoneAndProportion = (String(this.portalGuidingFundsApply.legalRepresentative)) + '#' + (String(this.portalGuidingFundsApply.phone)) + '#' + (String(this.portalGuidingFundsApply.shareProportion))
          this.portalGuidingFundsApply.nameAndPhoneAndProportion = nameAndPhoneAndProportion
          this.changeTag('nameAndPhoneAndProportion')
        }
      },
      'portalGuidingFundsApply.shareProportion': {
        handler(data) {
          const nameAndPhoneAndProportion = (String(this.portalGuidingFundsApply.legalRepresentative)) + '#' + (String(this.portalGuidingFundsApply.phone)) + '#' + (String(this.portalGuidingFundsApply.shareProportion))
          this.portalGuidingFundsApply.nameAndPhoneAndProportion = nameAndPhoneAndProportion
          this.changeTag('nameAndPhoneAndProportion')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #financialOnlineApply {
    .main-css();
    font-size: 16px;
    padding-bottom: 20px;
    h2 {
      text-align: center;
      margin: 50px 0 30px;
    }

    .my-btn-div {
      text-align: center;
      .my-btn-group {
        width: 70%;
      }
    }

    .my-btn {
      width: 100%;
    }
    .ant-input-number {
      width: 30%;
    }
    .my-input {
      input, .ant-input-number {
        width: 85%;
      }
    }

    .prove-span {
      font-size: 12px;
      color: #333333;
      line-height: 20px;
    }

    .file-type {
      font-size: 12px;
      color: #D77400;
      line-height: 20px;
    }
  }
</style>