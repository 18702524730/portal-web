<template>
    <div id="geographySign">
      <a-row>
        <geographic-form></geographic-form>
      </a-row>
        <geographic-table></geographic-table>
      <a-row>
      </a-row>
    </div>
</template>

<script>
  import GeographicForm from '../../components/new/table/GeographicForm'
  import GeographicTable from '../../components/new/table/GeographicTable'
  export default {
    name: 'GeographySign',
    components: { GeographicTable, GeographicForm }
  }
</script>

<style scoped>

</style>