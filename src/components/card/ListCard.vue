<template>
  <div id="listCard">
    <div :class="{'container':oldData,'my-new-container':!oldData}">
      <a-row style="margin-bottom: 20px;margin-top: 20px" v-if="haveSearch && oldData">
        <a-col :xs="24" :sm="12" :md="6" :lg="6">
          <a-input-search placeholder="输入关键字" @search="searchPage"></a-input-search>
        </a-col>
      </a-row>

      <a-table :columns="columns" :dataSource="data"
               :pagination="pagination"
               :loading="loading" @change="change" :customRow="onClick" rowKey="id">
        <span slot="my-content" slot-scope="text,record">
          <span>
              <a-tooltip placement="right" :title="text"
                         style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">{{ text }}</a-tooltip>
          </span>
        </span>
        <template slot="title" slot-scope="currentPageData" v-if="!haveSearch">
          <div style="display: flex;padding-left: 20px;align-items:center;" class="my-title">
            <div class="inner-title">
              <div class="react">
                <span class="text">专题</span>
              </div>
            </div>
            <div class="inner-title">
              <img alt="无图片"
                   :src="getImgNewView(specialMessage.specialCover)"
                   :onerror="defaultImg" style="width: 96px;height: 49px;">
            </div>
            <div class="inner-title">
              <p class="p-title">{{specialMessage.specialName}}</p>
              <p>{{specialMessage.createTime | changeDate}}</p>
            </div>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  const columns = [
    {
      title: '公告标题',
      dataIndex: 'title',
      width: '70%',
      scopedSlots: { customRender: 'my-content' }
    },
    {
      title: '发布时间',
      dataIndex: 'releaseDate',
      sorter: true,
      width: '30%'
    }
  ]
  export default {
    name: 'ListCard',
    components: {},
    props: {
      oldData: {
        type: Boolean,
        default: true
      },
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
      },
      columns: {
        type: Array,
        default: () => {
          return columns
        }
      },
      haveSearch: {
        type: Boolean,
        default: true
      },
      specialMessage: {
        type: Object,
        default: () => {
          return {}
        }
      },
      routeName: {
        type: String,
        default: 'ArticleMessage'
      },
      isLink: {
        type: Boolean,
        default: false
      }
    },
    filters: {},
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\''
      }
    },
    methods: {
      searchPage(keyword) {
        this.$emit('func', keyword)
      },
      onClick(record, index) {
        return {
          on: {
            click: () => {
              if (!this.isLink) {
                const newPage = this.$router.resolve({
                  name: this.routeName,
                  query: { id: record.id, keyRoute: this.keyRoute }
                })
                window.open(newPage.href, '_blank')
              } else {
                window.open(record.link, '_blank')
              }

            }
          }
        }
      },
      getImgNewView(text) {
        return getImgNewView(text)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #listCard {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
    .my-new-container {
      /deep/ .ant-table-content {
        border: 1px solid @main-bg-color;
      }
    }
    .ant-input-search {
      margin-left: 30px;
      /deep/ .ant-input {
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
      }
    }
    /deep/ .ant-table-tbody {
      background-color: #ffffff;
    }

    /deep/ .ant-table-row {
      td:nth-child(even) {
        color: #999999;
        text-align: center;
        line-height: 14px;
      }
      td:nth-child(odd) {
        padding-left: 20px;
      }
    }

    /deep/ .ant-table-thead {
      th:nth-child(even) {
        text-align: center;
      }
    }

    .react {
      width: 50px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: @main-color;
      transform: skewX(-20deg);
    }
    .text {
      display: inline-block;
      transform: skewX(20deg);
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
    }
    .my-title {
      .inner-title {
        padding: 0 10px;
        p {
          margin-bottom: 0;
        }
        .p-title {
          font-size: 16px;
          color: @main-font-color;
        }
      }
    }
  }

</style>