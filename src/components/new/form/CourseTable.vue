<template>
  <div id="courseTable">
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
              <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="title-card" :key="index"
                     style="margin-bottom: 2px;">
                <train-activity-card :item="item" @func="refresh"></train-activity-card>
              </a-col>
            </template>
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
  import TrainActivityCard from '../card/TrainActivityCard'

  export default {
    name: 'CourseTable',
    components: { TrainActivityCard },
    props: {
      tableUrl: {
        type: String,
        default: '/zscq/portal/courseSearch'
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
        }
      }
    },
    created() {
      this.refresh()
    },
    mounted() {
      const that = this
      bus.$on('changeParamCourse', function(param) {
        that.ipagination.current = 1
        const newParam = that.handleParam(param)
        that.loadData(newParam)
      })
    },
    beforeDestroy() {
      //  组件销毁前需要解绑事件。否则会出现重复触发事件的问题
      bus.$off('changeParamCourse')
    },
    methods: {
      refresh() {
        const param = this.handleParam(this.formParam)
        this.loadData(param)
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
          console.info('我又来了')
          console.info(this.data)
        }).finally(() => {
          this.loading.spinning = false
        })
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #courseTable {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
    /deep/ .ant-table-thead > tr > th, /deep/ .ant-table-tbody > tr > td{
      padding: 10px 0;
    }
  }


</style>