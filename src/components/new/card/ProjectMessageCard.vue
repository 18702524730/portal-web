<template>
  <div id="projectMessageCard">
    <a-row class="main-h3 my-row">
      <h3>项目基本信息</h3>
    </a-row>
    <a-row class="my-content">
      <a-col :span="10" :offset="2">
        <div class="my-span">
          <span>项目名称：</span> <span>{{ portalProject.projectName}}</span>
        </div>
      </a-col>
      <a-col :span="10" :offset="2">
        <div class="my-span">
          <span>展示有效期：</span> <span>{{ portalProject.startDate | dateFormat}}至{{ portalProject.deadlineDate | dateFormat}}</span>
        </div>
      </a-col>
    </a-row>
    <a-row class="my-content">
      <a-col :span="10" :offset="2">
        <div class="my-span">
          <span>所属行业：</span>
          <span style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip placement="top" :title="portalProject.belongIndustryName" style="white-space: inherit">{{ portalProject.belongIndustryName}}</a-tooltip></span>
        </div>
      </a-col>
      <a-col :span="10" :offset="2">
        <div class="my-span">
          <span>项目所在地：</span> <span>{{ portalProject.madeAreaCodeName }}</span>
        </div>
      </a-col>
    </a-row>

    <a-row class="main-h3 my-row">
      <h3>项目内容</h3>
    </a-row>
    <a-row class="my-run-way">
      <a-row>
        <project-center-table :portal-project="portalProject"></project-center-table>
      </a-row>

      <a-row class="project-details">
        <a-row :gutter="16" class="project-content-details">
          <a-col :span="4">
            <span class="my-title">项目简介：</span>
          </a-col>
          <a-col :span="20">
            <div>
              <span class="my-content" v-html="portalProject.projectRemark"  style="white-space: pre-wrap;word-break: break-all;overflow-x: auto"></span>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="16" class="project-content-details">
          <a-col :span="4">
            <span class="my-title">项目内容：</span>
          </a-col>
          <a-col :span="20">
            <div>
              <span class="my-content" v-html="portalProject.projectContent" style="white-space: pre-wrap;word-break: break-all;overflow-x: auto"></span>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="16" class="project-content-details">
          <a-col :span="4">
            <span class="my-title">技术团队：</span>
          </a-col>
          <a-col :span="20">
            <div>
              <span class="my-content">{{ portalProject.technologyTeamName}}</span>
            </div>
          </a-col>
        </a-row>
      </a-row>
    </a-row>

    <a-row class="main-h3 my-row">
      <h3>项目描述</h3>
    </a-row>
    <a-row class="project-details my-run-way">
      <a-row :gutter="16" class="project-content-details">
        <a-col :span="4">
          <span class="my-title">解决的技术问题：</span>
        </a-col>
        <a-col :span="20">
          <div>
            <span class="my-content">{{ portalProject.sloveProblem }}</span>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="16" class="project-content-details">
        <a-col :span="4">
          <span class="my-title">技术领域/适用范围：</span>
        </a-col>
        <a-col :span="20">
          <div>
            <span class="my-content">{{ portalProject.technicalField }}</span>
          </div>
        </a-col>
      </a-row>
    </a-row>

    <!--<div v-if="projectType === '2'">-->
      <!--<a-row class="main-h3 my-row">-->
        <!--<h3>项目托管机构</h3>-->
      <!--</a-row>-->

      <!--<hosting-service-org-card :item="selectOrg"></hosting-service-org-card>-->
    <!--</div>-->


  </div>
</template>

<script>
  import ProjectCenterTable from './ProjectCenterTable'
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'ProjectMessageCard',
    components: { ProjectCenterTable },
    props: {
      projectType: {
        type: String,
        default: '3'
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
    methods: {
      getImgNewView
    },
    computed: {
      imgList() {
        if (this.portalProject && this.portalProject.projectImgUrl) {
          return this.portalProject.projectImgUrl.split(',')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #projectMessageCard {
    .my-row {
      margin-bottom: 10px;
    }
    .main-h3 {

    }
    .my-content {
      margin-bottom: 20px;
      margin-top: 20px;
      .my-span {
        display: flex;
        span:nth-child(1) {
          white-space: nowrap;
        }
        span:nth-child(2) {
          white-space: normal;
        }
      }
    }
    .project-details {
      .project-content-details {
        margin-bottom: 15px;
        .my-title {
          float: right;
        }
        .my-content {
          white-space: normal;
          img {
            width: 120px;
            height: 120px;
            padding-right: 10px;
          }
        }
      }
      .project-content-details:nth-child(1) {
        margin-top: 10px;
      }
    }

    .my-run-way {
      padding: 20px 40px;
    }
  }
</style>