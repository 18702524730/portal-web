<template>
  <div id="home">
    <portal-header ref="header"></portal-header>
    <search-header ref="searchTabs"></search-header>
    <search-menu :defaultActiveKey="['first']" @changeTab="changeTab" ref="searchMenu"></search-menu>
    <carousel-map :full-screen="true" :loading="adLoading" :advert-list="advertList" height="564"></carousel-map>
    <service-navigation></service-navigation>


    <recommend-project></recommend-project>

    <recommend-organization :data="agencyData" :loading="agencyLoading" class="institution-class"
                            v-if="agencyData.length > 0">
      <template slot="title">
        <a-row>
          <a-col :span="12"><h2 class="template-h">推荐服务机构</h2></a-col>
          <a-col :span="12" class="template-img">
            <router-link :to="{name:'ServiceOrg'}">
              <img src="@assets/images/navigation/more2.png" alt="查看更多">
            </router-link>
          </a-col>
        </a-row>
      </template>
      <template slot="card" slot-scope="item">
        <recommend-service-card :item="item.data"></recommend-service-card>
      </template>
    </recommend-organization>

    <recommend-organization :data="serviceData" :loading="serviceLoading" class="my-list" v-if="serviceData.length > 0"
                            style="background-color: #ffffff">
      <template slot="title">
        <a-row>
          <a-col :span="12"><h2 class="template-h">推荐服务</h2></a-col>
          <a-col :span="12" class="template-img">
            <router-link :to="{name:'ServiceProject'}">
              <img src="@assets/images/navigation/more.png" alt="查看更多">
            </router-link>
          </a-col>
        </a-row>

      </template>
      <template slot="card" slot-scope="item">
        <service-card :item="item.data" :bordered="true"></service-card>
      </template>
    </recommend-organization>


    <recommend-organization :data="specialData" :loading="specialLoading" class="my-list"
                            style="background-color: #ffffff" v-if="specialData.length > 0">
      <template slot="title">
        <a-row>
          <a-col :span="12"><h2 class="template-h">专题信息</h2></a-col>
          <a-col :span="12" class="template-img">
            <router-link :to="{name:'SpecialMessage'}">
              <img src="@assets/images/navigation/more.png" alt="查看更多">
            </router-link>
          </a-col>
        </a-row>
      </template>
      <template slot="card" slot-scope="item">
        <message-one-card :item="item.data" :key-route="specialRoute" route-name="SpecialList"></message-one-card>
      </template>
    </recommend-organization>

    <recommend-organization :data="trainData" :loading="trainLoading" class="my-list" style="background-color: #ffffff"
                            v-if="trainData.length > 0">
      <template slot="title">
        <a-row>
          <a-col :span="12"><h2 class="template-h">培训信息</h2></a-col>
          <a-col :span="12" class="template-img">
            <router-link :to="{name:'TrainMessage'}">
              <img src="@assets/images/navigation/more.png" alt="查看更多">
            </router-link>
          </a-col>
        </a-row>
      </template>
      <template slot="card" slot-scope="item">
        <message-one-card :item="item.data" :key-route="trainRoute" route-name="TrainArticleMessage"></message-one-card>
      </template>
    </recommend-organization>

    <portal-footer></portal-footer>
    <affix-button></affix-button>
    <home-message-modal></home-message-modal>

  </div>
</template>

