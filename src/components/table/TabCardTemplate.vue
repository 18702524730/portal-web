<template>
  <div id="tabCardTemplate">
    <a-card :class="noTitle?'no-title':''">
      <template slot="title">
        <a-tabs :defaultActiveKey="defaultActiveKey" :activeKey="clickFocus" @change="callback">
          <a-tab-pane :tab="tabTitle" key="1">
            <div style="padding-left: 5px;padding-bottom: 1em;">
              <slot name="content"></slot>
            </div>
          </a-tab-pane>
          <a-tab-pane :tab="tabTitle2" key="2" v-if="twoTabs">
            <div style="padding-left: 5px;padding-bottom: 1em;">
              <slot name="second"></slot>
            </div>
          </a-tab-pane>
        </a-tabs>
      </template>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'TabCardTemplate',
    props: {
      tabTitle: {
        type: String,
        default: '交易情况'
      },
      tabTitle2: {
        type: String,
        default: '交易情况'
      },
      twoTabs: {
        type: Boolean,
        default: false
      },
      defaultActiveKey: {
        type: String,
        default: '1'
      },
      noTitle: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        clickFocus: '1'
      }
    },
    methods: {
      callback(val) {
        this.clickFocus = val
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #tabCardTemplate {
    .main-css();
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #000000;
    /deep/ div {
      word-break: break-all;
    }
    /deep/ .ant-tabs-tab {
      font-size: 16px;
      padding: 12px 5px;
      margin: 0 43px 0 0;
    }
    /deep/ .ant-tabs-nav .ant-tabs-tab-active {
      color: @main-color;
    }
    /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
      color: @main-color;
    }
    /deep/ .ant-tabs-ink-bar {
      background-color: @main-color;
    }

    /deep/ .no-title {
      .ant-tabs-top-bar {
        display: none !important;
      }
      .ant-card-head-title {
        padding-top: 5px;
      }
    }
  }
</style>