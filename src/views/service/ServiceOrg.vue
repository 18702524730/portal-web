<template>
  <div id="ServiceOrg">
    <div style="width:100%;background-color: #F5F5F5;">
      <div style="width: 1170px;margin: 0 auto;">
        <div style="background-color: #ffffff;height: 3rem;">
          <a-input-search placeholder="输入关键字搜索..." style="width: 300px;margin-top: 0.5rem;margin-left: 1.5rem;"
                          v-model="name" @search="handleSearch"/>
        </div>
        <a-row style="background-color: #F5F5F5;">
          <div style="padding: 0 20px;">
            <a-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" style="margin-top: 0.8rem;">
              <order-button title="销量排序" myWidth="120px;" @changeSort="changeSalesSort($event)"></order-button>
            </a-col>
          </div>
        </a-row>
      </div>
    </div>
    <recommend-organization :data="financialData" :pagination="financialIpagination" :loading="financialLoading"
                            v-if="financialData.length > 0">
      <template slot="card" slot-scope="item">
        <agency-card :item="item.data"></agency-card>
      </template>
    </recommend-organization>
  </div>

</template>

<script>

  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import _ from 'lodash'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import AgencyCard from '../../components/card/AgencyCard'
  import OrderButton from '../../components/general/OrderButton'

  export default {
    name: 'ServiceOrg',
    components: { OrderButton, AgencyCard, RecommendOrganization },
    data() {
      return {
        name: '',
        oldData: true,
        financialData: [],
        grid: { gutter: 16, xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3 },

        financialUrl: '/zscq/portal/getAgencyPageByName',
        financialFormParam: {},
        financialIpagination: {
          current: 1,
          pageSize: 52,
          showQuickJumper: true,
          hideOnSinglePage: true,
          total: 0,
          onChange: page => {
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

        url: '/zscq/portal/getAgencyPageByName',
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
        data: []
      }
    },
    created() {
      this.getFinancialData(this.getParam(this.financialFormParam, this.financialIpagination))
    },
    methods: {
      changeSalesSort(item) {
        this.financialFormParam.serviceOrderNumSort = item
        this.getFinancialData(this.getParam(this.financialFormParam, this.financialIpagination))
      },
      handleSearch() {
        this.financialFormParam.name = this.name
        this.financialIpagination.current = 1
        this.getFinancialData(this.getParam(this.financialFormParam, this.financialIpagination))
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
            if (!this.financialFormParam.serviceOrderNumSort) {
              this.financialData = _.shuffle(res.result.records)
            } else {
              this.financialData = res.result.records
            }
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
      }
    }
  }
</script>
<style scoped lang="less">
  #ServiceOrg {
    .ant-input-search {
      margin-left: 30px;
      /deep/ .ant-input {
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
      }
    }
  }
</style>