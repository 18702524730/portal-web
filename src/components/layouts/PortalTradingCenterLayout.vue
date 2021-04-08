<template>
  <div id="portalTradingCenterLayout">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header"></portal-header>
    </a-row>

    <a-row>
      <search-header title="交易中心" ref="searchTabs"></search-header>
    </a-row>

    <a-row>
      <head-menu :menu-list="menuList" :focus="$route.name" @changeTab="changeTab"></head-menu>
    </a-row>
    <router-view v-if="isRouterAlive"></router-view>
    <a-row>
      <portal-footer></portal-footer>
    </a-row>
  </div>
</template>

<script>
  import AffixButton from '../general/AffixButton'
  import PortalHeader from '../general/PortalHeader'
  import SearchHeader from '../SearchHeader'
  import PortalFooter from '../general/PortalFooter'
  import HeadMenu from '../HeadMenu'

  export default {
    name: 'PortalTradingCenterLayout',
    components: { HeadMenu, PortalFooter, SearchHeader, PortalHeader, AffixButton },
    provide() {
      return {
        reload: this.reload,
        headLogin: this.headLogin,
        changeTab: this.changeTab
      }
    },
    data() {
      return {
        isRouterAlive: true,
        top: 10,
        bottom: 10,
        menuList: [
          {
            key: 'TradingCenter',
            title: '交易大厅',
            url: 'trading-center'
          },
          {
            key: 'SupplyProjectMessage',
            title: '供应信息',
            url: 'supply-project-message'
          },
          {
            key: 'ProjectCenter',
            title: '需求信息',
            url: 'project-center'
          },
          {
            key: 'ProjectZone',
            title: '项目专区',
            url: 'project-zone'
          },
          {
            key: 'CaseShow',
            title: '案例展示',
            url: 'case-show'
          }

        ]
      }
    },
    created() {
      this.$nextTick(() => {
        this.changeTab(this.$route.name)
      })
    },
    mounted() {

    },
    methods: {
      changeTab(activeKey) {
        let tab = 'third'
        switch (activeKey) {
          case 'TradingCenter':
            tab = 'third'
            break
          case 'DemandCenter':
            tab = 'third'
            break
          case 'SupplyPatentMessage':
          case 'SupplyPatentDetails':
          case 'SupplyBrandDetails':
          case 'SupplyProjectDetails':
          case 'SupplyProjectMessage':
          case 'SupplyBrandMessage':
          case "SelectPublishType":
          case "SelectPublishProject":
          case "AddProjectMessage":
          case "EditProjectMessage":
          case "ApprovalProjectMessage":
          case "ViewProjectMessage":
          case "AddPatentMessage":
          case "EditPatentMessage":
          case "ApprovalPatentMessage":
          case "ViewPatentMessage":
          case "AddBrandMessage":
          case "EditBrandMessage":
          case "ApprovalBrandMessage":
          case "ViewBrandMessage":
          case "AddDemandProject":
          case "EditDemandProject":
          case "ApprovalDemandProject":
          case "ViewDemandProject":
            tab = 'fourth'
            break
          default:
            tab = 'third'
            break
        }
        this.$refs.searchTabs.changeTab(tab)
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
        })
      }
    },
    watch: {
      '$route': function(newRoute) {
      }
    }
  }
</script>

<style scoped>

</style>