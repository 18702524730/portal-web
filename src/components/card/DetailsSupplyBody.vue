<template>
  <div id="detailsSupplyBody">
    <div class="container" style="border: 1px solid #d9d9d9;border-radius: 4px;">
      <a-row class="title-row">
        <div><span>专利供应描述</span></div>
      </a-row>
      <a-divider></a-divider>

      <div style="padding: 0 25px;margin-bottom: 24px;" class="div-main">
        <table class="my-table">
          <tr>
            <td class="span-right"><span>申请号</span></td>
            <td class="span-left"><span>{{item.applyNo}}</span></td>
            <td class="span-right"><span>公布号</span></td>
            <td class="span-left">{{item.announcementCode}}</td>
          </tr>
          <tr>
            <td class="span-right"><span>申请日</span></td>
            <td class="span-left"><span>{{item.applyDate}}</span></td>
            <td class="span-right"><span>公布日</span></td>
            <td class="span-left">{{item.announcementDay}}</td>
          </tr>
          <tr>
            <td class="span-right"><span>专利类型</span></td>
            <td class="span-left"><span>{{item.patentTypeName}}</span></td>
            <td class="span-right"><span>专利状态</span></td>
            <td class="span-left">{{item.pantentStatus}}</td>
          </tr>
          <tr>
            <td class="span-right"><span>申请人</span></td>
            <td class="span-left"><span>{{item.applyer}}</span></td>
            <td class="span-right"><span>专利权人</span></td>
            <td class="span-left">{{item.patenter}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailsSupplyBody',
    props: {
      item: {
        type: Object,
        default: () => {
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #detailsSupplyBody {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    overflow: hidden;
    padding: 5px 0;

    .container {
      background-color: #fff;
    }
    .title-row {
      font-size: 20px;
      padding-right: 24px;
      padding-left: 24px;
      padding-top: 12px;
      padding-bottom: 12px;
      color: rgba(0, 0, 0, 0.65);
    }
    .ant-divider-horizontal {
      margin-top: 0;
    }
    .div-main {
      font-size: 16px;
      div {
        border: 1px solid #d9d9d9;
        margin-top: -1px;
      }
    }
    .my-table {
      width: 100%;
      border: 1px solid #d9d9d9;
    }
    table, table tr th, table tr td {
      border: 1px solid #d9d9d9;
    }
    .span-right {
      text-align: right;
      width: 12.5%;
      span {
        padding-right: 5px;
      }
    }
    .span-left {
      width: 37.5%;
      span {
        padding-left: 5px;
      }
    }
  }

</style>