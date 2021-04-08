<template>
  <div id="headMenu">
    <div class="container">
      <a-row>
        <a-col :span="17">
          <a-menu
            :defaultSelectedKeys="[newFocus]"
            :selectedKeys="[newFocus]"
            mode="horizontal"
            :theme="theme"
            @click="changMenu"
          >
            <template v-for="item in menuList" class="inn-item">
              <a-menu-item v-if="!item.children" :key="item.key">
                <router-link :to="{name:item.key}" v-if="item.url.indexOf('developing-') === -1 && item.url.indexOf('link:') === -1">{{item.title}}
                </router-link>
                <span v-else @click="developSpan(item)" style="color: rgba(0, 0, 0, 0.65);">{{item.title}}</span>
              </a-menu-item>
            </template>
          </a-menu>
        </a-col>
        <a-col :span="7">
          <a-button type="primary" size="large" v-if="newTitle2 !== ''" @click="publishFunction2"
                    class="my-btn2 my-btn">
            {{newTitle2}}
          </a-button>
          <a-button type="primary" size="large" v-if="newTitle !== ''" @click="publishFunction" class="my-btn"
                    :disabled="btnState">
            {{newTitle}}
          </a-button>
        </a-col>
      </a-row>

    </div>
    <!--<a-modal destroyOnClose :visible="visible" :width="800" :footer="null">-->
    <!--<supply-demand-publish :render="visible"></supply-demand-publish>-->
    <!--</a-modal>-->
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import { isAgency, isAdmin, getRole, isPersonal, isEnterprise } from '@/utils/role'
  import { judgeState } from '@/utils/util'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: 'HeadMenu',
    components: {},
    inject: ['headLogin'],
    props: {
      theme: {
        type: String,
        default: 'light'
      },
      menuList: {
        type: Array,
        default: () => {
          return []
        }
      },
      title: {
        type: String,
        default: ''
      },
      focus: {
        type: String,
        default: ''
      }

    },
    data() {
      return {
        keyRole: '',
        keyRole2: '',
        visible: true,
        btnState: false
      }
    },
    methods: {
      ...mapGetters(['userInfo', 'token']),
      publishFunction2() {
        if (judgeState()) {
          // 登录了，直接到首页
          this.jumpModal(this.keyRole2)
        } else {
          // 没有登录，则先进行登录
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      developSpan(item) {
        if (item.url.indexOf('link:') !== -1){
          const type = item.key
          let link = ""
          switch (type){
            case "ActivistNetwork":
              link = "http://www.ipwq.cn/organization#Organ1"
              break
            case "OverseasRights":
              link = "https://www.worldip.cn/"
              break
            default:
              link = "http://www.ipwq.cn/organization#Organ1"
          }
          window.open(link, "_blank")
        } else {
          this.$message.info('建设中，敬请期待')
        }
      },
      publishFunction() {
        if (judgeState()) {
          // 登录了，直接到首页
          this.jumpModal()
        } else {
          // 没有登录，则先进行登录
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      judagRealName(path, query = {}) {
        const user = this.userInfo()
        const role = getRole()
        this.btnState = true
        getActionUpdateKeyword('/user/portalUserCert/nameCertification', {
          username: user.username,
          roleCode: role
        }).then((res) => {
          if (res.success) {
            const newPage = this.$router.resolve({ name: path, query: query })
            window.open(newPage.href, '_blank')
          } else {
            const token = Vue.ls.get(ACCESS_TOKEN)
            if (isPersonal()) {
              // 这是个人
              const path = '/user/portalUserCert'
              const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
              window.open(newUrl)
              this.$message.warning('您还未进行实名认证，请先认证')
            } else {
              const path = '/person/partInfo'
              const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
              window.open(newUrl)
              this.$message.warning('您还未进行主体认证，请先认证')
            }
          }
          this.btnState = false
        }).finally(() => {
          this.btnState = false
        })
      },
      jumpModal(keyRole = this.keyRole) {
        let path = '/'
        let type = 'center'
        const query = {}
        switch (keyRole) {
          case '0':
            // 发布服务，判断如果非机构角色
            if (!isAgency()) {
              this.$message.warning('您不是服务机构，暂不能发布！')
              return false
            } else {
              path = '/service/portalServiceAgencyProduct/list'
            }
            break
          case '1':
            // 金融机构入驻，跳到主体信息
            if (isAdmin()) {
              this.$message.warning('您没有权限，暂时不能操作!')
              return
            }
            path = '/person/partInfo'
            break
          case '2':
            // 发布专利需求
            if (isAdmin()) {
              this.$message.warning('您没有权限，暂时不能操作!')
              return
            }
            path = 'SelectPublishDemandType'
            this.judagRealName(path)
            type = 'portal'
            break
          case '3':
            // 发布供应专利
            if (isAdmin()) {
              this.$message.warning('您没有权限，暂时不能操作!')
              return
            }
            path = 'SelectPublishType'
            this.judagRealName(path)
            type = 'portal'
            this.visible = true
            break
          case '4':
            // 服务机构入驻
            path = '/person/partInfo'
            break
          case '6':
            // 发布需求信息
            if (this.focus === 'BrandCenter' || this.focus === 'BrandDetails') {
              path = '/trademark/portalRequirementTrademark/list'
            } else {
              path = '/patent/portalRequirementPatent/list'
            }
            break
          case '5':
            // 发布供应信息
            if (this.focus === 'SupplyBrandMessage' || this.focus === 'SupplyBrandDetails') {
              path = '/trademark/requirementPatent/list'
            } else {
              path = '/patent/portalSupplyPatent/list'
            }

            break
          case '7':
            // 我要融资
            if (!isEnterprise()) {
              this.$message.warning('您没有权限，暂时不能操作!')
              return
            }
            path = 'FinancialApply'
            type = 'financial'
            query.keyRoute = 'FinancialPledgeFinancing'
            this.judagRealName(path, query)
            break
        }
        if (type === 'center') {
          // 在后台进行处理
          const token = Vue.ls.get(ACCESS_TOKEN)
          const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
          window.open(newUrl)
        }
        // else if (type === 'financial') {
        //   // 在用户中心进行处理
        //   const newPage = this.$router.resolve({ name: path, query: query })
        //   window.open(newPage.href, '_blank')
        // }
      },
      changMenu(e) {
        this.$emit('changeTab', e.key)
        this.$emit('func')
      },
      getTitle() {
        if (this.focus === 'ProjectCenter' || this.focus === 'ProjectDetails' || this.focus === 'BrandCenter' || this.focus === 'DemandCenter' || this.focus === 'PatentDetails' || this.focus === 'BrandDetails') {
          this.keyRole = '2'
          return '发布需求信息'
        } else if (this.focus === 'SupplyProjectMessage' || this.focus === 'SupplyProjectDetails' || this.focus === 'SupplyBrandMessage' || this.focus === 'SupplyPatentMessage' || this.focus === 'SupplyPatentDetails' || this.focus === 'SupplyBrandDetails') {
          this.keyRole = '3'
          return '发布供应信息'
        } else if (this.focus === 'ServiceVoucher' || this.focus === 'CareCenter' || this.focus === 'ServiceOrder' || this.focus === 'OrderCommitSuccess' || this.focus === 'FinancialApply' || this.focus === 'FinancialPledgeFinancing' || this.focus === 'FinancialOrgShow' || this.focus === 'FinancialConsultShow' || this.focus === 'FinancialConsultArticleMessage') {
          return ''
        } else if (this.focus === 'ServiceCenter' || this.focus === 'ServiceProject') {
          this.keyRole = '0'
          return '发布服务'
        } else if (this.focus === 'FinancialService' || this.focus === 'IPInsurance' || this.focus === 'InsuranceOrgDetails' || this.focus === 'InsuranceProductDetails' || this.focus === 'FinancialOnlineApplyAdd' || this.focus === 'FinancialOnlineApplyEdit' || this.focus === 'FinancialOnlineApplyAudit' || this.focus === 'FinancialOnlineApplyDetails' || this.focus === 'FinancialServiceArticleMessage') {
          this.keyRole = '1'
          return '金融机构入驻'
        } else if (this.focus === 'ServiceOrg') {
          this.keyRole = '4'
          return '服务机构入驻'
        } else if (this.focus === 'TradingCenter') {
          this.keyRole = '3'
          return '发布供应信息'
        }
        if (this.$route.name === 'CompanyEvaluation' || this.$route.name === 'CompanyEvaluationInfo') {
          return ''
        }
        return this.title
      }
    },
    computed: {
      newTitle2() {
        let title = ''
        switch (this.focus) {
          case 'FinancialPledgeFinancing':
          case 'FinancialOrgShow':
          case 'FinancialConsultShow':
          case 'FinancialConsultArticleMessage':
            title = '我要融资'
            this.keyRole2 = '7'
            break
          case 'TradingCenter':
            title = '发布需求信息'
            this.keyRole2 = '2'
            break
          default:
            title = ''
        }

        return title
      },
      newFocus() {
        if (this.$route.name === 'PatentSearchList' || this.$route.name === 'SeniorSearchShibei' || this.$route.name === 'PatentSearchDetail' || this.$route.name === 'ExpressionSearchShibei') {
          return 'PatentSearchShiBei'
        }
        if (this.$route.name === 'TrademarkSearchShiBei' || this.$route.name === 'TrademarkSearchDetail') {
          return 'BrandSearchShiBei'
        }
        if (this.$route.name === 'LawSearchList' || this.$route.name === 'LawSearchDetail') {
          return 'LawSearchShibei'
        }
        if (this.$route.name === 'CloudPaperList' || this.$route.name === 'CloudPaperInfo') {
          return 'CloudPaper'
        }
        if (this.$route.name === 'PatentNavDetail') {
          return 'PatentShiBeiPort'
        }
        if (this.$route.name === 'CompanyEvaluationInfo') {
          return 'CompanyEvaluation'
        }
        if (this.$route.name === 'IPLiveInfo') {
          return 'IPLive'
        }
        if (this.$route.name === 'PortraitInfo') {
          return 'Portrait'
        }
        if (this.$route.name === 'PatentEvaluationInfo' || this.$route.name === 'PatentEvaluationCompare') {
          return 'PatentEvaluation'
        }
        if (this.$route.name === 'CompanyPortraitList' || this.$route.name === 'CompanyPortraitInfo') {
          return 'CompanyPortrait'
        }
        if (this.$route.name === 'CompanyCreditList' || this.$route.name === 'CompanyCreditInfo') {
          return 'CompanyCredit'
        }
        if (this.$route.name === 'IndustryInfo') {
          return 'IndustryShiBeiPort'
        }
        if (this.$route.name === 'PatentAssessInfo') {
          return 'PatentAssess'
        }
        if (this.$route.name === 'AgencyInfo') {
          return 'ServiceAgencies'
        }
        if (this.$route.name === 'PatentNavSysInfo') {
          return 'PatentNavSys'
        }
        if (this.$route.query.keyRoute !== undefined && this.$route.query.keyRoute !== null && this.$route.query.keyRoute !== '') {
          return this.$route.query.keyRoute
        }
        switch (this.focus) {
          case 'AddProjectMessage':
          case 'EditProjectMessage':
          case 'ApprovalProjectMessage':
          case 'ViewProjectMessage':
          case 'AddPatentMessage':
          case 'EditPatentMessage':
          case 'ApprovalPatentMessage':
          case 'ViewPatentMessage':
          case 'AddBrandMessage':
          case 'EditBrandMessage':
          case 'ApprovalBrandMessage':
          case 'ViewBrandMessage':
          case 'HighProjectRegister':
          case 'ProjectTradingOrder':
          case 'ProjectOrderCommitSuccess':
            return 'SupplyProjectMessage'
          case 'AddDemandProject':
          case 'EditDemandProject':
          case 'ApprovalDemandProject':
          case 'ViewDemandProject':
          case 'AddDemandPatent':
          case 'EditDemandPatent':
          case 'ApprovalDemandPatent':
          case 'ViewDemandPatent':
          case 'AddDemandBrand':
          case 'EditDemandBrand':
          case 'ApprovalDemandBrand':
          case 'ViewDemandBrand':
            return 'ProjectCenter'
        }

        if (this.focus === 'BrandCenter' || this.focus === 'ProjectCenter' || this.focus === 'DemandCenter' || this.focus === 'PatentDetails' || this.focus === 'BrandDetails' || this.focus === 'ProjectDetails' || this.focus === 'PublishDemandRegister' || this.focus === 'SelectPublishDemandType') {
          return 'ProjectCenter'
        } else if (this.focus === 'SupplyBrandMessage' || this.focus === 'SupplyProjectMessage' || this.focus === 'SupplyPatentMessage' || this.focus === 'SupplyPatentDetails' || this.focus === 'SupplyBrandDetails' || this.focus === 'SupplyProjectDetails' || this.focus === 'SelectPublishProject' || this.focus === 'SelectPublishType') {
          return 'SupplyProjectMessage'
        } else if (this.focus === 'SearchDetail') {
          return 'PatentShiBeiPort'
        } else {
          return this.focus
        }

      },
      newTitle() {
        return this.getTitle()
      }
    },
    mounted() {
      console.log(this.$route)
    }
  }
</script>

<style scoped lang="less">
  @import "main";

  #headMenu {
    .main-css();
    color: #333333;
    background-color: #f5f6f7;
    font-size: 14px;
    .ant-menu-item {
      font-style: normal;
      font-size: 16px;
      color: #333333;
    }
    .ant-menu-horizontal {
      line-height: 46px;
      white-space: nowrap;
      border: 0;
      border-bottom: 0;
      box-shadow: none;
    }
    .ant-menu {
      background-color: #f5f6f7;
    }
    .ant-btn-primary {
      margin: 5px 0;
      float: right;
      color: #fff;
      background-color: @main-color;
      border-color: @main-color;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      /deep/ span {
        padding: 0 10px;
      }
    }

    /deep/ .ant-menu-item-selected {
      border-color: @main-color !important;
    }
    /deep/ .ant-menu-item-active {
      border-color: @main-color;
    }
    .ant-menu-horizontal /deep/ .ant-menu-item-selected /deep/ a {
      color: @main-color;
    }
    /deep/ .ant-menu-item-active {
      border-color: @main-color;
      a {
        color: @main-color;
      }
    }
    .ant-menu-item {
      padding: 0 5px;
      margin: 0 20px;
    }
    .my-btn2 {
      margin-left: 20px;
    }
    .my-btn {
      border-radius: 30px;
    }
  }

</style>