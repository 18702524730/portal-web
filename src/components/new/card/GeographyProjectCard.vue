<template>
  <div id="geographyProjectCard">
    <a-card :bordered="true" hoverable @click="onClick(item)">
      <div class="img-div">
        <img
          alt="无图片"
          :src="getImgNewView(changeImg(item.productImg))"
          style="height: 100%;width: 100%;"
          :onerror="'https://img.yzcdn.cn/vant/cat.jpeg'"
        />
      </div>

      <p class="title-p">
        <a-tooltip :title="item.productName"
                   style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
          {{item.productName | ellipsis(12)}}
        </a-tooltip>
      </p>
      <p class="place-p">
        <a-tooltip :title="item | filterData"
                   style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
          <a-icon type="environment"/>
          {{item | filterData | ellipsis(15)}}
        </a-tooltip>

      </p>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView, judgmentBrowser } from '@/utils/role'

  export default {
    name: 'GeographyProjectCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      onClick(item) {
        this.$router.push({ name: 'GeographyDetails', query: { itemId: item.id, keyRoute: 'GeographySign' } })
      },
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      changeImg(data) {
        if (data) {
          const arr = data.split(',')
          return arr[0]
        }
      }
    },
    filters: {
      ellipsis(value, length) {
        if (value === undefined || value == null) {
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
      },
      filterData(data) {
        if (data.countryType === '1') {
          // 国内的数据
          const arr = data.areaName.split('/')
          return arr[0]
        } else {
          return data.areaName
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #geographyProjectCard {
    .img-div {
      padding: 5px;
      margin-bottom: 10px;
      height: 150px;
    }
    .title-p {
      font-size: 18px;
      color: #141414;
    }
    /deep/ .ant-card-body {
      padding: 0;
    }
    p {
      padding-left: 15px;
      padding-right: 15px;
    }
    .place-p {
      color: #555555;
      font-size: 14px;
    }
  }
</style>