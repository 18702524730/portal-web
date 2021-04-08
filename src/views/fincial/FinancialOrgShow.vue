<template>
  <div id="financialOrgShow">
    <div class="my-head"></div>
    <div class="container">
      <a-breadcrumb separator=">" class="my-breadcrumb">
        <a-breadcrumb-item>
          <router-link :to="{name:'FinancialPledgeFinancing'}">质押融资</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          合作机构
        </a-breadcrumb-item>
      </a-breadcrumb>

      <a-card class="my-card" :bordered="false">
        <div v-for="(orgItem,orgIndex) in itemList" :key="orgItem.titleName" v-if="orgItem.bankList.length > 0"
             class="my-div">
          <h2>{{orgItem.titleName}}</h2>
          <a-divider></a-divider>
          <a-row v-for="(outItem,outIndex) in orgItem.bankList" :key="outIndex" class="my-row" type="flex" :gutter="14">
            <a-col class="my-col" v-for="(item,index) in outItem" :key="item.id" style="text-align: center">
              <bank-card :item="item"></bank-card>
            </a-col>
          </a-row>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { changeArr } from '@/utils/util'
  import BankCard from '../../components/new/card/BankCard'

  export default {
    name: 'FinancialOrgShow',
    components: { BankCard },
    data() {
      return {
        orgUrl: '/zscq/portal/getPledgeFinancingProductOrgByType',
        orgLoading: false,
        itemList: []
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData() {
        this.orgLoading = true
        const res = await getActionUpdateKeyword(this.orgUrl)
        console.info(res)
        console.info('挖好哇好哇好哇好哇')
        if (res.success) {
          const result = res.result
          for (const key in result) {
            let titleName = ''
            const obj = {}
            switch (key) {
              case '1':
                titleName = '合作银行'
                break
              case '2':
                titleName = '担保机构'
                break
              case '3':
                titleName = '保险机构'
                break
              case '4':
                titleName = '评估机构'
                break
            }
            obj.titleName = titleName
            obj.bankList = changeArr(result[key], 5)
            this.itemList.push(obj)
          }
        } else {
          this.$message.warning(res.message)
        }

        this.orgLoading = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #financialOrgShow {
    .main-css();

    .my-head {
      width: 100%;
      height: 330px;
      background-image: url("../../assets/images/org.jpg");
      background-size: 100% 100%;
    }

    .my-breadcrumb {
      padding: 20px 0;
    }
    /deep/ .my-card > .ant-card-body {
      padding: 24px 0;
    }
    .my-card {

      h2 {
        text-align: center;
        margin-bottom: 0;
        font-size: 25px;
      }
      .ant-divider-horizontal {
        height: 5px;
        width: 20px;
        min-width: 20px;
        margin: 0 auto 25px;
        background-color: @main-color;

      }
      .my-row {
        margin-bottom: 20px;
      }
      .my-col {
        width: 20%;
      }
      .my-div {
        margin-bottom: 20px;
        overflow: hidden;
      }
    }
  }
</style>