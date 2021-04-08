<template>
  <div id="portalIPFinancialLayout">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header"></portal-header>
    </a-row>

    <a-row>
      <search-header title="IP金融" ref="searchTabs"></search-header>
    </a-row>

    <a-row>
      <head-menu :menu-list="menuList" title="金融机构入驻" :focus="$route.name" @changeTab="changeTab"></head-menu>
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
  import HeadMenu from '../HeadMenu'
  import SearchHeader from '../SearchHeader'

  export default {
    name: 'PortalIPFinancialLayout',
    components: { SearchHeader, HeadMenu, PortalFooter, PortalHeader, AffixButton },
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
            key: 'FinancialService',
            title: '一带一路引导资金',
            url: 'financial-service'
          },
          {
            key: 'FinancialPledgeFinancing',
            title: '质押融资',
            url: 'financial-pledge-financing'
          },
          {
            key: 'IPInsurance',
            title: 'IP保险',
            url: 'ip-insurance'
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
          case 'FinancialService':
            tab = 'first'
            break
          case 'FinancialServiceArticleMessage':
            tab = 'fiveth'
            break
          case 'PledgeFinancing':
          case 'IPInsurance':
            return
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