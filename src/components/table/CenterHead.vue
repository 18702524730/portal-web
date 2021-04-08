<template>
  <div id="centerHead">
    <div class="container">
      <a-row :gutter="8">
        <a-col :xs="24" :sm="8" :md="5" :lg="5">
          <center-left-menu></center-left-menu>
        </a-col>
        <a-col :xs="24" :sm="16" :md="14" :lg="14">
          <center-carousel-map :loading="adLoading" :advert-list="advertList"></center-carousel-map>
        </a-col>
        <a-col :xs="24" :sm="24" :md="5" :lg="5">
          <center-right-card :data="data"></center-right-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import CenterLeftMenu from '../card/CenterLeftMenu'
  import CenterRightCard from '../card/CenterRightCard'
  import CenterCarouselMap from '../card/CenterCarouselMap'

  export default {
    name: 'CenterHead',
    components: { CenterCarouselMap, CenterRightCard, CenterLeftMenu },
    data() {
      return {
        url: '/zscq/portal/tatalProductServiceTypeOrgNum',
        loading: {
          spinning: false
        },
        data: {},
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '2'
        },
        adLoading: false,
        advertList: [],
        innerItem: [],
        itemVisual: false
      }
    },
    created() {
      this.loadData()
      this.getAllAdverts()
    },
    methods: {
      leaveBtn() {
        // this.itemVisual = false
      },
      appearCard(item) {
        this.innerItem = item.children
        this.itemVisual = true
      },
      loadData() {
        if (!this.url) {
          this.$message.error('url.financialUrl属性!')
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.url).then((res) => {
          if (res.success) {
            this.data = res.result
          }
          this.loading.spinning = false
        }).finally(() => {
          this.loading.spinning = false
        })
      },
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
  @import "../main";
  #centerHead {
    .main-css();
    color: #333333;
    background-color: #ffffff;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
  }


</style>