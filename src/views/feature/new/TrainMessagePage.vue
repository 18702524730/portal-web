<template>
  <div id="trainMessagePage">
    <carousel-map :full-screen="true" :loading="adLoading" :advert-list="advertList"></carousel-map>
    <div class="container">
      <recommend-organization :data="courseData" :loading="courseLoading" class="my-list" v-if="haveCourses"
                              style="background-color: #ffffff">
        <template slot="title">
          <a-row>
            <a-col :span="12"><h2 class="template-h">培训课程</h2></a-col>
            <a-col :span="12" class="template-img">
              <router-link :to="{name:'TrainCourse',query:{keyRoute:'TrainMessage'}}">
                <img src="@assets/images/navigation/more.png" alt="查看更多">
              </router-link>
            </a-col>
          </a-row>

          <a-row class="my-btn-group">
            <div>
              <a-button :type="`${value === 'approve'?'primary':''}`" @click="btnClick('approve')"
                        size="large">
                认证课程
              </a-button>
              <a-button :type="`${value === 'boutique'?'primary':''}`" @click="btnClick('boutique')"
                        size="large">
                精品课程
              </a-button>
              <a-button :type="`${value === 'public'?'primary':''}`" @click="btnClick('public')"
                        size="large">
                公开课
              </a-button>
            </div>
          </a-row>
        </template>
        <template slot="card" slot-scope="item">
          <train-activity-card :item="item.data" @func="loadCouresData(item.data.type)"></train-activity-card>
        </template>
      </recommend-organization>
    </div>
    <div class="offline">
      <div class="container">
        <recommend-organization :data="offlineData" :loading="courseLoading" class="my-list"
                                v-if="offlineData.length > 0">
          <template slot="title">
            <a-row>
              <a-col :span="12"><h2 class="template-h">沙龙活动</h2></a-col>
              <a-col :span="12" class="template-img">
                <router-link :to="{name:'TrainOffline',query:{keyRoute:'TrainMessage'}}">
                  <img src="@assets/images/navigation/more.png" alt="查看更多">
                </router-link>
              </a-col>
            </a-row>

          </template>
          <template slot="card" slot-scope="item">
            <offline-card :item="item.data"></offline-card>
          </template>
        </recommend-organization>
      </div>
    </div>

    <div class="container">
      <h2 class="my-center-header-h">培训信息</h2>
      <div>
        <policy-list :data="data" :loading="loading" :pagination="ipagination"
                     :key-route="'TrainMessage'"
                     route-name="TrainArticleMessage" message-title="" style="background-color: #ffffff"></policy-list>
      </div>
    </div>
  </div>
</template>

<script>
  import CarouselMap from '../../../components/CarouselMap'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, judgeState } from '@/utils/util'
  import RecommendOrganization from '../../../components/general/RecommendOrganization'
  import TrainActivityCard from '../../../components/new/card/TrainActivityCard'
  import PolicyList from '../../../components/general/PolicyList'
  import OfflineCard from '../../../components/new/card/OfflineCard'

  export default {
    name: 'TrainMessagePage',
    components: { OfflineCard, PolicyList, TrainActivityCard, RecommendOrganization, CarouselMap },
    data() {
      return {
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '7'
        },
        adLoading: false,
        advertList: [],

        haveCourses: true,
        courseUrl: '/zscq/portal/courseSearch',
        courseData: [],
        courseFormParam: {
          recommend: 1,
          pageSize: 4,
          current: 1,
          total: 0,
          type: '1'
        },
        courseLoading: {
          spinning: false
        },
        courseTimer: null,

        url: '/zscq/portal/informationList',
        formParam: {
          informationType: '4'
        },
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          spinning: false
        },
        data: [],

        value: 'approve',

        offlineUrl: '/zscq/portal/training/offlineSalonRecommendList',

        offlineData: [],
        offlineFormParam: {
          num: 4
        },
        offlineLoading: {
          spinning: false
        },
        offlineTimer: null

      }
    },
    created() {
      if (!judgeState()) {
        this.$router.push({ name: 'Home' })
        return false
      }
      this.getAllAdverts()
      this.loadOfflineData()
      this.loadAllCouresData()
      this.loadData(this.getParam(this.formParam, this.ipagination))
    },
    methods: {
      btnClick(a) {
        this.value = a
        let type = ''
        switch (a) {
          case 'approve':
            type = '1'
            break
          case 'boutique':
            type = '2'
            break
          case 'public':
            type = '3'
            break
        }
        this.loadCouresData(type)
      },
      loadData(param) {
        if (!this.url) {
          this.$message.error('url有问题!')
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = res.result.records
          }
          this.loading.spinning = false
        }).finally(() => {
          this.loading.spinning = false
        })
      },
      handleTableChange(page, key) {
        console.info(page)
        console.info('feng')
        this.ipagination.current = page
        this.loadData(this.getParam(this.formParam, this.ipagination))
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      getAllAdverts() {
        if (!this.adUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.adLoading = true
        getActionUpdateKeyword(this.adUrl, this.adParam).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
          this.adLoading = false
        }).finally(() => {
          this.adLoading = false
        })
      },
      async loadOfflineData() {
        this.offlineLoading.spinning = true
        const res = await getActionUpdateKeyword(this.offlineUrl, this.offlineFormParam)
        if (res.success) {
          this.offlineData = res.result
        }
        this.offlineLoading.spinning = false
      },
      async loadCouresData(type = '1') {
        this.courseLoading.spinning = true
        this.courseFormParam.type = type
        const res = await getActionUpdateKeyword(this.courseUrl, this.courseFormParam)
        if (res.success) {
          console.info(res)
          this.courseData = res.result.records
        }
        this.courseLoading.spinning = false
      },
      async loadAllCouresData() {
        this.courseLoading.spinning = true
        const res = await getActionUpdateKeyword(this.courseUrl, { recommend: 1 })
        if (res.success) {
          if (res.result.records.length > 0) {
            this.haveCourses = true
            this.loadCouresData()
          } else {
            this.haveCourses = false
          }
        }

        this.courseLoading.spinning = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../../components/main';

  #trainMessagePage {
    overflow: hidden;
    .main-css();

    .template-h {
      .main-css();
      margin-top: 2em;
      margin-bottom: 1em;
      color: #001833;
    }

    .template-img {
      margin-top: 3em;
      text-align: end;
      img {
        float: right;
      }
    }

    .offline {
      background-color: @main-bg-color;
      overflow: hidden;
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