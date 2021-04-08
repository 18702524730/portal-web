<template>
  <div id="tradingCard">
    <a-card>
      <template slot="title">
        <a-tabs defaultActiveKey="1" @change="callback">
          <a-tab-pane tab="交易情况" key="1">
            <div style="padding-left: 5px;padding-bottom: 1em">
              <p>已交易:&nbsp;<span>{{data['已交易'] | getValue}}</span><span v-if="data['已交易']">&nbsp;笔</span></p>
              <p>交易进行中:&nbsp;<span>{{data['交易中'] | getValue}}</span><span v-if="data['交易中']">&nbsp;笔</span></p>
              <p>交易中止:&nbsp;<span>{{data['交易中止'] | getValue}}</span><span v-if="data['交易中止']">&nbsp;笔</span></p>
            </div>
          </a-tab-pane>
        </a-tabs>
      </template>
    </a-card>
  </div>
</template>

<script>

  export default {
    name: 'TradingCard',
    props: {
      data: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        spinning: false
      }
    },
    created() {

    },
    methods: {
      callback() {

      }
    },
    filters: {
      getValue(value) {
        if (value === undefined || value === null) {
          return '无'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #tradingCard {
    .main-css();
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #000000;
    p {
      margin-bottom: 0;
      padding-top: 5px;
      padding-bottom: 5px;
      span:first-child {
        color: #ea3323;
        font-weight: bold;
        font-size: 15px;
      }
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
  }
</style>