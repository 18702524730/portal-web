<template>
  <div id="insuranceOrgCard">
    <a-card :bordered="true" hoverable class="my-card" @click="clickBtn(item)">
      <a-row class="card-img">
        <img :src="getImgNewView(item.logo)" alt="机构" :onerror="defaultImg">
      </a-row>
      <a-row class="card-content">
        <h3 class="span-data" style="-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
          <a-tooltip :title="item.name" placement="right">
            {{item.name | ellipsis}}
          </a-tooltip>
        </h3>
        <p class="span-data" style="-webkit-box-orient: vertical;color: #999999">
          <a-icon type="environment"/>
          <a-tooltip :title="item.cityName" placement="right">
            {{item.cityName}}
          </a-tooltip>
        </p>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView, judgmentBrowser } from '@/utils/role'

  export default {
    name: 'InsuranceOrgCard',
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
          name: 'InsuranceOrgDetails',
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

  #insuranceOrgCard {
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
      padding-bottom: 10px;
      h3 {
        font-weight: normal;
      }
      text-align: center;
      padding-top: 10px;
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