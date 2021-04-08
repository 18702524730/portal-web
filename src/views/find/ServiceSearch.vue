<template>
  <div id="serviceSearch">
    <div class="container">
      <div style="margin-bottom: 1em;margin-top: 1em;">
        <a-row>
          <div class="innerDiv" style="padding: 0 20px;">
            <a-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
              <order-button title="销量排序" myWidth="120px;" @changeSort="changeSalesSort($event)"></order-button>
            </a-col>
            <a-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
              <order-button title="价格排序" myWidth="120px;" @changeSort="changeMoneySort($event)"></order-button>
            </a-col>
            <a-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
              <order-button title="评分排序" myWidth="120px;" @changeSort="changeAvgScoreSort($event)"></order-button>
            </a-col>
            <a-col :xs="24" :sm="6" :md="6" :lg="12" :xl="12">
              <div style="float: right;    margin-top: 5px">
                <span style="font-size:14px;font-height:16px;vertical-align:middle;text-align:center">共计<span
                  style="color: #ff3300; padding-right: 5px;padding-left: 5px">{{ipagination.total}}</span>条</span>
              </div>
            </a-col>
          </div>
        </a-row>
      </div>

      <div>
        <recommend-organization :data="data" :pagination="ipagination" :loading="loading">
          <template slot="card" slot-scope="item">
            <service-project-card :item="item.data" :haveFoot="true" @func="refresh"></service-project-card>
          </template>
        </recommend-organization>
      </div>
    </div>
  </div>
</template>

<script>
  import { filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import OrderButton from '../../components/general/OrderButton'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import ServiceProjectCard from '../../components/card/ServiceProjectCard'

  export default {
    name: 'ServiceSearch',
    components: { ServiceProjectCard, RecommendOrganization, OrderButton },
    data() {
      return {
        data: [],
        getDataUrl: '/zscq/portal/agencyProductRecommendList',
        formParam: {
          keyword: ''
        },
        ipagination: {
          current: 1,
          pageSize: 16,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
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
      this.formParam.keyword = this.$route.query.kwtext
      const param = this.handleParam(this.formParam)
      this.loadData(param)
    },
    methods: {
      refresh(param) {
        if (param === undefined) {
          param = this.formParam
        } else {
          this.formParam.keyword = param
          param = this.formParam
        }
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
        // this.ipagination = pagination;
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
  #serviceSearch {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
  }


</style>