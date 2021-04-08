<template>
  <div id="searchHeader">
    <div class="container head-part">
      <a-row>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="log-tit">
            <div style="cursor: pointer;">
              <router-link :to="{name:'Home'}">
                <img src="../assets/images/logo2.png" style="width: 75px;height: 75px"/>
                <div class="inn">
                  <span>厦门知识产权</span>
                  <span>运营公共服务平台</span>
                </div>
              </router-link>
            </div>
            <div class="row-title" v-if="title !== ''">
              <a-divider type="vertical" style="margin: 0 17px;font-size: 60px;width: 1px;"/>
              <span class="span-change">{{title}}</span>
            </div>
            <div class="row-title" v-else>
              <!--<a-divider type="vertical" style="margin: 0 17px;font-size: 60px;width: 1px;background-color: #B9CFF5"/>-->
              <!--<span style="color: #0055dd;" class="span-change">公测版</span>-->
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="log-tit" style="padding-top: 12px">
            <a-tabs :active-key="key" @change="changeNewTab">
              <a-tab-pane tab="政策" key="fiveth"></a-tab-pane>
              <a-tab-pane tab="服务" key="first"></a-tab-pane>
              <a-tab-pane tab="服务机构" key="second"></a-tab-pane>
              <a-tab-pane tab="需求" key="third"></a-tab-pane>
              <a-tab-pane tab="供应" key="fourth"></a-tab-pane>
            </a-tabs>
            <a-input-search placeholder="请输入内容" enterButton="搜索" class="input-with-select" @search="handleSearch"
                            :defaultValue="$route.query.kwtext === undefined ? '':$route.query.kwtext"/>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchHeader',
    props: {
      title: {
        type: String,
        default: ''
      },
      keyword: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        key: 'fiveth'
      }
    },
    created() {

    },
    methods: {
      handleSearch(value) {
        let name = ''
        switch (this.key) {
          case 'first':
            name = 'ServiceSearch'
            break
          case 'second':
            name = 'AgencySearch'
            break
          case 'third':
            name = 'DemandSearch'
            break
          case 'fourth':
            name = 'SupplySearch'
            break
          case 'fiveth':
            name = 'MessageSearch'
            break
        }
        this.$router.push({ name: name, query: { tab: this.key, kwtext: value } })
        this.$emit('func', value)
      },
      changeTab(key) {
        // this.key = key
      },
      changeNewTab(key) {
        this.key = key
      }
    }
  }
</script>

<style scoped lang="less">
  @import "main";

  #searchHeader {
    .main-css();
    text-align: center;
    color: #333333;
    font-size: 14px;
    .head-part {
      .row-title {
        font-size: 15px;
        margin-top: 15px;
      }
      .log-tit {
        text-align: left;
        height: 62px;
        padding: 6px 0;
        img {
          float: left;
          margin-left: 5px;
        }
        div.inn {
          float: left;
          margin-top: 12.5px;
          margin-left: 15px;
          span {
            font-size: 18px;
            line-height: 26px;
            display: block;
            color: #001833;
          }
        }
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
      /deep/ .ant-tabs-bar {
        border: 0;
        margin-bottom: 5px;
      }
      /deep/ .ant-tabs-tab {
        line-height: 1;
        height: 20px;
        margin-right: 20px !important;
        border: 0;
        list-style: none;
        color: #333333;
      }
      /deep/ .ant-tabs-nav .ant-tabs-tab {
        padding: 0 5px;
      }
      /deep/ .ant-tabs.ant-tabs-top.ant-tabs-line {
        margin: 0 20px 0 0;
        width: 360px;
        float: right;
      }
      /deep/ span.input-with-select.ant-input-group-wrapper.ant-input-search.ant-input-search-enter-button {
        margin-bottom: 15px;
        float: left;
      }
      /deep/ input.ant-input {
        max-width: 330px;
        float: right;
        height: 32px;
        line-height: 32px;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
      }
      /deep/ button.ant-btn.ant-btn-primary.ant-input-search-button {
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        background-color: @main-color;
        height: 32px;
        color: #ffffff;
        border-color: @main-color;
      }
      /deep/ .ant-input:hover, .ant-input:focus {
        border-color: @main-color;
      }
      .span-change {
        font-size: 18px;
      }
    }
  }
</style>