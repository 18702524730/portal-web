<template>
  <div id="projectCenterTable">
    <a-row class="my-row"
           v-if="portalProject.portalSupplyProjectPatents && portalProject.portalSupplyProjectPatents.length > 0">
      <a-row class="main-h4">
        <h4>
          <span><b v-if="haveStar">* </b>专利</span>
        </h4>
      </a-row>
      <a-row>
        <project-patent-table :data="portalProject.portalSupplyProjectPatents"></project-patent-table>
      </a-row>
    </a-row>

    <a-row class="my-row"
           v-if="portalProject.portalSupplyProjectZscqs && portalProject.portalSupplyProjectZscqs.length > 0">
      <a-row class="main-h4">
        <h4>
          <span>其他知识产权</span>
        </h4>
      </a-row>
      <a-row>
        <other-table :data="portalProject.portalSupplyProjectZscqs"></other-table>
      </a-row>
    </a-row>

  </div>
</template>

<script>
  import ProjectPatentTable from '../table/ProjectPatentTable'
  import OtherTable from '../table/OtherTable'

  export default {
    name: 'ProjectCenterTable',
    components: {
      OtherTable,
      ProjectPatentTable
    },
    props: {
      haveStar: {
        type: Boolean,
        default: true
      },
      portalProject: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #projectCenterTable {
    .my-row {
      margin-bottom: 20px;
    }
  }
</style>