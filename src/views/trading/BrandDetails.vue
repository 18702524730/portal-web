<template>
  <div id="brandDetails">
    <div class="container">
      <a-row>
        <detail-brand-head :item="item" @func="loadData"
                           :collection-child-type="supplyRequirementType"></detail-brand-head>
      </a-row>
      <a-row>
        <details-body headName="商标需求内容" :data="dataList"></details-body>
      </a-row>
      <a-row>
        <details-body headName="商标需求描述" :data="dataList2"></details-body>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import DetailBrandHead from '../../components/card/DetailBrandHead'
  import DetailsBody from '../../components/card/DetailsBody'

  export default {
    name: 'BrandDetails',
    components: { DetailsBody, DetailBrandHead },
    data() {
      return {
        dataList: [
          {
            title: '需求简介:',
            text: '',
            key: 'trademarkRemark',
            type: '1'
          }
        ],
        dataList2: [
          {
            title: '商标需求描述:',
            text: '',
            key: 'trademarkDesc',
            type: '1'
          },
          {
            title: '适用的领域/范围:',
            text: '',
            key: 'applicableField'
          }
        ],
        item: {},
        url: '/zscq/portal/getSupplyRequirementDetail',
        supplyRequirementType: 6
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        getActionUpdateKeyword(this.url, {
          supplyRequirementType: this.supplyRequirementType,
          id: this.$route.query.id
        }).then((res) => {
          if (res.success) {
            this.item = res.result
            for (const a of this.dataList) {
              a.text = this.item[a.key]
            }
            for (const a of this.dataList2) {
              a.text = this.item[a.key]
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #brandDetails {
    .main-css();
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    overflow: hidden;
  }


</style>