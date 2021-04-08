<template>
  <div id="supplyProjectMessage">
    <a-row>
      <project-form :demand-or-supply="demandOrSupply"></project-form>
    </a-row>

    <a-row>
      <demand-project-table :demand-or-supply="demandOrSupply" :table-url="tableUrl" :item-key="itemKey"
                            :column="column" :key-route="keyRoute"></demand-project-table>
    </a-row>
  </div>
</template>

<script>

  import DemandProjectTable from '../../components/table/DemandProjectTable'
  import ProjectForm from '../../components/table/ProjectForm'

  export default {
    name: 'SupplyProjectMessage',
    components: { ProjectForm, DemandProjectTable },
    data() {
      return {
        demandOrSupply: 'supply',
        tableUrl: '/zscq/portal/supplySearch',
        keyRoute: 'SupplyProjectDetails',
        column: [
          '所属行业',
          '项目成熟度',
          '意向运营方式',
          '交易价格'
        ],
        itemKey: [
          'imgUrl',
          'title',

          'belongIndustryName',
          'projectMaturityName',
          'intendedOperationModeName',
          'money',
          'cooperationAreaName',
          'publishTime'

        ]
      }
    }
  }
</script>

<style scoped>

</style>