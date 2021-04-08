<template>
  <div id="projectOrderCommitSuccess">
    <div class="container">
      <a-card>
        <template slot="title">
          <p style="color: #2f72d1">| 订单提交成功</p>
        </template>
        <result :is-success="true" :description="description" :title="title" :content="false" :my-content="true">
          <template slot="action">
            <a-button type="primary" @click="enterCenter">进入交易大厅</a-button>
            <a-button type="primary" style="margin-left: 15px" class="second-button" @click="checkOrder">
              查看订单
            </a-button>
          </template>
          <div>
            <a-row :gutter="8">
              <a-col :span="12" style="text-align: right">
                <p>应付总额:</p>
              </a-col>
              <a-col :span="12" style="text-align: left">
                <p><span>{{ this.$route.query.newMoney }}</span></p>
              </a-col>
            </a-row>

          </div>
        </result>
      </a-card>
    </div>
  </div>
</template>

<script>
  import { judgeState } from '@/utils/util'
  import Result from '@/components/general/Result'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import Vue from 'vue'

  export default {
    name: 'ProjectOrderCommitSuccess',
    components: { Result },
    data() {
      return {
        title: '订单提交成功',
        description: '我们将尽快与您联系，请保持手机通畅'
      }
    },
    created() {
      if (!judgeState()) {
        this.$router.push({ path: '/portal' })
      }
    },
    methods: {
      enterCenter() {
        this.$router.push({ name: 'TradingCenter' })
      },
      checkOrder() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const path = '/trade/ipPurchaseOrder'
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl)
        // this.$router.push({ path: '/trade/serviceProcureOrder' })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #projectOrderCommitSuccess {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 20px;
    overflow: hidden;
    p {
      padding-bottom: 10px;
      margin-bottom: 0;
      span {
        color: #ff3300;
      }
    }
    .ant-btn:hover {
      opacity: 0.7;
    }
    /deep/ .action {
      margin-top: 16px;
    }

    .second-button {
      background-color: #eaeaea;
      border-color: #eaeaea;
    }
    .second-button {
      /deep/ span {
        color: #999999;
      }
    }
  }
</style>