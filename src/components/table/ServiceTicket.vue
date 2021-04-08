<template>
  <div id="serviceTicket">
    <div class="container">
      <a-row :gutter="16" class="header-row">
        <a-col :xs="24" :sm="24" :md="24" :lg="8">
          <a-card hoverable :bordered="false">
            <div style="background-color: #4c8cfb;padding-top: 1em;padding-bottom: 1em;border-radius: 5px;">
              <p>厦门市小微企业服务补贴券</p>
              <p class="change-p">管理方法</p>
            </div>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="8">
          <a-card hoverable :bordered="false">
            <div style="background-color: #6d7fea;padding-top: 1em;padding-bottom: 1em;border-radius: 5px;">
              <p>{{data.grantYear | defaultDate}}年度小微企业补贴券</p>
              <p class="change-p1">申领使用指南</p>
            </div>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="8">
          <a-card hoverable :bordered="false">
            <div style="background-color: #13c4c9;padding-top: 1em;padding-bottom: 1em;border-radius: 5px;">
              <p>{{data.grantYear | defaultDate}}年度小微企业补贴券</p>
              <p class="change-p2">常见问答</p>
            </div>
          </a-card>
        </a-col>
      </a-row>
      <div class="footer-div" v-if="haveFooter">
        <a-row>
          <a-col :xs="24" :sm="12" :md="12" :lg="6">
            <p>{{data.haveReceivedAmount | defaultValue}}</p>
            <p>累计申请金额(元)</p>
          </a-col>
          <a-col :xs="24" :sm="12" :md="12" :lg="6">
            <p>{{data.surplusAmount | defaultValue}}</p>
            <p>本年度剩余金额(元)</p>
          </a-col>
          <a-col :xs="24" :sm="12" :md="12" :lg="6">
            <p>{{data.receivedNum | defaultValue}}</p>
            <p>申请企业(家)</p>
          </a-col>
          <a-col :xs="24" :sm="12" :md="12" :lg="6">
            <p>{{data.orderNum | defaultValue}}</p>
            <p>补贴服务订单(次)</p>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'ServiceTicket',
    props: {
      haveFooter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        year: 2020,
        url: '/zscq/portal/voucher/getVoucherStatistics',
        data: {}
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        getActionUpdateKeyword(this.url).then((res) => {
          if (res.success) {
            this.data = res.result
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    filters: {
      defaultValue(value) {
        if (value === undefined || value === null || value === '') {
          return '0'
        } else {
          return value
        }
      },
      defaultDate(value) {
        if (value === undefined || value === null || value === '') {
          const now = new Date()
          return now.getFullYear()
        } else {
          return value
        }

      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #serviceTicket {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    padding-top: 10px;
    overflow: hidden;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .header-row {
      p {
        text-align: center;
        color: #ffffff;
        font-size: 20px;
        margin-bottom: 0;
      }
    }
    .change-p {
      font-size: 22px;
      font-family: "Raleway", sans-serif;
      font-weight: bold;
      text-shadow: 4px 4px 0 #0066ff, 4px -4px 0 #0066ff, -4px -4px 0 #0066ff, -4px 4px 0 #0066ff, 4px 3px 0 #0066ff, 4px -3px 0 #0066ff, -4px -3px 0 #0066ff, -4px 3px 0 #0066ff, 4px 2px 0 #0066ff, 4px -2px 0 #0066ff, -4px -2px 0 #0066ff, -4px 2px 0 #0066ff, 4px 1px 0 #0066ff, 4px -1px 0 #0066ff, -4px -1px 0 #0066ff, -4px 1px 0 #0066ff, 4px 0px 0 #0066ff, 4px 0px 0 #0066ff, -4px 0px 0 #0066ff, -4px 0px 0 #0066ff, 3px 4px 0 #0066ff, 3px -4px 0 #0066ff, -3px -4px 0 #0066ff, -3px 4px 0 #0066ff, 3px 3px 0 #0066ff, 3px -3px 0 #0066ff, -3px -3px 0 #0066ff, -3px 3px 0 #0066ff, 3px 2px 0 #0066ff, 3px -2px 0 #0066ff, -3px -2px 0 #0066ff, -3px 2px 0 #0066ff, 3px 1px 0 #0066ff, 3px -1px 0 #0066ff, -3px -1px 0 #0066ff, -3px 1px 0 #0066ff, 3px 0px 0 #0066ff, 3px 0px 0 #0066ff, -3px 0px 0 #0066ff, -3px 0px 0 #0066ff, 2px 4px 0 #0066ff, 2px -4px 0 #0066ff, -2px -4px 0 #0066ff, -2px 4px 0 #0066ff, 2px 3px 0 #0066ff, 2px -3px 0 #0066ff, -2px -3px 0 #0066ff, -2px 3px 0 #0066ff, 2px 2px 0 #0066ff, 2px -2px 0 #0066ff, -2px -2px 0 #0066ff, -2px 2px 0 #0066ff, 2px 1px 0 #0066ff, 2px -1px 0 #0066ff, -2px -1px 0 #0066ff, -2px 1px 0 #0066ff, 2px 0px 0 #0066ff, 2px 0px 0 #0066ff, -2px 0px 0 #0066ff, -2px 0px 0 #0066ff, 1px 4px 0 #0066ff, 1px -4px 0 #0066ff, -1px -4px 0 #0066ff, -1px 4px 0 #0066ff, 1px 3px 0 #0066ff, 1px -3px 0 #0066ff, -1px -3px 0 #0066ff, -1px 3px 0 #0066ff, 1px 2px 0 #0066ff, 1px -2px 0 #0066ff, -1px -2px 0 #0066ff, -1px 2px 0 #0066ff, 1px 1px 0 #0066ff, 1px -1px 0 #0066ff, -1px -1px 0 #0066ff, -1px 1px 0 #0066ff, 1px 0px 0 #0066ff, 1px 0px 0 #0066ff, -1px 0px 0 #0066ff, -1px 0px 0 #0066ff, 0px 4px 0 #0066ff, 0px -4px 0 #0066ff, 0px -4px 0 #0066ff, 0px 4px 0 #0066ff, 0px 3px 0 #0066ff, 0px -3px 0 #0066ff, 0px -3px 0 #0066ff, 0px 3px 0 #0066ff, 0px 2px 0 #0066ff, 0px -2px 0 #0066ff, 0px -2px 0 #0066ff, 0px 2px 0 #0066ff, 0px 1px 0 #0066ff, 0px -1px 0 #0066ff, 0px -1px 0 #0066ff, 0px 1px 0 #0066ff, 0px 0px 0 #0066ff, 0px 0px 0 #0066ff, 0px 0px 0 #0066ff, 0px 0px 0 #0066ff, 0 0 0 #0066ff;
    }

    .change-p1 {
      font-size: 22px;
      font-family: "Raleway", sans-serif;
      font-weight: bold;
      text-shadow: 4px 4px 0 #6666ff, 4px -4px 0 #6666ff, -4px -4px 0 #6666ff, -4px 4px 0 #6666ff, 4px 3px 0 #6666ff, 4px -3px 0 #6666ff, -4px -3px 0 #6666ff, -4px 3px 0 #6666ff, 4px 2px 0 #6666ff, 4px -2px 0 #6666ff, -4px -2px 0 #6666ff, -4px 2px 0 #6666ff, 4px 1px 0 #6666ff, 4px -1px 0 #6666ff, -4px -1px 0 #6666ff, -4px 1px 0 #6666ff, 4px 0px 0 #6666ff, 4px 0px 0 #6666ff, -4px 0px 0 #6666ff, -4px 0px 0 #6666ff, 3px 4px 0 #6666ff, 3px -4px 0 #6666ff, -3px -4px 0 #6666ff, -3px 4px 0 #6666ff, 3px 3px 0 #6666ff, 3px -3px 0 #6666ff, -3px -3px 0 #6666ff, -3px 3px 0 #6666ff, 3px 2px 0 #6666ff, 3px -2px 0 #6666ff, -3px -2px 0 #6666ff, -3px 2px 0 #6666ff, 3px 1px 0 #6666ff, 3px -1px 0 #6666ff, -3px -1px 0 #6666ff, -3px 1px 0 #6666ff, 3px 0px 0 #6666ff, 3px 0px 0 #6666ff, -3px 0px 0 #6666ff, -3px 0px 0 #6666ff, 2px 4px 0 #6666ff, 2px -4px 0 #6666ff, -2px -4px 0 #6666ff, -2px 4px 0 #6666ff, 2px 3px 0 #6666ff, 2px -3px 0 #6666ff, -2px -3px 0 #6666ff, -2px 3px 0 #6666ff, 2px 2px 0 #6666ff, 2px -2px 0 #6666ff, -2px -2px 0 #6666ff, -2px 2px 0 #6666ff, 2px 1px 0 #6666ff, 2px -1px 0 #6666ff, -2px -1px 0 #6666ff, -2px 1px 0 #6666ff, 2px 0px 0 #6666ff, 2px 0px 0 #6666ff, -2px 0px 0 #6666ff, -2px 0px 0 #6666ff, 1px 4px 0 #6666ff, 1px -4px 0 #6666ff, -1px -4px 0 #6666ff, -1px 4px 0 #6666ff, 1px 3px 0 #6666ff, 1px -3px 0 #6666ff, -1px -3px 0 #6666ff, -1px 3px 0 #6666ff, 1px 2px 0 #6666ff, 1px -2px 0 #6666ff, -1px -2px 0 #6666ff, -1px 2px 0 #6666ff, 1px 1px 0 #6666ff, 1px -1px 0 #6666ff, -1px -1px 0 #6666ff, -1px 1px 0 #6666ff, 1px 0px 0 #6666ff, 1px 0px 0 #6666ff, -1px 0px 0 #6666ff, -1px 0px 0 #6666ff, 0px 4px 0 #6666ff, 0px -4px 0 #6666ff, 0px -4px 0 #6666ff, 0px 4px 0 #6666ff, 0px 3px 0 #6666ff, 0px -3px 0 #6666ff, 0px -3px 0 #6666ff, 0px 3px 0 #6666ff, 0px 2px 0 #6666ff, 0px -2px 0 #6666ff, 0px -2px 0 #6666ff, 0px 2px 0 #6666ff, 0px 1px 0 #6666ff, 0px -1px 0 #6666ff, 0px -1px 0 #6666ff, 0px 1px 0 #6666ff, 0px 0px 0 #6666ff, 0px 0px 0 #6666ff, 0px 0px 0 #6666ff, 0px 0px 0 #6666ff, 0 0 0 #6666ff;
    }

    .change-p2 {
      font-size: 22px;
      font-family: "Raleway", sans-serif;
      font-weight: bold;
      text-shadow: 4px 4px 0 #00cccc, 4px -4px 0 #00cccc, -4px -4px 0 #00cccc, -4px 4px 0 #00cccc, 4px 3px 0 #00cccc, 4px -3px 0 #00cccc, -4px -3px 0 #00cccc, -4px 3px 0 #00cccc, 4px 2px 0 #00cccc, 4px -2px 0 #00cccc, -4px -2px 0 #00cccc, -4px 2px 0 #00cccc, 4px 1px 0 #00cccc, 4px -1px 0 #00cccc, -4px -1px 0 #00cccc, -4px 1px 0 #00cccc, 4px 0px 0 #00cccc, 4px 0px 0 #00cccc, -4px 0px 0 #00cccc, -4px 0px 0 #00cccc, 3px 4px 0 #00cccc, 3px -4px 0 #00cccc, -3px -4px 0 #00cccc, -3px 4px 0 #00cccc, 3px 3px 0 #00cccc, 3px -3px 0 #00cccc, -3px -3px 0 #00cccc, -3px 3px 0 #00cccc, 3px 2px 0 #00cccc, 3px -2px 0 #00cccc, -3px -2px 0 #00cccc, -3px 2px 0 #00cccc, 3px 1px 0 #00cccc, 3px -1px 0 #00cccc, -3px -1px 0 #00cccc, -3px 1px 0 #00cccc, 3px 0px 0 #00cccc, 3px 0px 0 #00cccc, -3px 0px 0 #00cccc, -3px 0px 0 #00cccc, 2px 4px 0 #00cccc, 2px -4px 0 #00cccc, -2px -4px 0 #00cccc, -2px 4px 0 #00cccc, 2px 3px 0 #00cccc, 2px -3px 0 #00cccc, -2px -3px 0 #00cccc, -2px 3px 0 #00cccc, 2px 2px 0 #00cccc, 2px -2px 0 #00cccc, -2px -2px 0 #00cccc, -2px 2px 0 #00cccc, 2px 1px 0 #00cccc, 2px -1px 0 #00cccc, -2px -1px 0 #00cccc, -2px 1px 0 #00cccc, 2px 0px 0 #00cccc, 2px 0px 0 #00cccc, -2px 0px 0 #00cccc, -2px 0px 0 #00cccc, 1px 4px 0 #00cccc, 1px -4px 0 #00cccc, -1px -4px 0 #00cccc, -1px 4px 0 #00cccc, 1px 3px 0 #00cccc, 1px -3px 0 #00cccc, -1px -3px 0 #00cccc, -1px 3px 0 #00cccc, 1px 2px 0 #00cccc, 1px -2px 0 #00cccc, -1px -2px 0 #00cccc, -1px 2px 0 #00cccc, 1px 1px 0 #00cccc, 1px -1px 0 #00cccc, -1px -1px 0 #00cccc, -1px 1px 0 #00cccc, 1px 0px 0 #00cccc, 1px 0px 0 #00cccc, -1px 0px 0 #00cccc, -1px 0px 0 #00cccc, 0px 4px 0 #00cccc, 0px -4px 0 #00cccc, 0px -4px 0 #00cccc, 0px 4px 0 #00cccc, 0px 3px 0 #00cccc, 0px -3px 0 #00cccc, 0px -3px 0 #00cccc, 0px 3px 0 #00cccc, 0px 2px 0 #00cccc, 0px -2px 0 #00cccc, 0px -2px 0 #00cccc, 0px 2px 0 #00cccc, 0px 1px 0 #00cccc, 0px -1px 0 #00cccc, 0px -1px 0 #00cccc, 0px 1px 0 #00cccc, 0px 0px 0 #00cccc, 0px 0px 0 #00cccc, 0px 0px 0 #00cccc, 0px 0px 0 #00cccc, 0 0 0 #00cccc;
    }

    .footer-div {
      background-color: #ffffff;
      margin-top: 1em;
      padding: 1em 2em;
      p {
        text-align: center;
        font-size: 20px;
        margin-bottom: 0;
      }
      p:nth-child(2n-1) {
        color: #ff3300;
        font-weight: bold;
      }
      p:nth-child(2n) {
        font-size: 16px;
      }
    }
  }

</style>