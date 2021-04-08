<template>
  <div id="projectIntro">
    <tab-card-template tabTitle="服务项目" style="margin-bottom: 5px">
      <template slot="content">
        <div style="margin-top: 10px">
          <a-list :grid="grid" :dataSource="data"
                  :pagination="data.length > 0 ?ipagination:false" :loading="loading">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <service-project-card :item="item" :bordered="true" :line-name="false" @func="refresh" v-if="serviceCard"
                                    style="white-space: normal;"></service-project-card>
              <financial-card v-else :item="item" style="white-space: normal;"></financial-card>
            </a-list-item>
          </a-list>
        </div>
      </template>

    </tab-card-template>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import TabCardTemplate from '../../components/table/TabCardTemplate'
  import ServiceProjectCard from '../../components/card/ServiceProjectCard'
  import FinancialCard from '../../components/card/FinancialCard'

  export default {
    name: 'ProjectIntro',
    components: { FinancialCard, ServiceProjectCard, TabCardTemplate },
    props: {
      getDataUrl: {
        type: String,
        default: '/zscq/portal/agencyProductOrgRecommendList'
      },
      serviceCard: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        grid: { gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 },
        data: [],
        formParam: {},
        ipagination: {
          current: 1,
          pageSize: 9,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          spinning: false
        }

      }
    },
    created() {
      this.formParam.orgId = this.$route.query.orgId
      this.loadData(this.getParam())
    },
    methods: {
      refresh() {
        this.formParam.orgId = this.$route.query.orgId
        this.loadData(this.getParam())
      },
      getParam() {
        const param = Object.assign({}, this.formParam)
        param.pageNo = this.ipagination.current - 1
        param.pageSize = this.ipagination.pageSize
        return filterObj(param)
      },
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.getParam()
        this.loadData(param)
      },
      loadData(param) {
        if (!this.getDataUrl) {
          this.$message.error('getDataUrl.demandUrl属性!')
          return
        }
        this.loading.spinning = true
        if (!param.orgId) {
          param.orgId = '-1'
        }
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

<style scoped lang="less">

</style>