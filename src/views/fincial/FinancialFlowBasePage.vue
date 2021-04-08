<template>
  <div id="financialFlowBasePage">
    <a-spin :spinning="loading" size="large">
      <div class="container">
        <a-card>
          <financing-head-card :current="current"></financing-head-card>

          <financial-apply-first
            v-if="current === 0"
            @nextPage="nextPage"
            :portalPledgePatents.sync="portalPledgeOrder.portalPledgePatents"
            :portalPledgeTrademarks.sync="portalPledgeOrder.portalPledgeTrademarks"
          ></financial-apply-first>

          <financial-apply-second
            v-else-if="current === 1"
            :portalPledgeOrder="portalPledgeOrder"
            @nextPage="nextPage"
            @backPage="backPage"
          ></financial-apply-second>

          <financial-apply-third
            v-else-if="current === 2"
            :orgId.sync="portalPledgeOrder.orgId"
            :orgName.sync="portalPledgeOrder.orgName"
            :way.sync="portalPledgeOrder.orgSelectWay"
            :receivePledge.sync="portalPledgeOrder.receivePledge"
            @nextPage="nextPage"
            @backPage="backPage"
          ></financial-apply-third>

          <financial-apply-fourth
            v-else-if="current === 3"
            @subPage="subPage"
            @backPage="backPage"
            :portalPledgeOrder="portalPledgeOrder"
          ></financial-apply-fourth>

          <financial-apply-finish
            :orgId="portalPledgeOrder.orgId"
            v-else-if="current === 4"
          ></financial-apply-finish>
        </a-card>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import FinancingHeadCard from '../../components/new/card/FinancingHeadCard'
  import FinancialApplyFirst from './FinancialApplyFirst'
  import FinancialApplySecond from './FinancialApplySecond'
  import FinancialApplyThird from './FinancialApplyThird'
  import FinancialApplyFourth from './FinancialApplyFourth'
  import FinancialApplyFinish from './FinancialApplyFinish'
  import { mapGetters } from 'vuex'
  import { postAction, getActionUpdateKeyword } from '@/api/manage'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'FinancialFlowBasePage',
    components: {
      FinancialApplyFinish,
      FinancialApplyFourth,
      FinancialApplyThird,
      FinancialApplySecond,
      FinancialApplyFirst,
      FinancingHeadCard
    },
    data() {
      return {
        current: 0,
        portalPledgeOrder: {
          portalPledgePatents: [],
          portalPledgeTrademarks: [],

          orgId: '',
          applicant: '',
          contactPhone: '',
          quota: null,
          orgSelectWay: '1',
          leaveMsg: '',
          receivePledge: '0'
        },
        saveUrl: '/pledge/portalPledgeOrder/insertPortalPledgeOrder',

        listUrl: '/pledge/portalPledgePatent/nzyPatentList',
        param: {
          pageSize: 999999,
          pageNo: 1
        },

        loading: false,
        getOrgId: '/sys/user/getUserIdByOrgId'
      }
    },
    created() {
      if (!judgeState()) {
        this.$router.push({ name: 'FinancialPledgeFinancing' })
      } else {
        const user = this.userInfo()
        this.portalPledgeOrder.applicant = user.realname
        this.portalPledgeOrder.contactPhone = user.phone
        this.getOrgData(user.orgId)
      }
      this.loadList()
    },
    methods: {
      ...mapGetters(['userInfo']),
      async getOrgData(orgId){
        const tRes = await getActionUpdateKeyword(this.getOrgId, { orgId: orgId })
        console.info(tRes)
        console.info('rrrr')
      },
      nextPage() {
        this.current += 1
      },
      backPage() {
        this.current -= 1
      },
      async loadList() {
        this.loading = true
        const res = await getActionUpdateKeyword(this.listUrl, this.param)

        if (res.success) {
          this.portalPledgeOrder.portalPledgePatents = res.result
          for (const a of this.portalPledgeOrder.portalPledgePatents) {
            a.key = a.applyNo + '-' + a.announcementCode
          }
        } else {
          this.$message.error(res.message)
        }
        this.loading = false
      },
      async subPage() {
        this.loading = true
        const res = await postAction(this.saveUrl, this.portalPledgeOrder)
        console.info(res)
        if (res.success) {
          // 提交成功
          this.nextPage()
        } else {
          this.$message.error(res.message)
        }
        this.loading = false
      }
    },
    watch: {
      portalPledgeOrder: {
        handler(data) {
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #financialFlowBasePage {
    .main-css();
    background-color: @main-bg-color;
    margin-top: 2px;
    padding: 20px 0;
    overflow: hidden;
  }
</style>