<script>
  import _ from 'lodash'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj } from '@/utils/util'

  import PortalHeader from '../components/general/PortalHeader'
  import SearchHeader from '../components/SearchHeader'
  import SearchMenu from '../components/SearchMenu'
  import CarouselMap from '../components/CarouselMap'
  import ServiceNavigation from '../components/ServiceNavigation'
  import AffixButton from '../components/general/AffixButton'
  import PortalFooter from '../components/general/PortalFooter'
  import RecommendProject from '../components/RecommendProject'
  import RecommendOrganization from '../components/general/RecommendOrganization'
  import RecommendServiceCard from '../components/card/RecommendServiceCard'
  import ServiceCard from '../components/card/ServiceCard'
  import MessageOneCard from '../components/card/MessageOneCard'
  import HomeMessageModal from '../components/new/modal/HomeMessageModal'

  export default {
    name: 'Home',
    components: {
      HomeMessageModal,
      MessageOneCard,
      ServiceCard,
      RecommendServiceCard,
      RecommendOrganization,
      RecommendProject,
      PortalFooter,
      AffixButton,
      ServiceNavigation,
      CarouselMap,
      SearchMenu,
      SearchHeader,
      PortalHeader
    },
    provide() {
      return {
        reload: this.reload,
        headLogin: this.headLogin
      }
    },
    data() {
      return {
        isRouterAlive: true,
        agencyData: [],
        agencyFormParam: {
          recommend: 1,
          pageSize: 4,
          current: 1,
          total: 0
        },
        agencyLoading: {
          spinning: false
        },
        agencyTimer: null,
        url: {
          serviceUrl: '/zscq/portal/agencyProductRecommendList',
          agencyUrl: '/zscq/portal/getAgencyPage',
          recommentUrl: '/zscq/portal/informationRecommendList',
          adUrl: '/zscq/portal/advertList',

          newSpecialUrl: '/zscq/portal/special/specialMessageRecommendList'
        },

        adLoading: false,
        advertList: [],
        adParam: {
          position: '1'
        },

        serviceData: [],
        serviceFormParam: {
          recommend: 1,
          pageSize: 4,
          current: 1,
          total: 0
        },
        serviceLoading: {
          spinning: false
        },
        serviceTimer: null,

        specialLoading: {
          spinning: false
        },
        specialParam: {
          num: 4
        },
        specialRoute: 'SpecialMessage',

        trainLoading: {
          spinning: false
        },
        trainParam: {
          informationType: '4',
          num: 4
        },
        trainRoute: 'TrainMessage',
        specialData: [],
        trainData: []
      }
    },
    created() {
      this.getAllAdverts(this.getParam(this.adParam))
      this.getAgencyData(this.getParam(this.agencyFormParam))
      this.getServiceData(this.getParam(this.serviceFormParam))
      this.getSpecialInfos(this.getParam(this.specialParam))
      this.getTrainInfos(this.getParam(this.trainParam))
    },
    beforeDestroy() {
      clearTimeout(this.agencyTimer)
      clearTimeout(this.serviceTimer)
    },
    methods: {
      getParam(formParam) {
        const param = Object.assign({}, formParam)
        return filterObj(param)
      },
      handleTableChange(page, key) {
        switch (key) {
          case 'service':
            this.serviceFormParam.current = page
            this.serviceFormParam.pageNo = page - 1
            this.getServiceData(this.getParam(this.serviceFormParam))
            break
          case 'agency':
            this.agencyFormParam.current = page
            this.agencyFormParam.pageNo = page - 1
            this.getAgencyData(this.getParam(this.agencyFormParam))
            break
        }
      },
      getAgencyData(param) {
        if (!this.url.agencyUrl) {
          this.$message.error('url.agencyUrl属性!')
          return
        }
        this.agencyLoading.spinning = true
        getActionUpdateKeyword(this.url.agencyUrl, param).then((res) => {
          if (res.success) {
            this.agencyFormParam.total = res.result.total
            this.agencyData = _.shuffle(res.result.records)

            if (this.agencyFormParam.total > 4) {
              clearTimeout(this.agencyTimer)
              if (this.agencyFormParam.current < (this.agencyFormParam.total / this.agencyFormParam.pageSize)) {
                if (this.agencyFormParam.current > (this.agencyFormParam.total / this.agencyFormParam.pageSize)) {
                  this.agencyTimer = setTimeout(() => {
                    this.handleTableChange(1, 'agency')
                  }, 5000)
                } else {
                  this.agencyTimer = setTimeout(() => {
                    this.handleTableChange(this.agencyFormParam.current + 1, 'agency')
                  }, 5000)
                }
              } else {
                this.agencyTimer = setTimeout(() => {
                  this.handleTableChange(1, 'agency')
                }, 5000)
              }
            }
          }
          this.agencyLoading.spinning = false
        }).finally(() => {
          this.agencyLoading.spinning = false
        })
      },
      getAllAdverts(param) {
        if (!this.url.adUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.adLoading = true
        getActionUpdateKeyword(this.url.adUrl, param).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
          this.adLoading = false
        }).finally(() => {
          this.adLoading = false
        })
      },
      getServiceData(param) {
        if (!this.url.serviceUrl) {
          this.$message.error('url.serviceUrl属性!')
          return
        }
        this.serviceLoading.spinning = true
        getActionUpdateKeyword(this.url.serviceUrl, param).then((res) => {
          if (res.success) {
            this.serviceFormParam.total = res.result.total
            this.serviceData = _.shuffle(res.result.records)
            if (this.serviceFormParam.total > 4) {
              clearTimeout(this.serviceTimer)
              if (this.serviceFormParam.current < (this.serviceFormParam.total / this.serviceFormParam.pageSize)) {
                if (this.serviceFormParam.current > (this.serviceFormParam.total / this.serviceFormParam.pageSize)) {
                  this.serviceTimer = setTimeout(() => {
                    this.handleTableChange(1, 'service')
                  }, 5000)
                } else {
                  this.serviceTimer = setTimeout(() => {
                    this.handleTableChange(this.serviceFormParam.current + 1, 'service')
                  }, 5000)
                }
              } else {
                this.serviceTimer = setTimeout(() => {
                  this.handleTableChange(1, 'service')
                }, 5000)
              }
            }
          }
          this.serviceLoading.spinning = false
        }).finally(() => {
          this.serviceLoading.spinning = false
        })
      },
      getSpecialInfos(param) {
        if (!this.url.newSpecialUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.specialLoading.spinning = true
        getActionUpdateKeyword(this.url.newSpecialUrl, param).then((res) => {
          if (res.success) {
            this.specialData = res.result
            this.specialData.forEach(item => {
              item.articleIcons = item.specialCover
              item.title = item.specialName
              item.releaseDate = item.createTime
            })
          }
          this.specialLoading.spinning = false
        }).finally(() => {
          this.specialLoading.spinning = false
        })
      },
      getTrainInfos(param) {
        if (!this.url.recommentUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.trainLoading.spinning = true
        getActionUpdateKeyword(this.url.recommentUrl, param).then((res) => {
          if (res.success) {
            this.trainData = res.result
          }
          this.trainLoading.spinning = false
        }).finally(() => {
          this.trainLoading.spinning = false
        })
      },
      changeTab(activeKey) {
        this.$refs.searchTabs.changeTab(activeKey)
      },
      renderPage(activeKey) {
        let path = '/portal'
        switch (activeKey) {
          case 'first' :
            path = '/portal'
            break
          case 'second' :
            path = '/portal/search'
            break
          case 'third' :
            path = '/portal/service'
            break
          case 'fourth' :
            path = '/portal/trading'
            break
          case 'fiveth' :
            path = '/portal/cloud'
            break
          case 'sixth' :
            path = '/portal/innovate'
            break
          case 'seventh' :
            path = '/portal/message'
            break
          default:
            path = '/portal'
            break
        }
        this.$router.push({ path: path })
      },
      headLogin(type,gotoRouter) {
        if (type === 'goto') {
          this.$refs.header.loginAndGoto(gotoRouter)
        } else {
          this.$refs.header.login()
        }
      },
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.$refs.searchMenu.changeAdmin()
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../components/main";

  .institution-class {
    background: url("../assets/images/general/bj.png") no-repeat;
    background-size: 100% 100%;
    /deep/ h2 {
      color: #ffffff !important;
    }
    padding-bottom: 75px !important;
  }

  .template-h {
    .main-css();
    margin-top: 2em;
    margin-bottom: 1em;
    color: #001833;
  }

  .template-img {
    margin-top: 3em;
    img{
      float: right;
    }
  }

  .my-list {
    padding-bottom: 20px !important;
  }
</style>
