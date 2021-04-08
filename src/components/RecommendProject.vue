<template>
  <div>
    <div class="container img-container">
      <a href="https://ipop.scjg.xm.gov.cn/portal/message/article-message?id=1250603073077747713&keyRoute=SpecialMessage"
         target="_blank">
        <img src="@/assets/images/navigation/banner.gif" alt="" style="width: 100%;max-height: 106px">
      </a>
    </div>
    <div id="recommendProject" v-if="demandData.length > 0 || supplyData.length > 0">
      <div class="container">
        <h2 style="padding-left: 8px;margin-top: 2em;color: #001833">推荐项目</h2>
        <a-row v-if="supplyData.length > 0" style="display: flex;">
          <a-col style="margin-top: 10px;width: 20%">
            <a-card class="my-new-card" hoverable @click="supplyBtn" :bordered="true" style="margin-right: 12px">
              <img src="@/assets/images/navigation/supply.png" style="height: 100%;width: 100%"/>
            </a-card>
          </a-col>
          <a-col style="width: 80%">
            <recommend-organization :data="supplyData" :loading="supplyLoading" style="background-color: #ffffff;"
                                    :old-data="false">
              <template slot="card" slot-scope="item">
                <demand-supply-recommend-card
                  :item="item.data"
                  key-route="SupplyProjectDetails"
                  demand-or-supply="supply"
                  :bordered="true"
                  :old-data="false"
                  :column="getKey(item.data,'column')"
                  :item-key="getKey(item.data,'key')"
                  :is-brand="getKey(item.data,'brand')"
                >
                </demand-supply-recommend-card>
              </template>
            </recommend-organization>
          </a-col>
        </a-row>
        <a-row v-if="demandData.length > 0" style="display: flex;">
          <a-col style="margin-top: 10px;width: 20%">
            <a-card class="my-new-card-two" hoverable @click="demandBtn" :bordered="true" style="margin-right: 12px">
              <img src="@/assets/images/navigation/demand.png" style="height: 100%;width: 100%"/>
            </a-card>
          </a-col>
          <a-col style="width: 80%">
            <recommend-organization :data="demandData" :loading="demandLoading" style="background-color: #ffffff"
                                    :old-data="false">
              <template slot="card" slot-scope="item">
                <demand-supply-recommend-card
                  :item="item.data"
                  key-route="ProjectDetails"
                  demand-or-supply="demand"
                  :bordered="true"
                  :old-data="false"
                  :column="getKey(item.data,'column')"
                  :item-key="getKey(item.data,'key')"
                  :is-brand="getKey(item.data,'brand')"
                >
                </demand-supply-recommend-card>
              </template>
            </recommend-organization>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>

</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import RecommendOrganization from './general/RecommendOrganization'
  import DemandSupplyRecommendCard from './card/DemandSupplyRecommendCard'

  export default {
    name: 'RecommendProject',
    components: { DemandSupplyRecommendCard, RecommendOrganization },
    data() {
      return {
        url: {
          supplyRecommendSearchUrl: '/zscq/portal/supplyRecommendSearch',
          requirementRecommendSearchUrl: '/zscq/portal/requirementRecommendSearch'
        },
        formParam: {
          pageSize: 4
        },
        supplyData: [],
        demandData: [],

        supplyLoading: {
          spinning: false
        },
        demandLoading: {
          spinning: false
        },
        classList: [
          'project-class',
          'patent-class',
          'brand-class'
        ],
        columnType: {
          'project': {
            columnList: [
              '所属行业',
              '项目成熟度',
              '意向运营方式',
              '交易价格'
            ],
            isBrand: false,
            itemKeyList: [
              'imgUrl',
              'title',

              'belongIndustryName',
              'projectMaturityName',
              'intendedOperationModeName',
              'money'
            ]
          },
          'patent': {
            columnList: [
              '所属行业',
              '技术领域',
              '意向运营方式',
              '交易价格'
            ],
            isBrand: false,
            itemKeyList: [
              'imgUrl',
              'title',

              'belongIndustryName',
              'technicalFieldName',
              'intendedOperationModeName',
              'money'
            ]
          },
          'brand': {
            columnList: [
              '商标类别',
              '行业需求',
              '所属行业',
              '交易价格'
            ],
            isBrand: true,
            itemKeyList: [
              'imgUrl',
              'title',

              'trademarkTypeName',
              'belongIndustryName',
              'belongIndustryName',
              'money'
            ]
          }
        },
        isBrand: [
          false,
          false,
          true
        ],
        columnList: [
          [
            '所属行业',
            '项目成熟度',
            '交易方式',
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
        ]
      }
    },
    created() {
      this.getSupplyData(this.getParam(this.formParam))
      this.getDemandData(this.getParam(this.formParam))
    },
    computed: {},
    methods: {
      getKey(item, key) {
        let type = ''
        switch (item.supplyRequirementType) {
          case '1':
          case '4':
            type = 'project'
            break
          case '2':
          case '5':
            type = 'patent'
            break
          case '3':
          case '6':
            type = 'brand'
            break
        }
        if (key === 'column') {
          return this.columnType[`${type}`].columnList
        } else if (key === 'key') {
          return this.columnType[`${type}`].itemKeyList
        } else if (key === 'brand') {
          return this.columnType[`${type}`].isBrand
        }
      },
      supplyBtn() {
        this.$router.push({ name: 'SupplyProjectMessage' })
      },
      demandBtn() {
        this.$router.push({ name: 'ProjectCenter' })
      },
      getDemandData(param) {
        if (!this.url.requirementRecommendSearchUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.demandLoading.spinning = true
        getActionUpdateKeyword(this.url.requirementRecommendSearchUrl, param).then((res) => {
          if (res.success) {
            this.demandData = res.result
          }
          this.demandLoading.spinning = false
        }).finally(() => {
          this.demandLoading.spinning = false
        })
      },
      getSupplyData(param) {
        if (!this.url.supplyRecommendSearchUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.supplyLoading.spinning = true
        getActionUpdateKeyword(this.url.supplyRecommendSearchUrl, param).then((res) => {
          if (res.success) {
            this.supplyData = res.result
          }
          this.supplyLoading.spinning = false
        }).finally(() => {
          this.supplyLoading.spinning = false
        })
      },
      getParam(formParam) {
        const param = Object.assign({}, formParam)
        return filterObj(param)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "main";
  #recommendProject {
    .main-css();
    color: #333333;
    background-color: #ffffff;
    font-size: 14px;
    margin-bottom: 20px;
    overflow: hidden;
    .my-card {
      text-align: center;
      margin-top: 10px;
      padding-bottom: 26px;
      p {
        color: #ffffff;
        margin-bottom: 25px;
      }
      p:first-child {
        font-size: 25px;
        margin-bottom: 10px;
        font-weight: 400;
      }
      /deep/ .ant-card-body {
        padding: 30px 24px 18px;
      }
    }
    .demand-card {
      padding-bottom: 37px;
    }
    .my-new-card {
      /deep/ .ant-card-body {
        padding: 0;
        height: 303px;
      }
    }
    .my-new-card-two {
      /deep/ .ant-card-body {
        padding: 0;
        height: 303px;
      }
    }

  }
  .img-container {
    margin-left: auto;
    margin-right: auto;
    padding-top: 28px;
  }


</style>