<template>
  <div id="activistResources">
    <list-card :data="data" :pagination="ipagination" :loading="loading" :change="handleTableChange" @func="refresh"
               :key-route="keyRoute" :columns="columns" route-name="ActivistResourcesMessage"></list-card>
  </div>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import ListCard from '../../components/card/ListCard'

  export default {
    name: 'ActivistResources',
    components: { ListCard },
    data() {
      return {
        url: '/zscq/portal/informationList',
        formParam: {
          informationType: '9'
        },
        ipagination: {
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          total: 0
        },
        loading: {
          spinning: false
        },
        data: [],
        sort: {
          publishDateSort: 'desc'
        },

        keyRoute: 'ActivistResources',
        columns: [
          {
            title: '标题',
            dataIndex: 'title',
            width: '70%',
            scopedSlots: { customRender: 'my-content' }
          },
          {
            title: '发布时间',
            dataIndex: 'releaseDate',
            sorter: true,
            width: '30%'
          }
        ]
      }
    },
    created() {
      this.loadData(this.getParam(this.formParam, this.ipagination))
    },
    methods: {
      refresh(keyword) {
        this.formParam.keyword = keyword
        this.ipagination.current = 1
        this.loadData(this.getParam(this.formParam, this.ipagination))
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
            this.data.forEach(info => {
              info.key = info.id
            })
          }
          this.loading.spinning = false
        }).finally(() => {
          this.loading.spinning = false
        })
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam, this.sort)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      handleTableChange(pagination, filters, sorter) {
        if (Object.keys(sorter).length > 0) {
          this.sort.publishDateSort = sorter.order === 'ascend' ? 'asc' : 'desc'
        }
        this.ipagination = pagination
        this.loadData(this.getParam(this.formParam, this.ipagination))
      }
    }
  }
</script>

<style scoped lang="less">

</style>