<template>
  <div id="brandCenter">
    <a-row>
      <brand-form></brand-form>
    </a-row>

    <a-row>
      <demand-brand-table></demand-brand-table>
    </a-row>
  </div>
</template>

<script>
  import BrandForm from '../../components/table/BrandForm'
  import DemandBrandTable from '../../components/table/DemandBrandTable'
  export default {
    name: 'BrandCenter',
    components: { DemandBrandTable, BrandForm }
  }
</script>

<style scoped>

</style>