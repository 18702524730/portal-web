<template>
  <div id="highProjectRegisterPage">
    <a-spin :spinning="spinning" size="large">
      <div class="container">
        <a-card :bordered="false">
          <a-row type="flex" justify="center">
            <a-col :span="13" class="my-row">
              <div class="my-title">
                <h2>高端信息登记</h2>
                <!--<a-alert message="提示：高端项目必须与厦门平台接洽成功后方可进行登记发布" type="info" show-icon class="my-alert"/>-->
                <p>请留下您的信息，平台会尽快联系您</p>
              </div>
              <div class="my-content-modal" v-if="!state">
                <project-base-message-form :have-email="false" :state="false"
                                           @func="showModal"></project-base-message-form>
              </div>

              <div class="my-content-success" v-else>
                <p>
                  <a-icon type="smile" theme="twoTone" class="my-icon"/>
                  您好，您申请的高端知识产权信息登记正在审核中，请耐心等候
                </p>
                <a-button type="primary" @click="returnMyProjcet">返回{{ titleName }}</a-button>
              </div>
            </a-col>
          </a-row>

        </a-card>
      </div>
    </a-spin>

    <project-submit-prompt-modal ref="promptModal" @func="judgeState"></project-submit-prompt-modal>
  </div>
</template>

<script>
  import ProjectSubmitPromptModal from '@/components/new/other/ProjectSubmitPromptModal'
  import ProjectBaseMessageForm from '@/components/new/other/ProjectBaseMessageForm'
  import { judgeState } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: 'HighProjectRegisterPage',
    components: { ProjectBaseMessageForm, ProjectSubmitPromptModal },
    data() {
      return {
        url: '/project/portalProject/engagementIsHasNoAudit',
        spinning: false,
        state: false,
        path: '/project/portalProject/list'
      }
    },
    created() {
      debugger
      if (!judgeState()) {
        this.$router.push({ name: 'TradingCenter' })
      }
      this.judgeState()
    },
    methods: {
      async judgeState() {
        this.spinning = true
        const res = await getActionUpdateKeyword(this.url, { type: this.$route.query.type })
        if (res.success) {
          this.state = res.result
        }
        this.spinning = false
        console.info(res)
      },
      showModal() {
        this.$refs.promptModal.showModal()
      },
      returnMyProjcet() {
        const token = Vue.ls.get(ACCESS_TOKEN)

        // todo 不同的不同list
        const path = this.path
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl, '_self')
      }
    },
    computed: {
      titleName() {
        let name = ''
        switch (this.$route.query.type) {
          case '1':
            name = '项目供应信息'
            this.path = '/project/portalProject/list'
            break
          case '2':
            name = '专利供应信息'
            this.path = '/patent/portalSupplyPatent/list'
            break
          case '3':
            name = '商标供应信息'
            this.path = '/trademark/requirementPatent/list'
            break
          default:
        }
        return name
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #highProjectRegisterPage {
    background-color: @main-bg-color;
    padding-bottom: 20px;
    .main-css();
    .my-row {
      margin: 40px 0;
      text-align: center;
      h2 {
        font-size: 24px;
        font-weight: bold;
        color: #666666;
        margin-bottom: 40px;
      }
      .my-alert {
        margin-bottom: 30px;
      }
      p {
        color: #000000;
        font-size: 16px;
        margin-bottom: 40px;
      }
      .my-content-success {
        .my-icon {
          padding-right: 10px;
          font-size: 24px;
        }
        p {
          font-size: 20px;
          display: flex;
          align-items: center;
        }
      }
      .my-content-modal {
        text-align: left;
      }
    }
  }
</style>