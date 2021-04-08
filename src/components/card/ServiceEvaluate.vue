<template>
  <div id="serviceEvaluate">
    <a-table :columns="columns" :dataSource="data" :pagination="ipagination" :loading="loading"
             @change="handleTableChange">
      <template slot="score" slot-scope="scoreValue">
        <a-rate :defaultValue="scoreValue" disabled style="fontSize: 14px" allowHalf/>
      </template>
      <span slot="enterpriseName" slot-scope="text,record">
        <span>{{text | filterName}}</span>
      </span>
    </a-table>
  </div>
</template>

<script>
  import { filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'ServiceEvaluate',
    props: {
      serviceProductId: {
        type: String,
        default: ''
      },
      columns: {
        type: Array,
        default: () => {
          return [
            {
              title: '评价用户/企业',
              key: 'enterpriseName',
              width: '30%',
              scopedSlots: { customRender: 'enterpriseName' }
            },
            {
              title: '服务评价',
              dataIndex: 'serveScore',
              key: 'serveScore',
              scopedSlots: { customRender: 'score' },
              width: '20%'
            },
            {
              title: '评价内容',
              dataIndex: 'evalContent',
              key: 'evalContent',
              width: '50%'
            }
          ]
        }
      }
    },
    data() {
      return {
        data: [],
        getEvaluateUrl: '/zscq/portal/getPortalServeEvalPage',
        formParam: {
          serviceProductId: ''
        },
        ipagination: {
          current: 1,
          pageSize: 8,
          showQuickJumper: true,
          total: 0
        },
        loading: {
          spinning: false
        }
      }
    },
    created() {
    },
    methods: {
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
      loadEValuate(param) {
        this.loading.spinning = true
        getActionUpdateKeyword(this.getEvaluateUrl, param).then((res) => {
          const dataList = []
          if (res.success) {
            this.ipagination.total = res.result.total
            for (const i in res.result.records) {

              const data = res.result.records[i]
              data.key = i
              dataList.push(data)
            }
          }
          this.loading.spinning = false
          this.data = dataList
        }).finally(() => {
          this.loading.spinning = false
        })
      }
    },
    watch: {
      serviceProductId: {
        handler(newData, oldData) {
          if (newData !== undefined && newData !== null && newData !== '') {
            this.formParam.serviceProductId = newData
            const param = this.handleParam(this.formParam)
            this.loadEValuate(param)
          }
        },
        immediate: true
      }
    },
    filters: {
      filterName(value) {
        if (value.anonym === '1') {
          return '**********'
        } else {
          return value.enterpriseName.substring(0, 3) + '*******'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #serviceEvaluate {
    /deep/ .ant-table-row {
      td {
        word-break: break-all;
        white-space: pre-wrap;
      }
    }
  }
</style>