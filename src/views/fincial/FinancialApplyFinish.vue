<template>
  <div id="financialApplyFinish">
    <a-row type="flex" justify="center" align="middle">
      <a-col class="my-icon">
        <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a"/>
      </a-col>
      <a-col class="my-text" v-if="orgId === ''">恭喜您，质押融资申请提交成功，<br/>等待系统匹配银行……</a-col>
      <a-col class="my-text" v-else>恭喜您，质押融资申请提交成功，<br/>等待银行审批……</a-col>
    </a-row>
    <a-row class="my-bottom-btn">
      <a-button @click="backPage">返回质押融资</a-button>
      <a-button type="primary" @click="viewPage">查看我的申请</a-button>
    </a-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: 'FinancialApplyFinish',
    props: {
      orgId: {
        type: String,
        default: ''
      }
    },
    methods: {
      backPage() {
        this.$router.push({ name: 'FinancialPledgeFinancing' })
      },
      viewPage() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const path = '/pledge/pledgeEnterpriseOrderList'
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl)
      }
    }
  }
</script>

<style scoped lang="less">
  #financialApplyFinish {
    .my-bottom-btn {
      margin-top: 50px;
      text-align: center;
      .ant-btn {
        width: 150px;
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