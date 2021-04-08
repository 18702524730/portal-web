<template>
  <div id="demandInformation" v-if="loadNum !== 3">
    <div class="container">
      <a-row><h2 class="header-h">需求信息</h2></a-row>
      <template v-for="(outerItem,outerIndex) in pageList" v-if="outerItem.dataList.length>0">
        <a-row style="display: flex;" :key="outerIndex" class="row-outer">
          <a-col style="width: 20%" class="title-card">
            <a-card :class="['my-new-card',outerItem.class]" hoverable @click="onChange(outerItem.value)">
              <img :src="outerItem.imgUrl" style="height: 100%;width: 100%"/>
            </a-card>
          </a-col>
          <a-col style="width: 80%">
            <a-row :gutter="20">
              <template v-for="(item,innerIndex) in (outerItem.dataList)">
                <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" :span="6" :key="innerIndex" class="card-p">
                  <demand-supply-recommend-card
                    :item="item"
                    :old-data="false"
                    demand-or-supply="demand"
                    :bordered="true"
                    :column="outerItem.column"
                    :item-key="outerItem.itemKey"
                    :is-brand="outerItem.isBrand"
                  >
                  </demand-supply-recommend-card>
                </a-col>
              </template>
            </a-row>
          </a-col>
        </a-row>
      </template>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import _ from 'lodash'
  import DemandSupplyRecommendCard from './DemandSupplyRecommendCard'

  export default {
    name: 'DemandInformation',
    components: { DemandSupplyRecommendCard },
    data() {
      return {
        pageList: [],
        imgList: [
          require('../../assets/images/navigation/project.png'),
          require('../../assets/images/navigation/patent.png'),
          require('../../assets/images/navigation/brand.png')
        ],
        classList: [
          'project-class',
          'patent-class',
          'brand-class'
        ],
        isBrand: [
          false,
          false,
          true
        ],
        columnList: [
          [
            '所属行业',
            '项目成熟度',
            '意向运营方式',
            '交易价格'
          ],
          [
            '所属行业',
            '技术领域',
            '交易方式',
            '交易价格'
          ],
          [
            '商标类别',
            '行业需求',
            '所属行业',
            '交易价格'
          ]
        ],
        itemKeyList: [
          [
            'imgUrl',
            'title',

            'belongIndustryName',
            'projectMaturityName',
            'intendedOperationModeName',
            'money'

          ],
          [
            'imgUrl',
            'title',

            'belongIndustryName',
            'technicalFieldName',
            'intendedOperationModeName',
            'money'
          ],
          [
            'imgUrl',
            'title',

            'trademarkTypeName',
            'belongIndustryName',
            'belongIndustryName',
            'money'

          ]
        ],
        url: '/zscq/portal/requirementRecommendSearch',
        dictList: {
          supplyRequirementType: {
            dictCode: 'requirement_type'
          }
        },
        dictUrl: '/zscq/portal/getDictInfo',
        loadNum: 0
      }
    },
    created() {
      this.initDictData(this.dictList.supplyRequirementType)
    },
    methods: {
      onChange(item) {
        // 如果配置修改了，这里要修改
        switch (item) {
          case '4':
            this.$router.push({ name: 'ProjectCenter' })
            break
          case '5':
            this.$router.push({ name: 'DemandCenter' })
            break
          case '6':
            this.$router.push({ name: 'BrandCenter' })
            break
        }
      },
      initDictData(item) {
        // 根据字典Code, 初始化字典数组
        const param = { code: item.dictCode }
        getActionUpdateKeyword(this.dictUrl, param).then((res) => {
          if (res.success) {
            for (const a of res.result) {
              a.dataList = []
            }
            this.pageList = _.sortBy(res.result, function(item) {
              return item.value
            })
            for (const i in this.pageList) {
              const a = this.pageList[i]
              a.imgUrl = this.imgList[i]
              a.class = this.classList[i]
              a.column = this.columnList[i]
              a.itemKey = this.itemKeyList[i]
              a.isBrand = this.isBrand[i]
            }
          }
        })
      },
      loadData(item) {
        const param = { supplyRequirementType: item.value }
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            const a = res.result
            if (a.length === 0) {
              this.loadNum++
            }
            const dataList = a.slice(0, 4)
            item.dataList = [...dataList]
          }
        })
      }
    },
    watch: {
      pageList(newData, oldData) {
        if (newData !== undefined && newData.length > 0) {
          for (const a of this.pageList) {
            this.loadData(a)
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #demandInformation {
    .main-css();
    color: #333333;
    background-color: #f5f6f7;
    font-size: 14px;
    padding-bottom: 3em;
    overflow: hidden;
    .header-h {
      margin-top: 2em;
      margin-bottom: 1em;
      text-align: left;
      font-weight: 500;
      font-style: normal;
      font-size: 21px;
      line-height: 21px;
    }
    .my-card {
      text-align: center;
      padding-bottom: 13px;
      p {
        color: #ffffff;
      }
      p:first-child {
        font-size: 25px;
        font-weight: 400;
      }
    }
    .my-new-card {
      margin-right: 20px;
      /deep/ .ant-card-body {
        padding: 0;
        height: 303px;
      }
    }
    .title-card {
      .patent-class {

      }
      .brand-class {

      }
      .project-class {

      }
    }

    .title-card {
      /deep/ .ant-btn-primary {

        background-color: rgba(79, 172, 242, 1);
        span {
          padding: 0 10px;
          font-size: 14px;
          text-align: center;
          line-height: normal;
          font-weight: 400;
          font-style: normal;
        }
      }
      /deep/ .ant-card-meta-title {
        font-weight: 400;
        font-style: normal;
        font-size: 28px;
        text-align: center;
        margin-bottom: 5px;
      }

      /deep/ .ant-card-meta-description {
        text-align: center;
      }

      .ant-card {
        background: #e4e4e4;
      }

    }

    .card-p {
      /deep/ .ant-card-meta-title {
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
      }

      /deep/ .ant-card-meta-description {
        text-align: center;
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        line-height: 24px;
        color: #ff3300;
      }

      .ant-card {
        background: #f2f2f2;
      }

      .cover-title, .cover-span {
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        color: #666666;
        text-align: center;
        line-height: normal;
      }

    }

    .row-outer {
      margin-bottom: 40px;
    }
  }

</style>