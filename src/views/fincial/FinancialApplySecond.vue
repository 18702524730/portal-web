<template>
  <div id="financialApplySecond">
    <a-spin size="large" :spinning="loading">
      <div class="companyevaluation">
        <div class="topsearch">
          <div class="topsearchtitle">
            <h3>{{info.enterpriseName}}</h3>
            <div class="indicators" @mouseover="intrshow = true" @mouseout="intrshow = false" v-if="info.techIndex">
              <span>企业科技指标：{{ info.techIndex }}</span>
              <i class="infos">i</i>
              <div class="intrs" v-show="intrshow" @mouseover="intrshow = true" @mouseout="intrshow = false">
                <p v-for="(it, k) in intrlist" :key="k">{{ it }}</p>
              </div>
            </div>
            <!--<div class="companyname">-->
              <!--<el-input placeholder="请输入厦门企业名称检索" v-model="enterpriseName">-->
                <!--<el-button slot="append" class="bluebtn" @click="search">搜索</el-button>-->
              <!--</el-input>-->
            <!--</div>-->
          </div>
          <div class="searchconts">
            <div class="overview">
              <h3><span>专利情况总览</span><span class="new">最新</span></h3>
              <!--<div class="viewmsg">-->
                <!--<span @click="toPortrait">查看创新主体画像</span>-->
                <!--<span @click="toCredit">查看创新主体信用信息</span>-->
              <!--</div>-->
            </div>
            <div class="viewcont">
              <div class="itemallnum" :class="{ active: cur === 'zl' }" @click="changeCur('zl')">
                <h3>{{zltotal}}</h3>
                <p>申请专利总量</p>
              </div>
              <div class="itemallnum" :class="{ active: cur === 'sq' }" @click="changeCur('sq')">
                <h3>{{sqtotal}}</h3>
                <p>授权专利总量</p>
              </div>
              <div class="echartsmsg">
                <div class="echartsbox">
                  <!-- <h3>专利申请</h3> -->
                  <div id="barChart" class="barbox"></div>
                </div>
                <ul class="eachdata">
                  <li class="headli">数量</li>
                  <li v-for="(item, key) in ptotal" :key="item + key">{{item}}</li>
                </ul>
                <ul class="eachdata">
                  <li class="headli">百分比</li>
                  <li v-for="(item, key) in percent" :key="item + key">{{item | toPercent}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a-row class="my-bottom-btn">
        <a-button @click="backPage">上一步</a-button>
        <a-button type="primary" @click="nextPage">下一步</a-button>
      </a-row>
    </a-spin>


  </div>
</template>

<script>
  import echarts from 'echarts'
  import { getActionUpdateKeyword } from '@/api/manage'

  const detailUrl = '/api/attiot/queryEnterpriseAssessDetailPart'

  export default {
    name: 'FinancialApplySecond',
    props: {
      portalPledgeOrder: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        intrlist: [
          '企业科技指标体系，以企业专利布局角度出发，涵盖创新力、竞争力、进化力、影响力四大因素，共计50余项指标综合得出。',
          '评级结果具体分为S、A、B、C共4个等级。',
          '其中，S级为卓越企业、A级为优秀企业、B级为一般企业、C级为相对较差企业。'
        ],
        item: {
          allNum: 0,
          fmNum: 0,
          syxxNum: 0,
          wgsjNum: 0
        },
        url: '/trusteeship/enterprisePatentStatis/querySelfEnterprisePatentStatis',
        loading: false,

        zltotal: 0,
        sqtotal: 0,

        viewdatax: [],
        viewdatay: [],
        viewdatad: [],
        viewdatap: [],
        sviewdatax: [],
        sviewdatay: [],
        sviewdatad: [],
        sviewdatap: [],
        ptotal: [],
        percent: [],
        cur: 'zl',
        bartitle: '专利申请',
        assessId: null,
        intrshow: false,
        info: {
          enterpriseName: '',
          techIndex: ''
        }
      }
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      toPortrait() {
        const url = `/portal/feature-service/company-portraitinfo/${this.assessId}`
        window.open(url)
      },
      toCredit() {
        const url = `/portal/feature-service/company-creditinfo/${this.assessId}`
        window.open(url)
      },
      changeCur(tp) {
        this.cur = tp
      },
      async loadData() {
        const res = await getActionUpdateKeyword(this.url)
        if (res.success) {
          if (res.result === null) {
            // 没有数据，则展示 0
            this.$message.error('未找到对应数据')
          } else {
            this.item = res.result
            this.getAssess()
          }
        } else {
          this.$message.error(res.message)
        }
        console.info(res)
        console.info('哈哈哈')
      },
      nextPage() {
        this.$emit('nextPage')
      },
      backPage() {
        this.$emit('backPage')
      },
      getPatentValue() {
        const myChart = echarts.init(document.getElementById('patentCost'))
        myChart.setOption({
          series: [
            {
              name: '专利价值',
              type: 'pie',
              radius: ['60%', '70%'],
              legendHoverLink: false,
              hoverAnimation: false,
              selectedOffset: 0,
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'center',
                fontSize: '25',
                color: '#1890ff',
                fontWeight: 'bold'
              },
              labelLine: {
                show: false
              },
              data: [
                {
                  value: 100,
                  name: this.patentNum,
                  selected: true,
                  itemStyle: {
                    color: '#1890ff'
                  }
                }
              ]
            }
          ]
        })
      },
      getAssess() {
        const that = this
        const myChart = echarts.init(document.getElementById('patentAccess'))
        myChart.setOption({
          series: [
            {
              name: '综合评估',
              type: 'pie',
              radius: ['60%', '70%'],
              legendHoverLink: false,
              hoverAnimation: false,
              selectedOffset: 0,
              selectedMode: 'single',
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '25',
                  fontWeight: 'bold'
                }
              },
              data: [
                {
                  value: that.item.allNum,
                  name: that.item.allNum,
                  selected: true
                },
                {
                  value: that.item.fmNum,
                  name: that.item.fmNum
                },
                {
                  value: that.item.syxxNum,
                  name: that.item.syxxNum
                },
                {
                  value: that.item.wgsjNum,
                  name: that.item.wgsjNum
                }
              ]
            }
          ]
        })
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0
        })
        let index = 0
        myChart.on('mouseover', function(e) {
          if (e.dataIndex !== index) {
            myChart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: index
            })
          }
        })
        myChart.on('mouseout', function(e) {
          index = e.dataIndex
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: e.dataIndex
          })
        })
      },

      search() {
        if (!this.enterpriseName) {
          this.$message.warning('请输入企业名称查询')
          return
        }
        this.$router.push({ name: 'CompanyEvaluation', query: { enterpriseName: this.enterpriseName } })
      },
      async getDetail() {
        this.loading = true
        const res = await getActionUpdateKeyword('/org/orgView/getOrg')
        const param = {
          accessKey: '56c65ee39a71474db09d4ea01d996898',
          enterpriseName: res.data.name
        }
        this.$shttp.get(detailUrl, { params: param }).then(resp => {
          console.info('eeeeee')
          console.info(resp)
          this.loading = false
          this.info = resp
          this.assessId = resp.assessId
          const parr = resp.patentOverview
          const parrx = []
          const parry = []
          const parrp = []
          const parrd = []
          const sparrx = []
          const sparry = []
          const sparrp = []
          const sparrd = []
          parr.forEach(item => {
            if (item.type === 1) {
              this.zltotal = item.totalCount
              if (item.patentType === 1) {
                parrx.unshift('发明专利')
              }
              if (item.patentType === 2) {
                parrx.unshift('实用新型')
              }
              if (item.patentType === 3) {
                parrx.unshift('外观专利')
              }
              parry.unshift(item.count)
              parrd.push(item.count)
              parrp.push(item.percentage)
            }
            if (item.type === 2) {
              this.sqtotal = item.totalCount
              if (item.patentType === 1) {
                sparrx.unshift('发明专利')
              }
              if (item.patentType === 2) {
                sparrx.unshift('实用新型')
              }
              if (item.patentType === 3) {
                sparrx.unshift('外观专利')
              }
              sparry.unshift(item.count)
              sparrd.push(item.count)
              sparrp.push(item.percentage)
            }
          })

          this.viewdatax = parrx
          this.viewdatay = parry
          this.viewdatap = parrp
          this.viewdatad = parrd

          this.sviewdatax = sparrx
          this.sviewdatay = sparry
          this.sviewdatap = sparrp
          this.sviewdatad = sparrd
          this.ptypeChange()
        })
          .catch(err => {
            console.info(err)
            this.loading = false
            this.$message.error('暂未获取到信息')
          })

      },
      createBar(datax, datay) {
        const barChartOption = {
          title: {
            text: this.bartitle,
            left: 0,
            top: 0,
            textStyle: {
              align: 'left',
              fontSize: 14,
              color: '#333'
            }
          },
          // color: ['#5B8FF9'],
          tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c}',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: 0,
            right: 30,
            top: 26,
            bottom: 10,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            position: 'top',
            // boundaryGap: false,
            axisTick: {
              show: false // 取消刻度
            },
            splitLine: {
              lineStyle: {
                color: '#f4f4f4'
              }
              // show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false, // 取消坐标轴
              lineStyle: {
                color: '#A0A4AA'
                // width:'2'
              }
            }
          },
          yAxis: {
            type: 'category',
            //   boundaryGap: false,
            data: datax,
            // data: ['外观设计', '实用新型', '发明专利'],
            // show: false,
            //   axisLabel: {
            //     show: false
            //   },
            axisLine: {
              show: false, // 取消坐标轴
              lineStyle: {
                color: '#A0A4AA'
                // width: '2'
              }
            },
            axisTick: {
              show: false // 取消刻度
            }
          },
          series: [
            {
              name: '订单数',
              type: 'bar',
              barWidth: 20,
              barGap: 20,
              barCategoryGap: 20,
              itemStyle: {
                normal: {
                  // label: {
                  //     show: true,
                  //     position: 'right',
                  //     textStyle: {
                  //         color: '#000'
                  //     }
                  // },
                  color: '#5B8FF9'
                }
              },
              emphasis: {
                color: '#5B8FF9'
              },
              data: datay
              // data: [300, 160, 500]
            }
          ]
        }
        const barChart = echarts.init(document.getElementById('barChart'))
        barChart.setOption(barChartOption)
        window.onresize = function() {
          barChart.resize()
        }
      },
      ptypeChange() {
        if (this.cur === 'zl') {
          this.ptotal = this.viewdatad
          this.percent = this.viewdatap
          this.bartitle = '专利申请'
          this.createBar(this.viewdatax, this.viewdatay)
        }
        if (this.cur === 'sq') {
          this.ptotal = this.sviewdatad
          this.percent = this.sviewdatap
          this.bartitle = '授权专利'
          this.createBar(this.sviewdatax, this.sviewdatay)
        }
      }
    },
    computed: {
      patentNum() {
        if (JSON.stringify(this.portalPledgeOrder) !== '{}') {
          return this.portalPledgeOrder.portalPledgePatents.length
        } else {
          return 0
        }
      }
    },
    filters: {
      toPercent(num) {
        if (!num) {
          return 0
        }
        let str = Number(num * 100).toFixed(2)
        str += '%'
        return str
      }
    }
  }
