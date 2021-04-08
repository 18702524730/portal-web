<template>
  <div id="institutionHome">
    <tab-card-template tabTitle="机构简介" style="margin-bottom: 5px">
      <template slot="content">
        <div>
          <p>
            {{org.orgProfile}}
          </p>
        </div>


      </template>

    </tab-card-template>
    <recommend-card-list :org-id="$route.query.orgId" :get-data-url="getDataUrl"
                         :service-card="serviceCard"></recommend-card-list>
  </div>
</template>

<script>

  import TabCardTemplate from '../../components/table/TabCardTemplate'
  import RecommendCardList from '../../components/table/RecommendCardList'
  export default {
    name: 'InstitutionHome',
    props: {
      orgMessage: {
        type: Object,
        default: () => {
          return {}
        }
      },
      getDataUrl: {
        type: String,
        default: '/zscq/portal/agencyProductRecommendList'
      },
      serviceCard: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        org: {}
      }
    },
    components: { RecommendCardList, TabCardTemplate },
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

  #institutionHome {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
    p {
      white-space: pre-wrap;
      width: 100%;
    }

  }

</style>