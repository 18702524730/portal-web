<template>
  <div id="financingProject">
    <a-card :bordered="false" :style="{backgroundColor:backgroundColor}">
      <a-row :gutter="20" type="flex">
        <a-col class="my-img-col">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="金融产品" class="my-img">
        </a-col>
        <a-col>
          <p class="my-content">
            知保贷对应支持的单笔专利权质押贷款金额最高不超过500万元，贷款期限不超过1年，还款方式按月付息，到期还本。银行根据政策结合企业实际制定贷款利率，不超过银行基准利率30%，对专利权质押贷款利息、担保费、保险费、评估费进行贴息、补贴、贴息比例最高为银行贷款实际利率的60%，补贴资金最高60万
            <a href="#" class="my-a">查看详情>></a>
          </p>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="4" v-for="(item,index) in dataList" :key="index">
          <financing-org-card></financing-org-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import FinancingOrgCard from './FinancingOrgCard'

  export default {
    name: 'FinancingProject',
    components: { FinancingOrgCard },
    props: {
      backgroundColor: {
        type: String,
        default: '#ffffff'
      }
    },
    data() {
      return {
        dataList: [1, 2, 3, 4]
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #financingProject {
    margin-bottom: 56px;
    .my-img-col {
      width: 200px;
      margin-bottom: 27px;
      .my-img {
        width: 100%;
        height: 90px;
        border-radius: 3px;
      }
    }
    .my-content {
      width: 950px;
      text-indent: 2em;
      color: #4F4C4C;
      font-size: 14px;
      line-height: 28px;
      .my-a {
        padding-left: 2em;
      }
    }
    /deep/ .ant-card-body{
      padding: 0;
    }
  }
</style>