<template>
  <div id="tradingDynamic">
    <div class="container">
      <a-table :columns="columns" :dataSource="data" :showHeader="false" :pagination="false" rowKey="id">
        <template slot="name" slot-scope="name">
          <span
            style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;" class="span-name">{{ name }}
          </span>
          <!--<a-card :bordered="false">-->
            <!--<a-card-meta :description="name.code">-->
              <!--<a-avatar size="large" icon="user" slot="avatar"/>-->
              <!--<span slot="title">-->
                <!--<span-->
                    <!--style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">{{ name }}-->
                <!--</span>-->
              <!--</span>-->
            <!--</a-card-meta>-->
          <!--</a-card>-->

        </template>
        <span slot="money" slot-scope="money">
          <span>交易价格：￥</span><span>*** 元</span>
        </span>
        <span slot="author" slot-scope="author">
          <span><span>{{author}}</span></span>
        </span>
        <span slot="time" slot-scope="time">
          <span class="span-time"><span>{{time}}</span></span>
        </span>
        <span slot="title" slot-scope="currentPageData">
          <span class="head-span">交易动态</span>
          <!--<a href="javascript:;" style="float: right" class="head-a">查看更多-->
            <!--<a-icon type="right" style="font-family: FontAwesome; font-weight: 400;"/>-->
          <!--</a>-->
        </span>
      </a-table>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'TradingDynamic',
    props: {
      columns: {
        type: Array,
        default: () => [
          {
            title: 'Name',
            className: 'column-name',
            dataIndex: 'serviceName',
            scopedSlots: { customRender: 'name' },
            width: '50%'
          },
          {
            title: 'Money',
            className: 'column-money',
            dataIndex: 'servePrice',
            scopedSlots: { customRender: 'money' },
            width: '15%'
          },
          {
            title: 'Author',
            className: 'column-author',
            dataIndex: 'supplyUser',
            scopedSlots: { customRender: 'author' },
            width: '20%'
          },
          {
            title: 'Time',
            className: 'column-time',
            dataIndex: 'orderTime',
            scopedSlots: { customRender: 'time' },
            width: '15%'
          }
        ]
      },
      data: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #tradingDynamic {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 50px;
    /deep/ .ant-card-meta-title {
      white-space: normal
    }
    .column-money {
    }
    .column-author {
    }
    .column-time {
    }
    overflow: hidden;
    .ant-card {
      background-color: rgba(0, 0, 0, 0);
    }
    /deep/ .ant-card-body {
      padding: 5px;
      zoom: 1;
    }
    /deep/ .ant-table-tbody .ant-table-row td {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .head-span {
      font-style: normal;
      font-size: 21px;
      text-align: left;
      line-height: 21px;
      font-weight: 500;
      color: @main-font-color;
    }
    .head-a {
      font-size: 12px;
      text-align: right;
      line-height: 28px;
      color: #ffffff;
    }
    a:hover {
      color: rgb(26, 188, 156);
    }
    /deep/ .ant-table-content {
      background-color: #ffffff;
      border-top: 6px solid @main-color;
    }
    /deep/ .ant-table-title {
      padding-top: 32px;
    }
    .span-name{
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 16px;
      line-height: 36px;
    }
    .span-time{
      font-size: 12px;
    }
  }

</style>