<template>
  <div id="supplyPatentMessage">
    <a-row>
      <demand-from
        :demandOrSupply="demandOrSupply"
      ></demand-from>
    </a-row>

    <a-row>
      <demand-table :item-key="itemKey" :column="column" :key-route="keyRoute" :table-url="tableUrl"
                    :demandOrSupply="demandOrSupply"></demand-table>
    </a-row>
  </div>
</template>

<script>

  import DemandFrom from '../../components/table/DemandFrom'
  import DemandTable from '../../components/table/DemandTable'

  export default {
    name: 'SupplyPatentMessage',
    components: { DemandTable, DemandFrom },
    data() {
      return {
        demandOrSupply: 'supply',
        tableUrl: '/zscq/portal/supplySearch',
        keyRoute: 'SupplyPatentDetails',
        column: [
          '所属行业',
          '技术领域',
          '意向运营方式',
          '交易价格'
        ],
        itemKey: [
          'imgUrl',
          'title',

          'belongIndustryName',
          'technicalFieldName',
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