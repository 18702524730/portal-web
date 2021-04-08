<template>
  <div id="financialConsultShow">
    <div class="container">
      <a-breadcrumb separator=">" class="my-breadcrumb">
        <a-breadcrumb-item>
          <router-link :to="{name:'FinancialPledgeFinancing'}">质押融资</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          资讯中心
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <list-card :data="data" :pagination="ipagination" :loading="loading" :change="handleTableChange" @func="refresh"
               :key-route="keyRoute" route-name="FinancialConsultArticleMessage" :columns="columns"></list-card>
  </div>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import ListCard from '../../components/card/ListCard'

  const columns = [
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
  export default {
    name: 'FinancialConsultShow',
    components: { ListCard },
    data() {
      return {
        url: '/zscq/portal/informationList',
        formParam: {
          informationType: '8'
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

        keyRoute: 'FinancialPledgeFinancing',

        columns
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
  @import "../../components/main";

  #financialConsultShow {
    margin-top: 2px;
    padding-top: 20px;
    background-color: @main-bg-color;
    .main-css();
  }

</style>