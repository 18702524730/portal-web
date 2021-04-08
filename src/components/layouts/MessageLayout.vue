<template>
  <div id="messageLayout">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header"></portal-header>
    </a-row>

    <a-row>
      <search-header title="政策资讯" ref="searchTabs"></search-header>
    </a-row>

    <a-row>
      <head-menu :menu-list="menuList" :focus="$route.name" style="margin-bottom: 5px;"></head-menu>
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
  import HeadMenu from '../HeadMenu'

  export default {
    name: 'MessageLayout',
    components: { HeadMenu, SearchHeader, PortalHeader, PortalFooter, AffixButton },
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
            key: 'NewsConsult',
            title: '政策法规',
            url: 'news-consult'
          },
          {
            key: 'SpecialMessage',
            title: '专题信息',
            url: 'special-message'
          },
          {
            key: 'NoticeMessage',
            title: '公告资讯',
            url: 'notice-message'
          }
        ]
      }
    },
    created() {
      this.$nextTick(() => {
        this.$refs.searchTabs.changeTab('fiveth')
      })
    },
    methods: {
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