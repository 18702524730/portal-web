<template>
  <div id="iPInsurance">
    <carousel-map :full-screen="true" :loading="adLoading" :advert-list="advertList"></carousel-map>
    <recommend-organization :data="productData" :pagination="productIpagination" :loading="productLoading"
                            v-if="productData.length > 0" class="my-card-group" title="保险产品">
      <template slot="card" slot-scope="item">
        <insurance-project-card :item="item.data"></insurance-project-card>
      </template>
    </recommend-organization>

    <recommend-organization :data="orgData" :pagination="orgIpagination" :loading="orgLoading"
                            v-if="orgData.length > 0" class="my-card-group" title="保险机构" style="background-color: #ffffff">
      <template slot="card" slot-scope="item">
        <insurance-org-card :item="item.data"></insurance-org-card>
      </template>
    </recommend-organization>
  </div>
</template>

<script>
  import CarouselMap from '../../components/CarouselMap'
  import { getActionUpdateKeyword } from '@/api/manage'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import InsuranceProjectCard from '../../components/new/card/InsuranceProjectCard'
  import InsuranceOrgCard from '../../components/new/card/InsuranceOrgCard'
  import { filterObj } from '@/utils/util'

  export default {
    name: 'IPInsurance',
    components: { InsuranceOrgCard, InsuranceProjectCard, RecommendOrganization, CarouselMap },
    data() {
      return {
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '9'
        },
        adLoading: false,
        advertList: [],

        productData: [],

        productUrl: '/zscq/portal/ipManage/productInsuranceList',
        productFormParam: {},
        productIpagination: {
          current: 1,
          pageSize: 16,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page, 'product')
          }
        },
        productLoading: {
          spinning: false
        },

        orgData: [],

        orgUrl: '/zscq/portal/ipManage/orgInsuranceList',
        orgFormParam: {},
        orgIpagination: {
          current: 1,
          pageSize: 16,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page, 'org')
          }
        },
        orgLoading: {
          spinning: false
        }
      }
    },
    created() {
      this.getAllAdverts()
      this.loadProductData(this.getParam(this.productFormParam, this.productIpagination))
      this.loadOrgData(this.getParam(this.orgFormParam, this.orgIpagination))
    },
    methods: {
      async loadProductData(param) {
        this.productLoading.spinning = true
        const res = await getActionUpdateKeyword(this.productUrl, param)
        if (res.success) {
          console.info(res)
          console.info('product')
          this.productData = res.result.records
          this.productIpagination.total = res.result.total
        } else {
          this.$message.error(res.message)
        }
        this.productLoading.spinning = false
      },
      async loadOrgData(param) {
        this.orgLoading.spinning = true
        const res = await getActionUpdateKeyword(this.orgUrl, param)
        if (res.success) {
          console.info(res)
          console.info('org')
          this.orgData = res.result.records
          this.orgIpagination.total = res.result.total
        } else {
          this.$message.error(res.message)
        }
        this.orgLoading.spinning = false
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
      },
      handleTableChange(page, type) {
        if (type === 'org') {
          this.orgIpagination.current = page
          this.loadOrgData(this.getParam(this.orgFormParam, this.orgIpagination))
        } else {
          this.productIpagination.current = page
          this.loadProductData(this.getParam(this.productFormParam, this.productIpagination))
        }
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      }
    }
  }
</script>

<style scoped lang="less">
  #iPInsurance {
    /deep/ .my-card-group {
      h2 {
        text-align: left;
      }
    }
  }
</style>