<template>
  <div id="projectSubmitPromptModal">
    <a-modal
      :visible="visible"
      :footer="null"
      @cancel="returnProject">
      <a-row type="flex" justify="center" align="middle" class="my-row">
        <a-col :span="4">
          <a-icon type="check-circle" theme="twoTone" class="my-icon"/>
        </a-col>
        <a-col :span="16"><span class="my-span"><span v-if="!isHigh">{{ isNotHighTitle }}</span><span v-else>已收到您的申请，后台工作人员将于三日内与您取得联系。</span></span>
        </a-col>
      </a-row>
      <a-row type="flex" justify="end">
        <a-button class="my-btn" @click="handleOk" v-if="isHigh">确定</a-button>
        <a-button class="my-btn" @click="viewBtn" v-else>预览</a-button>
        <a-button type="primary" @click="returnProject">返回{{titleName}}</a-button>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: 'ProjectSubmitPromptModal',
    data() {
      return {
        visible: false,
        path: '/project/portalProject/list',
        keyName: 'SupplyProjectDetails'
      }
    },
    props: {
      isHigh: {
        type: Boolean,
        default: true
      },
      itemId: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'supply'
      },
      modalStatus: {
        type: String,
        default: '0'
      }
    },
    methods: {
      showModal() {
        this.visible = true
      },
      handleOk() {
        this.visible = false
        this.$emit('func')
      },
      viewBtn() {
        const newPage = this.$router.resolve({ name: this.name, query: { id: this.itemId } })
        window.open(newPage.href, '_blank')
      },
      returnProject() {
        this.visible = false
        const token = Vue.ls.get(ACCESS_TOKEN)

        // 不同的类型 有不同的path
        const path = this.path
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl, '_self')
      }
    },
    computed: {
      isNotHighTitle() {
        let title = '信息发布成功，待后台管理员审核。'
        if (this.$route.name.indexOf('Edit') > -1 && this.modalStatus !== "1") {
          title = '保存成功'
        }
        return title
      },
      titleName() {
        if (this.type === 'supply') {
          let name = ''
          switch (this.$route.query.type) {
            case '1':
              name = '项目供应信息'
              this.path = '/project/portalProject/list'
              this.name = 'SupplyProjectDetails'
              break
            case '2':
              name = '专利供应信息'
              this.path = '/patent/portalSupplyPatent/list'
              this.name = 'SupplyPatentDetails'
              break
            case '3':
              name = '商标供应信息'
              this.path = '/trademark/requirementPatent/list'
              this.name = 'SupplyBrandDetails'
              break
            default:
          }
          return name
        } else {
          let name = ''
          switch (this.$route.query.type) {
            case '1':
              name = '项目需求信息'
              this.path = '/project/portalRequirement/list'
              this.name = 'ProjectDetails'
              break
            case '2':
              name = '专利需求信息'
              this.path = '/patent/portalRequirementPatent/list'
              this.name = 'PatentDetails'
              break
            case '3':
              name = '商标需求信息'
              this.path = '/trademark/portalRequirementTrademark/list'
              this.name = 'BrandDetails'
              break
            default:
          }
          return name
        }

      }
    }
  }
</script>

<style scoped lang="less">
  .my-row {
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .my-span {
    color: black;
    font-size: 16px;
  }

  .my-icon {
    font-size: 50px;
  }

  .my-btn {
    margin-right: 20px;
  }
</style>