<template>
  <div id="supplySearch">
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
            <demand-or-supply-card :item="item" :demand-or-supply="demandOrSupply" :column="column" :item-key="itemKey"
                                   :old-data="false" :search-data="false"  @func="refresh"></demand-or-supply-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script>
  import { filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import DemandOrSupplyCard from '../../components/card/DemandOrSupplyCard'
  import OrderButton from '../../components/general/OrderButton'

  export default {
    name: 'SupplySearch',
    components: { OrderButton, DemandOrSupplyCard },
    data() {
      return {
        demandOrSupply: 'supply',
        data: [],
        tableUrl: '/zscq/portal/supplySearch',
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
          delay: 500,
          spinning: false
        },
        formParam: {
          keyword: ''
        },
        allParam: {
          orderParam: {
            publishDateSort: 'desc',
            moneySort: ''
          }
        },
        column: [
          '所属行业',
          '技术领域',
          '交易方式',
          '交易价格'
        ],
        itemKey: [
          'imgUrl',
          'title',

          'belongIndustryName',
          'technicalFieldName',
          'intendedOperationModeName',
          'money',
          'cooperationAreaName',
          'publishTime'
        ]
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
            console.info(res)
            console.info('继续测测看')
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
  #supplySearch {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
  }


</style>