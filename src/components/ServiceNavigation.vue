<template>
  <div id="serviceNavigation">
    <div class="container">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="24" :md="13" :lg="15" style="margin-bottom: 5px">
          <h2 style="color: #001833">服务导航</h2>
          <a-row :gutter="24">
            <a-col :span="6" v-for="(item,index) in list1" :key="index">
              <a-row class="row-card">
                <router-link :to="{ name: item.router}">
                  <a-col>
                    <img :src="item.img" :alt="item.alt" class="row-img">
                  </a-col>
                  <a-col>
                    <span class="card-span" v-html="item.html"></span>
                  </a-col>
                </router-link>
              </a-row>


            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="6" v-for="(item,index) in list2" :key="index">
              <a-row class="row-card">
                <router-link :to="{ name: item.router}" v-if="item.canUse">
                  <a-col>
                    <img :src="item.img" :alt="item.alt" class="row-img">
                  </a-col>
                  <a-col>
                    <span class="card-span" v-html="item.html"></span>
                  </a-col>
                </router-link>

                <div v-else style="cursor:no-drop">
                  <a-col>
                    <img :src="item.img" :alt="item.alt" class="row-img">
                  </a-col>
                  <a-col>
                    <span class="card-span" v-html="item.html"></span>
                  </a-col>
                </div>
              </a-row>


            </a-col>
          </a-row>


        </a-col>

        <a-col :xs="24" :sm="24" :md="11" :lg="9">
          <a-card :hoverable="false" :bordered="true" class="my-tabs">
            <a-tabs v-model="key" class="one-tabs">
              <a-tab-pane tab="最新公告" key="NoticeMessage">
                <a-list itemLayout="horizontal" :dataSource="newNotice">
                  <a-list-item slot="renderItem" slot-scope="item, index" @click="onClick(item)">
                    <p class="title-p">
                      <a-tooltip placement="right" :title="item.title" style="-webkit-box-orient: vertical;"
                                 class="span-data"><span style="color: #B4B4B4;padding-right: 5px">•</span>{{item.title
                        | ellipsis}}
                      </a-tooltip>
                    </p>
                    <p class="time-p">{{item.releaseDate | changeDate}}</p>
                  </a-list-item>

                </a-list>
              </a-tab-pane>
              <a-tab-pane tab="最新政策" key="NewsConsult">
                <a-list itemLayout="horizontal" :dataSource="newConsult">
                  <a-list-item slot="renderItem" slot-scope="item, index" @click="onClick(item)">
                    <p class="title-p">
                      <a-tooltip placement="right" :title="item.title" style="-webkit-box-orient: vertical;"
                                 class="span-data"><span style="color: #B4B4B4;padding-right: 5px">•</span>{{item.title
                        | ellipsis}}
                      </a-tooltip>
                    </p>
                    <p class="time-p">{{item.releaseDate | changeDate}}</p>
                  </a-list-item>
                </a-list>
              </a-tab-pane>
              <a-button slot="tabBarExtraContent" @click="moreButton">查看更多
                <a-icon type="right"/>
              </a-button>
            </a-tabs>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { judgmentBrowser } from '@/utils/role'

  export default {
    name: 'ServiceNavigation',
    data() {
      return {
        newNotice: [],
        newConsult: [],
        noticeParam: {
          num: 8,
          informationType: '2'
        },
        consultParam: {
          num: 8
        },
        noticeLoading: {
          spinning: false
        },
        consultLoading: {
          spinning: false
        },
        url: '/zscq/portal/informationRecommendList',
        consultUrl: '/zscq/portal/policies/newPoliciesRegulationsList',
        key: 'NoticeMessage',
        list1: [
          {
            img: require('../assets/images/navigation/icon1.png'),
            router: 'ServiceCenter',
            html: '找服务<br/><br/>',
            alt: '找服务'
          },
          {
            img: require('../assets/images/navigation/icon2.png'),
            router: 'TradingCenter',
            html: '找项目<br/><br/>',
            alt: '找项目'
          },
          {
            img: require('../assets/images/navigation/icon3.png'),
            router: 'FinancialService',
            html: '找资金<br/><br/>',
            alt: '找资金'
          },
          {
            img: require('../assets/images/navigation/icon4.png'),
            router: 'NewsConsult',
            html: '找政策<br/><br/>',
            alt: '找政策'
          }
        ],
        list2: [
          {
            img: require('../assets/images/navigation/icon5.png'),
            router: 'PatentSearchShiBei',
            html: '知识产权检索<br/><br/>',
            alt: '知识产权检索',
            canUse: true
          },
          {
            img: require('../assets/images/navigation/icon6.png'),
            router: 'CareCenter',
            html: 'IP管家<br/><br/>',
            alt: 'IP管家',
            canUse: true
          },
          {
            img: require('../assets/images/navigation/icon7.png'),
            router: 'ServiceVoucher',
            html: '小微企业<br/>IP托管服务券',
            alt: '小微企业IP托管服务券',
            canUse: false
          },
          {
            img: require('../assets/images/navigation/icon8.png'),
            router: 'PatentShiBeiPort',
            html: '重点产业<br/>专利导航报告',
            alt: '重点产业专利导航报告',
            canUse: true
          }
        ]
      }
    },
    created() {
      this.noticeData(this.getParam(this.noticeParam))
      this.consultData(this.getParam(this.consultParam))
    },
    mounted() {
    },
    methods: {
      noticeData(param) {
        if (!this.url) {
          this.$message.error('url有问题!')
          return
        }
        this.noticeLoading.spinning = true
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.newNotice = res.result
          }
          this.noticeLoading.spinning = false
        }).finally(() => {
          this.noticeLoading.spinning = false
        })
      },
      consultData(param) {
        if (!this.consultUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.consultLoading.spinning = true
        getActionUpdateKeyword(this.consultUrl, param).then((res) => {
          if (res.success) {
            this.newConsult = res.result
          }
          this.consultLoading.spinning = false
        }).finally(() => {
          this.consultLoading.spinning = false
        })
      },
      getParam(formParam) {
        const param = Object.assign({}, formParam)
        return filterObj(param)
      },
      onClick(item) {
        let keyRoute = 'NewsConsult'
        switch (item.type) {
          case '1':
            keyRoute = 'NewsConsult'
            break
          case '2':
            keyRoute = 'NoticeMessage'
            break
        }
        this.$router.push({ name: 'ArticleMessage', query: { id: item.id, keyRoute: keyRoute } })
      },
      moreButton() {
        this.$router.push({ name: this.key })
      }
    },
    filters: {
      ellipsis(value) {
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > 20) {
          return value.substring(0, 19) + '...'
        }
        return value
      }

    }
  }
