<template>
  <div id="agencyCard">
    <a-card hoverable :bordered="false" @click="handleClick(item)">
      <a-row>
        <div
          style="background-size: contain;height: 150px;width: 100%;background-repeat: no-repeat;background-position: center;"
          :style="{backgroundImage:`url(${getImgNewView(item.logo)})`}">
        </div>
      </a-row>
      <a-row class="text-p">
        <p class="first-1">
          <a-tooltip placement="right" :title="item.name"
                     style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
            {{item.name | ellipsis(14)}}
          </a-tooltip>
        </p>
        <p class="first-3">
          <a-tooltip placement="right" :title="item.serviceContentName"
                     style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
            主营业务:{{item.serviceContentName | ellipsis(12)}}
          </a-tooltip>
        </p>
        <p class="first-2">{{item.cityName}}</p>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView, judgmentBrowser } from '@/utils/role'

  export default {
    name: 'AgencyCard',
    props: {
      item: {
        type: Object,
        default: () => {
        }
      },
      innerRouter: {
        type: String,
        default: 'InstitutionHome'
      }
    },
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\'',
        cityOptions: []
      }
    },
    created() {
    },
    methods: {
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      getImgNewView(text) {
        return encodeURI('\'' + getImgNewView(text) + '\'')
      },
      handleClick(item) {
        const newPage = this.$router.resolve({ name: this.innerRouter, query: { orgId: item.id } })
        window.open(newPage.href, '_blank')
      }
    },
    filters: {
      ellipsis(value,length) {
        if (value === undefined || value === null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > length) {
          return value.substring(0, length) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #agencyCard {
    .main-css();
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    height: 276.6px;
    .first-1 {
      font-style: normal;
      font-size: 18px;
      line-height: 24px;
      margin-top: 1em;
      margin-bottom: 0.7em;
      word-wrap: break-word;
      word-break: break-all;
    }
    .first-2 {
      font-style: normal;
      line-height: 24px;
      margin-bottom: 12px;
      color: #999999;
      margin-left: 5px;
    }
    .first-3 {
      font-style: normal;
      font-size: 14px;
      line-height: 24px;
      color: #999999;
      margin-bottom: 2px;
    }
    /deep/ .ant-card-body {
      padding: 5px;
    }
    .text-p {
      p {
        padding-left: 12px;
        padding-right: 12px;
      }
    }
  }
</style>