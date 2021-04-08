<template>
  <div id="portalServiceLayout">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header"></portal-header>
    </a-row>

    <a-row>
      <search-header title="服务集市" ref="searchTabs"></search-header>
    </a-row>

    <a-row>
      <head-menu :menu-list="menuList" title="发布服务" :focus="$route.name" @changeTab="changeTab"></head-menu>
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
  import PortalFooter from '../general/PortalFooter'
  import SearchHeader from '../SearchHeader'
  import HeadMenu from '../HeadMenu'

  export default {
    name: 'PortalServiceLayout',
    components: { HeadMenu, SearchHeader, PortalFooter, PortalHeader, AffixButton },
    provide() {
      return {
        reload: this.reload,
        headLogin: this.headLogin
      }
    },
    data() {
      return {
        isRouterAlive: true,
        platformList: [],
        top: 10,
        bottom: 10,
        menuList: [
          {
            key: 'ServiceCenter',
            title: '服务大厅',
            url: 'service-center'
          },
          {
            key: 'ServiceOrg',
            title: '服务机构',
            url: 'service-org'
          },
          {
            key: 'ServiceProject',
            title: '服务项目',
            url: 'service-project'
          },
          {
            key: 'ServiceVoucher',
            title: '服务券',
            url: 'developing-service-voucher'
          }
        ]
      }
    },
    created() {
      this.$nextTick(() => {
        this.changeTab(this.$route.name)
      })
    },
    methods: {
      changeTab(activeKey) {
        let tab = 'first'
        switch (activeKey) {
          case 'ServiceCenter':
            tab = 'first'
            break
          case 'ServiceProject':
            tab = 'first'
            break
          case 'FinancialService':
            tab = 'first'
            break
          case 'ServiceVoucher':
            tab = 'first'
            break
          case 'CareCenter':
            tab = 'fiveth'
            break
          case 'ServiceOrg':
            tab = 'second'
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
    }
  }
</script>

<style scoped>

</style>