</script>

<style scoped lang="less">
  @import "main";
  #serviceNavigation {
    .main-css();
    color: #333333;
    background-color: #F5F6F7;
    font-size: 14px;
    padding-bottom: 10px;
    padding-top: 25px;
    overflow: hidden;
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
    .my-picture {
      max-width: 100%;
      max-height: 117px;
      padding-left: 16%;
      padding-right: 16%;
    }
    .my-card {
      text-align: center;
      background-color: @main-bg-color;
      p {
        margin-top: 25px;
        font-size: 18px;
        line-height: 18px;
        margin-bottom: 25px;
      }
      .one-line {
        margin-bottom: 43px;
      }
      .my-cp {
        line-height: 25px;
        margin-bottom: 11px;
      }
    }

    .my-tabs {
      /deep/ .ant-spin-container {
        padding-bottom: 20px;
        padding-top: 5px;
      }
      /deep/ .ant-card-body {
        padding: 0;
      }
      /deep/ .ant-tabs-bar {
        background-color: #ebecf7;
      }
      /deep/ .ant-tabs-nav-container {
        margin-top: 0;

      }
      /deep/ .ant-tabs-tab {
        font-size: 18px;
        color: @main-font-color;
      }
      .ant-btn {
        background-color: #ebecf7;
        border-color: #ebecf7;
        box-shadow: none;
        color: #898989;
        margin-top: 10px;
        font-size: 14px;
      }
      .ant-btn:hover {
        color: @main-color;
      }
      /deep/ .ant-tabs-ink-bar {
        margin-left: 15px;
        width: 72px !important;
      }
      .ant-list-item {
        padding: 0 15px 3px;
        border: none;
        cursor: pointer;

      }
      .title-p {
        font-size: 14px;
        line-height: 14px;
        width: 80%;
        word-wrap: break-word;
        word-break: break-all;
        padding-right: 10px;
      }
      .time-p {
        font-size: 12px;
        line-height: 12px;
        color: #A2A2A2;
        padding-top: 2px;
        width: 20%;
      }
      .ant-list-item:hover {
        color: @main-color;

      }
      /deep/ .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-nav .ant-tabs-tab:hover {
        color: @main-color;
      }
      /deep/ .ant-tabs-ink-bar {
        background-color: @main-color;
      }
      /deep/ .ant-tabs-tab-active, .ant-tabs-tab {
        margin-right: 15px;
      }
      /deep/ .ant-tabs-nav .ant-tabs-tab {
        margin-right: 15px;
      }
      /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
        color: @main-color;
      }
    }
    .anticon-right {
      margin-left: 0;
    }

    .row-card {
      text-align: center;
      max-width: 100px
    }
    .row-img {
      height: 87px;
      width: 87px
    }
    .card-span {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }

</style>