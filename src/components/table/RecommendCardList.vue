<template>
  <tab-card-template tab-title="推荐服务">
    <template slot="content">
      <div style="margin-top: 10px">
        <a-list :grid="grid" :dataSource="data"
                :pagination="false" :loading="loading">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <service-project-card :item="item" v-if="serviceCard" :bordered="true"></service-project-card>
            <financial-card v-else :item="item"></financial-card>
          </a-list-item>
        </a-list>
      </div>
    </template>
  </tab-card-template>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import FinancialCard from '../card/FinancialCard'
  import ServiceProjectCard from '../card/ServiceProjectCard'
  import TabCardTemplate from './TabCardTemplate'

  export default {
    name: 'RecommendCardList',
    components: { TabCardTemplate, ServiceProjectCard, FinancialCard },
    props: {
      orgId: {
        type: String,
        default: '-1'
      },
      getDataUrl: {
        type: String,
        default: '/zscq/portal/agencyProductRecommendList'
      },
      serviceCard: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        data: [],
        grid: { gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 },
        formParam: {
          recommend: 1
        },
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0
        },
        loading: {
          spinning: false
        }
      }
    },
    created() {
      this.formParam.orgId = this.orgId
      this.loadData(this.getParam())
    },
    methods: {
      getParam() {
        const param = Object.assign({}, this.formParam)
        param.pageNo = this.ipagination.current - 1
        param.pageSize = this.ipagination.pageSize
        return filterObj(param)
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
    }
  }
</script>

<style scoped>

</style>