<template>
  <div id="trainOfflineDetailsPage">
    <a-spin :spinning="spinning">
      <div class="container">
        <a-breadcrumb separator=">" class="my-breadcrumb">
          <a-breadcrumb-item>
            <router-link :to="{name:'TrainMessage'}">培训信息</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="{name:'TrainOffline',query:{keyRoute:'TrainMessage'}}">沙龙活动</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            活动详情
          </a-breadcrumb-item>
        </a-breadcrumb>

        <a-row :gutter="16">
          <a-col :span="16">
            <a-card>
              <h2>
                <span
                  style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 2;">
                    <a-tooltip :title="offlineSalon.title">{{ offlineSalon.title }}</a-tooltip>
                </span>
              </h2>
              <h3 class="main-train-h3">活动介绍</h3>
              <div class="my-content">
                <div v-html="offlineSalon.content"
                     style="white-space: pre-wrap;word-break: break-all;overflow-x: auto"></div>
              </div>

              <h3 class="main-train-h3">活动时间</h3>
              <div class="my-content">
                <div>{{ offlineSalon.beginDate }}</div>
              </div>

              <h3 class="main-train-h3">活动地点</h3>
              <div class="my-content">
                <div>{{ offlineSalon.activityAddress }}</div>
              </div>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-row>
              <a-card>
                <a-row class="my-btn-group">
                  <a-button :disabled="!canApply" class="my-btn" size="large" type="primary" @click="applyBtn"
                            v-if="!alreadyApply">{{
                    canApply?
                    '立即报名':'活动已结束'}}
                  </a-button>

                  <a-button v-else :disabled="true" class="my-btn" size="large" type="primary">已报名</a-button>
                </a-row>
                <a-row class="time-go">
                  <a-row type="flex" justify="center" align="middle">
                    <a-col>
                      报名倒计时：
                    </a-col>

                    <a-statistic-countdown v-model="endTime"
                                           format="D 天 H 时 m 分 s 秒" :valueStyle="[canApply?valueStyle:'']"
                                           @finish="onFinish">

                    </a-statistic-countdown>
                  </a-row>
                </a-row>
              </a-card>
            </a-row>
            <a-row>
              <a-card>
                <h3 class="main-train-h3">已报名用户</h3>
                <a-row class="my-content" type="flex" v-for="(outItem,outIndex) in item.userRecord" :key="outIndex">
                  <a-col style="width: 20%;text-align: center" v-for="(item,index) in outItem" :key="item.id">
                    <a-row>
                      <a-avatar :size="46" :src="getImgView(item.avatar)" v-if="item.avatar"/>
                      <a-avatar :size="46" icon="user" v-else/>
                    </a-row>
                    <a-row>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                        <a-tooltip :title="item.realname">{{item.realname}}</a-tooltip>
                      </span>
                    </a-row>
                  </a-col>
                </a-row>
              </a-card>
            </a-row>
            <a-row>
              <a-card>
                <h3 class="main-train-h3">近期活动</h3>

                <ul v-if="item.recentOfflineSalonList" class="my-content">
                  <li v-for="(innerItem,innerIndex) in item.recentOfflineSalonList" :key="innerItem.id"
                      @click="liBtn(innerItem)">
                    <a-tooltip style="-webkit-box-orient: vertical;"
                               class="span-data" :title="innerItem.title">
                      {{innerItem.title}}
                    </a-tooltip>
                  </li>
                </ul>
              </a-card>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </a-spin>
    <train-offline-apply-modal ref="applyModal" @func="loadData"></train-offline-apply-modal>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { changeArr, judgeState } from '@/utils/util'
  import TrainOfflineApplyModal from './TrainOfflineApplyModal'
  import { mapGetters } from 'vuex'
  import { judgmentBrowser } from '@/utils/role'
  import moment from 'moment'

  export default {
    name: 'TrainOfflineDetailsPage',
    components: { TrainOfflineApplyModal },
    data() {
      return {
        item: {},
        offlineSalon: {},
        url: '/zscq/portal/training/offlineSalonDetail',
        valueStyle: { color: '#2f72d1', fontSize: '14px' },
        canApply: true,
        spinning: false,
        endTime: '',

        alreadyApply: false,
        userId: ''
      }
    },
    created() {
      this.loadData()
    },
    mounted() {

    },
    methods: {
      ...mapGetters(['userInfo']),
      applyBtn() {
        this.$refs.applyModal.showModal(this.$route.query.itemId)
      },
      onFinish() {
        this.canApply = false
        console.info('1123')
      },
      async loadData() {
        this.spinning = true
        if (judgeState()) {
          this.userId = this.userInfo().id
        } else {
          this.userId = ''
        }
        const res = await getActionUpdateKeyword(this.url, { id: this.$route.query.itemId, userId: this.userId })
        if (res.success) {
          this.item = res.result
          this.alreadyApply = this.item.isRegistration
          this.offlineSalon = this.item.offlineSalon
          this.item.userRecord = changeArr(this.item.userRecord, 5)
          console.info(this.offlineSalon.endDate)
          let time = this.offlineSalon.endDate
          if (!judgmentBrowser()) {
            time = moment(time).format('YYYY/MM/DD HH:mm:ss')
          }
          console.info(time)
          const endDate = new Date(time).getTime()
          this.endTime = endDate
          if (Date.now() >= endDate) {
            this.canApply = false
          } else {
            this.canApply = true
          }
        } else {
          this.$message.warning(res.message)
        }
        console.info(res)
        console.info('hahaha')
        this.spinning = false
      },
      getImgView(text) {
        if (!text) {
          return require('../../../assets/img/user.png')
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      liBtn(item) {
        this.$router.push({ query: { itemId: item.id, keyRoute: 'TrainMessage' } })
        this.loadData()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";
  @import "index";

  #trainOfflineDetailsPage {
    .main-css();
    background-color: @main-bg-color;
    overflow: hidden;
    margin-top: 2px;
    color: #555555;
    .ant-card {
      margin-bottom: 10px;
    }
    /deep/ .ant-card-body {
      padding: 24px 12px;
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
    h2 {
      font-size: 28px;
      color: #555555;
      margin-bottom: 30px;
    }
    ul {
      padding: inherit;
      li {
        list-style: inherit;
        line-height: 30px;
      }
    }
    .my-content {
      padding: 10px 20px;
    }
    .time-go {
      font-size: 14px;
    }
    .my-btn-group {
      text-align: center;
      margin-bottom: 20px;
      .my-btn {
        width: 80%;
        border-radius: 10px;
      }
    }
    li {
      list-style: inherit;
      cursor: pointer;
    }
  }
</style>