<template>
  <div id="financingOrgCard">
    <a-card hoverable>
      <a-row class="img-row">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="金融机构" class="my-img">
      </a-row>
      <a-row class="btn-row">
        <a-button type="primary">我要融资</a-button>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'FinancingOrgCard'
  }
</script>

<style scoped lang="less">
  @import "../../main";
  #financingOrgCard {
    .img-row{
      text-align: center;
      height: 79px;
      img{
        height: 100%;
        width: 100%;
      }
    }
    .btn-row{
      text-align: center;
      .ant-btn{
        width: 60%;
        border-radius:30px;
        background-color: @main-color;
        margin: 20px 0;
      }
    }
    /deep/ .ant-card-body{
      padding: 5px;
    }
  }
</style>