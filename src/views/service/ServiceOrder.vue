<template>
  <div id="serviceOrder">
    <div class="current-container">
      <a-row>
        <a-steps :current="0" labelPlacement="vertical" class="container-step">
          <a-step description="申请服务，确认订单"/>
          <a-step title="" description="服务机构处理订单"/>
          <a-step title="" description="线下服务"/>
          <a-step title="" description="服务完成"/>
          <a-step description="评价服务">
            <a-icon type="check-circle" slot="icon" :style="{ fontSize: '32px' }"/>
          </a-step>
        </a-steps>
      </a-row>
    </div>
    <div class="container">
      <div class="current-container">
        <a-row>
          <div class="card-title">
            <a-divider type="vertical"/>
            <span class="title">服务订单信息</span>
          </div>
          <a-card :bordered="true" class="card-body my-u-p">
            <p style="padding-bottom: 16px"><span>服务机构:&nbsp;</span><span>{{agencyProduct.orgName}}</span></p>
            <p style="padding-bottom: 16px"><span>服务名称:&nbsp;</span><span>{{agencyProduct.serviceName}}</span></p>
            <p style="padding-bottom: 16px"><span>服务价格:&nbsp;</span><span>{{newMoneyYun}}</span>
            </p>
            <p style="padding-bottom: 16px" v-if="projectOptions.length > 0"><span>服务项目:&nbsp;</span>
              <a-checkbox-group :options="projectOptions" v-model="selectOptions" @change="onChangeBtn"/>
            </p>
            <p><span>收费标准:&nbsp;</span><span>{{agencyProduct.chargingStandard}}</span></p>
            <p class="tip">提示：服务价格及收费标准为参考价格，并非最终付款金额，实际价格将由服务商与您联系后确定！</p>
          </a-card>
        </a-row>

        <a-row v-if="agencyProduct.voucher">
          <div class="card-title">
            <a-divider type="vertical"/>
            <span class="title">服务券</span>
          </div>
          <a-card :bordered="true" class="card-body">
            <p class="tip">该服务可抵用小微企业服务补贴券！</p>
            <p v-if="voucherInfo.code === 0">
              <span style="background-color: #f6f6f6; padding: 10px;" :class="{'is-use':isUseVoucher}">
                <a-checkbox @change="changeBox" :checked="isUseVoucher"/>
                <span v-if="!isUseVoucher || agencyProduct.transactionPrice === '0'">使用服务券抵扣</span>
                <span v-if="isUseVoucher && agencyProduct.transactionPrice === '1'">使用服务券<a-input-number :min="0"
                                                                                                         :max="maxUseAmount"
                                                                                                         v-model="selectValue"
                                                                                                         @change="onChangeNum"/></span>
              </span>
              <span style="padding-left: 10px;" v-if="agencyProduct.transactionPrice === '1'">当前共有 <span
                style="color:#de554c;font-weight: 900">{{specificInfo.availableAmount}}</span> 元服务券，本次最多可抵用 <span
                style="color:#de554c;font-weight: 900">{{maxUseAmount}}</span> 元</span>
              <span style="padding-left: 10px;" v-if="agencyProduct.transactionPrice === '0'">当前共有 <span
                style="color:#de554c;font-weight: 900">{{specificInfo.availableAmount}}</span> 元服务券</span>
            </p>
            <p v-else-if="voucherInfo.code !== 4">
              <a-button class="b-primary" @click="judgeVoucher">立即领券</a-button>
            </p>
            <p v-else>
              <span>无可用服务券</span>
            </p>
          </a-card>
        </a-row>

        <a-row>
          <div class="card-title">
            <a-divider type="vertical"/>
            <span class="title">交易方式</span>
          </div>
          <a-card :bordered="true" class="card-body">
            <p>
              <a-radio-group @change="onChange" v-model="transactionModeValue">
                <template v-for="(item,index) in transactionMode.dictOptions">
                  <a-radio-button :value="item.value" :key="index" class="radio-button">{{item.text}}</a-radio-button>
                </template>
              </a-radio-group>
            </p>
          </a-card>
        </a-row>
        <a-form :form="form">
          <a-row>
            <div class="card-title">
              <a-divider type="vertical"/>
              <span class="title">公司信息</span>
            </div>
            <a-card :bordered="true" class="card-body">
              <div v-if="enterpriseInfo.pass">
                <a-form-item label="企业名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
                  <span>{{enterpriseInfo.orgName}}</span>
                </a-form-item>
                <a-form-item label="企业规模" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
                  <span>{{enterpriseInfo.orgScale}}</span>
                </a-form-item>
                <!--<p><span>企业名称：</span><span>{{enterpriseInfo.orgName}}</span></p>-->
                <!--<p><span>企业规模：</span><span>{{enterpriseInfo.orgScale}}</span></p>-->
              </div>
              <div v-else>
                <p>
                  <span style="margin-right: 10px;">企业名称</span>
                  <span>您还没有绑定企业信息</span>
                  <a-button type="link" @click="companyApprove">立即认证</a-button>
                </p>
              </div>
              <a-form-item label="服务申请人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
                <a-input v-decorator="[ 'applicant', validatorRules.applicant]" placeholder="请输入申请人姓名"></a-input>
              </a-form-item>
              <!--<span><span style="color: red">*</span>服务申请人：</span>-->
              <!--<span><a-input placeholder="请输入姓名"/></span>-->
              <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
                <a-input v-decorator="[ 'contactPhone', validatorRules.contactPhone]" placeholder="请输入联系电话"></a-input>
              </a-form-item>
              <!--<span><span style="color: red">*</span>联系电话：</span>-->
              <!--<span><a-input placeholder="请输入正确联系电话"/></span>-->
            </a-card>
          </a-row>

          <a-row>
            <div class="card-title">
              <a-divider type="vertical"/>
              <span class="title">留言</span>
            </div>
            <a-card :bordered="true" class="card-body">
              <a-form-item>
                <a-textarea :rows="5" v-decorator="[ 'leaveMsg', {}]"></a-textarea>
              </a-form-item>
            </a-card>
          </a-row>

          <a-row>
            <a-card :bordered="false" class="card-body">
              <a-row :gutter="6">
                <a-col :xs="12" :sm="6" :md="6" :lg="6" :xl="3" style="text-align: right">
                  <p><span>服务价格：</span></p>
                  <p v-if="agencyProduct.voucher"><span>服务券抵扣：</span></p>
                  <p><span>应付总额：</span></p>
                </a-col>
                <a-col :xs="20" :sm="6" :md="14" :lg="6" :xl="6" style="text-align: left">
                  <p><span class="money">{{newMoney}}</span></p>
                  <p style="margin-bottom: 0.5em" v-if="agencyProduct.voucher"><span class="money">{{deductionMoney}}&nbsp;</span><span>抵扣价格以最终为准</span>
                  </p>
                  <p><span class="money" style="font-size: 20px">{{spendMoney}}</span></p>
                </a-col>
              </a-row>
              <a-row :gutter="8" style="margin-top: 10px;">
                <a-col :offset="1" :xs="10" :sm="6" :md="6" :lg="3">
                  <a-button class="b-primary" @click="putOrder" :disabled="confirmLoading">提交订单</a-button>
                </a-col>
                <a-col :offset="1" :xs="10" :sm="6" :md="6" :lg="3">
                  <a-button class="b-default" @click="cancelOrder">取消订单</a-button>
                </a-col>
              </a-row>
            </a-card>
          </a-row>
        </a-form>
      </div>
    </div>
    <prompt-get-vouchers-modal ref="prompt" :user-id="userId" @func="loadData"></prompt-get-vouchers-modal>
    <certification-modal ref="certification" :code="voucherInfo.code" :message="message"></certification-modal>
  </div>


