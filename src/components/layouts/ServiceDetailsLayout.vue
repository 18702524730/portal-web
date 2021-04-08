<template>
  <div id="serviceDetailsLayout">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header"></portal-header>
    </a-row>

    <a-row>
      <header-navigation :data="request.org" @func="refresh"></header-navigation>
    </a-row>

    <a-row>
      <service-menu :menu-list="menuList" :focus="$route.name" class="my-head"></service-menu>
    </a-row>

    <div class="container">
      <a-row :gutter="8">
        <a-col :xs="24" :sm="24" :md="6" :lg="6">
          <institution-card style="margin-bottom: 5px" :org="request.org"></institution-card>
          <trading-card :data="request.orderInfo"></trading-card>
        </a-col>

        <a-col :xs="24" :sm="24" :md="18" :lg="18">
          <router-view :org-message="request.org" v-if="isRouterAlive"></router-view>
        </a-col>
      </a-row>
    </div>
    <div style="background-color: #ffffff">
      <a-row>
        <portal-footer></portal-footer>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { getAction, getActionUpdateKeyword } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import AffixButton from '../general/AffixButton'
  import PortalHeader from '../general/PortalHeader'
  import HeaderNavigation from '../general/HeaderNavigation'
  import ServiceMenu from '../general/ServiceMenu'
  import InstitutionCard from '../card/InstitutionCard'
  import TradingCard from '../card/TradingCard'
  import PortalFooter from '../general/PortalFooter'

  export default {
    name: 'ServiceDetailsLayout',
    components: {
      PortalFooter,
      TradingCard,
      InstitutionCard,
      ServiceMenu,
      HeaderNavigation,
      PortalHeader,
      AffixButton
    },
    provide() {
      return {
        reload: this.reload,
        headLogin: this.headLogin
      }
    },
    data() {
      return {
        platformList: [],
        isRouterAlive: true,
        orgMessage: {},
        menuList: [
          {
            key: 'InstitutionHome',
            title: '机构首页',
            url: 'institution-home'
          },
          {
            key: 'Introduce',
            title: '机构介绍',
            url: 'introduce'
          },
          {
            key: 'ProjectIntro',
            title: '服务项目',
            url: 'project-intro'
          }
        ],
        request: {
          orderInfo: {},
          org: {}
        },
        url: {
          orgUrl: '/zscq/portal/getServiceProductAllInfo'
        },

        previewUrl: '/zscq/portal/getPreviewById'
      }
    },
    created() {
      if (this.$route.query.preview === '2') {
        this.loginBtn = true
        this.getPreviewInfo()
      } else {
        this.loadOrgData()
      }
    },
    methods: {
      async getPreviewInfo() {
        const res = await getActionUpdateKeyword(this.previewUrl, { id: this.$route.query.previewId })
        if (res.success) {
          this.request.org = JSON.parse(res.result.item)
        } else {
          this.$message.error(res.message)
        }
      },
      refresh() {
        this.loadOrgData()
      },
      headLogin(type, gotoRouter) {
        if (type === 'goto') {
          this.$refs.header.loginAndGoto(gotoRouter)
        } else {
          this.$refs.header.login()
        }
      },
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
          this.loadOrgData()
        })
      },
      loadOrgData() {
        let param = {
          orgId: this.$route.query.orgId,
          serviceProductId: this.$route.query.itemId
        }
        param = filterObj(param)

        this.spinning = true
        getAction(this.url.orgUrl, param).then((res) => {
          if (res.success) {
            this.request.orderInfo = res.result.orderInfo
            this.request.org = res.result.org
            if (this.request.orderInfo === null || this.request.orderInfo === undefined) {
              this.request.orderInfo = {}
            }

          }
          this.spinning = false
        }).finally(() => {
          this.spinning = false
        })
      }
    },
    watch: {
      '$route'(to, from) {
        // 如果需要最新的数据
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #serviceDetailsLayout {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    .container {
      padding-bottom: 10px;
    }
    overflow: hidden;
    .my-head {
      background-color: @main-color;
      /deep/ .container {
        background-color: @main-color !important;
      }
    }
  }

</style>