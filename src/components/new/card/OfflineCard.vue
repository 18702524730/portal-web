<template>
  <div id="offlineCard">
    <a-card hoverable @click="clickCard">
      <a-row class="my-card-img">
        <img :src="getImgNewView(item.activityIcons)" alt="沙龙活动">
      </a-row>

      <a-row class="my-content">
        <h3 class="span-data" style="-webkit-box-orient: vertical;-webkit-line-clamp: 2;min-height: 54px">
          <a-tooltip :title="item.title" placement="top">
            {{ item.title |ellipsis2}}
          </a-tooltip>
        </h3>
        <a-row>
          <p>活动时间：{{ item.beginDate }}</p>
          <p class="span-data" style="-webkit-box-orient: vertical;color: #999999">
            <a-icon type="environment"/>
            <a-tooltip :title="item.activityAddress" placement="top">
              {{ item.activityAddress |ellipsis}}
            </a-tooltip>
          </p>
        </a-row>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView, judgmentBrowser } from '@/utils/role'

  export default {
    name: 'OfflineCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getImgNewView(text) {
        return getImgNewView(text)
      },
      clickCard() {
        this.$router.push({ name: 'TrainOfflineDetails', query: { itemId: this.item.id, keyRoute: 'TrainMessage' } })
      }
    },
    filters: {
      ellipsis2(value) {
        if (value === undefined || value === null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > 26) {
          return value.substring(0, 26) + '...'
        }
        return value
      },
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
        if (value.length > 15) {
          return value.substring(0, 15) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #offlineCard {
    /deep/ .ant-card-body {
      padding: 0;
    }
    .my-card-img {
      height: 156px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .my-content {
      padding: 10px;
      h3 {
        color: @main-font-color;
        font-size: 18px;
        font-weight: normal;
      }
      p {
        margin-bottom: 0;
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