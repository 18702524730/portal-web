<template>
  <div id="projectDetailsBody">
    <div class="container">
      <a-row :gutter="16">
        <a-col :span="6">
          <tab-card-template tab-title="持有方其他项目">
            <template slot="content">
              <own-other-project v-for="(own,index) in ownArr" :key="own.id" :item="own"></own-other-project>
            </template>
          </tab-card-template>
        </a-col>
        <a-col :span="18">
          <tab-card-template tab-title="项目详情" tab-title2="交易评价" :two-tabs="true">
            <template slot="content">
              <project-message-card class="my-import" :project-type="portalProject.projectType"
                                    :portal-project="portalProject" :select-org="selectOrg"></project-message-card>
            </template>

            <template slot="second">
              <div>
                <service-evaluate :service-product-id="portalProject.id" style="white-space: normal" :columns="columns"></service-evaluate>
              </div>
            </template>

          </tab-card-template>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import TabCardTemplate from '../../table/TabCardTemplate'
  import OwnOtherProject from './OwnOtherProject'
  import ProjectMessageCard from './ProjectMessageCard'
  import ServiceEvaluate from '../../card/ServiceEvaluate'

  export default {
    name: 'ProjectDetailsBody',
    components: { ServiceEvaluate, ProjectMessageCard, OwnOtherProject, TabCardTemplate },
    props: {
      ownArr: {
        type: Array,
        default: () => {
          return []
        }
      },
      portalProject: {
        type: Object,
        default: () => {
          return {}
        }
      },
      selectOrg: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        columns: [
          {
            title: '评价用户/企业',
            key: 'enterpriseName',
            width: '30%',
            scopedSlots: { customRender: 'enterpriseName' }
          },
          {
            title: '交易评价',
            dataIndex: 'serveScore',
            key: 'serveScore',
            scopedSlots: { customRender: 'score' },
            width: '20%'
          },
          {
            title: '评价内容',
            dataIndex: 'evalContent',
            key: 'evalContent',
            width: '50%'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #projectDetailsBody {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    overflow: hidden;
    padding: 5px 0;
    /deep/ .my-import {
      h3 {
        font-size: 14px !important;
      }
    }
  }
</style>