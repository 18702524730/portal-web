<template>
  <div id="cloudPaperLayout">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header"></portal-header>
    </a-row>

    <a-row>
      <search-header title="云画报" ref="searchTabs"></search-header>
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
    name: 'cloudPaperLayout',
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
            key: 'CloudPaper',
            title: '云画报',
            url: 'cloud-paper'
          },
          {
            key: 'IPLive',
            title: 'IP图文直播',
            url: 'ip-live'
          },
          {
            key: 'Portrait',
            title: 'IP画像',
            url: 'portrait'
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
          console.log(activeKey)
        // let tab = 'third'
        // switch (activeKey) {
        //   case 'TradingCenter':
        //     tab = 'third'
        //     break
        //   case 'DemandCenter':
        //     tab = 'third'
        //     break
        //   case 'SupplyPatentMessage':
        //   case 'SupplyPatentDetails':
        //   case 'SupplyBrandDetails':
        //   case 'SupplyProjectDetails':
        //   case 'SupplyProjectMessage':
        //   case 'SupplyBrandMessage':
        //   case "SelectPublishType":
        //   case "SelectPublishProject":
        //   case "AddProjectMessage":
        //   case "EditProjectMessage":
        //   case "ApprovalProjectMessage":
        //   case "AddPatentMessage":
        //   case "EditPatentMessage":
        //   case "ApprovalPatentMessage":
        //   case "AddBrandMessage":
        //   case "EditBrandMessage":
        //   case "ApprovalBrandMessage":
        //   case "AddDemandProject":
        //   case "EditDemandProject":
        //   case "ApprovalDemandProject":
        //     tab = 'fourth'
        //     break
        //   default:
        //     tab = 'third'
        //     break
        // }
        // this.$refs.searchTabs.changeTab(tab)
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