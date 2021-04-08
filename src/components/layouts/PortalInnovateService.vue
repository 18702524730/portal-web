<template>
  <div id="portalInnovateService">
    <affix-button></affix-button>
    <a-row>
      <portal-header ref="header">
      </portal-header>
    </a-row>

    <a-row>
      <search-header :title="'创新监测'"></search-header>
      <head-menu :menu-list="menuList" :focus="$route.name" v-if="oldData" @func="reload"></head-menu>
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
  import SearchHeader from '../SearchHeader'
  import HeadMenu from '../HeadMenu'
  import { isLoginAndAdminOrGov } from '@/utils/role'

  export default {
    name: 'PortalInnovateService',
    components: { HeadMenu, SearchHeader, PortalFooter, PortalHeader, AffixButton },
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
            key: 'InnovateNewBigData',
            title: '区域创新指标',
            url: 'innovateNew-big-data'
          },
          // {
          //   key: 'InnovateBigData',
          //   title: '区域创新指标',
          //   url: 'innovate-big-data'
          // },
          {
            key: 'CompanyEvaluation',
            title: '创新主体评价',
            url: 'company-evaluation'
          },
          {
            key: 'CompanyPortrait',
            title: '创新主体画像',
            url: 'company-portrait'
          },
          {
            key: 'CompanyCredit',
            title: '创新主体信用',
            url: 'company-credit'
          },
          {
            key: 'ServiceAgencies',
            title: '服务机构',
            url: 'service-agencies'
          }
          // ,
          // {
          //   key: 'InnovateMainPortrayal',
          //   title: '创新主体画像',
          //   url: 'developing-innovate-main-portrayal'
          // }
        ],
        oldMenuList: [
          {
            key: 'PatentShiBeiPort',
            title: '专利导航报告',
            url: 'patentbox-patent'
          }
        ],
        newMenuList: [
          {
            key: 'PatentShiBeiPort',
            title: '专利导航报告',
            url: 'patentbox-patent'
          },
          // {
          //   key: 'InnovateNewBigData',
          //   title: '区域创新指标',
          //   url: 'innovateNew-big-data'
          // },
          {
            key: 'InnovateBigData',
            title: '区域创新指标',
            url: 'innovate-big-data'
          },
          {
            key: 'IndustryShiBeiPort',
            title: '产业专题数据库',
            url: 'industrybox-industry'
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
      this.initMenuList()
      this.initDictData(this.sburl)
      this.isLoginAndAdmin()
    },
    methods: {
      isLoginAndAdmin(){
        if (!isLoginAndAdminOrGov()) {
          this.$router.push({ name: 'Home' })
        }
      },
      initMenuList() {
      },
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
        this.$nextTick(function() {
          this.isRouterAlive = true
          this.initMenuList()
          this.isLoginAndAdmin()
        })
      }
    }
  }
</script>

<style scoped>

</style>