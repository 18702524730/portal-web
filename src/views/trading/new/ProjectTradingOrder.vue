<template>
  <div id="projectTradingOrder">
    <div class="current-container">
      <a-row>
        <a-steps :current="0" labelPlacement="vertical" class="container-step">
          <a-step description="提交订单"/>
          <a-step title="" description="供应方处理订单"/>
          <a-step title="" description="线下交易"/>
          <a-step title="" description="交易完成"/>
          <a-step description="交易评价">
          </a-step>
        </a-steps>
      </a-row>
    </div>
    <div class="container">
      <div class="current-container">
        <a-spin :spinning="spinning">
          <a-row>
            <div class="card-title">
              <a-divider type="vertical"/>
              <span class="title">采购订单信息</span>
            </div>
            <a-card :bordered="true" class="card-body">
              <a-row :gutter="24">
                <a-col :span="3">
                  <div class="my-img">
                    <img :src="getImgNewView(orderInfo[`${imgName}`])" alt="IP交易图片">
                  </div>
                </a-col>
                <a-col :span="21">
                  <p class="my-span-title"><span><span>{{projectTypeName}}</span>{{ orderInfo[`${titleName}`] }}</span>
                  </p>
                  <p class="my-span-content">
                    <span>{{ keyName }}<span>{{ tradingWay }}</span></span></p>
                  <p class="my-span-content"><span>交易价格：<span class="money">{{ newMoney }}</span></span></p>
                </a-col>
              </a-row>
              <p class="tip">提示：交易价格为参考价格，并非最终付款金额，实际价格将由供应方与您联系后确定！</p>
            </a-card>
          </a-row>

          <a-row>
            <div class="card-title">
              <a-divider type="vertical"/>
              <span class="title">供应方信息</span>
            </div>
            <a-card :bordered="true" class="card-body">
              <p><span>公司名称：<span>{{supplyInfo.orgName | filterData}}</span></span></p>
              <p>
                <span class="contact-span">联系人：<span>{{supplyInfo.realName | filterData}}</span></span>
                <span>电话：<span>{{supplyInfo.contactPhone | filterData}}</span></span></p>
            </a-card>
          </a-row>

          <a-form-model :labelCol="labelCol" :wrapperCol="wrapperCol" ref="ruleForm" :model="form" :rules="rules">
            <a-row>
              <div class="card-title">
                <a-divider type="vertical"/>
                <span class="title">交易方式</span>
              </div>
              <a-card :bordered="true" class="card-body">
                <p>
                  <a-form-model-item has-feedback prop="transactionModeValue">
                    <a-radio-group @change="onChange" v-model="form.transactionModeValue">
                      <template v-for="(item,index) in transactionMode.dictOptions">
                        <a-radio-button :value="item.value" :key="index" class="radio-button">{{item.text}}
                        </a-radio-button>
                      </template>
                    </a-radio-group>
                  </a-form-model-item>
                </p>
              </a-card>
            </a-row>

            <a-row>
              <div class="card-title">
                <a-divider type="vertical"/>
                <span class="title">申请人信息</span>
              </div>
              <a-card :bordered="true" class="card-body">
                <div v-if="enterpriseInfo.pass">
                  <a-form-model-item label="企业名称" has-feedback>
                    <span>{{enterpriseInfo.orgName}}</span>
                  </a-form-model-item>
                </div>
                <div v-else>
                  <p>
                    <span style="margin-right: 10px;">企业名称</span>
                    <span>您还没有绑定企业信息</span>
                    <a-button type="link" @click="companyApprove">立即认证</a-button>
                  </p>
                </div>
                <a-form-model-item label="申请人" has-feedback prop="applicant">
                  <a-input v-model="form.applicant" placeholder="请输入申请人姓名"></a-input>
                </a-form-model-item>
                <a-form-model-item label="联系电话" has-feedback prop="contactPhone">
                  <a-input v-model="form.contactPhone" placeholder="请输入联系电话"></a-input>
                </a-form-model-item>
              </a-card>
            </a-row>

            <a-row>
              <div class="card-title">
                <a-divider type="vertical"/>
                <span class="title">留言</span>
              </div>
              <a-card :bordered="true" class="card-body">
                <a-form-model-item>
                  <a-textarea :rows="5" v-model="form.leaveMsg"></a-textarea>
                </a-form-model-item>
              </a-card>
            </a-row>
          </a-form-model>

          <a-row>
            <a-card :bordered="false" class="card-body">
              <p><span>应付总额：</span> <span class="money">{{newMoney}}</span></p>
              <a-row>
                <a-col :span="4">
                  <a-button class="b-primary" @click="putOrder" :disabled="confirmLoading">提交订单</a-button>
                </a-col>
                <a-col :span="4">
                  <a-button class="b-default" @click="cancelOrder">取消订单</a-button>
                </a-col>
              </a-row>
            </a-card>
          </a-row>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword, postAction } from '@/api/manage'
  import { judgeState } from '@/utils/util'
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import { getImgNewView } from '@/utils/role'
  import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

  export default {
    name: 'ProjectTradingOrder',
    data() {
      return {
        confirmLoading: false,
        url: {
          dictUrl: '/zscq/portal/getDictInfo',
          formUrl: '/serve/portalServeOrder/add',
          projectUrl: '/zscq/portal/getIpServiceProductAllInfo'
        },
        transactionMode: {
          dictCode: 'intended_operation_mode',
          dictOptions: [
            { value: '1', text: '提交意向：提交意向申请，供应方通过线下与您对接' }
          ]
        },

        enterpriseInfo: {},
        supplyInfo: {},
        orderInfo: {},

        labelCol: {
          span: 2
        },
        wrapperCol: {
          span: 12
        },

        form: {
          orderType: this.$route.query.orderType,
          enterpriseId: '',
          orderStatus: '1',
          serveId: this.$route.query.projectId,
          payAmount: -1,
          deduct: -1,
          transactionModeValue: '1',

          serverType: '',
          servePrice: null,

          applicant: '',
          contactPhone: '',
          leaveMsg: ''
        },
        rules: {
          applicant: [
            { required: true, max: 30, message: '请输入申请人姓名' }
          ],
          contactPhone: [
            {
              required: true,
              message: '请输入正确的联系电话!',
              pattern: /^1(3[0-9]|4[5,7]|5[0,1,2,3,4,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
            }
          ]
        },
        dictOptions: [],
        spinning: false
      }
    },
    created() {
      if (!judgeState()) {
        this.$router.push({ path: '/portal' })
      } else {
        if (this.form.orderType === '2') {
          // 这是项目
          this.initDict('intended_operation_mode')
        } else if (this.form.orderType === '3') {
          // 这是专利
          this.initDict('patent_transaction_type')
        } else if (this.form.orderType === '4') {
          // 这是商标
          this.initDict('trademark_type')
        }
        this.loadData()
      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      putOrder() {
        console.info(this.form)
        console.info('提交吧')
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            const that = this
            that.$confirm({
              title: '确认提交订单',
              content: '确认申请该项目，并提交订单',
              onOk: function() {
                that.confirmLoading = true
                that.spinning = true
                postAction(that.url.formUrl, that.form).then((res) => {
                  if (res.success) {
                    that.$router.push({
                      name: 'ProjectOrderCommitSuccess',
                      query: {
                        newMoney: that.newMoney
                      }
                    })
                    that.$message.success(res.message)
                  } else {
                    that.$message.warning(res.message)
                  }
                }).finally(() => {
                  that.confirmLoading = false
                  that.spinning = false
                })
              }
            })
          } else {
            return false
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
      initDict(param) {
        initDictOptions(param).then((res) => {
          if (res.success) {
            this.dictOptions = res.result
          }
        })
      },
      loadData() {
        const user = this.userInfo()
        this.userId = user.id
        this.form.contactPhone = user.phone
        this.form.applicant = user.realname
        const param = {
          orderType: this.form.orderType,
          ipProductId: this.form.serveId,
          userId: this.userId
        }
        getActionUpdateKeyword(this.url.projectUrl, param).then((res) => {
          if (res.success) {
            console.info('我来了，真的来了')
            console.info(res)
            this.enterpriseInfo = res.result.enterpriseInfo
            this.supplyInfo = res.result.supplyInfo
            if (this.form.orderType === '2') {
              this.orderInfo = res.result.orderInfo.portalProject
            } else {
              this.orderInfo = res.result.orderInfo
            }


            const data = Object.keys(this.enterpriseInfo)
            if (data.length > 0) {
              this.enterpriseInfo.pass = true
              this.form.enterpriseId = this.enterpriseInfo.orgId
            } else {
              this.enterpriseInfo.pass = false
            }
            // if (this.form.orderType === '2') {
            //   // 这是项目的交易订单
            //   this.form.serverType = this.$route.query.type
            //   this.getServerMoney()
            // } else {
            //   // 这是其他类型的订单
            //   if (this.form.orderType === '3') {
            //     this.form.serverType = this.orderInfo.intendedOperationMode
            //   } else {
            //     this.form.serverType = this.orderInfo.trademarkType
            //   }
            //
            //   if (this.orderInfo.transactionPrice === '0') {
            //     // 这是面议订单
            //     this.form.servePrice = -1
            //   } else {
            //     this.form.servePrice = this.orderInfo.money
            //     this.form.payAmount = this.orderInfo.money
            //   }
            //
            // }

            if (this.form.orderType === '3' || this.form.orderType === '2') {
              this.form.serverType = this.orderInfo.intendedOperationMode
            } else {
              this.form.serverType = this.orderInfo.trademarkType
            }

            if (this.orderInfo.transactionPrice === '0') {
              // 这是面议订单
              this.form.servePrice = -1
            } else {
              this.form.servePrice = this.orderInfo.money
              this.form.payAmount = this.orderInfo.money
            }

          } else {
            this.$message.error(res.message)
          }
        })
      },
      getServerMoney() {
        const portalProject = this.orderInfo.portalProject
        switch (this.form.serverType) {
          case '1':
            if (portalProject.zrTransactionPrice === '0') {
              // 这是面议订单
              this.form.servePrice = -1
            } else {
              this.form.servePrice = portalProject.zrMoney
              this.form.payAmount = portalProject.zrMoney
            }
            break
          case '3':
            if (portalProject.gqrzTransactionPrice === '0') {
              // 这是面议订单
              this.form.servePrice = -1
            } else {
              this.form.servePrice = portalProject.gqrzMoney
              this.form.payAmount = portalProject.gqrzMoney
            }
            break
          case '4':
            if (portalProject.zyrzTransactionPrice === '0') {
              // 这是面议订单
              this.form.servePrice = -1
            } else {
              this.form.servePrice = portalProject.zyrzMoney
              this.form.payAmount = portalProject.zyrzMoney
            }
            break
          case '5':
            if (portalProject.dzxkTransactionPrice === '0') {
              // 这是面议订单
              this.form.servePrice = -1
            } else {
              this.form.servePrice = portalProject.dzxkMoney
              this.form.payAmount = portalProject.dzxkMoney
            }
            break
          case '6':
            if (portalProject.ptxkTransactionPrice === '0') {
              // 这是面议订单
              this.form.servePrice = -1
            } else {
              this.form.servePrice = portalProject.ptxkMoney
              this.form.payAmount = portalProject.ptxkMoney
            }
            break
          case '7':
            if (portalProject.putxkTransactionPrice === '0') {
              // 这是面议订单
              this.form.servePrice = -1
            } else {
              this.form.servePrice = portalProject.putxkMoney
              this.form.payAmount = portalProject.putxkMoney
            }
            break
          default:
            this.form.servePrice = -1
            this.form.payAmount = -1
        }
      },
      onChange() {

      },
      companyApprove() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const path = '/person/partInfo'
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl)
      },
      getImgView(text) {
        if (text === null || text === undefined) {
          text = this.defaultIcon
          return text
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      getImgNewView(text) {
        return getImgNewView(text)
      }

    },
    filters: {
      filterData(value) {
        if (!value) {
          return '无'
        }
        return value
      }
    },
    computed: {
      newMoney() {
        if (this.form.servePrice === -1) {
          return '面议'
        } else {
          return '￥' + this.form.servePrice + '元'
        }
      },
      tradingWay() {
        return filterDictText(this.dictOptions, this.form.serverType)
      },
      imgName() {
        let name = ''
        switch (this.form.orderType) {
          case '2':
            name = 'projectImgUrl'
            break
          case '3':
            name = 'patentImgUrl'
            break
          case '4':
            name = 'trademarkImgUrl'
            break
        }
        return name
      },
      titleName() {
        let name = ''
        switch (this.form.orderType) {
          case '2':
            name = 'projectName'
            break
          case '3':
            name = 'patentName'
            break
          case '4':
            name = 'trademarkName'
            break
        }
        return name
      },
      projectTypeName() {
        let name = ''
        switch (this.form.orderType) {
          case '2':
            name = '【项目】'
            break
          case '3':
            name = '【专利】'
            break
          case '4':
            name = '【商标】'
            break
        }
        return name
      },
      keyName() {
        if (this.form.orderType === '2') {
          return '意向运营方式：'
        } else if (this.form.orderType === '3') {
          return '意向运营方式：'
        } else {
          return '商标类别：'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #projectTradingOrder {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    overflow: hidden;
    font-size: 14px;

    /deep/ .ant-steps-item-description {
      width: 130px;
      margin-bottom: 20px;
    }
    .container-step, .container {
      margin-left: auto;
      margin-right: auto;
      background-color: #ffffff;
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
    .card-body {
      margin: 10px 16px 10px 16px;
    }
    .tip {
      color: @main-color;
    }
    .card-title {
      color: @main-color;
      margin-left: 12px;
      padding-top: 6px;
      font-size: 16px;
      .title {
        padding-top: 12px;
      }
      .ant-divider {
        background-color: @main-color;
        width: 2px;
      }
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

    .my-img {
      height: 85px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .contact-span {
      padding-right: 30px;
    }
  }
</style>