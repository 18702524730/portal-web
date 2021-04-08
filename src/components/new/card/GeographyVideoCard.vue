<template>
  <div id="geographyVideoCard">
    <a-row class="my-row">
      <a-col :span="4">
        <img :src="getImgNewView(item.videoImgUrl)" class="my-video" controls="controls" :onerror="'https://img.yzcdn.cn/vant/cat.jpeg'"/>
      </a-col>
      <a-col :span="18" class="my-row">
        <a-row class="my-link">
          <a :href="item.link" target="_blank">
            {{item.title}}
          </a>
        </a-row>
        <a-row type="flex" class="my-content">
          <a-col class="title-col">
            <span>来源：</span>
          </a-col>
          <a-col class="content-col" :span="4">
            <span class="span-data" style="-webkit-box-orient: vertical;">
              <a-tooltip :title="item.source">
                 {{item.source}}
              </a-tooltip>
            </span>
          </a-col>
          <a-col class="title-col-two">
            <span>发布时间：</span>
          </a-col>
          <a-col class="content-col">
            <span>{{item.publishDate}}</span>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'GeographyVideoCard',
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
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #geographyVideoCard {
    .my-row{
      margin-bottom: 5px;
    }
    .my-video {
      width: 145px;
      height: 90px;
    }
    .my-row {
      padding-top: 10px;
    }
    .my-link {
      min-height: 50px;
      a {
        text-decoration: underline;
        color: @main-color;
      }

    }
    .my-content {
      margin-top: 10px;
      span {
        font-size: 14px;
        color: #999999;
      }
      .title-col-two {
        padding-left: 20px;
      }
      .content-col {
        span {
          word-break: break-all;
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
</style>