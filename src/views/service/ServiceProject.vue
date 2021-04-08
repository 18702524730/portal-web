<template>
  <div id="serviceProject">
    <div class="container">
      <service-project-from @func="refreshNewPage"></service-project-from>
      <a-row>
        <div class="innerDiv" style="padding: 0 20px;">
          <a-col :xs="8" :sm="6" :md="6" :lg="4" :xl="3">
            <order-button title="销量排序" myWidth="120px;" @changeSort="changeSalesSort($event)"></order-button>
          </a-col>
          <a-col :xs="8" :sm="6" :md="6" :lg="4" :xl="3">
            <order-button title="价格排序" myWidth="120px;" @changeSort="changeMoneySort($event)"></order-button>
          </a-col>
          <a-col :xs="8" :sm="6" :md="6" :lg="4" :xl="3">
            <order-button title="评分排序" myWidth="120px;" @changeSort="changeAvgScoreSort($event)"></order-button>
          </a-col>
          <a-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" style="margin-top: 0.4rem;">
            <a-checkbox @change="changeBox" :checked="isUseVoucher"/>
            <span>可用小微企业服务券</span>
          </a-col>
        </div>
      </a-row>

      <recommend-organization :data="data" :pagination="data.length > 0 ?ipagination:false" :loading="loading">
        <template slot="card" slot-scope="item">
          <service-project-card :item="item.data" :haveFoot="true" @func="refresh"></service-project-card>
        </template>
      </recommend-organization>
    </div>
  </div>

</template>

<script>


  import { filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import ServiceProjectFrom from '../../components/table/ServiceProjectFrom'
  import OrderButton from '../../components/general/OrderButton'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import ServiceProjectCard from '../../components/card/ServiceProjectCard'

  export default {
    name: 'ServiceProject',
    components: { ServiceProjectCard, RecommendOrganization, OrderButton, ServiceProjectFrom },
    data() {
      return {
        data: [],
        getDataUrl: '/zscq/portal/agencyProductRecommendList',
        formParam: {},
        ipagination: {
          current: 1,
          pageSize: 16,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        isUseVoucher: false,
        loading: {
          spinning: false
        },
        allParam: {
          orderParam: {
            avgScoreSort: '',
            moneySort: '',
            serviceOrderNumSort: ''
          }
        }
      }
    },
    created() {
      if (this.$route.query.keyId !== undefined) {
        this.formParam.serviceTypeIds = this.$route.query.keyId
      }
      const param = this.handleParam(this.formParam)
      this.loadData(param)
    },
    methods: {
      refresh(param) {
        if (param === undefined) {
          param = this.formParam
        }
        const newParam = this.handleParam(param)
        this.loadData(newParam)
      },
      refreshNewPage(param) {
        if (param === undefined) {
          param = this.formParam
        }
        this.ipagination.current = 1
        const newParam = this.handleParam(param)
        this.loadData(newParam)
      },
      changeSalesSort(item) {
        this.allParam.orderParam.serviceOrderNumSort = item
      },
      changeAvgScoreSort(item) {
        this.allParam.orderParam.avgScoreSort = item
      },
      changeMoneySort(item) {
        this.allParam.orderParam.moneySort = item
      },
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      handleParam(param) {
        const that = this
        that.formParam = param

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current - 1
        newParam.pageSize = that.ipagination.pageSize

        newParam.avgScoreSort = that.allParam.orderParam.avgScoreSort
        newParam.moneySort = that.allParam.orderParam.moneySort
        newParam.serviceOrderNumSort = that.allParam.orderParam.serviceOrderNumSort
        newParam.isUseVoucher = that.isUseVoucher
        newParam = filterObj(newParam)
        newParam = arrayToStringObj(newParam)

        return newParam
      },
      loadData(param) {
        if (!this.getDataUrl) {
          this.$message.error('getDataUrl.demandUrl属性!')
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.getDataUrl, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = res.result.records
          }
          this.loading.spinning = false
        }).finally(() => {
          this.loading.spinning = false
        })
      },
      changeBox() {
        this.isUseVoucher = !this.isUseVoucher
        this.ipagination.current = 1
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      }
    },
    watch: {
      allParam: {
        handler(newData, oldData) {
          const param = this.handleParam(this.formParam)
          this.loadData(param)
        },
        deep: true
      }
    }

  }
</script>

<style scoped lang="less">
  @import "../../components/main";
  #serviceProject {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
  }

</style>