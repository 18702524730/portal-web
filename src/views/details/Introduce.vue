<template>
  <div id="introduce">
    <tab-card-template tab-title="机构介绍" class="template-c">
      <template slot="content">
        <div v-html="org.orgIntroduction" style="white-space: pre-wrap;word-break: break-all;overflow-x: auto">
        </div>

      </template>
    </tab-card-template>
    <tab-card-template tab-title="服务内容" class="template-c" v-if="requestType === 'default'">
      <template slot="content">
        <div>
          <p>
            {{org.serviceContentName}}
          </p>
        </div>
      </template>
    </tab-card-template>
    <tab-card-template tab-title="团队介绍">
      <template slot="content">
        <div>
          <p>
            {{org.teamIntroduction}}
          </p>
        </div>
      </template>
    </tab-card-template>
  </div>
</template>ProjectIntro

<script>

  import TabCardTemplate from '../../components/table/TabCardTemplate'

  export default {
    name: 'Introduce',
    props: {
      orgMessage: {
        type: Object,
        default: () => {
          return {}
        }
      },
      requestType: {
        type: String,
        default: 'default'
      }
    },
    data() {
      return {
        org: {}
      }
    },
    components: { TabCardTemplate },
    created() {
    },
    watch: {
      orgMessage: {
        handler(newData, oldData) {
          this.org = newData
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #introduce {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    .container {
      margin-left: auto;
      margin-right: auto;
    }
    overflow: hidden;
    p {
      white-space: pre-wrap;
      width: 100%;
    }
    .template-c {
      margin-bottom: 5px;
    }
  }
</style>