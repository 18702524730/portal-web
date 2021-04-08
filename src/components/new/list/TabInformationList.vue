<template>
  <div id="tabInformationList">
    <a-card :hoverable="false" :bordered="true" class="my-tabs">
      <a-tabs v-model="key" class="one-tabs">
        <a-tab-pane :tab="tabName" key="1">
          <a-spin size="large" :spinning="loading" v-if="animate">
            <vue-seamless-scroll :data="data" class="seamless-warp" :class-option="classOption">
              <a-list itemLayout="horizontal" :dataSource="data">
                <a-list-item slot="renderItem" slot-scope="item, index" @click="onClick(item)">
                  <slot name="listContent" :data="item">

                  </slot>
                </a-list-item>

              </a-list>
            </vue-seamless-scroll>
          </a-spin>


          <a-list itemLayout="horizontal" :dataSource="data" :loading="loading" v-else>
            <a-list-item slot="renderItem" slot-scope="item, index" @click="onClick(item)">
              <slot name="listContent" :data="item">

              </slot>
            </a-list-item>

          </a-list>
        </a-tab-pane>
        <a-button slot="tabBarExtraContent" @click="moreButton" v-if="haveMore">查看更多
          <a-icon type="right"/>
        </a-button>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>

  export default {
    name: 'TabInformationList',
    props: {
      haveMore: {
        type: Boolean,
        default: true
      },
      tabName: {
        type: String,
        default: '资讯中心'
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      routeName: {
        type: String,
        default: 'FinancialConsultShow'
      },
      keyRoute: {
        type: String,
        default: 'FinancialPledgeFinancing'
      },
      needJump: {
        type: Boolean,
        default: true
      },
      animate: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        key: '1'
      }
    },
    methods: {
      onClick(item) {
        if (this.needJump) {
          this.$router.push({ name: 'FinancialConsultArticleMessage', query: { id: item.id, keyRoute: this.keyRoute } })
        }
      },
      moreButton() {
        this.$router.push({ name: this.routeName, query: { keyRoute: this.keyRoute } })
      }
    },
    computed: {

      classOption() {
        return {
          step: 0.5, // 数值越大速度滚动越快
          limitMoveNum: 7 // 开始无缝滚动的数据量 this.dataList.length
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #tabInformationList {
    .one-tabs {
      height: 310px;
    }
    .my-tabs {
      /deep/ .ant-spin-container {
        padding-top: 5px;
      }
      /deep/ .ant-card-body {
        padding: 0;
      }
      /deep/ .ant-tabs-bar {
        background-color: #ebecf7;
      }
      /deep/ .ant-tabs-nav-container {
        margin-top: 0;

      }
      /deep/ .ant-tabs-tab {
        font-size: 18px;
        color: @main-font-color;
      }
      .ant-btn {
        background-color: #ebecf7;
        border-color: #ebecf7;
        box-shadow: none;
        color: #898989;
        margin-top: 10px;
        font-size: 14px;
      }
      .ant-btn:hover {
        color: @main-color;
      }
      /deep/ .ant-tabs-ink-bar {
        margin-left: 15px;
        width: 72px !important;
      }
      .ant-list-item {
        padding: 0 15px 3px;
        border: none;
        cursor: pointer;

      }
      .title-p {
        font-size: 14px;
        line-height: 14px;
        width: 80%;
        word-wrap: break-word;
        word-break: break-all;
        padding-right: 10px;
      }
      .time-p {
        font-size: 12px;
        line-height: 12px;
        color: #A2A2A2;
        padding-top: 2px;
        width: 20%;
      }
      .ant-list-item:hover {
        color: @main-color;

      }
      /deep/ .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-nav .ant-tabs-tab:hover {
        color: @main-color;
      }
      /deep/ .ant-tabs-ink-bar {
        background-color: @main-color;
      }
      /deep/ .ant-tabs-tab-active, .ant-tabs-tab {
        margin-right: 15px;
        margin-left: 10px;
      }
      /deep/ .ant-tabs-nav .ant-tabs-tab {
        margin-right: 15px;
        margin-left: 10px;
      }
      /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
        color: @main-color;
      }
    }
    .seamless-warp {
      height: 200px;
      overflow: hidden;
    }
  }
</style>