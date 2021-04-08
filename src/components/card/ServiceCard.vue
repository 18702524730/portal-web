<template>
  <div id="serviceCard">
    <a-card hoverable :bordered="bordered" @click="handleClick(item)">

      <a-row class="header-row">

        <div style="margin: 0 auto;background-color: #ffffff;">
          <a-badge style="height: 150px;width: 100%">
            <template slot="count">
              <div class="div-badge" v-if="item.voucher"><img src="../../assets/images/general/quan.png"
                                                              height="38px" alt="图片不存在"/></div>
            </template>
            <img
              alt="无图片"
              :src="getImgNewView(item.imgUrl)"
              :onerror="defaultImg"
              style="height: 100%;width: 100%;"
            />
          </a-badge>
        </div>

      </a-row>

      <div class="div-footer">
        <a-row>
          <p class="p-time">
            <a-tooltip placement="right" :title="item.title"
                       style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
              {{item.title | ellipsis(12)}}
            </a-tooltip>
          </p>
        </a-row>
        <a-row>
          <p class="last-p" style="color:#fc1b1b;">{{newMoney}}</p>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView, judgmentBrowser } from '@/utils/role'

  export default {
    name: 'ServiceCard',
    props: {
      item: {
        type: Object,
        default: () => {
        }
      },
      innerRouter: {
        type: String,
        default: 'ServiceMessage'
      },
      bordered: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\''
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
        return getImgNewView(text)
      },
      handleClick(item) {
        const newPage = this.$router.resolve({ name: this.innerRouter, query: { itemId: item.id, orgId: item.orgId } })
        window.open(newPage.href, '_blank')
      }
    },
    filters: {
      ellipsis(value,length) {
        if (value === undefined) {
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
    },
    computed: {
      'newMoney': function() {
        if (this.item.transactionPrice === '0') {
          return '面议'
        } else {
          return '￥' + this.item.money
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #serviceCard {
    .main-css();
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;

    .div-footer {
      font-weight: 400;
      font-style: normal;
      font-size: 18px;
      line-height: 28px;
      padding-left: 16px;
      padding-right: 16px;
    }
    .header-row {
      background-color: #cccccc;
      text-align: center;
    }
    /deep/ .ant-card-body {
      padding: 0;
    }
    .p-time {
      margin-bottom: 2px;
      margin-top: 0.8em;
      word-wrap: break-word;
      word-break: break-all;
      color: @main-font-color;
    }
  }
</style>