<template>
  <div id="messageOneCard">
    <a-card :bordered="true" hoverable @click="onClick(item)">
      <div style="height: 150px" class="img-div">
        <img
          alt="无图片"
          :src="getImgNewView(item.articleIcons)"
          :onerror="defaultImg"
          style="height: 100%;width: 100%;"
        />
      </div>

      <p class="title-p">
        <a-tooltip placement="right" :title="item.title"
                   style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 2;">
          {{item.title | ellipsis}}
        </a-tooltip>
      </p>
      <p class="time-p">{{item.releaseDate | changeDate}}</p>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView, judgmentBrowser } from '@/utils/role'

  export default {
    name: 'MessageOneCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      keyRoute: {
        type: String,
        default: 'SpecialMessage'
      },
      routeName: {
        type: String,
        default: 'ArticleMessage'
      },
      jumpState: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\''
      }
    },
    methods: {
      onClick(item) {
        if (this.jumpState) {
          this.$router.push({ name: this.routeName, query: { id: item.id, keyRoute: this.keyRoute } })
        } else {
          window.open(item.detailPageUrl)
        }
      },
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
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
        if (value.length > 24) {
          return value.substring(0, 24) + '...'
        }
        return value
      },
      defaultValue(value) {
        if (value === undefined || value === null) {
          return 'XXXXXXXXX'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #messageOneCard {
    .main-css();
    color: #333333;
    background-color: #ffffff;
    font-size: 14px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .img-div {
      padding: 5px;
      margin-bottom: 10px;
    }
    p {
      padding-left: 15px;
      padding-right: 15px;
    }
    .title-p {
      font-size: 18px;
      height: 34px;
      line-height: 20px !important;
      margin-bottom: 10px !important;
      color: #141414;
      word-wrap: break-word;
      word-break: break-all;
    }
    .time-p {
      color: #a2a2a2;
      font-size: 12px;
    }
  }
</style>