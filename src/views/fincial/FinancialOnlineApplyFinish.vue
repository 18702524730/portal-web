<template>
  <div id="financialOnlineApplyFinish">
    <a-row type="flex" justify="center" align="middle">
      <a-col class="my-icon">
        <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a"/>
      </a-col>
      <a-col class="my-text">恭喜您，一带一路引导资金申请资料{{titleName}}成功，<br/>等待审核……</a-col>
    </a-row>
    <a-row class="my-bottom-btn">
      <a-button @click="backPage">返回一带一路引导资金</a-button>
      <a-button type="primary" @click="viewPage">查看我的申请</a-button>
    </a-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: 'financialOnlineApplyFinish',
    props: {
      orgId: {
        type: String,
        default: ''
      },
      titleName: {
        type: String,
        default: '提交'
      }
    },
    data() {
      return {}
    },
    methods: {
      backPage() {
        this.$router.push({ name: 'FinancialService' })
      },
      viewPage() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const path = '/guide/portalGuidingFundsApplyApply/list'
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl)
      }
    }
  }
</script>

<style scoped lang="less">
  #financialOnlineApplyFinish {
    .my-bottom-btn {
      margin-top: 50px;
      text-align: center;
      .ant-btn {
        width: 170px;
        margin: 10px;
      }
    }
    .my-icon {
      font-size: 70px;
      margin-right: 10px;
    }
    .my-text {
      font-size: 28px;
      color: #666666;
    }
  }
</style>