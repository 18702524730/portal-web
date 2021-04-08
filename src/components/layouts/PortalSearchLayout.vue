<template>
  <div id="portalSearchLayout">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header">
      </portal-header>
    </a-row>

    <a-row v-if="$route.name !== 'SearchDetail'">
      <search-header :title="oldData?'IP检索':$route.query.menuKey" ref="searchTabs"></search-header>
      <search-menu v-if="!oldData" :defaultActiveKey="[$route.query.activeKey]" ref="searchMenu"></search-menu>
      <head-menu :menu-list="menuList" :focus="$route.name" v-if="oldData"></head-menu>
    </a-row>

    <a-row>
      <router-view v-if="isRouterAlive" :sb-url="url"></router-view>
    </a-row>

    <a-row>
      <portal-footer></portal-footer>
    </a-row>
  </div>
</template>

<script>
  import { getAction } from '@/api/manage'
  import AffixButton from '../general/AffixButton'
  import PortalHeader from '../general/PortalHeader'
  import PortalFooter from '../general/PortalFooter'
  import SearchMenu from '../SearchMenu'
  import SearchHeader from '../SearchHeader'
  import HeadMenu from '../HeadMenu'

  export default {
    name: 'PortalSearchLayout',
    components: { HeadMenu, SearchHeader, SearchMenu, PortalFooter, PortalHeader, AffixButton },
    provide() {
      return {
        reload: this.reload,
        headLogin: this.headLogin,
        loginNotReload: this.loginNotReload
      }
    },
    props: {
      oldData: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isRouterAlive: true,
        platformList: [],
        menuList: [
          {
            key: 'PatentSearchShiBei',
            title: '专利',
            url: 'patent-searching'
          },
          {
            key: 'BrandSearchShiBei',
            title: '商标',
            url: 'brand-searching'
          },
          {
            key: 'LawSearchShibei',
            title: '法律文书',
            url: 'law-searching'
          },
          {
            key: 'GeographySign',
            title: '地理标志',
            url: 'geography-sign'
          }
        ],
        sburl: {
          dictCode: 'sburl',
          dictOptions: []
        },
        dictUrl: '/zscq/portal/getDictInfo',
        url: '',
        urlLoading: false,
        title: ''
      }
    },
    created() {
      this.initDictData(this.sburl)
    },
    methods: {
      initDictData(item) {
        // 根据字典Code, 初始化字典数组
        const param = { code: item.dictCode }
        getAction(this.dictUrl, param).then((res) => {
          if (res.success) {
            item.dictOptions = res.result
            this.url = item.dictOptions[0].text
          }
        })
      },
      login() {
        this.$refs.header.login()
      },
      headLogin(type, gotoRouter, gotuQuery) {
        if (type === 'goto') {
          this.$refs.header.loginAndGoto(gotoRouter, gotuQuery)
        } else {
          this.$refs.header.login()
        }
      },
      loginNotReload() {
        this.$refs.header.loginNotReload()
      },
      reload() {
        this.isRouterAlive = false
        if (!this.oldData) {
          this.$refs.searchMenu.changeAdmin()
        }
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style scoped>

</style>