</script>

<style scoped lang="less">
  #financialApplySecond {
    .my-bottom-btn {
      margin-top: 20px;
      text-align: center;
      .ant-btn {
        width: 150px;
        margin: 10px;
      }
    }
    #patentCost, #patentAccess {
      width: 100%;
      height: 220px;
    }
    /deep/ .ant-card-body {
      padding: 12px;
      text-align: center;
    }
    .ant-card {
      height: 400px;
    }
    .my-chart {
      margin-top: 50px;
      .my-content {
        height: 220px;
        color: #666666;
      }
      .my-content-two {
        height: 55px;
        color: #666666;
      }
    }
    .row-bottom {
      margin-top: 80px;
      font-size: 14px;
      color: #7f7f7f;
    }

    .companyevaluation {
      padding-bottom: 30px;
      font-family: 'PingFangSC-Semibold', 'PingFang SC';
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      h3,
      p {
        padding: 0;
        margin: 0;
      }
      .fr {
        float: right;
      }
      .topsearch {
        height: 400px;
        padding-top: 32px;
        background-image: url('../../assets/img/company.png');
        background-size: 100% 100%;
        background-color: #eee;
        .searchconts {
          width: 98%;
          height: 264px;
          margin-left: auto;
          margin-right: auto;
          padding: 20px 48px 20px 20px;
          background-color: #fff;
          .overview {
            height: 32px;
            margin-bottom: 20px;
            > h3 {
              float: left;
              font-size: 0;
              color: #333;
              line-height: 32px;
              > span {
                vertical-align: middle;
                font-size: 16px;
              }
              .new {
                display: inline-block;
                height: 18px;
                margin-left: 10px;
                padding: 0 10px;
                line-height: 16px;
                color: #2f72d1;
                border: 1px solid #2f72d1;
                border-radius: 8px;
                font-size: 12px;
              }
            }
            .viewmsg {
              float: right;
              text-align: center;
              > span {
                display: inline-block;
                width: 128px;
                height: 32px;
                line-height: 32px;
                border: 1px solid #2f72d1;
                margin-left: 12px;
                color: #2f72d1;
                font-size: 14px;
                vertical-align: middle;
                cursor: pointer;
              }
            }
          }
          .viewcont {
            height: 150px;
            .itemallnum {
              float: left;
              width: 220px;
              height: 100%;
              padding-top: 38px;
              border: 1px solid #2f72d1;
              margin-right: 20px;
              color: #2f72d1;
              cursor: pointer;
              text-align: center;
              &.active {
                background-color: #2f72d1;
                color: #fff;
                > h3 {
                  color: #fff;
                }
              }
              > h3 {
                line-height: 42px;
                font-size: 30px;
                font-weight: 500;
                margin-bottom: 8px;
                color: #2f72d1;
              }
              > p {
                font-size: 16px;
                line-height: 22px;
              }
            }
            .echartsmsg {
              height: 100%;
              float: right;
              .echartsbox {
                float: left;
                width: 220px;
              }
              .eachdata {
                float: left;
                margin-left: 60px;
                font-size: 12px;
                color: #a0a4aa;
                > li {
                  line-height: 17px;
                  margin-bottom: 20px;
                  &:last-child {
                    margin-bottom: 0;
                  }
                }
                .headli {
                  font-size: 16px;
                  color: #333;
                }
              }
            }
          }
        }
      }
    }
    .barbox {
      width: 100%;
      height: 150px;
    }

    .topsearchtitle {
      width: 98%;
      margin-left: auto;
      margin-right: auto;
      height: 42px;
      margin-bottom: 24px;
      > h3 {
        float: left;
        margin-right: 20px;
        line-height: 42px;
        font-size: 18px;
        color: #333;
        font-weight: 600;
      }
      .indicators {
        position: relative;
        top: 8px;
        float: left;
        height: 26px;
        padding: 0 10px;
        line-height: 26px;
        font-size: 14px;
        background-color: #2f72d1;
        color: #fff;
        cursor: pointer;
        .infos {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-left: 20px;
          border: 1px solid #fff;
          border-radius: 50%;
          color: #fff;
          font-style: normal;
          font-size: 14px;
          text-align: center;
          line-height: 16px;
        }
        .intrs {
          position: absolute;
          right: -338px;
          top: 0px;
          width: 340px;
          height: 200px;
          z-index: 2000;
          padding: 24px 24px;
          background: rgba(51, 51, 51, 0.8);
          color: #fff;
          > p {
            line-height: 20px;
            margin-bottom: 12px;
            font-size: 14px;
          }
        }
      }
      .companyname {
        float: right;
        width: 350px;
        .bluebtn {
          height: 40px;
          background-color: #2f72d1;
          color: #fff;
          border-radius: 0;
        }
      }
    }
  }
</style>