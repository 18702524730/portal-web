<template>
  <div id="projectTable">
    <div class="container">
      <a-table
        :columns="columns"
        :dataSource="data"
        :showHeader="false"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">
        <template slot="card" slot-scope="card">
          <a-row :gutter="16" class="row-outer">
            <template v-for="(item,index) in card">
              <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="title-card" :key="index"
                     style="margin-bottom: 2px;">
                <demand-or-supply-card
                  :column="column"
                  :item="item"
                  :itemKey="itemKey"
                  :key-route="keyRoute"
                  :demand-or-supply="demandOrSupply"
                  @func="refresh"
                  v-if="!cardIsProject"
                >
                </demand-or-supply-card>
                <supply-show-card
                  :column="column"
                  :item="item"
                  :itemKey="itemKey"
                  :key-route="keyRoute"
                  :demand-or-supply="demandOrSupply"
                  @func="refresh"
                  v-else
                >
                </supply-show-card>
              </a-col>
            </template>
          </a-row>
        </template>

        <template slot="title" slot-scope="currentPageData">
          <a-row>
            <div class="innerDiv" style="padding: 0 20px;">
              <a-col :xs="12" :sm="12" :md="6" :lg="4" :xl="4">
                <order-button title="发布时间排序" :needSort="allParam.orderParam.publishDateSort"
                              @changeSort="changeTimeSort($event)"></order-button>
              </a-col>
              <a-col :xs="12" :sm="12" :md="6" :lg="4" :xl="4">
                <order-button title="价格排序" myWidth="120px;" :needSort="allParam.orderParam.moneySort"
                              @changeSort="changeMoneySort($event)"></order-button>
              </a-col>
            </div>
          </a-row>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import { filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import bus from '@/assets/eventBus'
  import DemandOrSupplyCard from '../card/DemandOrSupplyCard'
  import OrderButton from '../general/OrderButton'
  import SupplyShowCard from '../card/SupplyShowCard'

  export default {
    name: 'DemandProjectTable',
    components: { SupplyShowCard, OrderButton, DemandOrSupplyCard },
    props: {
      demandOrSupply: {
        type: String,
        default: 'demand'
      },
      tableUrl: {
        type: String,
        default: '/zscq/portal/requirementSearch'
      },
      keyRoute: {
        type: String,
        default: 'ProjectDetails'
      },
      column: {
        type: Array,
        default: () => [
          '所属行业',
          '项目成熟度',
          '意向运营方式',
          '交易价格'
        ]
      },
      itemKey: {
        type: Array,
        default: () => [
          'imgUrl',
          'title',

          'belongIndustryName',
          'projectMaturityName',
          'intendedOperationModeName',
          'money',
          'madeAreaCodeName',
          'publishTime'
        ]
      },
      cardIsProject: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        columns: [
          {
            title: 'Card',
            dataIndex: 'card',
            scopedSlots: { customRender: 'card' }
          }
        ],
        dataSize: 4,
        data: [],
        delayTime: 1000,
        ipagination: {
          current: 1,
          pageSize: 12,
          showQuickJumper: true,
          total: 0
        },
        loading: {
          spinning: false
        },
        formParam: {
          supplyRequirementType: 4
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
      if (this.demandOrSupply === 'supply') {
        this.formParam.supplyRequirementType = '1'
      }
      const param = this.handleParam(this.formParam)
      this.loadData(param)
    },
    mounted() {
      const that = this
      bus.$on('changeParamSupplyProject', function(param) {
        that.ipagination.current = 1
        const newParam = that.handleParam(param)
        that.loadData(newParam)
      })
      bus.$on('changeParamDemandProject', function(param) {
        that.ipagination.current = 1
        const newParam = that.handleParam(param)
        that.loadData(newParam)
      })
    },
    beforeDestroy() {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
      bus.$off('changeParamDemandProject')
      bus.$off('changeParamSupplyProject')
    },
    methods: {
      refresh() {
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      changeTimeSort(item) {
        this.allParam.orderParam.publishDateSort = item
      },
      changeMoneySort(item) {
        this.allParam.orderParam.moneySort = item
      },
      handleTableChange(pagination, filters, sorter) {
        this.ipagination = pagination
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
          const dataList = []
          if (res.success) {

            let rowDataList = []

            this.ipagination.total = res.result.total

            for (const i in res.result.records) {
              const rowData = {}

              const data = res.result.records[i]
              rowDataList.push(data)

              if (rowDataList.length === this.dataSize) {
                rowData.card = rowDataList
                rowData.key = i
                dataList.push(rowData)
                rowDataList = []
              }
            }
            if (rowDataList.length > 0) {
              const rowData = {}
              rowData.card = rowDataList
              rowData.key = 0
              dataList.push(rowData)
            }

          }
          this.loading.spinning = false
          this.data = dataList
          console.info(this.data)
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
  @import "../main";

  #projectTable {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
  }

</style>