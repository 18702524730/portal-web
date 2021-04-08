<template>
  <div>
    <carousel-map :full-screen="true" :loading="adLoading" :advert-list="advertList"></carousel-map>
    <hosting-card-list></hosting-card-list>
    <policy-list :data="data" :loading="loading" :pagination="data.length > 0 ?ipagination:false"
                 :key-route="'CareCenter'" route-name="CareCenterArticleMessage"></policy-list>
  </div>

</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import CarouselMap from '../../components/CarouselMap'
  import HostingCardList from '../../components/table/HostingCardList'
  import PolicyList from '../../components/general/PolicyList'

  export default {
    name: 'CareCenter',
    components: { PolicyList, HostingCardList, CarouselMap },
    data() {
      return {
        url: '/zscq/portal/informationList',
        formParam: {
          informationType: '5'
        },
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          spinning: false
        },
        data: [],

        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '5'
        },
        adLoading: false,
        advertList: []
      }
    },
    created() {
      this.loadData(this.getParam(this.formParam, this.ipagination))
      this.getAllAdverts()
    },
    methods: {
      loadData(param) {
        if (!this.url) {
          this.$message.error('url有问题!')
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = res.result.records
          }
          this.loading.spinning = false
        }).finally(() => {
          this.loading.spinning = false
        })
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      handleTableChange(page, key) {
        this.ipagination.current = page
        this.loadData(this.getParam(this.formParam, this.ipagination))
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