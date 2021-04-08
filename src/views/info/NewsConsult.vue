<template>
  <div id="newsConsult">
    <!--<list-card :data="data" :pagination="ipagination" :loading="loading" :change="handleTableChange" @func="refresh"-->
    <!--:key-route="keyRoute" :columns="columns"></list-card>-->
    <div class="container">
      <a-row :gutter="24" v-for="(outItem,outIndex) in dataList" :key="'o'+ outIndex" class="my-row">
        <a-col :span="12" v-for="(item,index) in outItem" :key="'i' + index">
          <policy-laws-card :item-list="item"></policy-laws-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>

  import { filterObj, changeArr } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import PolicyLawsCard from '../../components/card/PolicyLawsCard'

  export default {
    name: 'NewsConsult',
    components: { PolicyLawsCard },
    data() {
      return {
        url: '/zscq/portal/policies/policiesRegulationsList',
        dataList: [],
        formParam: {
          informationType: '1',
          keyword: ''
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

        keyRoute: 'NewsConsult',

        columns: [
          {
            title: '标题',
            dataIndex: 'title',
            width: '70%'
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
      this.loadData()
    },
    methods: {
      refresh(keyword) {
        this.formParam.keyword = keyword
        this.loadData(this.getParam(this.formParam, this.ipagination))
      },
      loadData() {
        if (!this.url) {
          this.$message.error('url有问题!')
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.url).then((res) => {
          if (res.success) {
            const data = res.result
            const allData = []
            for (const a of data) {
              const otherArr = []
              otherArr.push(a)
              allData.push(otherArr)
            }

            this.dataList = changeArr(allData, 2)
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
  @import "../../components/main";

  #newsConsult {
    background-color: #f9f9f9;
    padding-bottom: 20px;
    padding-top: 20px;
    .main-css();
    .my-row{
      padding-bottom: 20px;
    }
  }
</style>