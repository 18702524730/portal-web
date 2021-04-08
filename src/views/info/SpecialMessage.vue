<template>
  <div id="specialMessage">
    <div class="container">
      <div style="background-color: #ffffff;height: 3rem;">
        <a-input-search placeholder="输入关键字搜索..." style="width: 300px;margin-top: 0.5rem;margin-left: 1.5rem;"
                        v-model="searchRecommendParam.keyword" @search="handleSearch"/>
      </div>
      <recommend-organization style="background-color: #ffffff;padding-top: 10px" :data="recommentData"
                              :loading="remommendLoading" :pagination="recommendIpagination">
        <template slot="card" slot-scope="item">
          <message-one-card :item="item.data" :key-route="keyRoute" route-name="SpecialList"></message-one-card>
        </template>
      </recommend-organization>
    </div>
  </div>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import MessageOneCard from '../../components/card/MessageOneCard'

  export default {
    name: 'SpecialMessage',
    components: { MessageOneCard, RecommendOrganization },
    data() {
      return {
        url: {
          recommentUrl: '/zscq/portal/informationRecommendList',
          informationUrl: '/zscq/portal/informationList'
        },
        searchRecommendParam: {
          keyword: ''
        },
        recommendParam: {
          keyword: ''
        },
        recommendIpagination: {
          current: 1,
          pageSize: 12,
          total: 0,
          hideOnSinglePage: true,
          onChange: page => {
            this.handleMessageTableChange(page)
          }
        },
        remommendLoading: {
          spinning: false
        },

        formParam: {
          informationType: '3'
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
        recommentData: [],

        keyRoute: 'SpecialMessage',

        newUrl: {
          specialUrl: '/zscq/portal/special/specialMessagePageList'
        }
      }
    },
    created() {
      this.getRecommendInfos(this.getParam(this.recommendParam, this.recommendIpagination))
    },
    methods: {
      handleSearch() {
        Object.assign(this.recommendParam, this.searchRecommendParam)
        this.recommendIpagination.current = 1
        this.getRecommendInfos(this.getParam(this.recommendParam, this.recommendIpagination))
      },
      getRecommendInfos(param) {
        if (!this.url.recommentUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.remommendLoading.spinning = true
        getActionUpdateKeyword(this.newUrl.specialUrl, param).then((res) => {
          if (res.success) {
            this.recommentData = res.result.records
            this.recommendIpagination.total = res.result.total
            this.recommentData.forEach(item => {
              item.articleIcons = item.specialCover
              item.title = item.specialName
              item.releaseDate = item.createTime
            })
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
        this.getAllInfos(this.getParam(this.formParam, this.ipagination))
      },
      handleMessageTableChange(page) {
        this.recommendIpagination.current = page
        this.getRecommendInfos(this.getParam(this.recommendParam, this.recommendIpagination))

      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #specialMessage {
    .main-css();
    color: #333333;
    background-color: #ffffff;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
    .ant-input-search {
      margin-left: 30px;
      /deep/ .ant-input {
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
      }
    }
  }

</style>