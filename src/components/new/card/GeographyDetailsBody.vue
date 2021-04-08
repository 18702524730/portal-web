<template>
  <div id="geographyDetailsBody">
    <div class="container">
      <a-card hoverable :bordered="false">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="简介详情">
            <div class="my-inner-div">
              <p class="intro-p" v-html="item.remark" style="white-space: pre-wrap;word-break: break-all;overflow-x: auto">
              </p>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="相册">
            <div class="my-inner-div my-inner-img-div">
              <recommend-organization :data="item.photoData" :loading="photoLoading"
                                      v-if="item.photoData && item.photoData.length > 0" :old-data="false"
                                      style="background-color: #FFFFFF">
                <template slot="card" slot-scope="text">
                  <a-card hoverable class="my-card">
                    <div class="my-img-div">
                      <img :src="getImgNewView(text.data)" alt="无图片" :onerror="'https://img.yzcdn.cn/vant/cat.jpeg'">
                    </div>
                  </a-card>
                </template>
              </recommend-organization>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="质量技术要求">
            <div class="my-inner-div">
              <p class="intro-p" v-html="item.qualityTechnicalRequirements"
                 style="white-space: pre-wrap;word-break: break-all;overflow-x: auto">
              </p>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4" tab="标准（规范）">
            <div class="my-inner-div">
              <ul>
                <li v-for="(file,index) in item.fileUrls" :key="index">
                  <a :href="file" :key="index" class="my-a">
                    {{file.substr(file.lastIndexOf('/') + 1) | changeData}}
                  </a>
                </li>
              </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane key="5" tab="核准企业">
            <div class="my-inner-div">

              <div class="ant-descriptions ant-descriptions-bordered "
                   v-if="item.portalGeoAppEnts && item.portalGeoAppEnts.length > 0">
                <div class="ant-descriptions-view">
                  <table>
                    <tr class="ant-descriptions-row">
                      <th class="ant-descriptions-item-label ant-descriptions-item-colon">企业名称</th>
                      <th class="ant-descriptions-item-label ant-descriptions-item-colon">核准公告号</th>
                    </tr>
                    <tr class="ant-descriptions-row" v-for="(data,index) in item.portalGeoAppEnts" :key="data.id">
                      <td class="ant-descriptions-item-content">
                        <span class="span-data" style="-webkit-box-orient: vertical;">
                          <a-tooltip :title="data.name">
                             {{data.name}}
                          </a-tooltip>
                        </span>
                      </td>
                      <td class="ant-descriptions-item-content">
                        <a :href="data.link" target="_blank">
                          <span class="span-data" style="-webkit-box-orient: vertical;">
                          <a-tooltip :title="data.approvalAnnouncementNo">
                             {{data.approvalAnnouncementNo}}
                          </a-tooltip>
                        </span>
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="6" tab="相关新闻报告">
            <div class="my-inner-div">
              <list-card :data="item.portalGeoReports" :pagination="ipagination" :loading="loading"
                         :change="handleTableChange"
                         :old-data="false"
                         style="background-color: #FFFFFF" :columns="columns" :is-link="true"></list-card>
            </div>
          </a-tab-pane>
          <a-tab-pane key="7" tab="相关视频">
            <div class="my-inner-div">
              <a-row>
                <geography-video-card :item="data" v-for="(data,index) in item.portalGeoVideos"
                                      :key="data.id"></geography-video-card>
              </a-row>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import RecommendOrganization from '../../general/RecommendOrganization'
  import ListCard from '../../card/ListCard'

  import GeographyVideoCard from './GeographyVideoCard'
  import _ from 'lodash'
  import moment from 'moment'

  export default {
    name: 'GeographyDetailsBody',
    components: { GeographyVideoCard, ListCard, RecommendOrganization },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        photoLoading: {
          spinning: false
        },
        columns: [
          {
            title: '相关新闻报告',
            dataIndex: 'title',
            width: '70%',
            scopedSlots: { customRender: 'my-content' }
          },
          {
            title: '发布时间',
            dataIndex: 'publishDate',
            sorter: true,
            width: '30%'
          }
        ],
        ipagination: {
          pagination: false
        },
        loading: {
          spinning: false
        },
        keyRoute: ''
      }
    },
    created() {
    },
    methods: {
      getImgNewView(text) {
        return getImgNewView(text)
      },
      handleTableChange(pagination, filters, sorter) {
        if (Object.keys(sorter).length > 0) {
          if (sorter.order === 'ascend') {
            // 升序
            this.item.portalGeoReports = _.sortBy(this.item.portalGeoReports, function(item) {
              return item.publishDate
            })
          } else if (sorter.order === 'descend') {
            // 降序
            this.item.portalGeoReports = _.sortBy(this.item.portalGeoReports, function(item) {
              return -item.publishDate
            })
          } else {
            // undefined
            this.item.portalGeoReports = JSON.parse(this.item.portalGeoReportsStr)
            for (const a of this.item.portalGeoReports) {
              a.publishDate = moment(a.publishDate).format('YYYY-MM-DD')
            }
          }
        }
      }
    },
    filters: {
      changeData(value) {
        if (value || value === '0') {
          const arr = value.split('/')
          if (arr.length > 0) {
            const fileNames = arr[arr.length - 1].split('.')
            const hz = fileNames[fileNames.length - 1] // 后缀名
            let lastValue = fileNames[0]
            const index = lastValue.lastIndexOf('_')
            lastValue = lastValue.substring(0, index)

            return lastValue + '.' + hz
          } else {
            return value
          }
        }
        return value
      }
    },
    watch: {}
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #geographyDetailsBody {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    overflow: hidden;
    /deep/ .ant-card-body {
      padding: 0 12px;
    }
    .my-inner-div {
      margin: 20px 40px;
      .intro-p {
        color: #333333;
        text-indent: 28px;
      }
      .my-img-div {
        height: 140px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      /deep/ .ant-card-body {
        padding: 5px;
      }
      ul {
        li {
          list-style-type: inherit;
          color: @main-color;
          line-height: 25px;
          a {
            text-decoration: underline;
            color: #333333;
            &:hover {
              color: @main-color;
            }
          }
          span {
            color: #333333;
            line-height: 30px;
          }
        }
      }
    }

    .my-inner-img-div {
      margin: 20px;
      /deep/ .ant-card-body {
        padding: 3px;
      }
    }
    /deep/ .ant-tabs-tab {
      font-size: 16px;
      &:hover {
        color: @main-color;
      }
    }
    /deep/ .ant-tabs-nav .ant-tabs-tab-active {
      color: @main-color;
    }
    /deep/ .ant-tabs-ink-bar {
      background-color: @main-color;
    }

    .ant-descriptions-bordered .ant-descriptions-row {
      border-bottom: 1px solid #e8e8e8;
    }

    .ant-descriptions-bordered .ant-descriptions-item-label, .ant-descriptions-bordered .ant-descriptions-item-content {
      padding: 16px 24px;
      border-right: 1px solid #e8e8e8;
    }

    .ant-descriptions-bordered .ant-descriptions-item-label {
      background-color: #fafafa;
      text-align: center;
    }

    .ant-descriptions-view {
      width: 60%;
      overflow: hidden;
      border-radius: 4px;
    }

    .ant-descriptions-item-content {
      display: table-cell;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      line-height: 1.5;
      a {
        text-decoration: underline;
        color: rgba(0, 0, 0, 0.65);
        &:hover {
          color: @main-color;
        }
      }
    }
    .ant-descriptions-bordered .ant-descriptions-row:last-child {
      border-bottom: none;
    }
    .ant-descriptions-bordered .ant-descriptions-view > table {
      table-layout: auto;
    }
    .ant-descriptions-view table {
      width: 100%;
      table-layout: fixed;
    }
    .ant-descriptions-row > th, .ant-descriptions-row > td {
      padding-bottom: 16px;
    }
    .ant-descriptions-bordered .ant-descriptions-view {
      border: 1px solid #e8e8e8;
      border-right: none;
    }
    .span-data {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      /* autoprefixer: off*/
      -webkit-box-orient: vertical;
      /* autoprefixer: on*/
      -webkit-line-clamp: 1;
      color: @main-font-color;
    }
  }
</style>