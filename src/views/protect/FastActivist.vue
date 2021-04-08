<template>
  <div id="fastActivist">
    <carousel-map :full-screen="true" :loading="adLoading" :advert-list="advertList"></carousel-map>
    <div class="container">
      <a-row :gutter="12" class="banner-btn">
        <a-col :span="8">
          <a href="http://www.xm12330.com/view/pc/online_ask.html" target="_blank">
            <img src="../../assets/img/p1.png" alt="在线咨询">
          </a>
        </a-col>
        <a-col :span="8">
          <a href="http://www.xm12330.com/view/pc/rights_assistance.html" target="_blank">
            <img src="../../assets/img/p2.png" alt="维权援助">
          </a>
        </a-col>
        <a-col :span="8">
          <a href="http://www.xm12330.com/view/pc/disput_resolution.html" target="_blank">
            <img src="../../assets/img/p3.png" alt="纠纷调解">
          </a>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import CarouselMap from '../../components/CarouselMap'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'FastActivist',
    components: { CarouselMap },
    data() {
      return {
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '10'
        },
        adLoading: false,
        advertList: []
      }
    },
    created() {
      this.getAllAdverts()
    },
    methods: {
      getAllAdverts() {
        if (!this.adUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.adLoading = true
        getActionUpdateKeyword(this.adUrl, this.adParam).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
          this.adLoading = false
        }).finally(() => {
          this.adLoading = false
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #fastActivist {
    .main-css();
    .banner-btn{
      margin-top: 10px;
      img{
        width: 100%;
        height: 170px;
      }
    }
  }
</style>