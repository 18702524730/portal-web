<template>
  <div>
    <carousel-map :full-screen="true" :loading="adLoading" :advert-list="advertList"></carousel-map>
    <div id="tradingCenter">
      <a-row v-if="false">
        <div class="container my-trading">
          <h2 class="header-h">交易总览</h2>
          <a-row class="my-content-row">
            <a-col :span="6" class="my-content content-1">
              <p>
                交易总数
              </p>
              <p>
                {{ totalObj.all }}
              </p>
            </a-col>
            <a-col :span="6" class="my-content content-2">
              <p>
                项目交易数
              </p>
              <p>
                {{ totalObj.gyxm }}
              </p>
            </a-col>
            <a-col :span="6" class="my-content content-3">
              <p>
                专利交易数
              </p>
              <p>
                {{ totalObj.gyzl }}
              </p>
            </a-col>
            <a-col :span="6" class="my-content content-4">
              <p>
                商标交易数
              </p>
              <p>
                {{ totalObj.gysb }}
              </p>
            </a-col>
          </a-row>
        </div>
      </a-row>
      <a-row>
        <trading-dynamic class="my-center" :data="fiveArr"></trading-dynamic>
      </a-row>

      <a-row>
        <supply-information></supply-information>
      </a-row>

      <a-row>
        <demand-information></demand-information>
      </a-row>

      <div class="container" v-if="false">
        <recommend-organization :data="zoneData" :loading="zoneLoading" class="my-list"
                                style="background-color: #ffffff"
                                v-if="zoneData.length > 0">
          <template slot="title">
            <a-row>
              <a-col :span="12"><h2 class="template-h">项目专区</h2></a-col>
              <a-col :span="12" class="template-img">
                <router-link :to="{name:'ProjectZone'}">
                  <img src="@assets/images/navigation/more.png" alt="查看更多">
                </router-link>
              </a-col>
            </a-row>
          </template>
          <template slot="card" slot-scope="item">
            <message-one-card :item="item.data" :jump-state="false"></message-one-card>
          </template>
        </recommend-organization>
      </div>
    </div>
  </div>

</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import CarouselMap from '../../components/CarouselMap'
  import TradingDynamic from '../../components/table/TradingDynamic'
  import SupplyInformation from '../../components/card/SupplyInformation'
  import DemandInformation from '../../components/card/DemandInformation'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import MessageOneCard from '../../components/card/MessageOneCard'

  export default {
    name: 'TradingCenter',
    components: {
      MessageOneCard,
      RecommendOrganization,
      DemandInformation,
      SupplyInformation,
      TradingDynamic,
      CarouselMap
    },
    data() {
      return {
        platformList: [],
        menuList: [
          {
            key: 'first',
            title: '交易大厅',
            url: '#'
          },
          {
            key: 'second',
            title: '需求信息',
            url: '#'
          },
          {
            key: 'third',
            title: '供应信息',
            url: '#'
          }
        ],
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '6'
        },
        adLoading: false,
        advertList: [],

        totalUrl: '/zscq/portal/supplyTotal',
        totalObj: {},

        fiveRecordUrl: '/zscq/portal/lastestFiveRecords',
        fiveArr: [],

        zoneLoading: {
          spinning: false
        },
        zoneParam: {
          num: 4
        },
        zoneData: [],
        zoneUrl: '/zscq/portal/ipManage/projectLibraryRecommendList'
      }
    },
    created() {
      this.getAllAdverts()
      this.getTotal()
      this.getFiveRecord()
      this.getZone(this.getParam(this.zoneParam))
    },
    methods: {
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
      getTotal() {
        getActionUpdateKeyword(this.totalUrl).then((res) => {
          if (res.success) {
            this.totalObj = res.result

          }
        })
      },
      getFiveRecord() {
        getActionUpdateKeyword(this.fiveRecordUrl).then((res) => {
          if (res.success) {
            const arr = res.result
            // for (const a of arr) {
            //   a.name = {
            //     code: '',
            //     title: a.serviceName,
            //     src: ''
            //   }
            // }
            this.fiveArr = arr
          }
        })
      },
      getZone(param) {
        if (!this.zoneUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.zoneLoading.spinning = true
        getActionUpdateKeyword(this.zoneUrl, param).then((res) => {
          if (res.success) {
            this.zoneData = res.result.records
          }
          this.zoneLoading.spinning = false
        }).finally(() => {
          this.zoneLoading.spinning = false
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
  @import "../../components/main";

  .my-center {
    background: url("../../assets/images/financial/bg1.png") no-repeat;
    background-size: 100% 100%;
  }

  #tradingCenter {
    .main-css();
    .header-h {
      margin-top: 2em;
      margin-bottom: 1em;
      text-align: left;
      font-weight: 500;
      font-style: normal;
      font-size: 21px;
      line-height: 21px;
    }

    .content-1 {
      background: url('../../assets/images/icon_02.png') no-repeat;
      background-size: 100% 100%;
      height: 120px;
      position: relative;
    }
    .content-2 {
      background: url('../../assets/images/icon_03.png') no-repeat;
      background-size: 100% 100%;
      height: 120px;
      position: relative;
    }
    .content-3 {
      background: url('../../assets/images/icon_04.png') no-repeat;
      background-size: 100% 100%;
      height: 120px;
      position: relative;
    }
    .content-4 {
      background: url('../../assets/images/icon_05.png') no-repeat;
      background-size: 100% 100%;
      height: 120px;
      position: relative;
    }
    .my-content {
      text-align: center;
      font-family: '微软雅黑', sans-serif;
      span {
        font-weight: 400;
        color: #333333;
        font-size: 18px;
      }
      span:nth-child(2) {
        color: @main-color;
        font-weight: 700;
      }
      p{
        color: #ffffff;
        font-size: 16px;
        position: absolute;
      }
      p:nth-child(1){
        top:25px;
        left: 150px;
      }
      p:nth-child(2){
        font-weight: 900;
        font-size: 28px;
        top:50px;
        left: 150px;
      }
    }
    .my-trading {
      margin-bottom: 50px;
    }

    .template-h {
      margin-top: 2em;
      margin-bottom: 1em;
      color: #001833;
    }

    .template-img {
      margin-top: 3em;
      text-align: end;
    }

    .my-list {
      padding-bottom: 20px !important;
    }
  }
</style>