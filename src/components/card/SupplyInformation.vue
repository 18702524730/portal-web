<template>
  <div id="supplyInformation"  v-if="loadNum !== 3">
    <div class="container">
      <a-row><h2 class="header-h">供应信息</h2></a-row>
      <template v-for="(outerItem,outerIndex) in pageList"
                v-if="outerItem.dataList.length>0 || outerItem.selfProject.length>0  || outerItem.hostingProject.length>0 || outerItem.highProject.length>0">
        <a-row style="display: flex;" :key="outerIndex" class="row-outer">
          <a-col class="title-card" style="width: 20%">
            <a-card :class="['my-new-card',outerItem.class]" hoverable @click="onChange(outerItem.value)">
              <img :src="outerItem.imgUrl" style="height: 100%;width: 100%"/>
            </a-card>
          </a-col>
          <a-col style="width: 80%">
            <a-row :gutter="20" v-if="!outerItem.isProjcet">
              <template v-for="(item,innerIndex) in (outerItem.dataList)">
                <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" :span="6" :key="innerIndex" class="card-p">
                  <demand-supply-recommend-card
                    :item="item"
                    :old-data="false"
                    demand-or-supply="supply"
                    :bordered="true"
                    :column="outerItem.column"
                    :item-key="outerItem.itemKey"
                    :is-brand="outerItem.isBrand"
                  >
                  </demand-supply-recommend-card>
                </a-col>
              </template>
            </a-row>
            <a-row v-else>
              <a-row class="my-btn-group">
                <div>
                  <a-button :type="`${value === 'selfProject'?'primary':''}`" @click="btnClick('selfProject')"
                            size="large">
                    自助项目
                  </a-button>
                  <a-button :type="`${value === 'hostingProject'?'primary':''}`" @click="btnClick('hostingProject')"
                            size="large">
                    托管项目
                  </a-button>
                  <a-button :type="`${value === 'highProject'?'primary':''}`" @click="btnClick('highProject')"
                            size="large">
                    高端项目
                  </a-button>
                </div>
                <!--<div>-->
                <!--<a-radio-group v-model="value" @change="onChangeRadio" size="large" buttonStyle="solid">-->
                <!--<a-radio-button value="a">-->
                <!--自助项目-->
                <!--</a-radio-button>-->
                <!--<a-radio-button value="b">-->
                <!--托管项目-->
                <!--</a-radio-button>-->
                <!--<a-radio-button value="c">-->
                <!--高端项目-->
                <!--</a-radio-button>-->
                <!--</a-radio-group>-->
                <!--</div>-->
              </a-row>
              <a-row :gutter="20">
                <template v-for="(item,innerIndex) in (outerItem[`${value}`])">
                  <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" :span="6" :key="innerIndex" class="card-p">
                    <demand-supply-recommend-card
                      :item="item"
                      :old-data="false"
                      demand-or-supply="supply"
                      :bordered="true"
                      :column="outerItem.column"
                      :item-key="outerItem.itemKey"
                      :is-brand="outerItem.isBrand"
                    >
                    </demand-supply-recommend-card>
                  </a-col>
                </template>
              </a-row>
            </a-row>
          </a-col>
        </a-row>
      </template>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import DemandSupplyRecommendCard from './DemandSupplyRecommendCard'
  import _ from 'lodash'

  export default {
    name: 'SupplyInformation',
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
        isProjcet: [
          false,
          false,
          false
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
            '意向运营方式',
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
        url: '/zscq/portal/supplyRecommendSearch',
        dictList: {
          supplyRequirementType: {
            dictCode: 'supply_type'
          }
        },
        dictUrl: '/zscq/portal/getDictInfo',
        loadNum: 0,
        value: 'selfProject'
      }
    },
    created() {
      this.initDictData(this.dictList.supplyRequirementType)
    },
    methods: {
      btnClick(a) {
        this.value = a
      },
      onChangeRadio() {

      },
      onChange(item) {
        // 如果配置修改了，这里要修改
        switch (item) {
          case '1':
            this.$router.push({ name: 'SupplyProjectMessage' })
            break
          case '2':
            this.$router.push({ name: 'SupplyPatentMessage' })
            break
          case '3':
            this.$router.push({ name: 'SupplyBrandMessage' })
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
              a.highProject = []
              a.hostingProject = []
              a.selfProject = []
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
              a.isProjcet = this.isProjcet[i]
            }
          }
        })
      },
      loadData(item) {
        // 这个是项目
        if (item.isProjcet) {
          const highParam = { supplyRequirementType: item.value, projectType: '1' }
          const hostingParam = { supplyRequirementType: item.value, projectType: '2' }
          const selfParam = { supplyRequirementType: item.value, projectType: '3' }
          getActionUpdateKeyword(this.url, highParam).then((res) => {
            if (res.success) {
              const a = res.result
              if (a.length === 0) {
                this.loadNum++
              }
              item.highProject = a.slice(0, 4)
            }
          })
          getActionUpdateKeyword(this.url, hostingParam).then((res) => {
            if (res.success) {
              const a = res.result
              if (a.length === 0) {
                this.loadNum++
              }
              item.hostingProject = a.slice(0, 4)
            }
          })
          getActionUpdateKeyword(this.url, selfParam).then((res) => {
            if (res.success) {
              const a = res.result
              if (a.length === 0) {
                this.loadNum++
              }
              item.selfProject = a.slice(0, 4)
            }
          })

        } else {
          const param = { supplyRequirementType: item.value }
          getActionUpdateKeyword(this.url, param).then((res) => {
            if (res.success) {
              const a = res.result
              if (a.length === 0) {
                this.loadNum++
              }
              item.dataList = a.slice(0, 4)
            }
          })
        }
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

  #supplyInformation {
    .main-css();
    color: #333333;
    background-color: #ffffff;
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
        /deep/ .ant-card-body {
          /*height: 353px;*/
        }
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

    }

    .row-outer {
      margin-bottom: 40px;
    }

    .my-btn-group {
      height: 50px;
      /deep/ .ant-radio-button-wrapper {
      }
      .ant-radio-button-wrapper:not(:first-child)::before {
      }
      .ant-btn {
        margin-right: 20px;
        border-radius: 30px;
        padding: 0 30px;
        background-color: #f2f2f2;
        border: none;
        color: #555555;
        font-size: 16px;
      }
      .ant-btn-primary {
        background-color: @main-color;
        color: #ffffff;
      }
    }
  }

</style>