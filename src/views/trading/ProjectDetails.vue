<template>
  <div id="projectDetails">
    <div class="container">
      <a-row>
        <details-head :item="item" :item-title="itemTitle" :item-key="itemKey" @func="loadData"
                      :collection-child-type="supplyRequirementType"></details-head>
      </a-row>
      <a-row>
        <details-body headName="项目需求内容" :data="dataList"></details-body>
      </a-row>
      <a-row>
        <details-body headName="项目需求描述" :data="dataList2"></details-body>
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
  import DetailsBody from '../../components/card/DetailsBody'
  import DetailsHead from '../../components/card/DetailsHead'

  export default {
    name: 'ProjectDetails',
    components: { DetailsHead, DetailsBody },
    data() {
      return {
        dataList: [
          {
            title: '项目简介:',
            text: '',
            key: 'projectRemark',
            type: '1'
          },
          {
            title: '项目需求内容:',
            text: '',
            key: 'requireContent',
            type: '1'
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
        supplyRequirementType: 4,
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

        ]
      }
    },
    created() {
      this.loadData()
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

  #projectDetails {
    .main-css();
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    overflow: hidden;
  }


</style>