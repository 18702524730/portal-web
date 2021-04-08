<template>
  <div id="searchLayout">
    <a-row>
      <portal-header ref="header"></portal-header>
      <search-header @func="refresh" ref="searchTabs"></search-header>
      <search-menu ref="searchMenu"></search-menu>
    </a-row>
    <a-row>
      <router-view ref="search" v-if="isRouterAlive"></router-view>
    </a-row>
    <a-row :gutter="20" style="margin:0;">
    </a-row>
    <a-row>
      <portal-footer></portal-footer>
    </a-row>
    <affix-button></affix-button>
  </div>
</template>

<script>


  import PortalHeader from '../general/PortalHeader'
  import SearchHeader from '../SearchHeader'
  import SearchMenu from '../SearchMenu'
  import PortalFooter from '../general/PortalFooter'
  import AffixButton from '../general/AffixButton'

  export default {
    name: 'SearchLayout',
    components: { AffixButton, PortalFooter, SearchMenu, SearchHeader, PortalHeader },
    provide() {
      return {
        reload: this.reload,
        headLogin: this.headLogin
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    created() {
      this.$nextTick(() => {
        const tab = (this.$route.query.tab === undefined || this.$route.query.tab === null || this.$route.query.tab === '') ? 'first' : this.$route.query.tab
        this.$refs.searchTabs.changeNewTab(tab)
      })
    },
    methods: {
      refresh(param) {
        this.$refs.search.refresh(param)
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
        this.$refs.searchMenu.changeAdmin()
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style scoped lang="less">

</style>