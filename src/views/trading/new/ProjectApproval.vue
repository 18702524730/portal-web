<template>
    <div id="projectApproval">
      <div class="container">
        <project-preview></project-preview>
      </div>
    </div>
</template>

<script>
  import ProjectPreview from '../../../components/new/other/ProjectPreview'
  export default {
    name: 'ProjectApproval',
    components: { ProjectPreview }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";
  #projectApproval{
    margin-top: 2px;
    .main-css();
    overflow: hidden;
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>