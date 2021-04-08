<template>
  <div id="projectCenter">
    <a-row>
      <project-form></project-form>
    </a-row>

    <a-row>
      <demand-project-table></demand-project-table>
    </a-row>
  </div>
</template>

<script>
  import ProjectForm from '../../components/table/ProjectForm'
  import DemandProjectTable from '../../components/table/DemandProjectTable'
  export default {
    name: 'ProjectCenter',
    components: { DemandProjectTable, ProjectForm }
  }
</script>

<style scoped>

</style>