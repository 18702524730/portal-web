<template>
  <div id="supplyProjectDetails">
    <div class="container">
      <a-row>
        <details-head :item="item" :item-key="itemKey" :item-title="itemTitle"
                      :demand-or-supply="demandOrSupply" @func="loadData"
                      :collection-child-type="supplyRequirementType"></details-head>
      </a-row>
      <a-row>
        <details-body headName="项目供应内容" :data="dataList"></details-body>
      </a-row>
      <a-row>
        <details-body headName="项目供应描述" :data="dataList2"></details-body>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import {
    INFORMATION_ITEM
  } from '@/store/mutation-types'
  import Vue from 'vue'
  import DetailsHead from '../../components/card/DetailsHead'
  import DetailsBody from '../../components/card/DetailsBody'

  export default {
    name: 'SupplyProjectDetails',
    components: { DetailsBody, DetailsHead },
    inject: ['changeTab'],
    data() {
      return {
        demandOrSupply: 'supply',
        itemTitle: [
          '所属行业',
          '项目成熟度',
          '项目所在地',
          '意向运营方式',
          '交易价格',
          '发布日期'
        ],
        itemKey: [
          'title',
          'belongIndustryName',
          'projectMaturityName',
          'madeAreaCodeName',
          'intendedOperationModeName',
          'money',
          'publishTime',
          'imgUrl'

        ],
        dataList: [
          {
            title: '项目简介:',
            text: '',
            key: 'projectRemark'
          },
          {
            title: '技术团队:',
            text: '',
            key: 'projectKeyWord'
          }
        ],
        dataList2: [
          {
            title: '解决的技术问题:',
            text: '',
            key: 'sloveProblem'
          },
          {
            title: '适用的领域/范围:',
            text: '',
            key: 'technicalField'
          }
        ],
        item: {},
        url: '/zscq/portal/getSupplyRequirementDetail',
        supplyRequirementType: 1
      }
    },
    created() {
      this.loadData()
      this.changeTab(this.$route.name)
    },
    methods: {
      loadData() {
        const preview = this.$route.query.preview
        if (preview === '1') {
          const a = Vue.ls.get(INFORMATION_ITEM)
          const items = JSON.parse(a.item)
          this.item = items
          for (const a of this.dataList) {
            a.text = this.item[a.key]
          }
          for (const a of this.dataList2) {
            a.text = this.item[a.key]
          }
        } else {
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
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #supplyProjectDetails {
    .main-css();
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    overflow: hidden;
  }

</style>