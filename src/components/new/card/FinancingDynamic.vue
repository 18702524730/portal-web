<template>
  <div id="financingDynamic">
    <a-card>
      <a-list :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
            <img
              slot="avatar"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
              class="my-img"
            />
            <template slot="description">
              <a-row :gutter="16" class="my-content">
                <a-col :span="5">厦门银行厦门分行</a-col>
                <a-col :span="2" class="color-col">受理</a-col>
                <a-col :span="6">厦门快商****公司</a-col>
                <a-col :span="2" class="my-type">知保贷</a-col>
                <a-col :span="4" class="color-col money">300.00 万元</a-col>
              </a-row>

            </template>
          </a-list-item-meta>
          <div class="my-time">时间：2020-5-12 15:00</div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'FinancingDynamic',
    data() {
      return {
        data: [1,2,3,4,5]
      }
    }
  }
</script>

<style scoped lang="less">
  #financingDynamic {
    .my-img {
      width: 48px;
      height: 48px;
    }
    .ant-list-item-meta {
      display: flex;
      align-items: center;
      .my-content {
        font-family: '微软雅黑';
        font-weight: 400;
        color: #555555;
        font-size: 14px;
        .my-type {
          font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
          font-weight: 700;
          color: #00A9F2;
        }
        .color-col{
          color: #00A9F2;
        }
        .money{
          color:#ff3300;
        }
      }
    }
    .my-time{
      color: #999999;
      font-size: 12px;
    }
    /deep/ .ant-card-body{
      padding: 0 12px;
    }
  }
</style>