<template>
  <div id="financialDetailsLayout">
    <a-row>
      <portal-header ref="header"></portal-header>
    </a-row>

    <a-row>
      <header-navigation :have-heart="false" :data="orgMessage"
                         :router-link="{name:'FinancialService'}"></header-navigation>
    </a-row>

    <a-row>
      <financial-service-menu :menu-list="menuList" :focus="$route.name" class="my-head"></financial-service-menu>
    </a-row>

    <div class="container">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="24" :md="6" :lg="6">
          <institution-card :org="orgMessage" style="margin-bottom: 5px" request-type="financial"></institution-card>
        </a-col>

        <a-col :xs="24" :sm="24" :md="18" :lg="18">
          <router-view v-if="isRouterAlive" :org-message="orgMessage" :product-message="productMessage"
                       requestType="financial"></router-view>
        </a-col>
      </a-row>
    </div>
    <div style="background-color: #ffffff">
      <a-row>
        <portal-footer></portal-footer>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { getAction } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import {
    INFORMATION_ITEM
  } from '@/store/mutation-types'
  import Vue from 'vue'
  import PortalHeader from '../general/PortalHeader'
  import PortalFooter from '../general/PortalFooter'
  import HeaderNavigation from '../general/HeaderNavigation'
  import FinancialServiceMenu from '../general/FinancialServiceMenu'
  import InstitutionCard from '../card/InstitutionCard'

  export default {
    name: 'FinancialDetailsLayout',
    components: { InstitutionCard, FinancialServiceMenu, HeaderNavigation, PortalFooter, PortalHeader },
    provide() {
      return {
        reload: this.reload,
        headLogin: this.headLogin
      }
    },
    data() {
      return {
        platformList: [],
        isRouterAlive: true,
        menuList: [
          {
            key: 'FinancialInstitutionHome',
            title: '机构首页',
            url: 'financial-institution-home'
          },
          {
            key: 'FinancialIntroduce',
            title: '机构介绍',
            url: 'financial-introduce'
          },
          {
            key: 'FinancialProjectIntro',
            title: '服务项目',
            url: 'financial-project-intro'
          }
        ],
        request: {
          orderInfo: {},
          org: {}
        },
        financeUrl: '/zscq/portal/getFinanceProductAllInfo',
        orgMessage: {},
        productMessage: {}
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      refresh() {
        this.loadData()
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
      },
      loadData() {
        const preview = this.$route.query.preview
        if (preview === '1') {
          const a = Vue.ls.get(INFORMATION_ITEM)
          const items = JSON.parse(a.item)
          this.orgMessage = items
          this.productMessage = {}
        } else {
          let param = {
            serviceProductId: this.$route.query.itemId,
            orgId: this.$route.query.orgId
          }
          param = filterObj(param)

          this.spinning = true
          getAction(this.financeUrl, param).then((res) => {
            if (res.success) {
              this.orgMessage = res.result.org
              this.productMessage = res.result.agencyProduct
            }
            this.spinning = false
          }).finally(() => {
            this.spinning = false
          })
        }
      }
    },
    watch: {
      '$route'(to, from) {
        // 如果需要最新的数据
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";
  #financialDetailsLayout {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    .container {
      padding-bottom: 10px;
    }
    overflow: hidden;
    .my-head {
      background-color: @main-color;
      /deep/ .container {
        background-color: @main-color !important;
      }
    }
  }

</style>