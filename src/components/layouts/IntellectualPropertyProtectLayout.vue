<template>
  <div id="intellectualPropertyProtectLayout">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header"></portal-header>
    </a-row>

    <a-row>
      <search-header title="知识产权保护" ref="searchTabs"></search-header>
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
    name: 'IntellectualPropertyProtectLayout',
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
            key: 'NewFastActivist',
            title: '快速维权',
            url: 'fast-activist'
          },
          {
            key: 'MultDisputeResolution',
            title: '多元化纠纷解决',
            url: 'mult-dispute-resolution'
          },
          {
            key: 'ActivistNetwork',
            title: '全国维权援助网络',
            url: 'activist-network'
          },
          {
            key: 'OverseasRights',
            title: '海外维权',
            url: 'overseas-rights'
          },
          {
            key: 'NewActivistResources',
            title: '维权资源',
            url: 'activist-resources'
          },
          {
            key: 'AdministratiVeverdict',
            title: '行政裁决',
            url: 'developing-administrati-veverdict'
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
        const tab = 'first'
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