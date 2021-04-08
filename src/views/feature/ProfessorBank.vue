<template>
    <div id="professorBank">
      <professor-form></professor-form>
      <professor-table></professor-table>
    </div>
</template>

<script>
  import ProfessorForm from '../../components/new/table/ProfessorForm'
  import ProfessorTable from '../../components/new/table/ProfessorTable'
  export default {
    name: 'ProfessorBank',
    components: { ProfessorTable, ProfessorForm }
  }
</script>

<style scoped>

</style>