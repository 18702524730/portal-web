<template>
  <div id="platformAchievements">
    <div class="container">
      <div class="platform-achievements-inner my-content">
        <span class="my-color" style="top: 0;left:105px;">
        <span class="large-p">
          {{item.totalLoanLine | filterData}} <span class="my-type">亿元</span>
        </span><br/>
        <span class="middle-p">累计<span class="my-one-border">授信</span>额/放贷额</span>
      </span>
        <span style="top: 0;left:453px;">
        <span class="large-p">
          {{item.totalFdNum }} <span class="my-type">笔</span>
        </span><br/>
        <span class="middle-p">累计<span class="my-one-border">放贷</span>数量</span>
      </span>
        <span style="top: 0;left:784px;">
        <span class="large-p">
          {{item.totalActualLoan | filterData}} <span class="my-type">万元</span>
        </span><br/>
        <span class="middle-p">本年度<span class="my-one-border">放贷</span>金额</span>
      </span>
        <span style="top: 0;left:1122px;">
        <span class="large-p">
          {{item.totalFdNumYear}} <span class="my-type">笔</span>
        </span><br/>
        <span class="middle-p">本年度<span class="my-one-border">放贷</span>数量</span>
      </span>

        <span style="top:210px;left: 278px;">
        <span class="large-p">
          {{item.totalEnpNum}} <span class="my-type">家</span>
        </span><br/>
        <span class="middle-p"><span class="my-one-border">惠及企业数</span></span>
      </span>

        <span style="top:210px;left: 617px;">
        <span class="large-p">
          {{item.zyxx}} <span class="my-type">件</span>
        </span><br/>
        <span class="middle-p"><span class="my-one-border">质押专利/商标数量</span></span>
      </span>

        <span style="top:210px;left: 951px;">
        <span class="large-p">
          {{item.jrjgNum}} <span class="my-type">家</span>
        </span><br/>
        <span class="middle-p"><span class="my-one-border">合作金融机构</span></span>
      </span>
      </div>


    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'PlatformAchievements',
    data() {
      return {
        url: '/zscq/portal/getPledgeCensus',
        item: {}
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData() {
        const res = await getActionUpdateKeyword(this.url)
        if (res.success) {
          this.item = res.result
        } else {
          this.$message.error(res.message)
        }
      }
    },
    filters: {
      filterData(data) {
        if (!data) {
          return '0'
        } else {
          return data
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #platformAchievements {
    .main-css();
    .my-content {
      text-align: left;
      width: 1170px;
      color: #ffffff;
      & > span {
        position: absolute;
      }
      .my-color {
        color: #FFFB00;
        .large-p {
          /*text-shadow: 1px 0 0 #FFFB00;*/
        }
        .middle-p {
          .my-one-border {
          }
        }
      }
      .large-p {
        font-weight: 400;
        /*text-shadow: 1px 0 0 #ffffff;*/
        font-size: 35px;
        margin-bottom: 0;
        white-space: nowrap;
        .my-type {
          font-size: 16px;
          font-weight: 400;
          text-shadow: none;
        }
      }
      .middle-p {
        font-size: 16px;
        margin-bottom: 0;
        white-space: nowrap;
        .my-one-border {

          padding-bottom: 10px;
        }
      }
    }
    .platform-achievements-inner {
      background: url("~@/assets/images/financial/bj2.png") no-repeat;
      background-size: 100% 100%;
      width: 1100px;
      height: 294px;
      margin-left: 10px;
    }
    .container {
      position: relative;
    }
  }
</style>