<template>
  <div id="centerCarouselMap">
    <div>
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
            <img :src="getImgNewView(item.picture)" :onerror="defaultImg" style="width: 100%;height: 320px;"
                 class="img-change" alt="无图片"/>
          </a>
        </div>
      </a-carousel>
    </div>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'CenterCarouselMap',
    props: {
      advertList: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultImg: 'this.src="' + require('../../assets/images/zhuantiimg.jpg') + '"',
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
        if (item.url){
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
  @import "../main";

  #centerCarouselMap {
    .main-css();
    color: #333333;
    background-color: #ffffff;
    font-size: 14px;
    overflow: hidden;
    /* For demo */
    .ant-carousel /deep/ .slick-slide {
      text-align: center;
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
  }

</style>