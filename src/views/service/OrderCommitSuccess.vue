<template>
  <div id="orderCommitSuccess">
    <div class="container">
      <a-card>
        <template slot="title">
          <p style="color: #2f72d1">| 订单提交成功</p>
        </template>
        <result :is-success="true" :description="description" :title="title" :content="false" :my-content="true">
          <template slot="action">
            <a-button type="primary" @click="enterCenter">进入服务大厅</a-button>
            <a-button type="primary" style="margin-left: 15px" class="second-button" @click="checkOrder">查看订单</a-button>
          </template>
          <div>
            <a-row :gutter="8">
              <a-col :span="12" style="text-align: right">
                <p>服务价格:</p>
                <p v-if="$route.query.deductionMoney !== '-1' && $route.query.isUseVoucher">服务券抵扣:</p>
                <p>应付总额:</p>
              </a-col>
              <a-col :span="12" style="text-align: left">
                <p><span>{{$route.query.newMoney}}</span></p>
                <p v-if="$route.query.deductionMoney !== '-1' && $route.query.isUseVoucher"><span>{{$route.query.deductionMoney}}</span><span
                  style="color: rgba(0, 0, 0, 0.65)">&nbsp;抵扣价格以最终为准</span></p>
                <p><span style="font-size: 18px;font-weight: bold;line-height: 18px">{{$route.query.spendMoney}}</span>
                </p>
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
  import Result from '../../components/general/Result'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import Vue from 'vue'

  export default {
    name: 'OrderCommitSuccess',
    components: { Result },
    created() {
      if (!judgeState()) {
        this.$router.push({ path: '/portal' })
      }
    },
    data() {
      return {
        title: '订单提交成功',
        description: '我们将尽快与您联系，请保持手机通畅'
      }
    },
    methods: {
      enterCenter() {
        this.$router.push({ name: 'ServiceCenter' })
      },
      checkOrder() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const path = '/trade/serviceProcureOrder'
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl)
        // this.$router.push({ path: '/trade/serviceProcureOrder' })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #orderCommitSuccess {
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
    .ant-btn-primary {
      background-color: #ff3300;
      border-color: #ff3300;
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