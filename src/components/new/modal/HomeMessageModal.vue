<template>
  <div id="homeMessageModal" v-if="modal1Visible">
    <a-card class="my-card">

      <a-row type="flex" justify="end" class="closeIcon">
        <a-icon type="close" @click="closeCard"/>
      </a-row>

      <a-row class="my-title">
        <a @click="viewDetails">
          <h4
            style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 2;">
            <a-tooltip :title="item.title" placement="top"
                       :getPopupContainer="triggerNode => triggerNode.parentNode">
              {{item.title | ellipsis}}
            </a-tooltip>
          </h4>
        </a>
      </a-row>

      <a-row class="main-content" style="height: 65px;overflow: hidden;">
        <a @click="viewDetails" v-html="item.content"></a>
      </a-row>

      <a-row type="flex" justify="space-between" class="bottom-btn">
        <a-col :span="12">
          <a-button type="link" @click="viewDetails">查看详情</a-button>
        </a-col>
        <a-col :span="12" class="right-btn">
          <a-button type="link" @click="previousData">上一条</a-button>
          <a-button type="link" @click="nextData">下一条</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { judgmentBrowser } from '@/utils/role'

  export default {
    name: 'HomeMessageModal',
    data() {
      return {
        modal1Visible: false,
        url: '/zscq/portal/getInformationPage',
        params: {
          pageSize: 1,
          pageNo: 1,
          current: 1,
          total: 0
        },
        item: {},
        timer: null
      }
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    created() {
      this.loadData()
    },
    methods: {
      closeCard() {
        this.modal1Visible = false
        clearTimeout(this.timer)
      },
      async loadData() {
        const res = await getActionUpdateKeyword(this.url, this.params)
        if (res.success) {
          const result = res.result
          if (result.total === 0) {
            this.modal1Visible = false
          } else {
            this.modal1Visible = true
            this.item = result.records[0]
            this.params.current = result.current
            this.params.total = result.total
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
              this.nextData()
            }, 5000)
          }
        } else {
          this.$message.error(res.message)
          this.modal1Visible = false
        }
        console.info(res)
      },
      viewDetails() {
        let route = ''
        let name = 'ArticleMessage'
        switch (this.item.type) {
          case 'policies':
            route = 'NewsConsult'
            break
          case '2':
            route = 'NoticeMessage'
            break
          case 'special':
            route = 'SpecialMessage'
            break
          case '4':
            route = 'TrainMessage'
            name = 'TrainArticleMessage'
            break
          case '5':
            route = 'CareCenter'
            name = 'CareCenterArticleMessage'
            break
          case '6':
            // 服务券暂时不动
            // route = 'CareCenter'
            // name = 'ServiceArticleMessage'
            break
          case '7':
            route = 'FinancialService'
            name = 'FinancialServiceArticleMessage'
            break
          case '8':
            route = 'FinancialPledgeFinancing'
            name = 'FinancialConsultArticleMessage'
            break
          default:
            route = 'NoticeMessage'
            break
        }
        const newPage = this.$router.resolve({ name: name, query: { id: this.item.id, keyRoute: route } })
        window.open(newPage.href, '_blank')
      },
      previousData() {
        this.params.pageNo -= 1
        if (this.params.pageNo <= 0) {
          this.params.pageNo = this.params.total
        }
        this.loadData()
      },
      nextData() {
        this.params.pageNo += 1
        if (this.params.pageNo > this.params.total) {
          this.params.pageNo = 1
        }
        this.loadData()
      }
    },
    filters: {
      ellipsis(value) {
        if (value === undefined || value === null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > 24) {
          return value.substring(0, 24) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #homeMessageModal {
    .my-card {
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 9999999;
      width: 320px;
      /deep/ .ant-card-body {
        padding: 12px 12px 5px;
      }
      .closeIcon {
        margin-bottom: 10px;
      }

      .my-title {
        background-color: #779ef3;
        margin-bottom: 10px;
        padding: 10px;
        h4 {
          color: #FFFFFF;
          font-size: 16px;
          margin: 0;
          max-height: 48px;
        }
      }

      .main-content {
        margin-bottom: 10px;
        /deep/ a, span, div, p {
          font-size: 14px !important;
        }
        a {
          color: @main-font-color;
          &:hover {
            color: @main-color;
          }
        }
      }

      .bottom-btn {
        button {
          padding: 0;
        }
        .right-btn {
          text-align: right;
          button:first-child {
            padding-right: 10px;
          }
        }
      }
    }
  }
</style>