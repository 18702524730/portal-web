<template>
  <div id="financialPledgeFinancing">
    <carousel-map :full-screen="true" :loading="adLoading" :advert-list="advertList"></carousel-map>

    <div class="financing-dynamic">
      <div class="container">
        <a-row :gutter="39">
          <a-col :span="12">
            <tab-information-list :have-more="false" tab-name="融资动态" :data="pledgesData" :loading="pledgesLoading"
                                  :need-jump="false" class="dynamic" :animate="true">
              <template slot="listContent" slot-scope="item">
                <p class="financing-title-p">
                  <span style="color: #B4B4B4;padding-right: 5px">•</span>
                  {{item.data.enterpriseNameC}}
                </p>
                <!--<p class="financing-type-p">{{item.data.projectName | filterData}}</p>-->
                <p class="financing-money-p">{{item.data.actualLoan | numChange}}</p>
                <p class="financing-time-p">{{item.data.issueDate | changeDate}}</p>
              </template>
            </tab-information-list>
          </a-col>
          <a-col :span="12">
            <tab-information-list :data="infoData" :loading="infoLoading">
              <template slot="listContent" slot-scope="item">
                <p class="title-p">
                  <a-tooltip placement="right" :title="item.data.title" style="-webkit-box-orient: vertical;"
                             class="span-data"><span style="color: #B4B4B4;padding-right: 5px">•</span>
                    {{item.data.title}}
                  </a-tooltip>
                </p>
                <p class="time-p">{{item.data.releaseDate | changeDate}}</p>
              </template>
            </tab-information-list>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="platform-achievements">
      <div class="platform-achievements-inner">
        <h2 class="my-center-header-h container">厦门市知识产权质押融资成果</h2>
        <platform-achievements></platform-achievements>
      </div>
    </div>

    <div class="financing-project">
      <div class="container">
        <div>
          <h2 class="my-center-header-h">融资产品</h2>
        </div>
        <div>
          <a-row :gutter="19">
            <a-col :span="8" v-for="(item,index) in productData" :key="item.id">
              <financing-project-new-card :item="item" @func="clickCard"></financing-project-new-card>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>

    <div class="bank-card">
      <div class="container">
        <a-row>
          <a-col :span="12"><h2 class="template-h">合作机构</h2></a-col>
          <a-col :span="12" class="template-img">
            <router-link :to="{name:'FinancialOrgShow', query: { keyRoute: 'FinancialPledgeFinancing' }}">
              <img src="@assets/images/navigation/more.png" alt="查看更多">
            </router-link>
          </a-col>
        </a-row>
        <a-row class="my-btn-group">
          <div>
            <a-button :type="`${value === '1'?'primary':''}`" @click="btnClick('1')"
                      size="large">
              合作银行
            </a-button>
            <a-button :type="`${value === '2'?'primary':''}`" @click="btnClick('2')"
                      size="large">
              担保机构
            </a-button>
            <a-button :type="`${value === '3'?'primary':''}`" @click="btnClick('3')"
                      size="large">
              保险机构
            </a-button>
            <a-button :type="`${value === '4'?'primary':''}`" @click="btnClick('4')"
                      size="large">
              评估机构
            </a-button>
          </div>
        </a-row>
        <div class="my-bank-list">
          <a-spin :spinning="orgLoading">
            <a-row v-for="(outItem,outIndex) in bankList" :key="outIndex" type="flex" :gutter="14" class="my-row">
              <a-col class="my-col" v-for="(item,index) in outItem" :key="index">
                <bank-card :item="item"></bank-card>
              </a-col>
            </a-row>
          </a-spin>
        </div>
      </div>
    </div>

    <pledge-financing-modal ref="financingModal"></pledge-financing-modal>

  </div>
</template>

