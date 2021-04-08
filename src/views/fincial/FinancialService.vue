<template>
  <div id="financialService">
    <carousel-map :full-screen="true" :loading="adLoading" :advert-list="advertList"></carousel-map>
    <a-row class="container guide" v-if="messageData.applicationGuide">
      <h2 class="header-h">申报指南</h2>
      <a-card hoverable class="my-card">
        <div v-html="messageData.applicationGuide"></div>
      </a-card>

      <a-row type="flex" justify="center" class="btn-group">
        <a-col :span="6">
          <a-button type="danger" size="large" @click="applyBtn">立即申报</a-button>
        </a-col>
      </a-row>
    </a-row>
    <recommend-organization :data="financialData" :pagination="financialIpagination" :loading="financialLoading"
                            v-if="financialData.length > 0" class="my-card-group" title="金融项目">
      <template slot="card" slot-scope="item">
        <financial-card :item="item.data"></financial-card>
      </template>
    </recommend-organization>
    <policy-list :data="data" :loading="loading" :pagination="data.length > 0?ipagination:false"
                 :key-route="'FinancialService'" route-name="FinancialServiceArticleMessage"></policy-list>

  </div>

</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, judgeState } from '@/utils/util'
  import CarouselMap from '../../components/CarouselMap'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import FinancialCard from '../../components/card/FinancialCard'
  import PolicyList from '../../components/general/PolicyList'
  import bus from '@/assets/eventBus'
  import { isAgencyAndEnterprise } from '@/utils/role'

  export default {
    name: 'FinancialService',
    components: { PolicyList, FinancialCard, RecommendOrganization, CarouselMap },
    inject: ['headLogin'],
    data() {
      return {
        financialData: [],
        grid: { gutter: 16, xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3 },

        financialUrl: '/zscq/portal/financeProductList',
        financialFormParam: {},
        financialIpagination: {
          current: 1,
          pageSize: 16,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            console.info(page)
            this.handleTableChange(page)
          }
        },
        financialLoading: {
          spinning: false
        },

        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '3'
        },
        adLoading: false,
        advertList: [],

        url: '/zscq/portal/informationList',
        formParam: {
          informationType: '7'
        },
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleListTableChange(page)
          }
        },
        loading: {
          spinning: false
        },
        data: [],

        messageUrl: '/zscq/portal/guide/fundsGet',
        messageData: {}
      }
    },
    created() {
      this.getFinancialData(this.getParam(this.financialFormParam, this.financialIpagination))
      this.getAllAdverts()
      this.loadData(this.getListParam(this.formParam, this.ipagination))
      this.loadMessageData()
    },
    mounted() {
      bus.$off('loginOrLogoutEmit')
    },
    methods: {
      applyBtn() {
        if (judgeState()){
          if (!isAgencyAndEnterprise()) {
            this.$message.warning('您没有权限，暂时不能操作!')
            return
          }
          this.$router.push({ name: 'FinancialOnlineApplyAdd', query: { keyRoute: 'FinancialService' } })
        } else {
          // 没有登录，则先进行登录
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      getFinancialData(param) {
        if (!this.financialUrl) {
          this.$message.error('financialUrl属性!')
          return
        }
        this.financialLoading.spinning = true
        getActionUpdateKeyword(this.financialUrl, param).then((res) => {
          if (res.success) {
            this.financialIpagination.total = res.result.total
            this.financialData = res.result.records
            console.info(res)
          }
          this.financialLoading.spinning = false
        }).finally(() => {
          this.financialLoading.spinning = false
        })
      },
      handleTableChange(page) {
        this.financialIpagination.current = page
        this.getFinancialData(this.getParam(this.financialFormParam, this.financialIpagination))
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current - 1
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

      loadData(param) {
        if (!this.url) {
          this.$message.error('url有问题!')
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = res.result.records
          }
          this.loading.spinning = false
        }).finally(() => {
          this.loading.spinning = false
        })
      },
      getListParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      handleListTableChange(page, key) {
        this.ipagination.current = page
        this.loadData(this.getListParam(this.formParam, this.ipagination))
      },
      async loadMessageData() {
        const res = await getActionUpdateKeyword(this.messageUrl)
        if (res.success) {
          this.messageData = res.result
        } else {
          this.$message.error(res.message)
        }
        console.info(res)
        console.info('哇哈哈哈')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../components/main";

  #financialService {
    background-color: @main-bg-color;
    .main-css();
    .header-h {
      color: #666666;
      margin-top: 2em;
      font-weight: 700;
      font-style: normal;
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 20px;
    }
    .guide {
      .my-card {
        margin-bottom: 10px;
        padding-left: 5px;
        &:hover {
          border-left: 5px solid @main-color;
        }
        p {
          margin: 0;
        }
      }
      .btn-group {
        text-align: center;
        .ant-btn {
          width: 80%;
          margin: 10px 0 5px;
        }
      }
    }
    /deep/ .my-card-group {
      h2 {
        text-align: left;
      }
    }
  }
</style>