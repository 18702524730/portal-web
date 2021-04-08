/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/portal',
    component: resolve => {
      require(['@/components/layouts/BlankLayout.vue'], resolve)
    },
    redirect: '/portal/main',
    children: [
      {
        path: 'main',
        name: 'Home',
        component: resolve => require(['@/views/Home'], resolve)
      },
      {
        path: 'center-listener',
        name: 'Listener',
        component: resolve => require(['@/views/Listener'], resolve)
      }
    ]
  },
  {
    path: '/portal/portal-login',
    component: resolve => {
      require(['@/views/PortalLogin'], resolve)
    }
  },
  {
    path: '/portal/search',
    component: resolve => {
      require(['@/components/layouts/PortalSearchLayout.vue'], resolve)
    },
    redirect: '/portal/search/patent-searching',
    children: [
      {
        path: 'patent-searching',
        name: 'PatentSearchShiBei',
        component: resolve => require(['@/views/search/patentSearch'], resolve)
      },
      {
        path: 'senior-searching',
        name: 'SeniorSearchShibei',
        component: resolve => require(['@/views/search/seniorSearch'], resolve)
      },
      {
        path: 'expression-searching',
        name: 'ExpressionSearchShibei',
        component: resolve => require(['@/views/search/expressionSearch'], resolve)
      },
      {
        path: 'search-more',
        name: 'searchMore',
        component: resolve => require(['@/views/search/searchMore'], resolve)
      },
      {
        path: 'search-differ',
        name: 'searchDiffer',
        component: resolve => require(['@/views/search/searchDiffer'], resolve)
      },
      {
        path: 'patent-searchlist',
        name: 'PatentSearchList',
        component: resolve => require(['@/views/search/patentSearchList'], resolve)
      },
      {
        path: 'patent-searchdetail/:id/:country/:num/:tp/:istype',
        name: 'PatentSearchDetail',
        component: resolve => require(['@/views/search/patentSearchDetail'], resolve)
      },
      {
        path: 'brand-searching',
        name: 'BrandSearchShiBei',
        component: resolve => require(['@/views/search/trademarkSearch'], resolve)
      },
      {
        path: 'trademark-search',
        name: 'TrademarkSearchShiBei',
        component: resolve => require(['@/views/search/trademarkSearchList'], resolve)
      },
      {
        path: 'trademark-searchdetail/:id',
        name: 'TrademarkSearchDetail',
        component: resolve => require(['@/views/search/trademarkSearchDetail'], resolve)
      },
      {
        path: 'law-searching',
        name: 'LawSearchShibei',
        component: resolve => require(['@/views/search/lawSearch'], resolve)
      },
      {
        path: 'law-searchlist',
        name: 'LawSearchList',
        component: resolve => require(['@/views/search/lawSearchList'], resolve)
      },
      {
        path: 'law-searchdetail/:type/:islocal',
        name: 'LawSearchDetail',
        component: resolve => require(['@/views/search/lawSearchDetail'], resolve)
      },
      // {
      //   path: 'patent-searching',
      //   name: 'PatentSearchShiBei',
      //   component: resolve => require(['@/views/search/IntellectualPropertySearch'], resolve),
      //   props: { base: '/#/search/comsearch/zlsearch' }
      // },
      // {
      //   path: 'brand-searching',
      //   name: 'BrandSearchShiBei',
      //   component: resolve => require(['@/views/search/IntellectualPropertySearch'], resolve),
      //   props: { base: '/#/search/comsearch/sbsearch' }
      // },
      // {
      //   path: 'law-searching',
      //   name: 'LawSearchShibei',
      //   component: resolve => require(['@/views/search/IntellectualPropertySearch'], resolve),
      //   props: { base: '/#/search/comsearch/cjsearch' }
      // },
      {
        path: 'search-detail',
        name: 'SearchDetail',
        component: resolve => require(['@/views/search/SearchDetail'], resolve)
      },
      {
        path: 'geography-sign',
        name: 'GeographySign',
        component: resolve => require(['@/views/search/GeographySign'], resolve)
      },
      {
        path: 'geography-details',
        name: 'GeographyDetails',
        component: resolve => require(['@/views/search/GeographyDetails'], resolve)
      }
    ]
  },
  {
    path: '/portal/innovate',
    component: resolve => {
      require(['@/components/layouts/PortalInnovateService.vue'], resolve)
    },
    redirect: '/portal/innovate/innovateNew-big-data',
    // redirect: '/portal/innovate/innovate-big-data',
    props: { oldData: true },
    children: [
      {
        path: 'innovateNew-big-data',
        name: 'InnovateNewBigData',
        component: resolve => require(['@/views/feature/shibei/newBigData'], resolve)
      },
      {
        path: 'innovate-big-data',
        name: 'InnovateBigData',
        component: resolve => require(['@/views/feature/shibei/BigData'], resolve)
        // component: resolve => require(['@/views/innovate/ShiBeiPort'], resolve),
        // props: { base: '/#/statistical/bigdata' }
      },
      {
        path: 'company-evaluation',
        name: 'CompanyEvaluation',
        component: resolve => require(['@/views/feature/shibei/companyEvaluation'], resolve)
      },
      {
        path: 'company-evaluationinfo/:id',
        name: 'CompanyEvaluationInfo',
        component: resolve => require(['@/views/feature/shibei/companyEvaluationInfo'], resolve)
      },
      {
        path: 'company-portrait',
        name: 'CompanyPortrait',
        component: resolve => require(['@/views/feature/shibei/CompanyPortrait'], resolve)
      },
      {
        path: 'company-portraitlist/:cn',
        name: 'CompanyPortraitList',
        component: resolve => require(['@/views/feature/shibei/CompanyList'], resolve)
      },
      {
        path: 'company-portraitinfo/:id',
        name: 'CompanyPortraitInfo',
        component: resolve => require(['@/views/feature/shibei/CompanyInfo'], resolve)
      },
      {
        path: 'company-credit',
        name: 'CompanyCredit',
        component: resolve => require(['@/views/feature/shibei/CompanyCredit'], resolve)
      },
      {
        path: 'company-creditlist/:cn',
        name: 'CompanyCreditList',
        component: resolve => require(['@/views/feature/shibei/CompanyCreditList'], resolve)
      },
      {
        path: 'company-creditinfo/:id',
        name: 'CompanyCreditInfo',
        component: resolve => require(['@/views/feature/shibei/CompanyCreditInfo'], resolve)
      },
      {
        path: 'service-agencies',
        name: 'ServiceAgencies',
        component: resolve => require(['@/views/feature/shibei/ServiceAgencies'], resolve)
      },
      {
        path: 'agency-info/:id',
        name: 'AgencyInfo',
        component: resolve => require(['@/views/feature/shibei/AgencyInfo'], resolve)
      }
    ]
  },
  // {
  //   path: '/portal/cloud',
  //   component: resolve => {
  //     require(['@/components/layouts/PortalSearchLayout.vue'], resolve)
  //   },
  //   redirect: '/portal/cloud/pictorial',
  //   props: { oldData: false },
  //   children: [
  //     {
  //       path: 'pictorial',
  //       name: 'Pictorial',
  //       component: resolve => require(['@/views/cloud/PictorialShiBeiPort'], resolve),
  //       props: { base: '/#/cloudpaper/cloud' }
  //     }
  //   ]
  // },
  {
    path: '/portal/cloud',
    component: resolve => {
      require(['@/components/layouts/CloudPaperLayout.vue'], resolve)
    },
    redirect: '/portal/cloud/cloud-paper',
    props: { oldData: false },
    children: [
      {
        path: 'cloud-paper',
        name: 'CloudPaper',
        component: resolve => require(['@/views/cloud/CloudPaper'], resolve)
      },
      {
        path: 'cloud-paperlist/:id/:year',
        name: 'CloudPaperList',
        component: resolve => require(['@/views/cloud/CloudPaperList'], resolve)
      },
      {
        path: 'cloud-paperinfo/:lmid/:from',
        name: 'CloudPaperInfo',
        component: resolve => require(['@/views/cloud/CloudPaperInfo'], resolve)
      },
      {
        path: 'ip-live',
        name: 'IPLive',
        component: resolve => require(['@/views/cloud/IPLive'], resolve)
      },
      {
        path: 'ip-liveinfo/:id',
        name: 'IPLiveInfo',
        component: resolve => require(['@/views/cloud/LiveInfo'], resolve)
      },
      {
        path: 'portrait',
        name: 'Portrait',
        component: resolve => require(['@/views/cloud/Portrait'], resolve)
      },
      {
        path: 'portraitinfo/:id',
        name: 'PortraitInfo',
        component: resolve => require(['@/views/cloud/PortraitInfo'], resolve)
      }
    ]
  },
  {
    path: '/portal/trading',
    component: resolve => {
      require(['@/components/layouts/PortalTradingCenterLayout.vue'], resolve)
    },
    redirect: '/portal/trading/trading-center',
    children: [
      {
        path: 'trading-center',
        name: 'TradingCenter',
        component: resolve => require(['@/views/trading/TradingCenter'], resolve)
      },
      {
        path: 'demand-center',
        name: 'DemandCenter',
        component: resolve => require(['@/views/trading/DemandCenter'], resolve)
      },
      {
        path: 'brand-center',
        name: 'BrandCenter',
        component: resolve => require(['@/views/trading/BrandCenter'], resolve)
      },
      {
        path: 'project-center',
        name: 'ProjectCenter',
        component: resolve => require(['@/views/trading/ProjectCenter'], resolve)
      },
      {
        path: 'patent-details',
        name: 'PatentDetails',
        component: resolve => require(['@/views/trading/PatentDetails'], resolve)
      },
      {
        path: 'brand-details',
        name: 'BrandDetails',
        component: resolve => require(['@/views/trading/BrandDetails'], resolve)
      },
      {
        path: 'project-details',
        name: 'ProjectDetails',
        component: resolve => require(['@/views/trading/ProjectDetails'], resolve)
      },
      {
        path: 'supply-patent-message',
        name: 'SupplyPatentMessage',
        component: resolve => require(['@/views/trading/SupplyPatentMessage'], resolve)
      },
      {
        path: 'supply-patent-details',
        name: 'SupplyPatentDetails',
        component: resolve => require(['@/views/trading/SupplyPatentDetails'], resolve)
      },
      {
        path: 'supply-brand-message',
        name: 'SupplyBrandMessage',
        component: resolve => require(['@/views/trading/SupplyBrandMessage'], resolve)
      },
      {
        path: 'supply-brand-details',
        name: 'SupplyBrandDetails',
        component: resolve => require(['@/views/trading/SupplyBrandDetails'], resolve)
      },
      {
        path: 'supply-project-message',
        name: 'SupplyProjectMessage',
        component: resolve => require(['@/views/trading/SupplyProjectMessage'], resolve)
      },
      {
        path: 'supply-project-details',
        name: 'SupplyProjectDetails',
        component: resolve => require(['@/views/trading/new/SupplyProjectDetailsPage'], resolve)
      },
      {
        path: 'select-publish-type',
        name: 'SelectPublishType',
        component: resolve => require(['@/views/trading/new/SelectPublishTypePage'], resolve)
      },
      {
        path: 'select-publish-demand-type',
        name: 'SelectPublishDemandType',
        component: resolve => require(['@/views/trading/new/SelectPublishTypePage'], resolve)
      },
      {
        path: 'select-publish-project',
        name: 'SelectPublishProject',
        component: resolve => require(['@/views/trading/new/SelectPublishProjectPage'], resolve)
      },
      {
        path: 'publish-project-message-page',
        name: 'PublishProjectMessagePage',
        redirect: 'publish-project-message-page/add',
        component: resolve => require(['@/components/layouts/BlankLayout.vue'], resolve),
        children: [
          {
            name: 'AddProjectMessage',
            path: 'add',
            component: resolve => require(['@/views/trading/new/SupplyMessageAddAndEdit'], resolve)
          },
          {
            name: 'EditProjectMessage',
            path: 'edit',
            component: resolve => require(['@/views/trading/new/SupplyMessageAddAndEdit'], resolve)
          },
          {
            name: 'ApprovalProjectMessage',
            path: 'approval',
            component: resolve => require(['@/views/trading/new/SupplyMessageAddAndEdit'], resolve)
          },
          {
            name: 'ViewProjectMessage',
            path: 'view',
            component: resolve => require(['@/views/trading/new/SupplyMessageAddAndEdit'], resolve)
          }
        ]
      },
      {
        path: 'publish-patent-message-page',
        name: 'PublishPatentMessagePage',
        redirect: 'publish-patent-message-page/add',
        component: resolve => require(['@/components/layouts/BlankLayout.vue'], resolve),
        children: [
          {
            name: 'AddPatentMessage',
            path: 'add',
            component: resolve => require(['@/views/trading/new/SupplyPatentMessageAddAndEdit'], resolve)
          },
          {
            name: 'EditPatentMessage',
            path: 'edit',
            component: resolve => require(['@/views/trading/new/SupplyPatentMessageAddAndEdit'], resolve)
          },
          {
            name: 'ApprovalPatentMessage',
            path: 'approval',
            component: resolve => require(['@/views/trading/new/SupplyPatentMessageAddAndEdit'], resolve)
          },
          {
            name: 'ViewPatentMessage',
            path: 'view',
            component: resolve => require(['@/views/trading/new/SupplyPatentMessageAddAndEdit'], resolve)
          }
        ]
      },
      {
        path: 'publish-brand-message-page',
        name: 'PublishBrandMessagePage',
        redirect: 'publish-brand-message-page/add',
        component: resolve => require(['@/components/layouts/BlankLayout.vue'], resolve),
        children: [
          {
            name: 'AddBrandMessage',
            path: 'add',
            component: resolve => require(['@/views/trading/new/SupplyBrandMessageAddAndEdit'], resolve)
          },
          {
            name: 'EditBrandMessage',
            path: 'edit',
            component: resolve => require(['@/views/trading/new/SupplyBrandMessageAddAndEdit'], resolve)
          },
          {
            name: 'ApprovalBrandMessage',
            path: 'approval',
            component: resolve => require(['@/views/trading/new/SupplyBrandMessageAddAndEdit'], resolve)
          },
          {
            name: 'ViewBrandMessage',
            path: 'view',
            component: resolve => require(['@/views/trading/new/SupplyBrandMessageAddAndEdit'], resolve)
          }
        ]
      },
      {
        path: 'publish-demand-project-page',
        name: 'PublishDemandProjectPage',
        redirect: 'publish-demand-project-page/add',
        component: resolve => require(['@/components/layouts/BlankLayout.vue'], resolve),
        children: [
          {
            name: 'AddDemandProject',
            path: 'add',
            component: resolve => require(['@/views/trading/new/PublishDemandRegister'], resolve)
          },
          {
            name: 'EditDemandProject',
            path: 'edit',
            component: resolve => require(['@/views/trading/new/PublishDemandRegister'], resolve)
          },
          {
            name: 'ApprovalDemandProject',
            path: 'approval',
            component: resolve => require(['@/views/trading/new/PublishDemandRegister'], resolve)
          },
          {
            name: 'ViewDemandProject',
            path: 'view',
            component: resolve => require(['@/views/trading/new/PublishDemandRegister'], resolve)
          }
        ]
      },
      {
        path: 'publish-demand-patent-page',
        name: 'PublishDemandPatentPage',
        redirect: 'publish-demand-patent-page/add',
        component: resolve => require(['@/components/layouts/BlankLayout.vue'], resolve),
        children: [
          {
            name: 'AddDemandPatent',
            path: 'add',
            component: resolve => require(['@/views/trading/new/PublishDemandPatent'], resolve)
          },
          {
            name: 'EditDemandPatent',
            path: 'edit',
            component: resolve => require(['@/views/trading/new/PublishDemandPatent'], resolve)
          },
          {
            name: 'ApprovalDemandPatent',
            path: 'approval',
            component: resolve => require(['@/views/trading/new/PublishDemandPatent'], resolve)
          },
          {
            name: 'ViewDemandPatent',
            path: 'view',
            component: resolve => require(['@/views/trading/new/PublishDemandPatent'], resolve)
          }
        ]
      },
      {
        path: 'publish-demand-brand-page',
        name: 'PublishDemandBrandPage',
        redirect: 'publish-demand-brand-page/add',
        component: resolve => require(['@/components/layouts/BlankLayout.vue'], resolve),
        children: [
          {
            name: 'AddDemandBrand',
            path: 'add',
            component: resolve => require(['@/views/trading/new/PublishDemandBrand'], resolve)
          },
          {
            name: 'EditDemandBrand',
            path: 'edit',
            component: resolve => require(['@/views/trading/new/PublishDemandBrand'], resolve)
          },
          {
            name: 'ApprovalDemandBrand',
            path: 'approval',
            component: resolve => require(['@/views/trading/new/PublishDemandBrand'], resolve)
          },
          {
            name: 'ViewDemandBrand',
            path: 'view',
            component: resolve => require(['@/views/trading/new/PublishDemandBrand'], resolve)
          }
        ]
      },
      {
        path: 'high-project-register',
        name: 'HighProjectRegister',
        component: resolve => require(['@/views/trading/new/HighProjectRegisterPage'], resolve)
      },
      {
        path: 'publish-demand-register',
        name: 'PublishDemandRegister',
        component: resolve => require(['@/views/trading/new/PublishDemandRegister'], resolve)
      },
      {
        path: 'project-trading-order',
        name: 'ProjectTradingOrder',
        component: resolve => require(['@/views/trading/new/ProjectTradingOrder'], resolve)
      },
      {
        path: 'project-order-commit-success',
        name: 'ProjectOrderCommitSuccess',
        component: resolve => require(['@/views/trading/new/ProjectOrderCommitSuccess'], resolve)
      },
      {
        path: 'project-zone',
        name: 'ProjectZone',
        component: resolve => require(['@/views/trading/new/ProjectZone'], resolve)
      },
      {
        path: 'case-show',
        name: 'CaseShow',
        component: resolve => require(['@/views/trading/new/CaseShow'], resolve)
      },
      {
        path: 'case-show-details',
        name: 'CaseShowDetails',
        component: resolve => require(['@/views/trading/new/CaseShowDetails'], resolve)
      }
    ]

  },
  {
    path: '/portal/service',
    component: resolve => {
      require(['@/components/layouts/PortalServiceLayout.vue'], resolve)
    },
    redirect: '/portal/service/service-center',
    children: [
      {
        path: 'service-center',
        name: 'ServiceCenter',
        component: resolve => require(['@/views/service/ServiceCenter'], resolve)
      },
      {
        path: 'service-project',
        name: 'ServiceProject',
        component: resolve => require(['@/views/service/ServiceProject'], resolve)
      },
      {
        path: 'service-voucher',
        name: 'ServiceVoucher',
        component: resolve => require(['@/views/service/ServiceVoucher'], resolve)
      },
      {
        path: 'service-order',
        name: 'ServiceOrder',
        component: resolve => require(['@/views/service/ServiceOrder'], resolve),
        props: { currentStep: 0 }
      },
      {
        path: 'order-success',
        name: 'OrderCommitSuccess',
        component: resolve => require(['@/views/service/OrderCommitSuccess'], resolve)
      },
      {
        path: 'service-article-message',
        name: 'ServiceArticleMessage',
        component: resolve => require(['@/views/public/ArticleMessage'], resolve)
      },
      {
        path: 'service-org',
        name: 'ServiceOrg',
        component: resolve => require(['@/views/service/ServiceOrg'], resolve)
      }
    ]
  },
  {
    path: '/portal/ip-financial',
    component: resolve => {
      require(['@/components/layouts/PortalIPFinancialLayout.vue'], resolve)
    },
    redirect: '/portal/ip-financial/financial-service',
    children: [
      {
        path: 'financial-service',
        name: 'FinancialService',
        component: resolve => require(['@/views/fincial/FinancialService'], resolve)
      },
      {
        path: 'financial-online-apply-add',
        name: 'FinancialOnlineApplyAdd',
        component: resolve => require(['@/views/fincial/FinancialOnlineApply'], resolve)
      },
      {
        path: 'financial-online-apply-edit',
        name: 'FinancialOnlineApplyEdit',
        component: resolve => require(['@/views/fincial/FinancialOnlineApply'], resolve)
      },
      {
        path: 'financial-online-apply-audit',
        name: 'FinancialOnlineApplyAudit',
        component: resolve => require(['@/views/fincial/FinancialOnlineApply'], resolve)
      },
      {
        path: 'financial-online-apply-details',
        name: 'FinancialOnlineApplyDetails',
        component: resolve => require(['@/views/fincial/FinancialOnlineApply'], resolve)
      },
      {
        path: 'financial-service-article-message',
        name: 'FinancialServiceArticleMessage',
        component: resolve => require(['@/views/public/ArticleMessage'], resolve)
      },
      {
        path: 'financial-pledge-financing',
        name: 'FinancialPledgeFinancing',
        component: resolve => require(['@/views/fincial/FinancialPledgeFinancing'], resolve)
      },
      {
        path: 'financial-apply',
        name: 'FinancialApply',
        component: resolve => {
          require(['@/views/fincial/FinancialFlowBasePage'], resolve)
        }
      },
      {
        path: 'financial-org-show',
        name: 'FinancialOrgShow',
        component: resolve => {
          require(['@/views/fincial/FinancialOrgShow'], resolve)
        }
      },
      {
        path: 'financial-consult-show',
        name: 'FinancialConsultShow',
        component: resolve => {
          require(['@/views/fincial/FinancialConsultShow'], resolve)
        }
      },
      {
        path: 'financial-consult-article-message',
        name: 'FinancialConsultArticleMessage',
        component: resolve => {
          require(['@/views/public/ArticleMessage'], resolve)
        }
      },
      {
        path: 'ip-insurance',
        name: 'IPInsurance',
        component: resolve => {
          require(['@/views/fincial/IPInsurance'], resolve)
        }
      },
      {
        path: 'ip-insurance-product',
        name: 'InsuranceProductDetails',
        component: resolve => {
          require(['@/views/fincial/InsuranceProductDetails'], resolve)
        }
      },
      {
        path: 'ip-insurance-org',
        name: 'InsuranceOrgDetails',
        component: resolve => {
          require(['@/views/fincial/InsuranceOrgDetails'], resolve)
        }
      }
    ]
  },
  {
    path: '/portal/service/details',
    component: resolve => {
      require(['@/components/layouts/ServiceDetailsLayout.vue'], resolve)
    },
    redirect: '/portal/service/details/institution-home',
    children: [
      {
        path: 'institution-home',
        name: 'InstitutionHome',
        component: resolve => require(['@/views/details/InstitutionHome'], resolve)
      },
      {
        path: 'introduce',
        name: 'Introduce',
        component: resolve => require(['@/views/details/Introduce'], resolve)
      },
      {
        path: 'project-intro',
        name: 'ProjectIntro',
        component: resolve => require(['@/views/details/ProjectIntro'], resolve)
      },
      {
        path: 'contact-me',
        name: 'ContactMe',
        component: resolve => require(['@/views/details/ContactMe'], resolve)
      },
      {
        path: 'service-message',
        name: 'ServiceMessage',
        component: resolve => require(['@/views/details/ServiceMessage'], resolve)
      }
    ]
  },
  {
    path: '/portal/financial/details',
    component: resolve => {
      require(['@/components/layouts/FinancialDetailsLayout.vue'], resolve)
    },
    redirect: '/portal/financial/details/financial-institution-home',
    children: [
      {
        path: 'financial-message',
        name: 'FinancialMessage',
        component: resolve => require(['@/views/details/FinancialMessage'], resolve)
      },
      {
        path: 'financial-institution-home',
        name: 'FinancialInstitutionHome',
        component: resolve => require(['@/views/details/InstitutionHome'], resolve),
        props: {
          getDataUrl: '/zscq/portal/financeProductList',
          serviceCard: false
        }
      },
      {
        path: 'financial-introduce',
        name: 'FinancialIntroduce',
        component: resolve => require(['@/views/details/Introduce'], resolve)
      },
      {
        path: 'financial-project-intro',
        name: 'FinancialProjectIntro',
        component: resolve => require(['@/views/details/ProjectIntro'], resolve),
        props: {
          getDataUrl: '/zscq/portal/financeProductList',
          serviceCard: false
        }
      },
      {
        path: 'financial-contact-me',
        name: 'FinancialContactMe',
        component: resolve => require(['@/views/details/ContactMe'], resolve)
      }

    ]
  },
  {
    path: '/portal/careCenter',
    component: resolve => {
      require(['@/components/layouts/PortalCareLayout.vue'], resolve)
    },
    redirect: '/portal/careCenter/care-center',
    children: [
      {
        path: 'care-center',
        name: 'CareCenter',
        component: resolve => require(['@/views/care/CareCenter'], resolve)
      },
      {
        path: 'care-center-article-message',
        name: 'CareCenterArticleMessage',
        component: resolve => require(['@/views/public/ArticleMessage'], resolve)
      }
    ]
  },
  {
    path: '/portal/message',
    component: resolve => {
      require(['@/components/layouts/MessageLayout.vue'], resolve)
    },
    redirect: '/portal/message/news-consult',
    children: [
      {
        path: 'notice-message',
        name: 'NoticeMessage',
        component: resolve => require(['@/views/info/NoticeMessage'], resolve)
      },
      {
        path: 'news-consult',
        name: 'NewsConsult',
        component: resolve => require(['@/views/info/NewsConsult'], resolve)
      },
      {
        path: 'special-message',
        name: 'SpecialMessage',
        component: resolve => require(['@/views/info/SpecialMessage'], resolve)
      },
      {
        path: 'special-list',
        name: 'SpecialList',
        component: resolve => require(['@/views/info/SpecialList'], resolve)
      },
      {
        path: 'policy-list',
        name: 'PolicyList',
        component: resolve => require(['@/views/info/PolicyList'], resolve)
      },
      {
        path: 'article-message',
        name: 'ArticleMessage',
        component: resolve => require(['@/views/public/ArticleMessage'], resolve)
      },
      {
        path: 'preview',
        name: 'preview',
        component: resolve => require(['@/components/general/JPreview.vue'], resolve)
      }
    ]
  },
  {
    path: '/portal/feature-service',
    component: resolve => {
      require(['@/components/layouts/PortalFeatureServiceLayout.vue'], resolve)
    },
    redirect: '/portal/feature-service/industrybox-industry',
    children: [
      // {
      //   path: 'industrybox-industry',
      //   name: 'IndustryShiBeiPort',
      //   component: resolve => require(['@/views/feature/IndustryShiBeiPort'], resolve),
      //   props: { base: '/#/statistical/industrybox/industry' }
      // },
      // {
      //   path: 'patentbox-patent',
      //   name: 'PatentShiBeiPort',
      //   component: resolve => require(['@/views/feature/PatentShiBeiPort'], resolve),
      //   props: { base: '/#/statistical/patentbox/patent' }
      // },
      {
        path: 'company-creditinfo/:id',
        name: 'CompanyCreditInfo',
        component: resolve => require(['@/views/feature/shibei/CompanyCreditInfo'], resolve)
      },
      {
        path: 'industrybox-industry',
        name: 'IndustryShiBeiPort',
        component: resolve => require(['@/views/feature/shibei/Industry'], resolve)
      },
      {
        path: 'company-evaluationinfo/:id',
        name: 'CompanyEvaluationInfo',
        component: resolve => require(['@/views/feature/shibei/companyEvaluationInfo'], resolve)
      },
      {
        path: 'company-portraitinfo/:id',
        name: 'CompanyPortraitInfo',
        component: resolve => require(['@/views/feature/shibei/CompanyInfo'], resolve)
      },
      {
        path: 'industry-info/:id',
        name: 'IndustryInfo',
        component: resolve => require(['@/views/feature/shibei/IndustryInfo'], resolve)
      },
      {
        path: 'patentbox-patent',
        name: 'PatentShiBeiPort',
        component: resolve => require(['@/views/feature/shibei/PatentNav'], resolve)
      },
      {
        path: 'patent-navdetail/:id',
        name: 'PatentNavDetail',
        component: resolve => require(['@/views/feature/shibei/PatentNavInfo'], resolve)
      },
      {
        path: 'patent-nav-sys',
        name: 'PatentNavSys',
        component: resolve => require(['@/views/feature/shibei/PatentNavSys'], resolve)
      },
      {
        path: 'patent-nav-sysinfo/:id',
        name: 'PatentNavSysInfo',
        component: resolve => require(['@/views/feature/shibei/PatentNavSysInfo'], resolve)
      },
      {
        path: 'patent-evaluation',
        name: 'PatentEvaluation',
        component: resolve => require(['@/views/feature/shibei/PatentEvaluationPortal'], resolve)
      },
      {
        path: 'patent-evaluationinfo/:num',
        name: 'PatentEvaluationInfo',
        component: resolve => require(['@/views/feature/shibei/PatentEvaluation'], resolve)
      },
      {
        path: 'patent-compare',
        name: 'PatentEvaluationCompare',
        component: resolve => require(['@/views/feature/shibei/PatentCompare'], resolve)
      },

      {
        path: 'patent-assess',
        name: 'PatentAssess',
        component: resolve => require(['@/views/feature/shibei/PatentAssess'], resolve)
      },
      {
        path: 'patent-assessinfo/:num/:count',
        name: 'PatentAssessInfo',
        component: resolve => require(['@/views/feature/shibei/PatentAssessInfo'], resolve)
      },

      // {
      //   path: 'big-data',
      //   name: 'BigData',
      //   component: resolve => require(['@/views/feature/shibei/BigData'], resolve)
      // },
      {
        path: 'professor-bank',
        name: 'ProfessorBank',
        component: resolve => require(['@/views/feature/ProfessorBank'], resolve)
      },
      {
        path: 'professor-details',
        name: 'ProfessorDetails',
        component: resolve => require(['@/views/feature/ProfessorDetails'], resolve)
      },
      {
        path: 'train-message',
        name: 'TrainMessage',
        component: resolve => require(['@/views/feature/new/TrainMessagePage'], resolve)
      },
      {
        path: 'train-course',
        name: 'TrainCourse',
        component: resolve => require(['@/views/feature/new/TrainCoursePage'], resolve)
      },
      {
        path: 'train-course-details',
        name: 'TrainCourseDetails',
        component: resolve => require(['@/views/feature/new/TrainCourseDetailsPage'], resolve)
      },
      {
        path: 'train-offline',
        name: 'TrainOffline',
        component: resolve => require(['@/views/feature/new/TrainOfflinePage'], resolve)
      },
      {
        path: 'train-offline-details',
        name: 'TrainOfflineDetails',
        component: resolve => require(['@/views/feature/new/TrainOfflineDetailsPage'], resolve)
      },
      {
        path: 'train-article-message',
        name: 'TrainArticleMessage',
        component: resolve => require(['@/views/public/ArticleMessage'], resolve)
      },
      {
        path: 'feature-search-detail',
        name: 'FeatureSearchDetail',
        component: resolve => require(['@/views/search/SearchDetail'], resolve)
      }
    ]
  },
  {
    path: '/portal/help',
    component: resolve => {
      require(['@/components/layouts/SearchLayout.vue'], resolve)
    },
    redirect: '/portal/help/help-center',
    children: [
      {
        path: 'help-center',
        name: 'HelpCenter',
        component: resolve => require(['@/views/public/HelpCenter'], resolve)
      },
      {
        path: 'online-complaint/:type',
        name: 'OnlineComplaint',
        props: true,
        component: resolve => require(['@/views/public/OpinionAndComplaintCard'], resolve)
      },
      {
        path: 'opinion-advice/:type',
        name: 'OpinionAdvice',
        props: true,
        component: resolve => require(['@/views/public/OpinionAndComplaintCard'], resolve)
      }
    ]
  },
  {
    path: '/portal/full/search',
    component: resolve => {
      require(['@/components/layouts/SearchLayout.vue'], resolve)
    },
    redirect: '/portal/full/search/demand-search',
    children: [
      {
        path: 'demand-search',
        name: 'DemandSearch',
        component: resolve => require(['@/views/find/DemandSearch'], resolve)
      },
      {
        path: 'supply-search',
        name: 'SupplySearch',
        component: resolve => require(['@/views/find/SupplySearch'], resolve)
      },
      {
        path: 'service-search',
        name: 'ServiceSearch',
        component: resolve => require(['@/views/find/ServiceSearch'], resolve)
      },
      {
        path: 'agency-search',
        name: 'AgencySearch',
        component: resolve => require(['@/views/find/AgencySearch'], resolve)
      },
      {
        path: 'message-search',
        name: 'MessageSearch',
        component: resolve => require(['@/views/find/MessageSearch'], resolve)
      }

    ]
  },
  {
    path: '/portal/intellectual-property-protect',
    component: resolve => {
      require(['@/components/layouts/IntellectualPropertyProtectLayout.vue'], resolve)
    },
    redirect: '/portal/intellectual-property-protect/fast-activist',
    children: [
      {
        path: 'fast-activist',
        name: 'NewFastActivist',
        component: resolve => require(['@/views/protect/ProtectView'], resolve)
      },
      {
        path: 'activist-resources',
        name: 'NewActivistResources',
        component: resolve => require(['@/views/protect/ProtectView'], resolve)
      },
      {
        path: 'activist_network',
        name: 'ActivistNetwork',
        component: resolve => require(['@/views/protect/ProtectView'], resolve)
      },
      {
        path: 'overseas_rights',
        name: 'OverseasRights',
        component: resolve => require(['@/views/protect/ProtectView'], resolve)
      },
      {
        path: 'mult-dispute-resolution',
        name: 'MultDisputeResolution',
        component: resolve => require(['@/views/protect/ProtectView'], resolve)
      },
      {
        path: 'activist-resources-message',
        name: 'ActivistResourcesMessage',
        component: resolve => require(['@/views/public/ArticleMessage'], resolve)
      }
    ]
  }
]
