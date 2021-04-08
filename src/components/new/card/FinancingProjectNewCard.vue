<template>
  <div id="financingProjectNewCard">
    <a-card hoverable>
      <a-row class="my-img">
        <img :src="getImgNewView(item.productLogo)" alt="融资产品" :onerror="'https://img.yzcdn.cn/vant/cat.jpeg'">
      </a-row>
      <a-row class="my-content">
        <a-row type="flex" justify="space-between" align="middle" class="title">
          <a-col :span="12" class="type">
            <span>{{item.name}}</span>
          </a-col>
          <a-col :span="12" class="limit">
            <span>最高额度：</span>
            <span>{{item.maxQuota}}万</span>
          </a-col>
        </a-row>
        <a-row class="main-content">
          <p class="span-data" style="-webkit-box-orient: vertical;">
            {{item.remark}}
          </p>
        </a-row>

        <a-row class="view-details">
          <a @click="clickCard(item)">查看详情</a>
        </a-row>
      </a-row>

    </a-card>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'FinancingProjectNewCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      clickCard(item) {
        this.$emit("func",item)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #financingProjectNewCard {
    /deep/ .ant-card-body {
      padding: 0;
      height: 570px;
    }
    .my-img {
      height: 220px;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .my-content {
      padding: 30px 15px;
      .title {
        padding-bottom: 20px;
      }
      .type {
        span {
          color: #333333;
          font-size: 20px;
          font-weight: bold;
        }
      }
      .limit {
        text-align: end;
        font-weight: bold;
        span:nth-child(1) {
          font-size: 14px;
          color: #333333;
        }
        span:nth-child(2) {
          font-size: 18px;
          color: #ff3300;
        }
      }
      .main-content {
        height: 210px;
        p {
          color: #4F4C4C;
          font-size: 15px;
          line-height: 30px;
          margin-bottom: 0;
        }
        margin-bottom: 20px;
      }
      .view-details {
        text-align: end;
        a {
          color: @main-color;
          &:hover {
            opacity: 0.7;
          }
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
      -webkit-line-clamp: 7;
    }
  }
</style>