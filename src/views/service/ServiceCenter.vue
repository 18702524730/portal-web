<template>
  <div id="serviceCenter">
    <center-head></center-head>

    <div class="container">
      <a-row :gutter="16" class="my-img">
        <a-col :span="8">
          <a href="https://ipop.scjg.xm.gov.cn/portal/message/article-message?id=1273887543113261057&keyRoute=SpecialMessage" target="_blank"><img src="../../assets/images/pic1.png" alt="链接"></a>
        </a-col>
        <a-col :span="8">
          <a href="https://ipop.scjg.xm.gov.cn/portal/message/article-message?id=1277165938706194434&keyRoute=SpecialMessage" target="_blank"><img src="../../assets/images/pic2.png" alt="链接"></a>
        </a-col>
        <a-col :span="8">
          <a href="http://ggfw.cnipa.gov.cn:8010/PatentCMS_Center/" target="_blank"><img src="../../assets/images/pic3.png" alt="链接"></a>
        </a-col>
      </a-row>
    </div>

    <recommend-organization title="推荐服务" :data="serviceData" :pagination="serviceIpagination" :loading="serviceLoading"
                            v-if="serviceData.length > 0">
      <template slot="card" slot-scope="item">
        <service-card :item="item.data"></service-card>
      </template>
    </recommend-organization>

    <recommend-organization title="推荐服务机构" :pagination="agencyIpagination" :data="agencyData" :loading="agencyLoading"
                            class="institution-class" v-if="agencyData.length > 0">
      <template slot="card" slot-scope="item">
        <recommend-service-card :item="item.data"></recommend-service-card>
      </template>
    </recommend-organization>
  </div>

</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import _ from 'lodash'
  import CenterHead from '../../components/table/CenterHead'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import ServiceCard from '../../components/card/ServiceCard'
  import RecommendServiceCard from '../../components/card/RecommendServiceCard'

  export default {
    name: 'ServiceCenter',
    components: {
      RecommendServiceCard,
      ServiceCard,
      RecommendOrganization,
      CenterHead
    },
    data() {
      return {
        serviceTimer: null,
        agencyTimer: null,
        serviceData: [],
        agencyData: [],
        financialData: [],
        grid: { gutter: 16, xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3 },
        url: {
          serviceUrl: '/zscq/portal/agencyProductRecommendList',
          agencyUrl: '/zscq/portal/getAgencyPage',
          financialUrl: '/zscq/portal/financeProductList'
        },
        serviceFormParam: {
          recommend: 1
        },
        serviceIpagination: {
          current: 1,
          pageSize: 8,
          total: 0,
          hideOnSinglePage: true,
          onChange: page => {
            this.handleTableChange(page, 'service')
          }
        },
        serviceLoading: {
          spinning: false
        },

        agencyFormParam: {
          recommend: 1
        },
        agencyIpagination: {
          current: 1,
          pageSize: 4,
          total: 0,
          hideOnSinglePage: true,
          onChange: page => {
            this.handleTableChange(page, 'agency')
          }
        },
        agencyLoading: {
          spinning: false
        },

        financialFormParam: {
          recommend: 1
        },
        financialIpagination: {
          current: 1,
          pageSize: 4,
          total: 0,
          hideOnSinglePage: true,
          onChange: page => {
            this.handleTableChange(page, 'financial')
          }
        },
        financialLoading: {
          spinning: false
        }
      }
    },
    beforeDestroy() {
      clearTimeout(this.serviceTimer)
      clearTimeout(this.agencyTimer)
    },
    created() {
      this.getServiceData(this.getParam(this.serviceFormParam, this.serviceIpagination))
      this.getAgencyData(this.getParamNo(this.agencyFormParam, this.agencyIpagination))
      this.getFinancialData(this.getParam(this.financialFormParam, this.financialIpagination))
    },
    methods: {
      getServiceData(param) {
        const that = this
        if (!that.url.serviceUrl) {
          that.$message.error('url.serviceUrl属性!')
          return
        }
        getActionUpdateKeyword(that.url.serviceUrl, param).then((res) => {
          if (res.success) {
            that.serviceIpagination.total = res.result.total
            that.serviceData = _.shuffle(res.result.records)
            if (that.serviceIpagination.total > 4) {
              clearTimeout(that.serviceTimer)
              if (that.serviceIpagination.current < (that.serviceIpagination.total / that.serviceIpagination.pageSize)) {
                if (that.serviceIpagination.current > (that.serviceIpagination.total / that.serviceIpagination.pageSize)) {
                  that.serviceTimer = setTimeout(function() {
                    that.handleTableChange(1, 'service')
                  }, 5000)
                } else {
                  that.serviceTimer = setTimeout(function() {
                    that.handleTableChange(that.serviceIpagination.current + 1, 'service')
                  }, 5000)
                }
              } else {
                that.serviceTimer = setTimeout(function() {
                  that.handleTableChange(1, 'service')
                }, 5000)
              }
            }

          }
        }).finally(() => {
        })
      },
      getAgencyData(param) {
        const that = this
        if (!this.url.agencyUrl) {
          this.$message.error('url.agencyUrl属性!')
          return
        }
        getActionUpdateKeyword(this.url.agencyUrl, param).then((res) => {
          if (res.success) {
            this.agencyIpagination.total = res.result.total
            this.agencyData = _.shuffle(res.result.records)

            if (this.agencyIpagination.total > 4) {
              clearTimeout(that.agencyTimer)
              if (that.agencyIpagination.current < (that.agencyIpagination.total / that.agencyIpagination.pageSize)) {
                if (that.agencyIpagination.current > (that.agencyIpagination.total / that.agencyIpagination.pageSize)) {
                  that.agencyTimer = setTimeout(function() {
                    that.handleTableChange(1, 'agency')
                  }, 5000)
                } else {
                  that.agencyTimer = setTimeout(function() {
                    that.handleTableChange(that.agencyIpagination.current + 1, 'agency')
                  }, 5000)
                }
              } else {
                that.agencyTimer = setTimeout(function() {
                  that.handleTableChange(1, 'agency')
                }, 5000)
              }
            }
          }

        }).finally(() => {
        })
      },
      getFinancialData(param) {
        if (!this.url.financialUrl) {
          this.$message.error('url.financialUrl属性!')
          return
        }
        getActionUpdateKeyword(this.url.financialUrl, param).then((res) => {
          if (res.success) {
            this.financialIpagination.total = res.result.total
            this.financialData = _.shuffle(res.result.records)
          }
        }).finally(() => {
        })
      },
      handleTableChange(page, key) {
        switch (key) {
          case 'service':
            this.serviceIpagination.current = page
            this.getServiceData(this.getParam(this.serviceFormParam, this.serviceIpagination))
            break
          case 'agency':
            this.agencyIpagination.current = page
            this.getAgencyData(this.getParamNo(this.agencyFormParam, this.agencyIpagination))
            break
          case 'financial':
            this.financialIpagination.current = page
            this.getFinancialData(this.getParam(this.financialFormParam, this.financialIpagination))
            break
        }
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current - 1
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      getParamNo(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #serviceCenter {
    .main-css();
    background-color: @main-bg-color;
    .my-img {
      margin-top: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

  .institution-class {
    background: url("../../assets/images/general/bj.png") no-repeat;
    background-size: 100% 100%;
    /deep/ h2 {
      color: #ffffff !important;
    }
  }

  /deep/ .ant-pagination-item {
    display: none;
  }
</style>