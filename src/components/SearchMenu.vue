<template>
  <div id="searchMenu">
    <div class="container">
      <div class="header-pt" id="header-pt">
        <div style="display: flex;">
          <a-menu mode="horizontal" :defaultSelectedKeys="defaultActiveKey" @click="selectItem">
            <a-menu-item key="first">首页</a-menu-item>
            <a-sub-menu key="second" popupClassName="ant-menu-submenu-placement-bottomCenter">
              <span slot="title" @click="selectOp('second')" class="submenu-title-wrapper">IP检索</span>
              <a-menu-item key="sub:PatentSearchShiBei" class="submenu-menu">专利</a-menu-item>
              <a-menu-item key="sub:BrandSearchShiBei" class="submenu-menu">商标</a-menu-item>
              <a-menu-item key="sub:LawSearchShibei" class="submenu-menu">法律文书</a-menu-item>
              <!--<a-menu-item key="developing:GeographySign" class="submenu-menu">地理标志(建设中)</a-menu-item>-->
              <a-menu-item key="sub:GeographySign" class="submenu-menu">地理标志</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="fourth" placement="bottomCenter">
              <span slot="title" @click="selectOp('fourth')" class="submenu-title-wrapper">交易中心</span>
              <a-menu-item key="sub:TradingCenter" class="submenu-menu">交易大厅</a-menu-item>
              <a-menu-item key="sub:SupplyProjectMessage" class="submenu-menu">供应信息</a-menu-item>
              <a-menu-item key="sub:ProjectCenter" class="submenu-menu">需求信息</a-menu-item>
              <a-menu-item key="sub:ProjectZone" class="submenu-menu">项目专区</a-menu-item>
              <a-menu-item key="sub:CaseShow" class="submenu-menu">案例展示</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="third" placement="bottomCenter">
              <span slot="title" @click="selectOp('third')" class="submenu-title-wrapper">服务集市</span>
              <a-menu-item key="sub:ServiceCenter" class="submenu-menu">服务大厅</a-menu-item>
              <a-menu-item key="sub:ServiceOrg" class="submenu-menu">服务机构</a-menu-item>
              <a-menu-item key="sub:ServiceProject" class="submenu-menu">服务项目</a-menu-item>
              <a-menu-item key="developing:ServiceVoucher" class="submenu-menu">服务券(建设中)</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="financial" placement="bottomCenter">
              <span slot="title" @click="selectOp('financial')" class="submenu-title-wrapper">IP金融</span>
              <a-menu-item key="sub:FinancialService" class="submenu-menu">一带一路引导资金</a-menu-item>
              <!--<a-menu-item key="developing:FinancialPledgeFinancing" class="submenu-menu">质押融资(建设中)</a-menu-item>-->
              <a-menu-item key="sub:FinancialPledgeFinancing" class="submenu-menu">质押融资</a-menu-item>
              <!--<a-menu-item key="developing:IPInsurance" class="submenu-menu">IP保险(建设中)</a-menu-item>-->
              <a-menu-item key="sub:IPInsurance" class="submenu-menu">IP保险</a-menu-item>
            </a-sub-menu>
            <!--<a-menu-item key="developing:protect">知识产权保护</a-menu-item>-->
            <a-sub-menu key="protect" placement="bottomCenter">
              <span slot="title" @click="selectOp('protect')" class="submenu-title-wrapper">知识产权保护</span>
              <a-menu-item key="sub:NewFastActivist" class="submenu-menu">快速维权</a-menu-item>
              <a-menu-item key="sub:MultDisputeResolution" class="submenu-menu">多元化纠纷解决</a-menu-item>
              <a-menu-item key="sub:ActivistNetwork" class="submenu-menu">全国维权援助网络</a-menu-item>
              <a-menu-item key="sub:OverseasRights" class="submenu-menu">海外维权</a-menu-item>
              <a-menu-item key="sub:NewActivistResources" class="submenu-menu">维权资源</a-menu-item>
              <a-menu-item key="developing:AdministratiVeverdict" class="submenu-menu">行政裁决(建设中)</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="eighth">IP管家</a-menu-item>
            <!-- <a-menu-item key="fiveth">云画报</a-menu-item> -->
            <a-sub-menu key="fiveth" placement="bottomCenter">
              <span slot="title" @click="selectOp('fiveth')" class="submenu-title-wrapper">云画报</span>
              <a-menu-item key="sub:CloudPaper" class="submenu-menu">云画报</a-menu-item>
              <!--<a-menu-item key="developing:IPLive" class="submenu-menu">IP图文直播(建设中)</a-menu-item>-->
              <a-menu-item key="sub:IPLive" class="submenu-menu">IP图文直播</a-menu-item>
              <!--<a-menu-item key="developing:Portrait" class="submenu-menu">IP画像(建设中)</a-menu-item>-->
              <a-menu-item key="sub:Portrait" class="submenu-menu">IP画像</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="seventh" placement="bottomCenter">
              <span slot="title" @click="selectOp('seventh')" class="submenu-title-wrapper">政策资讯</span>
              <a-menu-item key="sub:NewsConsult" class="submenu-menu">政策法规</a-menu-item>
              <a-menu-item key="sub:SpecialMessage" class="submenu-menu">专题信息</a-menu-item>
              <a-menu-item key="sub:NoticeMessage" class="submenu-menu">公告资讯</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="feature" placement="bottomCenter">
              <span slot="title" @click="selectOp('feature')" class="submenu-title-wrapper">特色服务</span>
              <a-menu-item key="sub:IndustryShiBeiPort" class="submenu-menu" v-if="isAdmin || isGov">重点行业专利库</a-menu-item>
              <a-menu-item key="sub:PatentShiBeiPort" class="submenu-menu">专利导航报告</a-menu-item>
              <a-menu-item key="sub:PatentNavSys" class="submenu-menu">专利导航分析</a-menu-item>
              <a-menu-item key="sub:PatentEvaluation" class="submenu-menu" v-if="isAdmin || isGov">专利价值评价</a-menu-item>

              <a-menu-item key="sub:PatentAssess" class="submenu-menu" v-if="isAdmin || isGov">专利资产评估</a-menu-item>

              <a-menu-item key="sub:TrainMessage" class="submenu-menu" v-if="register">培训信息</a-menu-item>
              <!-- <a-menu-item key="developing:PatentValueEvaluation" class="submenu-menu">专利价值评估(建设中)</a-menu-item> -->
              <!--<a-menu-item key="developing:ImageTextLive" class="submenu-menu">图文直播(建设中)</a-menu-item>-->
              <!--<a-menu-item key="developing:ProfessorBank" class="submenu-menu">专家库(建设中)</a-menu-item>-->
              <a-menu-item key="sub:ProfessorBank" class="submenu-menu" v-if="isAdmin || isGov">专家库</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sixth" placement="bottomCenter" v-if="isAdmin || isGov">
              <span slot="title" @click="selectOp('sixth')" class="submenu-title-wrapper">创新监测</span>
              <a-menu-item key="sub:InnovateNewBigData" class="submenu-menu">区域创新指标</a-menu-item>
              <!-- <a-menu-item key="sub:InnovateBigData" class="submenu-menu">区域创新指标</a-menu-item> -->
              <a-menu-item key="sub:CompanyEvaluation" class="submenu-menu">创新主体评价</a-menu-item>
              <a-menu-item key="sub:CompanyPortrait" class="submenu-menu">创新主体画像</a-menu-item>
              <a-menu-item key="sub:CompanyCredit" class="submenu-menu">创新主体信用</a-menu-item>
              <a-menu-item key="sub:ServiceAgencies" class="submenu-menu">服务机构</a-menu-item>
              <!--              <a-menu-item key="developing:InnovateMainPortrayal" class="submenu-menu">创新主体画像(建设中)</a-menu-item>-->
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { isLoginAndAdmin, isLoginAndGov } from '@/utils/role'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'SearchMenu',
    props: {
      defaultActiveKey: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        isAdmin: false,
        isGov: false,
        register: false
      }
    },
    created() {
      this.changeAdmin()
    },
    methods: {
      changeAdmin() {
        this.isAdmin = isLoginAndAdmin()
        debugger
        this.isGov = isLoginAndGov()
        this.register = judgeState()
      },
      selectItem(item) {
        if (item.key.indexOf('link:') !== -1) {
          const type = item.key.split('sub:')[1]
          let link = ''
          switch (type) {
            case 'ActivistNetwork':
              link = 'http://www.ipwq.cn/organization#Organ1'
              break
            case 'OverseasRights':
              link = 'https://www.worldip.cn/'
              break
            default:
              link = 'http://www.ipwq.cn/organization#Organ1'
          }
          window.open(link, '_blank')
        } else if (item.key.indexOf('sub:') !== -1) {
          const keyArr = item.key.split('sub:')
          this.$router.push({ name: keyArr[1] })
        } else if (item.key.indexOf('developing:') !== -1) {
          // 还正在开发中的项目
          this.$message.info('建设中，敬请期待')
        } else {
          this.renderPage(item.key)
        }
      },
      selectOp(key) {
        this.renderPage(key)
      },
      renderPage(activeKey) {
        let path = '/portal'
        let tab = 'first'
        let menuKey = ''
        switch (activeKey) {
          case 'first' :
            path = '/portal'
            tab = 'first'
            break
          case 'second' :
            path = '/portal/search'
            tab = 'first'
            menuKey = 'IP检索'
            break
          case 'third' :
            path = '/portal/service'
            tab = 'first'
            break
          case 'fourth' :
            path = '/portal/trading'
            tab = 'third'
            break
          case 'fiveth' :
            path = '/portal/cloud'
            menuKey = '云画报'
            break
          case 'sixth' :
            path = '/portal/innovate'
            menuKey = '创新监测'
            break
          case 'seventh' :
            path = '/portal/message'
            break
          case 'eighth' :
            path = '/portal/careCenter'
            tab = 'first'
            break
          case 'financial' :
            path = '/portal/ip-financial'
            tab = 'first'
            break
          case 'feature' :
            path = '/portal/feature-service'
            tab = 'first'
            break
          case 'protect' :
            path = '/portal/intellectual-property-protect'
            break
          default:
            path = '/portal'
            tab = 'first'
            break
        }
        this.$emit('changeTab', tab)
        this.$router.push({ path: path, query: { menuKey: menuKey, activeKey: activeKey } })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "main";

  #searchMenu {
    .main-css();
    color: @main-font-color;
    background-color: @main-bg-color;
    font-size: 14px;
    overflow: hidden;

    /deep/ .ant-tabs-bar {
      border: 0;
      margin-bottom: 5px;
    }

    /deep/ .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-nav .ant-tabs-tab:hover {
      color: @main-color;
    }

    /deep/ .ant-tabs-ink-bar {
      background-color: @main-color;
    }

    .header-pt {
      background-color: @main-bg-color;

      /deep/ .ant-tabs-nav.ant-tabs-nav-animated, .ant-menu {
        float: left;
      }

      /deep/ .ant-tabs-tab {
        height: 45px;
        line-height: 45px;
        font-size: 17px;
        padding: 0 5px;
      }

      /deep/ .ant-tabs-tab:hover {
        color: @main-color;
      }

      .ant-tabs {
        color: @main-font-color;
      }

      /deep/ .ant-menu {
        background-color: @main-bg-color;
        color: @main-font-color;
        font-weight: 400;
        font-size: 16px;
      }

      /deep/ .ant-menu-horizontal {
        border-bottom: 0;
      }

      /deep/ .ant-menu-item-active {
        color: @main-color;
      }

      /deep/ .ant-menu-submenu-active {
        color: @main-color;

        span {
          color: @main-color;
        }
      }

      /deep/ .ant-menu-submenu-title {
        padding: 0 5px;
      }

      /deep/ .ant-menu-item, /deep/ .ant-menu-submenu {
        height: 45px;
        line-height: 45px;

        padding: 0 5px;
        margin-right: 45px !important;
      }

      /deep/ .ant-menu-item-selected {
        color: @main-color;
        border-bottom: 2px solid @main-color !important;
      }

      /deep/ .ant-menu-submenu-selected {
        color: @main-color;
      }
    }
  }

  .submenu-menu {
    font-size: 14px;
  }

  .ant-menu-item:hover, /deep/ .ant-menu-item-active {
    color: @main-color;
  }

  .ant-menu-item-selected {
    color: @main-color;
  }

  /deep/ .ant-menu-submenu-popup {
    left: 200px !important;
  }
</style>