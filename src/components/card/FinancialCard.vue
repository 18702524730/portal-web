<template>
  <div id="financialCard">
    <a-card hoverable :bordered="false" @click="handleClick(item)">
      <a-row>
        <div style="height: 150px">
          <img
            alt="无图片"
            :src="getImgNewView(item.serviceImgUrl)"
            :onerror="defaultImg"
            style="height: 100%;width: 100%;"
          />
        </div>
      </a-row>
      <a-row class="footer-row">
        <p class="first-p">
          <a-tooltip placement="right" :title="item.serviceName"
                     style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
            {{item.serviceName | ellipsis}}
          </a-tooltip>
        </p>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView, judgmentBrowser } from '@/utils/role'

  export default {
    name: 'FinancialCard',
    props: {
      item: {
        type: Object,
        defaultL: () => {
        }
      },
      innerRouter: {
        type: String,
        default: 'FinancialMessage'
      }
    },
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\''
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
      handleClick(item) {
        const newPage = this.$router.resolve({ name: this.innerRouter, query: { itemId: item.id, orgId: item.orgId } })
        window.open(newPage.href, '_blank')
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
        if (value.length > 10) {
          return value.substring(0, 8) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #financialCard {
    .main-css();
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .footer-row {
      background-color: #ffffff;
      font-style: normal;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      p {
        margin-top: 1em;
      }
    }
    .first-p {
      word-wrap: break-word;
      word-break: break-all;
    }
  }
</style>