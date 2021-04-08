<template>
  <div id="trainCoursePage">
    <div class="container">
      <a-breadcrumb separator=">" class="my-breadcrumb">
        <a-breadcrumb-item>
          <router-link :to="{name:'TrainMessage'}">培训信息</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          培训课程
        </a-breadcrumb-item>
      </a-breadcrumb>

      <course-form></course-form>

      <course-table></course-table>
    </div>
  </div>
</template>

<script>
  import CourseForm from '../../../components/new/form/CourseForm'
  import CourseTable from '../../../components/new/form/CourseTable'
  export default {
    name: 'TrainCoursePage',
    components: { CourseTable, CourseForm }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";
  @import "index";

  #trainCoursePage {
    .main-css();
    background-color: @main-bg-color;
    overflow: hidden;
    margin-top: 2px;
  }
</style>