<script>

  import { getActionUpdateKeyword } from '@/api/manage'
  import { changeArr, filterObj } from '@/utils/util'
  import CarouselMap from '../../components/CarouselMap'
  import PlatformAchievements from '../../components/new/card/PlatformAchievements'
  import BankCard from '../../components/new/card/BankCard'
  import TabInformationList from '../../components/new/list/TabInformationList'
  import FinancingProjectNewCard from '../../components/new/card/FinancingProjectNewCard'
  import { getImgNewView } from '@/utils/role'
  import PledgeFinancingModal from '../../components/new/modal/PledgeFinancingModal'

  function myIsNaN(value) {
    return typeof value === 'number' && !isNaN(value)
  }

  export default {
    name: 'FinancialPledgeFinancing',
    components: {
      PledgeFinancingModal,
      FinancingProjectNewCard,
      TabInformationList,
      BankCard,
      PlatformAchievements,
      CarouselMap
    },
    data() {
      return {
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '8'
        },
        adLoading: false,
        advertList: [],


        pledgesUrl: '/zscq/portal/lastestPortalPledges',
        formParam: {
          num: 30
        },
        pledgesData: [],
        pledgesLoading: false,

        infoUrl: '/zscq/portal/informationRecommendList',
        infoFormParam: {
          num: 7,
          informationType: '8'
        },
        infoData: [],
        infoLoading: false,

        productUrl: '/zscq/portal/pledgeFinancingProducts',
        productData: [],

        value: '1',
        orgUrl: '/zscq/portal/getPledgeFinancingProductOrgByType',
        bankList: [],
        orgLoading: false,
        orgParam: {
          type: '1'
        }
      }
    },
    created() {
      this.getAllAdverts()
      this.loadPortalPledgesData()
      this.loadInfoData()
      this.loadProductData()
      this.loadOrgData()
    },
    methods: {
      clickCard(item) {
        this.$refs.financingModal.showModal(item)
      },
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      async loadPortalPledgesData() {
        if (!this.pledgesUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.pledgesLoading = true
        const res = await getActionUpdateKeyword(this.pledgesUrl, this.formParam)
        if (res.success) {
          this.pledgesData = res.result
          for (const a of this.pledgesData) {
            let startName = ''
            let endName = ''
            if (a.enterpriseName) {
              if (a.enterpriseName.startsWith("厦门") || a.enterpriseName.startsWith("福建")){
                startName = a.enterpriseName.slice(0, 3)
                endName = a.enterpriseName.slice(-2)
              } else {
                if (a.enterpriseName.length >= 6) {
                  startName = a.enterpriseName.slice(0, 1)
                  endName = a.enterpriseName.slice(-2)
                } else if (a.enterpriseName.length >= 4) {
                  startName = a.enterpriseName.slice(0, 1)
                  endName = a.enterpriseName.slice(-2)
                } else if (a.enterpriseName.length >= 2) {
                  startName = a.enterpriseName.slice(0, 1)
                  endName = a.enterpriseName.slice(-1)
                } else {
                  startName = '**'
                  endName = '**'
                }
              }
            }
            a.enterpriseNameC = startName + '****' + endName
          }
        } else {
          this.$message.error(res.message)
        }
        this.pledgesLoading = false
      },
      async loadInfoData() {
        if (!this.infoUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.infoLoading = true
        const res = await getActionUpdateKeyword(this.infoUrl, this.infoFormParam)
        if (res.success) {
          this.infoData = res.result
          console.info(res)
        } else {
          this.$message.error(res.message)
        }
        this.infoLoading = false
      },
      async loadProductData() {
        const res = await getActionUpdateKeyword(this.productUrl)
        if (res.success) {
          const productData = res.result
          this.productData.push(productData.filter(item => item.productType === '2')[0])
          this.productData.push(productData.filter(item => item.productType === '1')[0])
          this.productData.push(productData.filter(item => item.productType === '3')[0])
        } else {
          this.$message.error(res.message)
        }
      },
      async loadOrgData(type = '1') {
        this.orgParam.type = type
        this.orgLoading = true
        const res = await getActionUpdateKeyword(this.orgUrl, this.orgParam)
        if (res.success) {
          this.bankList = changeArr(res.result.slice(0, 20), 5)
        }
        this.orgLoading = false
        console.info(res)
        console.info('哈哈哈哈')
      },
      handleTableChange(page, key) {
        this.ipagination.current = page
        this.loadData(this.getParam(this.formParam, this.ipagination))
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      getAllAdverts() {
        if (!this.adUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.adLoading = true
        getActionUpdateKeyword(this.adUrl, this.adParam).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
          this.adLoading = false
        }).finally(() => {
          this.adLoading = false
        })
      },
      getBankList() {
        this.bankList = changeArr(this.bankList, 5)
      },
      btnClick(a) {
        this.value = a
        this.loadOrgData(a)
      }
    },
    filters: {
      filterData(data) {
        if (data === undefined || data === null) {
          return '无'
        }
        return data
      },
      numChange(data) {
        if (myIsNaN(data)) {
          return data.toFixed(2) + '万元'
        } else {
          return 0
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #financialPledgeFinancing {
    overflow: hidden;
    .main-css();
    background-color: @main-bg-color;
    .my-bank-list {
      background-color: #ffffff;
      .my-col {
        width: 20%;
      }
      .my-row:not(:last-child) {
        margin-bottom: 12px;
      }
      padding-bottom: 50px;
    }

    .financing-dynamic {
      overflow: hidden;
      padding-bottom: 50px;
      padding-top: 40px;
    }
    .platform-achievements {
      background: url("../../assets/images/financial/bj.png") no-repeat;
      background-size: 100% 100%;

      h2 {
        color: #ffffff;

      }
      overflow: hidden;
      height: 430px;
    }
    .financing-project {
      padding-bottom: 30px;
    }
    .my-card {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .my-last-card {
      padding-top: 20px;
      padding-bottom: 30px;
    }

    .span-data {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      /* autoprefixer: off*/
      -webkit-box-orient: vertical;
      /* autoprefixer: on*/
      -webkit-line-clamp: 1;
      color: @main-font-color;
    }

    .title-p {
      font-size: 14px;
      line-height: 14px;
      width: 85%;
      word-wrap: break-word;
      word-break: break-all;
      padding-right: 10px;
    }
    .time-p {
      font-size: 12px;
      line-height: 12px;
      color: #A2A2A2;
      padding-top: 2px;
      width: 15%;
    }
    .financing-title-p {
      font-size: 14px;
      line-height: 14px;
      width: 45%;
      word-wrap: break-word;
      word-break: break-all;
      padding-right: 10px;
      color: @main-font-color;
    }
    .financing-type-p {
      font-size: 14px;
      line-height: 14px;
      width: 30%;
      padding-right: 10px;
      color: @main-color;
    }
    .financing-money-p {
      font-size: 14px;
      line-height: 14px;
      width: 25%;
      padding-right: 10px;
      color: #FF3300;
    }
    .financing-time-p {
      font-size: 12px;
      line-height: 12px;
      color: #A2A2A2;
      padding-top: 2px;
      width: 25%;
    }

    .bank-card {
      background-color: #FFFFFF;
      overflow: hidden;
    }
    .template-h {
      .main-css();
      margin-top: 2em;
      margin-bottom: 1em;
      color: #001833;
    }

    .template-img {
      margin-top: 3em;
      text-align: end;
    }

    .my-btn-group {
      height: 50px;
      margin-bottom: 20px;
      /deep/ .ant-radio-button-wrapper {
      }
      .ant-radio-button-wrapper:not(:first-child)::before {
      }
      .ant-btn {
        margin-right: 20px;
        border-radius: 30px;
        padding: 0 30px;
        background-color: #f2f2f2;
        border: none;
        color: #555555;
        font-size: 16px;
      }
      .ant-btn-primary {
        background-color: @main-color;
        color: #ffffff;
      }
    }
  }
</style>