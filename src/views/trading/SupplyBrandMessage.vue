<template>
  <div id="supplyBrandMessage">
    <a-row>
      <brand-form :demand-or-supply="demandOrSupply"></brand-form>
    </a-row>

    <a-row>
      <demand-brand-table :demand-or-supply="demandOrSupply" :table-url="tableUrl" :item-key="itemKey" :column="column"
                          :key-route="keyRoute">

      </demand-brand-table>
    </a-row>
  </div>
</template>

<script>

  import DemandBrandTable from '../../components/table/DemandBrandTable'
  import BrandForm from '../../components/table/BrandForm'
  export default {
    name: 'SupplyBrandMessage',
    components: { BrandForm, DemandBrandTable },
    data() {
      return {
        demandOrSupply: 'supply',
        tableUrl: '/zscq/portal/supplySearch',
        keyRoute: 'SupplyBrandDetails',
        column: [
          '行业需求',
          '交易价格',
          '商标类别'
        ],
        itemKey: [
          'imgUrl',
          'title',
          'belongIndustryName',
          'money',

          'trademarkTypeName',
          'publishTime'
        ]
      }
    }
  }
</script>

<style scoped>

</style>