</template>

<script>
  import { httpAction, getActionUpdateKeyword } from '@/api/manage'
  import pick from 'lodash.pick'
  import { mapGetters } from 'vuex'
  import { isEnterprise } from '@/utils/role'
  import { judgeState } from '@/utils/util'
  import PromptGetVouchersModal from '../../components/card/PromptGetVouchersModal'
  import CertificationModal from '../../components/card/CertificationModal'
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import Vue from 'vue'

  export default {
    name: 'ServiceOrder',
    components: { CertificationModal, PromptGetVouchersModal },
    props: {
      currentStep: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        confirmLoading: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 2 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        },

        validatorRules: {
          applicant: {
            rules: [{ required: true, message: '请输入联系人!' }]
          },
          contactPhone: {
            rules: [
              {
                required: true,
                message: '请输入正确的联系电话!',
                pattern: /^1(3[0-9]|4[5,7]|5[0,1,2,3,4,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
              }
            ]
          }
        },
        message: '',

        item: {},
        selectValue: 0,

        agencyProduct: {},
        voucherInfo: {},
        enterpriseInfo: {},
        specificInfo: {},

        url: {
          orderUrl: '/zscq/portal/getServiceProductAllInfo',
          dictUrl: '/zscq/portal/getDictInfo',
          formUrl: '/serve/portalServeOrder/add'
        },
        transactionMode: {
          dictCode: 'transaction_mode',
          dictOptions: []
        },
        transactionModeValue: '1',
        spinning: false,
        isUseVoucher: false,

        form: this.$form.createForm(this),
        userId: '',
        model: {
          applicant: '',
          contactPhone: '',
          leaveMsg: ''
        },

        projectOptions: [],
        selectOptions: []
      }
    },
    created() {
      if (!judgeState()) {
        this.$router.push({ path: '/portal' })
      } else {
        this.loadData()
        this.initDictData(this.transactionMode)
      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      onChangeNum(value) {
        if (value > this.maxUseAmount) {
          this.selectValue = this.maxUseAmount
          this.$message.error('金额不能大于本次最多可抵用金额')
        }
      },
      companyApprove() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const path = '/person/partInfo'
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl)
      },
      judgeVoucher() {
        if (this.voucherInfo.code === 1) {
          // 进行企业主体信息认证
          this.message = '您还未完成企业主体信息认证,请先进行认证'
          this.$refs.certification.showModal()
        } else if (this.voucherInfo.code === 2) {
          // 进行小微企业认证
          this.message = '您还未完成小微企业认证,请先进行认证'
          this.$refs.certification.showModal()
        } else if (this.voucherInfo.code === 3) {
          // 领券
          this.$refs.prompt.getVouchers()
        }
      },
      changeBox() {
        this.isUseVoucher = !this.isUseVoucher
      },
      onChange() {

      },
      onChangeBtn() {
      },
      putOrder() {
        const that = this
        // 触发表单验证
        that.form.validateFields((err, values) => {
          if (!err) {
            that.model.orderType = '1'
            that.model.projectIds = that.selectOptions.join(',')
            that.model.voucherId = that.specificInfo.voucherId
            that.model.serveId = that.agencyProduct.id
            that.model.serverType = 'agency'
            that.model.transactionMode = that.transactionModeValue
            if (that.enterpriseInfo.pass) {
              that.model.enterpriseId = that.enterpriseInfo.orgId
            }
            that.model.orderStatus = '1'

            if (that.agencyProduct.transactionPrice === '0') {
              // 这是面议订单
              if (that.isUseVoucher) {
                // 有使用抵扣
                that.model.servePrice = -1
                that.model.deduct = -1
                that.model.payAmount = -1
              } else {
                that.model.servePrice = -1
                that.model.deduct = 0
                that.model.payAmount = -1
              }
            } else {
              if (that.isUseVoucher) {
                // 有使用抵扣
                that.model.servePrice = that.agencyProduct.money
                that.model.deduct = (that.selectValue === '' || that.selectValue === null) ? 0 : that.selectValue
                that.model.payAmount = that.agencyProduct.money - that.model.deduct
              } else {
                // 没有使用抵扣
                that.model.servePrice = that.agencyProduct.money
                that.model.deduct = 0
                that.model.payAmount = that.agencyProduct.money
              }
            }

            const httpurl = that.url.formUrl
            const method = 'post'
            const formData = Object.assign(that.model, values)

            that.$confirm({
              title: '确认提交订单',
              content: '确认申请该服务，并提交订单',
              onOk: function() {
                that.confirmLoading = true
                httpAction(httpurl, formData, method).then((res) => {
                  if (res.success) {
                    that.$router.push({
                      name: 'OrderCommitSuccess',
                      query: {
                        newMoney: that.newMoney,
                        deductionMoney: that.agencyProduct.voucher ? that.deductionMoney : '-1',
                        spendMoney: that.spendMoney,
                        isUseVoucher: that.isUseVoucher
                      }
                    })
                    that.$message.success(res.message)
                    that.$emit('ok')
                  } else {
                    that.$message.warning(res.message)
                  }
                }).finally(() => {
                  that.confirmLoading = false
                })
              }
            })
          }
        })
      },
      cancelOrder() {
        this.$router.go(-1)
      },
      initDictData(item) {
        // 根据字典Code, 初始化字典数组
        const param = { code: item.dictCode }
        getActionUpdateKeyword(this.url.dictUrl, param).then((res) => {
          if (res.success) {
            item.dictOptions = res.result
          }
        })
      },
      loadData() {
        const user = this.userInfo()
        this.userId = user.id
        this.model.contactPhone = user.phone
        this.model.applicant = user.realname
        const param = {
          orgId: this.$route.query.orgId,
          serviceProductId: this.$route.query.itemId,
          userId: this.userId
        }
        getActionUpdateKeyword(this.url.orderUrl, param).then((res) => {
          if (res.success) {
            this.enterpriseInfo = res.result.enterpriseInfo
            this.agencyProduct = res.result.agencyProduct
            this.voucherInfo = res.result.voucherInfo

            if (!isEnterprise()) {
              // 不是企业用户，不能用服务券
              this.agencyProduct.voucher = false
            }
            for (const a in this.agencyProduct.projectIds) {
              const project = {}
              project.value = this.agencyProduct.projectIds[a]
              project.label = this.agencyProduct.projectNames[a]
              this.projectOptions.push(project)
              this.selectOptions.push(this.agencyProduct.projectIds[a])
            }
            if (this.voucherInfo.code === 0) {
              // 如果可以使用券
              this.specificInfo = this.voucherInfo.result
            }
            const data = Object.keys(this.enterpriseInfo)
            if (data.length > 0) {
              this.enterpriseInfo.pass = true
            } else {
              this.enterpriseInfo.pass = false
            }
          } else {
            this.$message.error(res.message)
          }
        })
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'contactPhone', 'applicant'))
        })
      }
    },
    computed: {
      'newMoney': function() {
        if (this.agencyProduct.transactionPrice === '0') {
          return '面议'
        } else {
          return '￥' + this.agencyProduct.money
        }
      },
      'newMoneyYun': function() {
        if (this.agencyProduct.transactionPrice === '0') {
          return '面议'
        } else {
          return this.agencyProduct.money + '元'
        }
      },
      'deductionMoney': function() {
        if (this.agencyProduct.transactionPrice === '0' || !this.isUseVoucher) {
          return ''
        } else {
          const selectValue = (this.selectValue === '' || this.selectValue === null) ? 0 : this.selectValue
          return '-￥' + selectValue
        }
      },
      'spendMoney': function() {
        const productMoney = this.agencyProduct.money === null ? 0 : this.agencyProduct.money
        if (this.agencyProduct.transactionPrice === '0') {
          return '面议'
        } else if (!this.isUseVoucher) {
          return '￥' + productMoney
        } else {
          const selectValue = (this.selectValue === '' || this.selectValue === null) ? 0 : this.selectValue
          const spendMoney = productMoney - selectValue
          return '￥' + spendMoney
        }
      },
      'maxUseAmount': function() {
        if (this.agencyProduct.transactionPrice === '1') {
          const productMoney = this.agencyProduct.money === null ? 0 : this.agencyProduct.money
          const maxMoney = parseInt(productMoney * this.specificInfo.discount)
          const availableAmount = this.specificInfo.availableAmount === null ? 0 : this.specificInfo.availableAmount
          if (maxMoney > availableAmount) {
            this.selectValue = availableAmount
            return availableAmount
          } else {
            this.selectValue = maxMoney
            return maxMoney
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../components/main";

  #serviceOrder {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    overflow: hidden;
    font-size: 14px;
    .container-step, .container {
      margin-left: auto;
      margin-right: auto;
      background-color: #ffffff;
    }
    .container {
      width: 1170px;
    }
    .container-step {
      width: 1150px;
    }
    .current-container {
      padding-top: 2em;
      padding-bottom: 1em;
      margin-bottom: 20px;
      background-color: #ffffff;
    }
    /deep/ .ant-steps-item-process {
      .ant-steps-item-description, .ant-steps-item-icon {
        color: @main-color;
      }
      .ant-steps-item-icon {
        background-color: @main-color;
        border-color: @main-color;
      }
    }
    /deep/ .ant-steps-item-finish {
      .ant-steps-item-tail::after {
        background-color: @main-color;
      }
      .ant-steps-item-icon {
        border-color: @main-color;
        .ant-steps-icon {
          color: @main-color;
        }
      }
    }
    /deep/ .ant-checkbox-checked .ant-checkbox-inner {
      background-color: @main-color;
      border-color: @main-color;
    }

    /deep/ .ant-steps-item-custom {
      .ant-steps-item-icon {
        height: 32px;
      }
    }
    .is-use {
      border: 1px solid #de554c;
      span {
        color: #de554c;
      }
      /deep/ .ant-checkbox-inner {
        background-color: #ffffff;
        border-color: @main-color;
      }
      /deep/ .ant-checkbox-inner::after {
        border-color: @main-color;
      }
    }
    .radio-button {
      background-color: #f9f9f9;
      border-color: #e4e4e4;
      color: #999999;
    }
    .radio-button:hover {
      color: #666666;
    }
    .ant-radio-button-wrapper-checked {
      border-color: @main-color;
      color: @main-color;
    }
    .ant-radio-button-wrapper-checked:hover {
      color: @main-color;
    }

    .card-title {
      color: @main-color;
      margin-left: 12px;
      padding-top: 6px;
      font-size: 16px;
    }
    .card-body {
      margin: 10px 16px 10px 16px;
    }
    .tip {
      color: @main-color;
    }

    .card-title .ant-divider {
      background-color: @main-color;
      width: 2px;
    }

    .card-title .title {
      padding-top: 12px;
    }

    .money {
      color: #ff3300;
      font-weight: bold;
    }

    .b-primary {
      background-color: #ff3300;
      border-color: #ff3300;
      color: #ffffff;
      opacity: 1;
      width: 120px;
    }
    .b-primary:hover {
      opacity: 0.6;
    }

    .b-default {
      background-color: #999999;
      border-color: #999999;
      color: #ffffff;
      opacity: 1;
      width: 120px;
    }
    .b-default:hover {
      opacity: 0.6;
    }

    .my-u-p {
      p {
        margin-bottom: 10px;
      }
    }
    /deep/ .ant-steps-label-vertical .ant-steps-item-tail {
      margin-left: 65px;
      padding: 3.5px 24px;
    }

    /deep/ .ant-steps-label-vertical .ant-steps-item-icon {
      display: inline-block;
      margin-left: 50px;
    }

    /deep/ .ant-steps-label-vertical .ant-steps-item-content {
      display: block;
      width: 130px;
      margin-top: 8px;
      text-align: center;
    }

    /deep/ .ant-steps-item-description {
      width: 130px;
      margin-bottom: 20px;
    }
  }


</style>