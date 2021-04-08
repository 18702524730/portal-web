<template>
  <div id="caseShowDetails">
    <div class="container">
      <a-row>
        <a-card hoverable class="my-card">
          <a-row>
            <a-col :span="4">
              <div class="my-img-div">
                <img :src="getImgNewView(item.ipInfo.imgUrl)" alt="案例展示"
                     :onerror="'https://img.yzcdn.cn/vant/cat.jpeg'">
              </div>
            </a-col>
            <a-col :span="20" class="my-content">
              <a-row type="flex" justify="space-between" align="middle">
                <a-col :span="20">
                  <span class="my-title">{{ item.orderType | tagName }}{{ item.transactionContent }}</span>
                </a-col>
                <a-col :span="4">
                  <span class="my-time">售出时间：{{ item.orderTime | changeDate}}</span>
                </a-col>
              </a-row>
              <a-row class="description">
                <div v-if="item.orderType === '2'">
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>所属行业：</span>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip
                        placement="top" :title="item.ipInfo.belongIndustryName" style="white-space: inherit">{{ item.ipInfo.belongIndustryName}}</a-tooltip></span>
                    </a-col>
                    <a-col :span="6" class="my-col">
                      <span>意向运营方式：</span>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip
                        placement="top" :title="item.ipInfo.intendedOperationModeName" style="white-space: inherit">{{ item.ipInfo.intendedOperationModeName}}</a-tooltip></span>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>项目所在地：</span><span>{{ item.ipInfo.madeAreaCodeName |changeData}}</span>
                    </a-col>
                  </a-row>
                </div>

                <div v-else-if="item.orderType === '3'">
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>技术领域：</span><span>{{ item.ipInfo.technicalFieldName }}</span>
                    </a-col>
                    <a-col :span="6" class="my-col">
                      <span>所属行业：</span>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip
                        placement="top" :title="item.ipInfo.belongIndustryName" style="white-space: inherit">{{ item.ipInfo.belongIndustryName}}</a-tooltip></span>
                    </a-col>
                    <a-col :span="6" class="my-col">
                      <span>合作区域：</span><span>{{ item.ipInfo.cooperationAreaName }}</span>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>专利类型：</span><span>{{ item.ipInfo.patentTypeName }}</span>
                    </a-col>
                    <a-col :span="6" class="my-col">
                      <span>意向运营方式：</span><span>{{ item.ipInfo.intendedOperationModeName }}</span>
                    </a-col>
                  </a-row>
                </div>

                <div v-else>
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>商标类别：</span><span>{{ item.ipInfo.trademarkTypeName }}</span>
                    </a-col>
                    <a-col :span="6" class="my-col">
                      <span>行业需求：</span>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip
                        placement="top" :title="item.ipInfo.belongIndustryName" style="white-space: inherit">{{ item.ipInfo.belongIndustryName}}</a-tooltip></span>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>组合类型：</span><span>{{ item.ipInfo.combinationCategoryName }}</span>
                    </a-col>
                  </a-row>
                </div>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
      </a-row>

      <a-row>
        <details-body headName="案例背景" :data="dataList" v-if="dataListDisplay" :have-title="haveTitle"></details-body>
      </a-row>
      <a-row>
        <details-body headName="案例实施过程" :data="dataList2" v-if="dataListDisplay2"
                      :have-title="haveTitle"></details-body>
      </a-row>
      <a-row>
        <details-body headName="案例分析" :data="dataList3" v-if="dataListDisplay3" :have-title="haveTitle"></details-body>
      </a-row>
      <a-row>
        <details-body headName="案例亮点" :data="dataList4" v-if="dataListDisplay4" :have-title="haveTitle"></details-body>
      </a-row>
    </div>
  </div>
</template>

<script>
  import DetailsBody from '../../../components/card/DetailsBody'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'CaseShowDetails',
    components: { DetailsBody },
    data() {
      return {
        haveTitle: false,
        url: '/zscq/portal/ipManage/caseShowDetail',
        item: {
          ipInfo: {}
        },
        dataList: [
          {
            title: '案例背景介绍:',
            text: '',
            key: 'caseBackground'
          }
        ],
        dataList2: [
          {
            title: '案例实施过程:',
            text: '',
            key: 'caseImplementProcess'
          }
        ],
        dataList3: [
          {
            title: '案例分析:',
            text: '',
            key: 'caseAnalysis'
          }
        ],
        dataList4: [
          {
            title: '案例亮点:',
            text: '',
            key: 'caseHighlights'
          }
        ],
        type: '1',
        dataListDisplay: false,
        dataListDisplay2: false,
        dataListDisplay3: false,
        dataListDisplay4: false
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      getImgNewView,
      async loadData() {
        const res = await getActionUpdateKeyword(this.url, { id: this.$route.query.itemId })
        if (res.success) {
          this.item = res.result
          console.info(this.item)
          for (const a of this.dataList) {
            a.text = this.item[a.key]
            if (a.text) {
              this.dataListDisplay = true
            }
          }
          for (const a of this.dataList2) {
            a.text = this.item[a.key]
            if (a.text) {
              this.dataListDisplay2 = true
            }
          }
          for (const a of this.dataList3) {
            a.text = this.item[a.key]
            if (a.text) {
              this.dataListDisplay3 = true
            }
          }
          for (const a of this.dataList4) {
            a.text = this.item[a.key]
            if (a.text) {
              this.dataListDisplay4 = true
            }
          }
        } else {
          this.$message.warning('请求有误!')
        }
      }
    },
    filters: {
      tagName(value) {
        let name = ''
        if (value) {
          switch (value) {
            case '2':
              name = '【项目】'
              break
            case '3':
              name = '【专利】'
              break
            case '4':
              name = '【商标】'
              break
            default:
          }
        }
        return name
      },
      changeData(value) {
        if (value) {
          const arr = value.split('/')
          return arr[arr.length - 1]
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #caseShowDetails {
    .main-css();
    padding-bottom: 10px;
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    overflow: hidden;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .my-img-div {
      height: 75px;
      margin: 20px 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .my-content {
      padding: 10px 0;
      font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
      .my-title {
        color: #555555;
        font-size: 18px;
      }
      .my-time {
        color: #797979;
        font-size: 14px;
      }
    }
    .description {
      padding-top: 10px;
      .my-col {
        display: flex;
        span:nth-child(1) {
          white-space: nowrap;
        }
      }
    }
  }
</style>