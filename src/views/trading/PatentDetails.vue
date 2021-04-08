<template>
  <div id="patentDetails">
    <div class="container">
      <a-row>
        <details-head :item="item" @func="loadData" :collection-child-type="supplyRequirementType"></details-head>
      </a-row>
      <a-row>
        <details-body headName="专利需求内容" :data="dataList"></details-body>
      </a-row>
      <a-row>
        <details-body headName="专利需求描述" :data="dataList2"></details-body>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import DetailsHead from '../../components/card/DetailsHead'
  import DetailsBody from '../../components/card/DetailsBody'

  export default {
    name: 'PatentDetails',
    components: { DetailsBody, DetailsHead },
    data() {
      return {
        dataList: [
          {
            title: '研发背景:',
            text: '',
            key: 'devBackground'
          },
          {
            title: '攻关目标:',
            text: '',
            key: 'patentTarget'
          },
          {
            title: '成果形式:',
            text: '',
            key: 'resultShow',
            type: '1'
          }
        ],
        dataList2: [
          {
            title: '技术难题主要内容:',
            text: '',
            key: 'technicalProblemContent'
          },
          {
            title: '前期研究开发基础:',
            text: '',
            key: 'qqyjkfjc'
          },
          {
            title: '生产和研发设备:',
            text: '',
            key: 'schyfsb',
            type: '1'
          }
        ],
        item: {},
        url: '/zscq/portal/getSupplyRequirementDetail',
        supplyRequirementType: 5
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

  #patentDetails {
    .main-css();
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    overflow: hidden;
  }

</style>