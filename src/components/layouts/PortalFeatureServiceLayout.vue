<template>
  <div id="portalFeatureServiceLayout">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header"></portal-header>
    </a-row>

    <a-row>
      <search-header title="特色服务" ref="searchTabs"></search-header>
    </a-row>

    <a-row>
      <head-menu :menu-list="isAdmin || isGov?menuList:(register?newMenuList2:newMenuList)" :focus="$route.name"
                 @changeTab="changeTab"></head-menu>
    </a-row>

    <router-view v-if="isRouterAlive"></router-view>

    <a-row>
      <portal-footer></portal-footer>
    </a-row>
  </div>
</template>

<script>
  import { isLoginAndAdmin, isLoginAndGov } from '@/utils/role'
  import { judgeState } from '@/utils/util'
  import AffixButton from '../general/AffixButton'
  import PortalHeader from '../general/PortalHeader'
  import PortalFooter from '../general/PortalFooter'
  import HeadMenu from '../HeadMenu'
  import SearchHeader from '../SearchHeader'

  export default {
    name: 'PortalFeatureServiceLayout',
    components: { SearchHeader, HeadMenu, PortalFooter, PortalHeader, AffixButton },
    provide() {
      return {
        reload: this.reload,
        headLogin: this.headLogin,
        loginNotReload: this.loginNotReload
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
            key: 'IndustryShiBeiPort',
            title: '重点行业专利库',
            url: 'industrybox-industry'
          },
          {
            key: 'PatentShiBeiPort',
            title: '专利导航报告',
            url: 'patentbox-patent'
          },
          {
            key: 'PatentNavSys',
            title: '专利导航分析',
            url: 'patent-nav-sys'
          },
          {
            key: 'PatentEvaluation',
            title: '专利价值评价',
            url: 'patent-evaluation'
          },
          {
            key: 'PatentAssess',
            title: '专利资产评估',
            url: 'patent-assess'
          },
          {
            key: 'TrainMessage',
            title: '培训信息',
            url: 'train-message'
          },
          // {
          //   key: 'PatentValueEvaluation',
          //   title: '专利价值评估',
          //   url: 'developing-patent-value-evaluation'
          // },
          // {
          //   key: 'ImageTextLive',
          //   title: '图文直播',
          //   url: 'developing-image-text-live'
          // },
          {
            key: 'ProfessorBank',
            title: '专家库',
            url: 'professor-bank'
          }
        ],
        newMenuList: [
          {
            key: 'PatentShiBeiPort',
            title: '专利导航报告',
            url: 'patentbox-patent'
          },
          {
            key: 'PatentNavSys',
            title: '专利导航分析',
            url: 'patent-nav-sys'
          }
          // ,
          // {
          //   key: 'PatentEvaluation',
          //   title: '专利价值评价',
          //   url: 'patent-evaluation'
          // },
          // {
          //   key: 'PatentAssess',
          //   title: '专利资产评估',
          //   url: 'patent-assess'
          // },
          // {
          //   key: 'TrainMessage',
          //   title: '培训信息',
          //   url: 'train-message'
          // },
          // {
          //   key: 'PatentValueEvaluation',
          //   title: '专利价值评估',
          //   url: 'developing-patent-value-evaluation'
          // },
          // {
          //   key: 'ImageTextLive',
          //   title: '图文直播',
          //   url: 'developing-image-text-live'
          // },
          // {
          //   key: 'ProfessorBank',
          //   title: '专家库',
          //   url: 'professor-bank'
          // }
        ],
        newMenuList2: [
          {
            key: 'PatentShiBeiPort',
            title: '专利导航报告',
            url: 'patentbox-patent'
          },
          {
            key: 'PatentNavSys',
            title: '专利导航分析',
            url: 'patent-nav-sys'
          },
          {
            key: 'TrainMessage',
            title: '培训信息',
            url: 'train-message'
          }
        ],
        isAdmin: isLoginAndAdmin(),
        isGov: isLoginAndGov(),
        register: judgeState()
      }
    },
    created() {
      this.$nextTick(() => {
        this.changeTab(this.$route.name)
      })
    },
    methods: {
      changeAdmin() {
        this.isAdmin = isLoginAndAdmin()
        this.isGov = isLoginAndGov()
        this.register = judgeState()
      },
      changeTab(activeKey) {
        let tab = 'first'
        switch (activeKey) {
          case 'TrainMessage':
            tab = 'fiveth'
            break
          case 'TrainArticleMessage':
          case 'SearchDetail':
            tab = 'fiveth'
            break
          case 'PatentValueEvaluation':
          case 'ImageTextLive':
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
      loginNotReload() {
        this.$refs.header.loginNotReload()
      },
      reload() {
        this.isRouterAlive = false
        this.changeAdmin()
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style scoped>

</style>