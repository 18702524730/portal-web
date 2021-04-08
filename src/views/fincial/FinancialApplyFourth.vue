<template>
  <div id="financialApplyFourth">
    <a-spin size="large" :spinning="spinning">
      <a-row>
        <a-form-model :model="portalPledgeOrder" :label-col="labelCol" :wrapper-col="wrapperCol" class="my-model"
                      ref="ruleForm" :rules="rules">
          <a-form-model-item label="贷款银行" prop="orgId">
            <span v-if="portalPledgeOrder.orgId !== ''">{{portalPledgeOrder.orgName}}</span>
            <span v-else>待系统匹配</span>
          </a-form-model-item>
          <a-form-model-item label="申请额度" prop="quota">
            <a-row>
              <a-col :span="20">
                <a-input-number v-model="portalPledgeOrder.quota" :min="0" :max="1000" class="my-number"
                                @change="changeInput"></a-input-number>
              </a-col>
              <a-col :span="4">万元</a-col>
            </a-row>
            <a-row>
              <a-checkbox @change="onChange" :checked="checkBtn">
                接受质押给第三方担保机构或者保险机构
              </a-checkbox>
            </a-row>
            <!--<a-row class="my-hint">-->
            <!--<a-card class="my-card" :bordered="false">-->
            <!--<a-row class="card-title">-->
            <!--<a-icon type="exclamation-circle" theme="twoTone" two-tone-color="#2f72d1"/>-->
            <!--提示：各质押融资产品最高贷款额度为：-->
            <!--</a-row>-->
            <!--<a-row class="card-eg" v-for="(item,index) in productData" :key="item.id">-->
            <!--<a-col :span="10">{{item.productTypeName}}：{{item.maxQuota}}万</a-col>-->
            <!--<a @click="viewDetails(item)">了解更多-->
            <!--<a-icon theme="twoTone" type="right-circle"/>-->
            <!--</a></a-row>-->
            <!--</a-card>-->

            <!--</a-row>-->
          </a-form-model-item>
          <a-form-model-item label="留言" prop="leaveMsg">
            <a-textarea v-model="portalPledgeOrder.leaveMsg" :rows="5"></a-textarea>
          </a-form-model-item>
          <a-form-model-item label="联系人姓名" prop="applicant">
            <a-input v-model="portalPledgeOrder.applicant"></a-input>
          </a-form-model-item>
          <a-form-model-item label="联系电话" prop="contactPhone">
            <a-input v-model="portalPledgeOrder.contactPhone"></a-input>
          </a-form-model-item>
        </a-form-model>
      </a-row>
      <a-row class="my-bottom-btn">
        <a-button @click="backPage">上一步</a-button>
        <a-button type="primary" @click="subPage">提交</a-button>
      </a-row>


      <pledge-financing-modal ref="financingModal"></pledge-financing-modal>
    </a-spin>

  </div>
</template>

<script>
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import { getActionUpdateKeyword } from '@/api/manage'
  import PledgeFinancingModal from '../../components/new/modal/PledgeFinancingModal'

  export default {
    name: 'FinancialApplyFourth',
    components: { PledgeFinancingModal, ATextarea },
    props: {
      portalPledgeOrder: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        labelCol: { span: 4, offset: 4 },
        wrapperCol: { span: 7, offset: 1 },
        form: {},
        rules: {
          quota: [
            { required: true, message: '请输入申请额度' }
          ],
          applicant: [
            { required: true, max: 30, message: '请输入联系人姓名' }
          ],
          leaveMsg: [
            { required: false, max: 500, message: '留言最多500个字' }
          ],
          contactPhone: [
            {
              required: true,
              message: '请输入正确的联系电话!',
              pattern: /^1(3[0-9]|4[5,7]|5[0,1,2,3,4,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
            }
          ]
        },

        productUrl: '/zscq/portal/pledgeFinancingProducts',
        productData: [],
        spinning: false,
        checkBtn: false
      }
    },
    created() {
      this.loadProductData()
    },
    methods: {
      viewDetails(item) {
        this.$refs.financingModal.showModal(item)
      },
      changeInput() {
        console.info('123123')
      },
      subPage() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$emit('subPage')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      backPage() {
        this.$emit('backPage')
      },
      async loadProductData() {
        this.spinning = true
        console.info(this.productUrl)
        const res = await getActionUpdateKeyword(this.productUrl)
        console.info('hahahaha')
        console.info(res)
        if (res.success) {
          const productData = res.result
          this.productData.push(productData.filter(item => item.productType === '2')[0])
          this.productData.push(productData.filter(item => item.productType === '1')[0])
          this.productData.push(productData.filter(item => item.productType === '3')[0])
          console.info(this.productData)
        } else {
          this.$message.error(res.message)
        }
        this.spinning = false
      },
      onChange() {
        if (this.checkBtn) {
          this.portalPledgeOrder.receivePledge = '0'
        } else {
          this.portalPledgeOrder.receivePledge = '1'
        }
        this.checkBtn = !this.checkBtn
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #financialApplyFourth {
    .my-bottom-btn {
      text-align: center;
      .ant-btn {
        width: 150px;
        margin: 10px;
      }
    }
    .my-number {
      width: 100%;
    }
    .my-hint {
      line-height: 20px;
      margin-top: 24px;
      font-size: 14px;
      color: #f59a23;
      font-weight: 400;
    }

    .my-card {
      background-color: @main-bg-color;
      box-shadow: -5px 5px 5px #aaaaaa;
      /deep/ .ant-card-body {
        padding: 12px 5px 12px 12px;
      }
      .card-title {
        font-size: 16px;
        color: @main-font-color;
        padding-bottom: 10px;
      }
      .card-eg {
        line-height: 25px;
      }
    }
  }
</style>