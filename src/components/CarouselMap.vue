<template>
  <div id="carouselMap">
    <div :class="{'container':!fullScreen}" :style="{width:'100%',maxHeight:height+'px'}">
      <a-spin :spinning="loading">
        <a-carousel arrows autoplay class="slick-dots" :autoplaySpeed="5000">
          <div
            slot="prevArrow"
            slot-scope="props"
            class="custom-slick-arrow"
            style="left: 10px;zIndex: 1">
            <a-icon type="left-circle"/>
          </div>
          <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
            <a-icon type="right-circle"/>
          </div>

          <div v-for="item in advertList" :key="item.id">
            <a @click="carouselBtn(item)">
              <img :src="getImgNewView(item.picture)" :onerror="defaultImg"
                   :style="{width:'100%',maxHeight:height+'px'}" alt="无图片"
                   class="img-change"/>
            </a>
          </div>
        </a-carousel>
      </a-spin>
      <a-card class="my-card" v-if="tradingBtn">
        <a-row class="my-line">
          <h3>供应信息</h3>
          <a-row>
            <a-col :span="8">
              <router-link :to="{name:'SupplyProjectMessage'}">项目</router-link>
            </a-col>
            <a-col :span="8">
              <router-link :to="{name:'SupplyPatentMessage'}">专利</router-link>
            </a-col>
            <a-col :span="8">
              <router-link :to="{name:'SupplyBrandMessage'}">商标</router-link>
            </a-col>
          </a-row>
        </a-row>
        <a-row>
          <h3>需求信息</h3>
          <a-row>
            <a-col :span="8">
              <router-link :to="{name:'ProjectCenter'}">项目</router-link>
            </a-col>
            <a-col :span="8">
              <router-link :to="{name:'DemandCenter'}">专利</router-link>
            </a-col>
            <a-col :span="8">
              <router-link :to="{name:'BrandCenter'}">商标</router-link>
            </a-col>
          </a-row>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'CarouselMap',
    props: {
      fullScreen: {
        type: Boolean,
        default: false
      },
      advertList: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      },
      tradingBtn: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: '330'
      }
    },
    data() {
      return {
        defaultImg: 'this.src="' + require('../assets/images/zhuantiimg.jpg') + '"',
        url: '/zscq/portal/advertclickNumAdd'
      }
    },
    created() {

    },
    methods: {
      carouselBtn(item) {
        getActionUpdateKeyword(this.url, { id: item.id }).then((res) => {
          if (res.success) {
            // 回写成功
          } else {
            this.$message.warning(res.message)
          }
        })
        if (item.url) {
          window.open(item.url, '_blank')
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
    }
  }
</script>

<style scoped lang="less">

  @import "main";

  #carouselMap {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    overflow: hidden;
    position: relative;
    /* For demo */
    .ant-carousel /deep/ .slick-slide {
      text-align: center;
      background: #ffffff;
      overflow: hidden;
    }

    .ant-carousel {
      cursor: pointer
    }

    .ant-carousel /deep/ .custom-slick-arrow {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #fff;
      background-color: rgba(31, 45, 61, 0.11);
      opacity: 0;
    }

    .ant-carousel /deep/ .custom-slick-arrow:before {
      display: none;
    }

    .ant-carousel /deep/ .custom-slick-arrow:hover {
      opacity: 1;
    }

    .ant-carousel /deep/ .custom-slick-arrow:active {
      color: #666666;
    }

    .ant-carousel /deep/ .slick-slide h3 {
      color: #fff;
    }
    .ant-carousel:hover {
      /deep/ .custom-slick-arrow {
        opacity: 0.5;
      }
    }
    .ant-carousel /deep/ .slick-dots {
      height: auto;
    }

    .my-card {
      position: absolute;
      bottom: 20px;
      left: 200px;
      width: 235px;
      background-color: rgba(255, 255, 255, 0.9);
      text-align: center;
      h3 {
        text-align: left;
        color: @main-color;
        font-size: 18px;
      }
      .my-line {
        margin-bottom: 10px;
      }
      a {
        color: #666666;
        &:hover {
          color: @main-color;
        }
      }
    }
  }


</style>