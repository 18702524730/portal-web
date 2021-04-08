<template>
  <div id="messageList">
    <div class="container">
      <a-table :columns="columns" :dataSource="data" :rowKey="record => record.id"
               :pagination="pagination"
               :loading="loading" @change="change" :customRow="onClick" :showHeader="false">
        <span slot="typeName" slot-scope="typeName">
          【{{typeName}}】
        </span>
        <span slot="releaseDate" slot-scope="releaseDate">
          {{releaseDate | changeDate}}
        </span>
        <span slot="my-content" slot-scope="text,record">
          <span>
              <a-tooltip placement="right" :title="text"
                         style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">{{ text }}</a-tooltip>
          </span>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>

  const columns = [
    {
      title: '信息类型',
      dataIndex: 'typeName',
      width: '15%',
      key: 'typeName',
      className: 'type-name',
      scopedSlots: { customRender: 'typeName' }
    },
    {
      title: '公告标题',
      dataIndex: 'title',
      width: '70%',
      className: 'title-name',
      key: 'title',
      scopedSlots: { customRender: 'my-content' }
    },
    {
      title: '发布时间',
      dataIndex: 'releaseDate',
      sorter: true,
      width: '15%',
      className: 'release-date',
      key: 'releaseDate',
      scopedSlots: { customRender: 'releaseDate' }
    }
  ]
  export default {
    name: 'MessageList',
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      pagination: {
        type: Object,
        default: () => {
          return { pagination: false }
        }
      },
      loading: {
        type: Object,
        default: () => {
          return { spinning: false }
        }
      },
      change: {
        type: Function,
        default: () => {
        }
      },
      keyRoute: {
        type: String,
        default: 'NoticeMessage'
      }
    },
    data() {
      return {
        columns
      }
    },
    filters: {},
    methods: {
      searchPage(keyword) {
        this.$emit('func', keyword)
      },
      onClick(record, index) {
        return {
          on: {
            click: () => {
              let route = this.keyRoute
              let name = 'ArticleMessage'
              switch (record.type) {
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
              const newPage = this.$router.resolve({ name: name, query: { id: record.id, keyRoute: route } })
              window.open(newPage.href, '_blank')
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #messageList {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
    /deep/ .ant-table-tbody {
      background-color: #ffffff;
    }

    /deep/ .ant-table-row {
      td:nth-child(even) {
        color: #333333;
      }
      td:nth-child(odd) {
        color: #999999;
      }
    }
  }

</style>