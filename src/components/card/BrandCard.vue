<template>
  <div id="brandCard">
    <a-card hoverable :bordered="bordered" @click="handleClick(item)" :class="{'div-all':defaultColor}">
      <a-row>
        <div style="height: 90px;width: 90px; margin: 0 auto;">
          <a-avatar
            alt="无图片"
            :src="getImgView(item[`${itemKey[0]}`])"
            :loadError="loadError"
            style="height: 100%;width: 100%;display: block"
          />
        </div>
      </a-row>
      <a-row style="padding-right: 5px;padding-left: 5px;line-height: 20px;">
        <p style="margin-top: 1em;height: 40px;margin-bottom: 0.5em;word-wrap: break-word;word-break: break-all;">
          <a-tooltip placement="right" :title="item[`${itemKey[1]}`]"
                     style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 2;">
            {{item[`${itemKey[1]}`] | ellipsisTitle}}
          </a-tooltip>
        </p>
      </a-row>
      <a-row class="industry-div">
        <p
          style="font-size: 14px;text-align: left;color: #bdbdbd; display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
          行业:&nbsp;<a-tooltip placement="right" :title="item[`${itemKey[2]}`]">
          <span style="color: #2f72d1;">{{item[`${itemKey[2]}`] | ellipsis}}</span></a-tooltip>
        </p>
      </a-row>
      <div class="div-footer">
        <a-row>
          <a-col :span="12">
            <p class="last-p" v-text="itemKey[4] === 'money'?newMoney:item[`${itemKey[4]}`]"></p>
          </a-col>
          <a-col :span="12">
            <p class="p-time">{{item[`${itemKey[3]}`] | changeDate}}</p>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
  import { judgmentBrowser } from '@/utils/role'

  export default {
    name: 'BrandCard',
    props: {
      item: {
        type: Object,
        default: () => {
        }
      },
      bordered: {
        type: Boolean,
        default: false
      },
      defaultColor: {
        type: Boolean,
        default: false
      },
      itemKey: {
        type: Array,
        default: () => [
          'imgUrl',
          'title',
          'belongIndustryName',
          'publishTime',
          'money'
        ]
      }
    },
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\'',
        defaultIcon: require('../../assets/images/defaultImg.png')
      }
    },
    methods: {
      handleClick(item) {
        let keyRoute = ''
        switch (item.supplyRequirementType) {
          case '1':
            keyRoute = 'SupplyProjectDetails'
            break
          case '2':
            keyRoute = 'SupplyPatentDetails'
            break
          case '3':
            keyRoute = 'SupplyBrandDetails'
            break
          case '4':
            keyRoute = 'ProjectDetails'
            break
          case '5':
            keyRoute = 'PatentDetails'
            break
          case '6':
            keyRoute = 'BrandDetails'
            break
        }
        const that = this
        const newPage = that.$router.resolve({ name: `${keyRoute}`, query: { id: item.id } })
        window.open(newPage.href, '_blank')
      },
      /* 图片预览 */
      getImgView(text) {
        if (text === null) {
          text = this.defaultIcon
          return text
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      loadError() {
      }
    },
    filters: {
      ellipsis(value) {
        if (value === undefined) {
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
      },
      ellipsisTitle(value) {
        if (value === undefined) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > 20) {
          return value.substring(0, 20) + '...'
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

  #brandCard {
    .main-css();
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    .div-footer {
    }
    .div-all {
      background-color: #f5f6f7;
    }
    p {
      text-align: left;
      font-size: 16px;
      padding-right: 10px;
      padding-left: 10px;
    }
    .industry-div {
      padding-bottom: 2px;
    }
    /deep/ .ant-card-body {
      padding-right: 0;
      padding-left: 0;
      padding-bottom: 0;
    }
    .p-time {
      text-align: right;
      font-size: 14px;
      line-height: 14px;
      color: #bdbdbd;
      padding-top: 2px;
    }
    .last-p {
      text-align: left;
      color: #ff3300;
    }
    /deep/ .ant-card-body {
      padding-top: 22px;
    }
  }

</style>