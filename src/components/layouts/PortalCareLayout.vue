<template>
  <div id="portalCareLayout">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header"></portal-header>
    </a-row>

    <a-row>
      <search-header title="IP管家" ref="searchTabs"></search-header>
      <search-menu :defaultActiveKey="['eighth']" @changeTab="changeTab" ref="searchMenu"></search-menu>
    </a-row>

    <router-view v-if="isRouterAlive"></router-view>
    <a-row>
      <portal-footer></portal-footer>
    </a-row>
  </div>
</template>

<script>
  import AffixButton from '../general/AffixButton'
  import PortalFooter from '../general/PortalFooter'
  import PortalHeader from '../general/PortalHeader'
  import SearchHeader from '../SearchHeader'
  import SearchMenu from '../SearchMenu'

  export default {
    name: 'PortalCareLayout',
    components: { SearchMenu, SearchHeader, PortalHeader, PortalFooter, AffixButton },
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
            key: 'CareCenter',
            title: 'IP管家',
            url: 'care-center'
          }
        ]
      }
    },
    created() {
      this.$nextTick(() => {
        this.changeTab(this.$route.name)
      })
    },
    watch: {
      '$route'(to, from) {
        this.changeTab(to.name)
      }
    },
    methods: {
      changeTab(activeKey) {
        let tab = 'first'
        switch (activeKey) {
          case 'CareCenter':
            tab = 'first'
            break
          case 'CareCenterArticleMessage':
            tab = 'fiveth'
            break
        }
        this.$refs.searchTabs.changeTab(tab)
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
        this.$refs.searchMenu.changeAdmin()
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style scoped>

</style>