<template>
  <div id="supplyBrandDetails">
    <div class="container">
      <a-row>
        <detail-brand-head :item="item" :item-key="itemKey" :item-title="itemTitle" :demand-or-supply="demandOrSupply"
                           @func="loadData" :collection-child-type="supplyRequirementType" :status-mes="statusMes"></detail-brand-head>
      </a-row>
      <a-row>
        <details-body headName="商标供应内容" :data="dataList"></details-body>
      </a-row>
      <a-row>
        <details-body headName="商标供应描述" :data="dataList2"></details-body>
      </a-row>
    </div>
  </div>
</template>

<script>

  import { getActionUpdateKeyword } from '@/api/manage'
  import DetailsBody from '../../components/card/DetailsBody'
  import DetailBrandHead from '../../components/card/DetailBrandHead'

  export default {
    name: 'SupplyBrandDetails',
    components: { DetailBrandHead, DetailsBody },
    inject: ['changeTab'],
    data() {
      return {
        demandOrSupply: 'supply',
        itemTitle: [
          '商标类别',
          '组合类型',
          '行业需求',
          '交易价格',
          '发布日期'
        ],
        itemKey: [
          'imgUrl',
          'title',
          'trademarkTypeName',
          'combinationCategoryName',
          'belongIndustryName',
          'money',
          'publishTime'

        ],
        dataList: [
          {
            title: '供应简介:',
            text: '',
            key: 'trademarkRemark',
            type: '1'
          }
        ],
        dataList2: [
          {
            title: '商标供应描述:',
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
        supplyRequirementType: 3,

        statusUrl: '/zscq/portal/getServeOrderStatusStr',
        statusMes: ''
      }
    },
    created() {
      this.loadData()
      // this.loadStatusData()
      this.changeTab(this.$route.name)
    },
    methods: {
      async loadStatusData() {
        const res = await getActionUpdateKeyword(this.statusUrl, { id: this.$route.query.id })
        if (res.success) {
          this.statusMes = res.message
        } else {
          this.$message.warning('请求失败！')
        }
      },
      loadData() {
        getActionUpdateKeyword(this.url, {
          supplyRequirementType: this.supplyRequirementType,
          id: this.$route.query.id
        }).then((res) => {
          if (res.success) {
            this.item = res.result
            this.statusMes = this.item.statusName
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

  #supplyBrandDetails {
    .main-css();
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    overflow: hidden;
  }

</style>