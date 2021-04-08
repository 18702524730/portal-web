<template>
  <div id="insuranceProjectCard">
    <a-card :bordered="false" hoverable class="my-card" @click="clickBtn(item)">
      <a-row class="card-img">
        <img :src="getImgNewView(item.productImage)" alt="产品" :onerror="defaultImg">
      </a-row>
      <a-row class="card-content">
        <h3 class="span-data" style="-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
          <a-tooltip :title="item.name" placement="top">
            {{item.name | ellipsis}}
          </a-tooltip>
        </h3>
        <a-row class="my-btn">
          <a-button>查看</a-button>
        </a-row>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView,judgmentBrowser } from '@/utils/role'

  export default {
    name: 'InsuranceProjectCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        defaultImg: 'https://img.yzcdn.cn/vant/cat.jpeg'
      }
    },
    methods: {
      clickBtn(item) {
        const newPage = this.$router.resolve({
          name: 'InsuranceProductDetails',
          query: {
            id: item.id,
            keyRoute: 'IPInsurance'
          }
        })
        window.open(newPage.href, '_blank')
      },
      getImgNewView(text) {
        return getImgNewView(text)
      }
    },
    filters: {
      ellipsis(value) {
        if (value === undefined || value === null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > 16) {
          return value.substring(0, 14) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #insuranceProjectCard {
    /deep/ .ant-card-body {
      padding: 0;
    }
    .card-img {
      height: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .card-content {
      padding: 9px;
      h3 {
        font-weight: normal;
      }
      .my-btn {
        button {
          font-size: 16px;
          border-radius: 30px;
          padding: 0 20px;
          color: @main-color;
          border-color: @main-color;
          &:hover {
            color: #FFFFFF;
            background-color: @main-color;
            border-color: @main-color;
          }
        }
      }
      .span-data {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        /* autoprefixer: off*/
        -webkit-box-orient: vertical;
        /* autoprefixer: on*/
        -webkit-line-clamp: 1;
        color: @main-font-color;
      }
    }
  }
</style>