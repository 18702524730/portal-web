<template>
  <div id="selectHosingProject">
    <a-spin size="large" :spinning="spinning">
      <a-row class="main-h3 my-row">
        <h3>选择托管机构</h3>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col :span="8">
          <a-divider><span class="line-title">推荐的托管机构</span></a-divider>
        </a-col>
      </a-row>
      <recommend-organization :data="agencyData" :loading="agencyLoading" :pagination="ipagination"
                              style="background-color: #f5f5f5;padding-left: 10px;padding-right: 10px"
                              :old-data="false">
        <template slot="card" slot-scope="item">
          <hosting-org-card @func="changeSelect" :item="item.data"></hosting-org-card>
        </template>
      </recommend-organization>

      <div>
        <a-row type="flex" justify="center">
          <a-col :span="8">
            <a-divider><span class="line-title">托管机构信息</span></a-divider>
          </a-col>
        </a-row>

        <hosting-service-org-card v-if="JSON.stringify(selectOrg) !== '{}'"
                                  :item="selectOrg"></hosting-service-org-card>
      </div>

      <a-row class="my-btn-div">
        <a-col :span="6">
          <a-button type="primary" @click="saveDraft" class="my-btn-group" :disabled="btnNotCan">
            保存草稿
          </a-button>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="backTop" class="my-btn-group" :disabled="btnNotCan">
            上一步
          </a-button>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="onSubmit" class="my-btn-group" :disabled="btnNotCan">
            下一步
          </a-button>
        </a-col>
        <a-col :span="6">
          <a-button class="my-btn-group" @click="changeType" >
            转为自助项目>>
          </a-button>
        </a-col>
      </a-row>
    </a-spin>

  </div>
</template>

