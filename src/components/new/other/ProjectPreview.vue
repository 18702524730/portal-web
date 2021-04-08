<template>
  <div id="projectPreview">
    <a-spin size="large" :spinning="spinning">
      <project-message-card :project-type="projectType" :portal-project="portalProject"
                            :select-org="selectOrg"></project-message-card>

      <a-row justify="center" type="flex" class="my-bottom-btn" v-if="!audit">
        <a-col :span="6" class="my-row-btn">
          <a-button type="primary" class="my-btn" @click="backTop">上一步</a-button>
        </a-col>
        <a-col :span="6" class="my-row-btn">
          <a-button type="primary" class="my-btn" @click="onSubmit">提交</a-button>
        </a-col>
      </a-row>

      <a-row v-else>
        <a-row>
          <a-divider orientation="left">审核意见</a-divider>
          <a-form-model :model="form" :rules="rules"
                        ref="ruleForm">
            <a-form-model-item label="审核状态" prop="auditStatus">
              <a-switch v-model="form.auditStatus" checked-children="通过" un-checked-children="不通过"/>
            </a-form-model-item>
            <a-form-model-item label="审批意见" prop="auditOpinion" has-feedback>
              <a-textarea v-model="form.auditOpinion" rows="4" placeholder="请输入审批意见"/>
            </a-form-model-item>
          </a-form-model>
        </a-row>
        <a-row justify="center" type="flex" class="my-bottom-btn">
          <a-col :span="6" class="my-row-btn">
            <a-button type="primary" class="my-btn" @click="handleAuditAction">审核</a-button>
          </a-col>
        </a-row>

      </a-row>
    </a-spin>
  </div>
</template>

<script>
  import ProjectMessageCard from '../card/ProjectMessageCard'
  import { getActionUpdateKeyword, postAction } from '@/api/manage'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: 'ProjectPreview',
    components: { ProjectMessageCard },
    props: {
      audit: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        spinning: false,
        projectType: this.$route.query.type,
        portalProject: {},
        projectUrl: '/zscq/portal/projectInfolist',
        commitUrl: '/project/portalProject/commit',

        orgUrl: '/zscq/portal/getOrgAgencyByOrgId',
        selectOrg: {},

        form: {
          auditStatus: true,
          auditOpinion: ''
        },
        rules: {
          auditOpinion: [{
            required: false, max: 200, message: '请输入解决的技术问题,最多200个字符!'
          }]
        },
        auditAction: '/project/portalProject/auditAction'
      }
    },
    created() {
      // 通过id加载数据
      if (this.$route.query && this.$route.query.projectId) {
        this.loadData()
      }
    },
    methods: {
      addKey(itemArr) {
        for (const i in itemArr) {
          itemArr[i].key = i
        }
      },
      async loadData() {
        this.spinning = true
        const param = { projectId: this.$route.query.projectId }
        const res = await getActionUpdateKeyword(this.projectUrl, param)
        if (res.success) {
          // 给原来子对象添加key
          this.addKey(res.result.portalSupplyProjectPatents)
          this.addKey(res.result.portalSupplyProjectTrademarks)
          this.addKey(res.result.portalSupplyProjectSoftwares)
          this.addKey(res.result.portalSupplyProjectJcdls)
          this.addKey(res.result.portalSupplyProjectZwxpzs)
          this.portalProject = res.result
          if (this.portalProject.projectStatus === '6') {
            // 审核不通过
            this.form.auditStatus = false
          }
          this.form.auditOpinion = this.portalProject.auditOpinion
          if (this.portalProject.projectType === '2') {
            // 这是托管项目
            // 有托管企业
            const orgRes = await getActionUpdateKeyword(this.orgUrl, { orgId: this.portalProject.trusteeshipOrgId })
            if (orgRes.success) {
              this.selectOrg = orgRes.result
            } else {
              this.$message.warning(orgRes.message)
            }
          }

        } else {
          this.$message.error(res.message)
        }
        this.spinning = false
      },
      backTop() {
        // 跳转到上一个页面
        this.spinning = true
        this.jumpBack()
        this.spinning = false
      },
      onSubmit() {
        // 保存提交，最后跳转
        const that = this
        that.$confirm({
          title: '确认提交项目',
          content: '确认提交项目',
          onOk: async function() {
            that.spinning = true
            const res = await postAction(that.commitUrl, that.portalProject)
            console.info(res)
            that.jumpCenter()
            that.spinning = false
          }
        })
      },
      async handleAuditAction() {
        this.spinning = true
        const param = {
          id: this.$route.query.projectId,
          auditStatus: this.form.auditStatus,
          auditOpinion: this.form.auditOpinion
        }
        const res = await getActionUpdateKeyword(this.auditAction, param)
        console.info(res)
        console.info('审核完成')
        this.jumpCenter()
        this.$message.success('审核完成')
        this.spinning = false
      },
      jumpCenter() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const path = '/project/portalProject/list'
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl, '_self')
      },
      jumpTo() {
        const name = 'TradingCenter'
        this.$router.push({
          name: name
        })
      },
      jumpBack() {
        let name = ''
        switch (this.portalProject.projectType) {
          case '1':
            name = 'HighProjectPublishDescribeMessage'
            break
          case '2':
            name = 'EscrowProjectSelectHosingProject'
            break
          case '3':
            name = 'SelfHelpProjectDescribeMessage'
            break
          default:
            break
        }
        this.$router.push({
          name: name,
          query: { type: this.portalProject.projectType, projectId: this.portalProject.id }
        })
      }
    },
    watch: {}
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #projectPreview {
    .my-row-btn {
      text-align: center;
      .my-btn {
        width: 50%;
      }
    }
    .my-bottom-btn {
      padding-top: 20px;
    }
  }
</style>