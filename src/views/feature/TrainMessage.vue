<template>
  <div id="specialMessage">
    <div style="background-color: #ffffff">
      <recommend-organization style="background-color: #ffffff;padding-top: 10px" :data="recommendData" :loading="remommendLoading">
        <template slot="card" slot-scope="item">
          <message-one-card :item="item.data" :key-route="keyRoute" route-name="TrainArticleMessage"></message-one-card>
        </template>
      </recommend-organization>
    </div>

    <policy-list :data="data" :loading="loading" :pagination="ipagination" :key-route="keyRoute"
                 message-title="相关信息" route-name="TrainArticleMessage"></policy-list>
  </div>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import MessageOneCard from '../../components/card/MessageOneCard'
  import PolicyList from '../../components/general/PolicyList'

  export default {
    name: 'TrainMessage',
    components: { PolicyList, MessageOneCard, RecommendOrganization },
    data() {
      return {
        url: {
          recommentUrl: '/zscq/portal/informationRecommendList',
          informationUrl: '/zscq/portal/informationList'
        },
        recommendParam: {
          informationType: '4',
          num: 4
        },
        remommendLoading: {
          spinning: false
        },

        formParam: {
          informationType: '4'
        },
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          spinning: false
        },
        data: [],
        recommendData: [],

        keyRoute: 'TrainMessage'
      }
    },
    created() {
      this.getRecommendInfos()
      this.getAllInfos(this.getParam(this.formParam, this.ipagination))
    },
    methods: {
      getRecommendInfos() {
        if (!this.url.recommentUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.remommendLoading.spinning = true
        getActionUpdateKeyword(this.url.recommentUrl, this.recommendParam).then((res) => {
          if (res.success) {
            this.recommendData = res.result
          }
          this.remommendLoading.spinning = false
        }).finally(() => {
          this.remommendLoading.spinning = false
        })
      },
      getAllInfos(param) {
        if (!this.url) {
          this.$message.error('url有问题!')
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.url.informationUrl, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = res.result.records
          }
          this.loading.spinning = false
        }).finally(() => {
          this.loading.spinning = false
        })
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      handleTableChange(page, key) {
        this.ipagination.current = page
        this.loadData(this.getParam(this.formParam, this.ipagination))
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";
  #specialMessage {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;

    overflow: hidden;
  }


</style>