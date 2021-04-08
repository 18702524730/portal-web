<template>
  <div id="supplyProjectDetailsPage">
    <a-spin size="large" :spinning="spinning">
      <project-details-head :item="item" :status-mes="statusMes"></project-details-head>
      <project-details-body :own-arr="ownArr" :portal-project="item" :select-org="selectOrg"></project-details-body>
    </a-spin>
  </div>
</template>

<script>
  import ProjectDetailsHead from '@/components/new/card/ProjectDetailsHead'
  import ProjectDetailsBody from '@/components/new/card/ProjectDetailsBody'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'SupplyProjectDetailsPage',
    components: { ProjectDetailsBody, ProjectDetailsHead },
    data() {
      return {
        item: {},
        url: '/zscq/portal/getSupplyRequirementDetail',
        supplyRequirementType: 1,
        ownUrl: '/zscq/portal/ownerProjectInfos',
        spinning: false,
        ownArr: [],

        orgUrl: '/zscq/portal/getOrgAgencyByOrgId',
        selectOrg: {},

        statusUrl: '/zscq/portal/getServeOrderStatusStr',
        statusMes: ''
      }
    },
    created() {
      if (this.$route.query && this.$route.query.id) {
        this.loadData()
        // this.loadStatusData()
      }
    },
    methods: {
      async loadOrg() {
        const ownRes = await getActionUpdateKeyword(this.ownUrl, {
          supplyRequirementType: this.supplyRequirementType,
          pageSize: 5
        })
        if (ownRes.success) {
          this.ownArr = ownRes.result.records
        } else {
          this.$message.warning(ownRes.message)
        }
      },
      addKey(itemArr) {
        for (const i in itemArr) {
          itemArr[i].key = i
        }
      },
      async loadStatusData() {
        const res = await getActionUpdateKeyword(this.statusUrl, { id: this.$route.query.id })
        if (res.success) {
          this.statusMes = res.message
        } else {
          this.$message.warning('请求失败！')
        }
      },
      async loadData() {
        const res = await getActionUpdateKeyword(this.url, {
          supplyRequirementType: this.supplyRequirementType,
          id: this.$route.query.id
        })
        if (res.success) {
          this.addKey(res.result.portalSupplyProjectPatents)
          this.addKey(res.result.portalSupplyProjectZscqs)

          this.item = res.result
          this.statusMes = this.item.statusName
        } else {
          this.$message.warning(res.message)
        }
        console.info(this.item)

        const ownRes = await getActionUpdateKeyword(this.ownUrl, {
          supplyRequirementType: this.supplyRequirementType,
          id: this.$route.query.id,
          createBy: this.item.createBy,
          pageSize: 5
        })
        if (ownRes.success) {
          this.ownArr = ownRes.result.records
        } else {
          this.$message.warning(ownRes.message)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #supplyProjectDetailsPage {
  }
</style>