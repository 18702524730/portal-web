<template>
  <div id="articleMessage">
    <div class="container">
      <a-card :bordered="false" class="inner-card">
        <template slot="title">
          <div style="text-align: center" class="data-title">
            <p style="white-space: pre-wrap;">{{items.title}}</p>
            <span>发布时间:&nbsp;<span>{{items.releaseDate | formatDate}}</span></span>
          </div>
        </template>
        <div v-html="items.content" style="margin-bottom: 10px;white-space: pre-wrap;word-break: break-all;">
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
  import {
    INFORMATION_ITEM
  } from '@/store/mutation-types'
  import Vue from 'vue'

  export default {
    name: 'JPreview',
    data() {
      return {
        items: {}

      }
    },
    filters: {
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        const a = Vue.ls.get(INFORMATION_ITEM)
        this.items = JSON.parse(a.item)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";
  #articleMessage {
    .main-css();
    color: #333333;
    background-color: #ffffff;
    font-size: 14px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    .data-title {
      span {
        color: #999999;
        font-size: 14px;
      }
      p {
        padding-top: 20px;
        font-size: 18px;
        font-weight: 900;
      }
    }
    .inner-card {
      margin-left: auto;
      margin-right: auto;
      width: 80%;
    }
    /deep/ .ant-card-body {
      padding: 24px 5px;
    }

  }

</style>