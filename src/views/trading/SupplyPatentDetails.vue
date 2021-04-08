<template>
  <div id="supplyPatentDetails">
    <div class="container">
      <a-row>
        <details-head :item="item" :item-key="itemKey" :item-title="itemTitle" :demand-or-supply="demandOrSupply"
                      @func="loadData" :collection-child-type="supplyRequirementType" :status-mes="statusMes"></details-head>
      </a-row>
      <a-row>
        <details-body headName="专利供应内容" :data="dataList"></details-body>
      </a-row>
      <a-row>
        <details-supply-body :item="item"></details-supply-body>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import DetailsHead from '../../components/card/DetailsHead'
  import DetailsBody from '../../components/card/DetailsBody'
  import DetailsSupplyBody from '../../components/card/DetailsSupplyBody'

  export default {
    name: 'SupplyPatentDetails',
    components: { DetailsSupplyBody, DetailsBody, DetailsHead },
    inject: ['changeTab'],
    data() {
      return {
        demandOrSupply: 'supply',
        itemTitle: [
          '所属行业',
          '技术领域',
          '合作区域',
          '意向运营方式',
          '交易价格',
          '发布日期'
        ],
        itemKey: [
          'title',
          'belongIndustryName',
          'technicalFieldName',
          'cooperationAreaName',
          'intendedOperationModeName',
          'money',
          'publishTime',
          'imgUrl'

        ],
        dataList: [
          {
            title: '专利简介:',
            text: '',
            key: 'patentRemark',
            type: '1'
          }
        ],
        dataList2: [],
        item: {},
        url: '/zscq/portal/getSupplyRequirementDetail',
        supplyRequirementType: 2,

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
            this.statusMes = this.item.jyStatusName
            for (const a of this.dataList) {
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

  #supplyPatentDetails {
    .main-css();
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    overflow: hidden;
  }


</style>