<script>
  import RecommendOrganization from '../../general/RecommendOrganization'
  import HostingOrgCard from '../card/HostingOrgCard'
  import HostingServiceOrgCard from '../card/HostingServiceOrgCard'

  import { getActionUpdateKeyword, postAction } from '@/api/manage'
  import { filterObj } from '@/utils/util'

  export default {
    name: 'SelectHosingProject',
    components: { HostingServiceOrgCard, HostingOrgCard, RecommendOrganization },
    data() {
      return {
        spinning: false,
        btnNotCan: false,

        agencyData: [],
        agencyFormParam: {
          recommend: 1
        },
        ipagination: {
          current: 1,
          pageSize: 4,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        agencyLoading: {
          spinning: false
        },
        agencyUrl: '/zscq/portal/getAgencyPage',
        orgUrl: '/zscq/portal/getOrgAgencyByOrgId',

        selectOrg: {},

        portalProject: {
          trusteeshipOrgId: '',

          projectType: this.$route.query.type,
          id: this.$route.query.projectId
        },

        projectUrl: '/zscq/portal/projectInfolist',
        addDraftUrl: '/project/portalProject/draft',
        checkUrl: '/project/portalProject/projectInfoCheck'
      }
    },
    created() {
      // 如果有id 可能 是编辑或者草稿
      if (this.$route.query && this.$route.query.projectId) {
        this.loadData()
      } else {
        this.$router.push({ name: 'TradingCenter' })
      }
    },
    methods: {
      async loadData() {
        this.spinning = true
        const param = { projectId: this.$route.query.projectId }
        const res = await getActionUpdateKeyword(this.projectUrl, param)
        if (res.success) {
          Object.assign(this.portalProject, res.result)
          console.info('又获得数据了')
          console.info(this.portalProject)
          // 加载完 项目数据后，判断是否有选择托管企业
          if (this.portalProject && this.portalProject.trusteeshipOrgId) {
            // 有托管企业
            const orgRes = await getActionUpdateKeyword(this.orgUrl, { orgId: this.portalProject.trusteeshipOrgId })
            if (orgRes.success) {
              this.selectOrg = orgRes.result
            } else {
              this.$message.warning(orgRes.message)
            }
            console.info(orgRes)
          }
          await this.loadOrgsData(this.selectOrg, this.getParam(this.agencyFormParam))

        } else {
          this.$message.error(res.message)
        }
        this.spinning = false
      },
      async loadOrgsData(org, param) {
        this.agencyLoading.spinning = true
        const res = await getActionUpdateKeyword(this.agencyUrl, param)
        if (res.success) {
          // 加载之后，需要设置一个 tagState
          for (const a of res.result.records) {
            if (a.id === org.id) {
              a.tagState = true
            } else {
              a.tagState = false
            }
          }
          this.agencyData = res.result.records
          this.ipagination.total = res.result.total
        } else {
          this.$message.warning(res.message)
        }
        this.agencyLoading.spinning = false

      },
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.getParam(this.agencyFormParam)
        this.loadOrgsData(this.selectOrg, param)
      },
      getParam(formParam) {
        const param = Object.assign({}, formParam)
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        return filterObj(param)
      },
      async submitData(func,change = false) {
        this.btnNotCan = true
        // 保存之前先处理数组
        let notUpdate = true
        if (JSON.stringify(this.selectOrg) !== '{}' && !change) {
          this.portalProject.trusteeshipOrgId = this.selectOrg.id
        }
        if (this.portalProject.projectStatus === '3') {
          // 这是 审核通过的订单，提交之前先校验
          const pres = await postAction(this.checkUrl, this.portalProject)
          notUpdate = pres.success
        }
        let res = {}
        if (!notUpdate) {
          // 修改了 需要提示
          const that = this
          that.$confirm({
            title: '确认提交项目',
            content: '审核通过项目修改后再提交，需要重新审核',
            onOk: async function() {
              that.spinning = true
              res = await postAction(that.addDraftUrl, that.portalProject)
              if (func) {
                func(res)
              }
              that.spinning = false
            }
          })
        } else {
          // 直接 修改
          this.spinning = true
          res = await postAction(this.addDraftUrl, this.portalProject)
          if (func) {
            func(res)
          }
          this.spinning = false
        }
        this.btnNotCan = false

      },
      saveDraft() {
        // 保存之前先判断这个是否是审核通过的
        // 保存草稿
        this.submitData()
      },
      backTop() {
        // 上一步，先保存草稿，跳转到上一个页面
        this.submitData(this.jumpBack)
      },
      onSubmit() {
        if (JSON.stringify(this.selectOrg) === '{}') {
          // 还没有选择托管机构
          this.$message.warning('请选择一家托管机构！')
          return false
        } else {
          // 选择了，保存数据，并进行跳转
          this.submitData(this.jumpTo)
        }
      },
      changeSelect(item) {
        console.info(item)
        console.info(this.agencyData)
        this.agencyData.forEach(a => {
          if (a.id === item.id) {
            a.tagState = true
            this.selectOrg = a
          } else {
            a.tagState = false
          }
        })
      },
      jumpTo() {
        this.$router.push({
          name: 'EscrowProjectPreview',
          query: { type: this.portalProject.projectType, projectId: this.portalProject.id }
        })
      },
      jumpBack() {
        this.$router.push({
          name: 'EscrowProjectDescribeMessage',
          query: { type: this.portalProject.projectType, projectId: this.portalProject.id }
        })
      },
      jumpChange() {
        this.$router.push({
          name: 'SelfHelpProjectRegisterForm',
          query: { type: this.portalProject.projectType, projectId: this.portalProject.id }
        })
      },
      changeType(){
        // 转为自助类型，跳转到自助的起始
        this.portalProject.projectType = "3"
        this.portalProject.trusteeshipOrgId = ""
        this.submitData(this.jumpChange,true)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #selectHosingProject {
    font-size: 16px;
    padding-bottom: 20px;
    .main-h3 {
      h3 {
        font-size: 20px;
        color: #666666;
        span {
          font-size: 12px;
          color: #999999;
        }
      }
      margin-bottom: 20px;
    }

    .my-btn-div {
      text-align: center;
      margin-top: 20px;
      .my-btn-group {
        width: 50%;
      }
    }

    .line-title {
      font-size: 14px;
    }
  }
</style>