<template>
  <div id="demandSearch">
    <div class="container">
      <div style="margin-bottom: 1em;margin-top: 1em;">
        <a-row>
          <div class="innerDiv" style="padding: 0 20px;">
            <a-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
              <order-button title="发布时间排序"
                            @changeSort="changeTimeSort($event)"
                            :needSort="allParam.orderParam.publishDateSort"></order-button>
            </a-col>
            <a-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
              <order-button title="价格排序" myWidth="120px;"
                            @changeSort="changeMoneySort($event)"
                            :needSort="allParam.orderParam.moneySort"></order-button>
            </a-col>
            <a-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16">
              <div style="float: right;    margin-top: 5px">
                <span style="font-size:14px;font-height:16px;vertical-align:middle;text-align:center">共计<span
                  style="color: #ff3300; padding-right: 5px;padding-left: 5px">{{ipagination.total}}</span>条</span>
              </div>
            </a-col>
          </div>
        </a-row>
      </div>

      <div style="min-height: 222px;overflow: hidden;">
        <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }" :dataSource="data"
                :pagination="ipagination" :loading="loading">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <brand-card :item="item"></brand-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script>
  import { filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import OrderButton from '../../components/general/OrderButton'
  import BrandCard from '../../components/card/BrandCard'

  export default {
    name: 'DemandSearch',
    components: { BrandCard, OrderButton },
    data() {
      return {
        data: [],
        tableUrl: '/zscq/portal/requirementSearch',
        ipagination: {
          current: 1,
          pageSize: 20,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          delay: 500,
          spinning: false
        },
        formParam: {
          keyword: ''
        },
        allParam: {
          orderParam: {
            publishDateSort: '',
            moneySort: ''
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
      changeTimeSort(item) {
        this.allParam.orderParam.publishDateSort = item
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

        newParam.publishDateSort = that.allParam.orderParam.publishDateSort
        newParam.moneySort = that.allParam.orderParam.moneySort

        newParam = filterObj(newParam)
        newParam = arrayToStringObj(newParam)

        return newParam
      },
      loadData(param) {
        if (!this.tableUrl) {
          this.$message.error('请设置tableUrl.demandUrl属性!')
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.tableUrl, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = res.result.records
          }
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

  #demandSearch {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
  }


</style>