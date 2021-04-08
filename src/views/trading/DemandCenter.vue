<template>
  <div id="demandCenter">

    <a-row>
      <demand-from></demand-from>
    </a-row>

    <a-row>
      <demand-table>
      </demand-table>
    </a-row>
  </div>
</template>

<script>

  import DemandFrom from '../../components/table/DemandFrom'
  import DemandTable from '../../components/table/DemandTable'
  export default {
    name: 'DemandCenter',
    components: { DemandTable, DemandFrom },
    data() {
      return {
        top: 10,
        bottom: 10
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style scoped>

</style>