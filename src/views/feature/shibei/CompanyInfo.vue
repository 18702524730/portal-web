<template>
    <div class="companyportraitlist">
        <div class="comWidth">
            <div class="topresult">
                <h3 class="result">创新主体画像详情</h3>
                <div class="search">
                    <el-input placeholder="请输入企业名称、统一社会信用代码" v-model="enterpriseName" >
                        <el-button class="bluebtn" type="primary" slot="append" @click="search()">搜索</el-button>
                    </el-input>
                </div>
            </div>
            <div class="companyinfobox">
                <div class="companyinfo">
                    <h3>{{info.enterpriseName}}</h3>
                    <p>统一社会信用代码：{{info.creditCode}}</p>
                    <p>组织机构代码：{{info.orgCode}}</p>
                    <p>法定代表人：{{info.legalPerson}}</p>
                    <p>经营范围：{{info.businessScope}}</p>
                </div>
                <div>
                    <div class="pingjia" @click="toevaluation">查看创新主体评价</div>
                    <div class="xinyong" @click="tocredit">查看创新主体信用</div>
                </div>
            </div>
            <div class="searchdetail">
                <div class="sortsbox">
                    <!-- <h3>排序</h3> -->
                    <div class="sortsbtn">
                    <span
                        v-for="(item, k) in sorts"
                        :key="k"
                        @click="changesort(item)"
                        :class="{ active: item.id === sortsnow }"
                        >{{ item.label }}</span
                    >
                    </div>
                </div>
                <div class="commonconts" v-if="sortsnow === 2" key="a">
                    <ul class="leftnav">
                    <li
                        v-for="(item, key) in plist"
                        :key="key"
                        @click="changeleft(item)"
                        :class="{ active: item.key === leftcur }"
                    >
                        {{ item.title }}
                    </li>
                    </ul>
                    <div class="rightcharts" >
                    <div id="ringchart" class="ring"></div>
                    <!-- <span class="zongshu">{{ringtotal}}件</span> -->
                    </div>
                </div>
                <div class="devteam" v-if="sortsnow === 1" key="d">
                    <h3 class="teamtitle">热点标签</h3>
                    <div class="hotmark">
                        <span v-for="(it, index) in labels" :key="index">{{it}}</span>
                    </div>
                    <h3 class="teamtitle">主要发明人专利申请情况</h3>
                    <div class="teamintr">
                    {{`选取${info.enterpriseName}公开专利涉及最多的10个发明人。`}}
                    </div>
                    <div id="specbarchart" class="specbar">

                    </div>
                    <div class="headbox">
                        <span class="xuhao">序号</span>
                        <span class="leixing">IPC</span>
                        <span class="jianshu">专利申请件数</span>
                    </div>
                    <ul class="fieldlist" v-if="expertiseArea.length">
                        <li v-for="item in expertiseArea" :key="item.id" class="clearfix">
                            <span class="xuhao">{{item.seqNo}}</span>
                            <span class="leixing">{{item.field}}</span>
                            <span class="jianshu">{{`${item.count}件`}}</span>
                        </li>
                    </ul>
                </div>
                <!-- <div class="industryfield" v-if="sortsnow === 3" key="e">
                    <div class="headbox">
                        <span class="xuhao">序号</span>
                        <span class="jianshu">处罚决定日期</span>
                        <span class="jianshu">决定书文号</span>
                        <span class="jianshu">行政处罚内容</span>
                        <span class="jianshu">决定机关</span>
                    </div>
                    <ul class="fieldlist" v-if="entrustAgency.length">
                        <li v-for="item in entrustAgency" :key="item.id" class="clearfix">
                            <span class="xuhao">{{item.seqNo}}</span>
                            <span class="jianshu">{{`件责令改正，并处以罚款贰万元（￥20000.00）整。`}}</span>
                            <span class="jianshu">{{`件责令改正，并处以罚款贰万元（￥20000.00）整。`}}</span>
                            <span class="jianshu">{{`件责令改正，并处以罚款贰万元（￥20000.00）整。`}}</span>
                            <span class="jianshu">{{`件责令改正，并处以罚款贰万元（￥20000.00）整。`}}</span>
                        </li>
                    </ul>
                    <div class="nodatabox" v-if="!entrustAgency.length">暂无数据</div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
const detailUrl = '/api/queryEnterprisePortraitDetail/{assessId}'
export default {
    data() {
        return {
            pgIndex: 1,
            pgCount: 10,
            total: 0,
            loading: false,
            dataList: [],
            sortsnow: 1,
            intrshow: false,
            // 优势图谱
            coApplicant: [],
            transfer: [],
            permit: [],
            pledge: [],
            // 行业状况
            rdteamx: [],
            rdteamfm: [],
            rdteamsy: [],
            rdteamwg: [],
            expertiseArea: [],
            sorts: [
                { id: 1, label: '行业状况' },
                { id: 2, label: '优势图谱' }
                // { id: 3, label: '风险提示' }
            ],
            cur: 'zl',
            assessId: null,
            enterpriseName: '',
            srlist: [],
            xklist: [],
            zqlist: [],
            leftcur: 1,
            ringtypea: [],
            ringtypeb: [],
            ringtypec: [],
            ringtyped: [],
            plist: [
                {
                title: '技术合作',
                key: 1
                },
                {
                title: '技术转让',
                key: 2
                },
                {
                title: '技术许可',
                key: 3
                },
                {
                title: '专利质押',
                key: 4
                }
            ],
            labels: [],
            info: {
                enterpriseName: '',
                businessScope: '',
                creditCode: '',
                legalPerson: '',
                orgCode: ''
            },
            bartitle: '专利申请',
            query: {}
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
  },
  methods: {
    search() {
      if (!this.enterpriseName) {
        this.$messagesebe.warning('请输入企业名称、统一社会信用代码查询')
        return
      }
      this.$router.push({ name: 'CompanyPortraitList', params: { cn: this.enterpriseName } })
    },
    toevaluation() {
      const url = `/portal/innovate/company-evaluationinfo/${this.assessId}`
      window.open(url)
      // this.$router.push({ name: 'CompanyEvaluationInfo', params: { id: this.assessId } })
    },
    tocredit() {
      const url = `/portal/innovate/company-creditinfo/${this.assessId}`
      window.open(url)
      // this.$router.push({ name: 'CompanyCreditInfo', params: { id: this.assessId } })
    },
    selected(it, tp) {
      this[tp + 'now'] = it.id
    },
    changesort(it) {
      this.sortsnow = it.id
      if (this.sortsnow === 1) {
        this.leftcur = 1
      }
    },
    changecur(tp) {
      this.cur = tp
    },
    changeleft(it) {
      this.leftcur = it.key
    },
    getdetail() {
      this.loading = true
      this.$shttp.get(detailUrl.replace('{assessId}', this.assessId)).then(resp => {
          this.loading = false
          this.info = resp
          this.labels = resp.labels
          const useConvert = resp.useConvert
          const rdteam = resp.rdTeam
          const expertiseArea = resp.expertiseArea
          const hzlist = useConvert.coApplicant || []
          const zrlist = useConvert.transfer || []
          const xklist = useConvert.permit || []
          const zylist = useConvert.pledge || []
          this.expertiseArea = expertiseArea || []
          if (rdteam.length) {
            rdteam.forEach(item => {
              this.rdteamx.push(item.inventor)
              this.rdteamfm.push(item.inventCount)
              this.rdteamsy.push(item.utilityCount)
              this.rdteamwg.push(item.appearCount)
            })
          }
          if (hzlist.length) {
            hzlist.forEach(item => {
              this.coApplicant.push({
                name: item.field,
                value: item.count,
                collapsed: null
              })
            })
          }
          if (zrlist.length) {
            zrlist.forEach(item => {
              this.transfer.push({
                name: item.field,
                value: item.count,
                collapsed: null
              })
            })
          }
          if (xklist.length) {
            xklist.forEach(item => {
              this.permit.push({
                name: item.field,
                value: item.count,
                collapsed: null
              })
            })
          }
          if (zylist.length) {
            zylist.forEach(item => {
              this.pledge.push({
                name: item.field,
                value: item.count,
                collapsed: null
              })
            })
          }
          if (this.sortsnow === 2) {
            this.ringschange()
          }
          if (this.sortsnow === 1) {
              this.createSpecBar()
          }
        })
        .catch(err => {
          this.loading = false
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    createTree(itemdata) {
      var ringOption = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: '{b}:{c}'
        },
        series: [
          {
            name: '企业名称',
            // layout: 'radial',
            type: 'tree',
            symbolSize: 7,
            left: '40%',
            right: '40%',
            top: '10%',
            bottom: '10%',
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 14
            },
            leaves: {
                label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                }
            },
            data: [
              {
                name: this.info.enterpriseName,
                value: '',
                collapsed: null,
                children: itemdata
              }
            ]
          }
        ]
      }

      var ringCharts = echarts.init(document.getElementById('ringchart'))
      ringCharts.setOption(ringOption)
    },
    createSpecBar() {
      var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['外观设计', '实用新型', '发明']
        },
        // color: ['#5D7092', '#5AD8A6', '#5B8FF9'],
        grid: {
            left: '5%',
            right: '5%',
            bottom: '6%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                  show: false // 取消刻度
                },
                axisLine: {
                  show: false, // 取消坐标轴
                  lineStyle: {
                    color: '#A0A4AA'
                    // width:'2'
                  }
                },
                data: this.rdteamx
                // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '天天', '超然', '不大']
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                  show: false // 取消刻度
                },
                axisLine: {
                  show: false, // 取消坐标轴
                  lineStyle: {
                    color: '#A0A4AA'
                    // width:'2'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#f4f4f4'
                  }
                  // show: false
                }
            }
        ],
        series: [
            {
                name: '外观设计',
                type: 'bar',
                stack: 'true',
                barWidth: 50,
                color: '#5D7092',
                data: this.rdteamwg
                // data: [320, 332, 301, 334, 390, 330, 320, 980, 630, 500]
            },
            {
                name: '实用新型',
                type: 'bar',
                stack: 'true',
                color: '#5AD8A6',
                barWidth: 50,
                data: this.rdteamsy
                // data: [120, 132, 101, 134, 90, 230, 210, 400, 600, 500]
            },
            {
                name: '发明',
                type: 'bar',
                stack: 'true',
                color: '#5B8FF9',
                barWidth: 50,
                data: this.rdteamfm
                // data: [220, 182, 191, 234, 290, 330, 310, 300, 700, 620]
            }

        ]
      }
      var specbar = echarts.init(document.getElementById('specbarchart'))
      specbar.setOption(option)
    },
    ringschange() {
      if (this.leftcur === 1) {
        this.createTree(this.coApplicant)
      }
      if (this.leftcur === 2) {
        this.createTree(this.transfer)
      }
      if (this.leftcur === 3) {
        this.createTree(this.permit)
      }
      if (this.leftcur === 4) {
        this.createTree(this.pledge)
      }
    }
  },
  created() {
    const now = this.$route.query.cur || 1
    this.sortsnow = now - 0
    this.assessId = this.$route.params.id

  },
  watch: {
    sortsnow() {
      if (this.sortsnow === 2) {
        this.$nextTick(() => {
          this.ringschange()
        })
      }
      if (this.sortsnow === 1) {
        this.$nextTick(() => {
          this.createSpecBar()
        })
      }
      this.$router.replace({ query: { cur: this.sortsnow } })
    },
    leftcur() {
      this.ringschange()
    }
  },
  mounted() {
    this.getdetail()
  }
}
</script>

<style lang="less" scoped>
.companyportraitlist {
    background-color: #f5f5f5;
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .comWidth {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 30px;
    }
    .topresult {
        padding: 24px 0 30px;
        overflow: hidden;
        .result {
            float: left;
            line-height: 40px;
            font-size: 18px;
            color: #333;
            font-weight: 600
        }
        .search {
            float: right;
            width: 350px;
            .bluebtn {
                background-color: #2F72D1;
                color: #fff;
                border: none;
                border-radius: 0;
            }
        }
    }
    .companyinfobox {
        display: flex;
        padding: 18px 54px 0 24px;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 14px;
        color: #333;
        line-height: 20px;
        background-color: #fff;
        .companyinfo {
            max-width: 900px;
            margin-bottom: 15px;
            > h3 {
                font-size: 18px;
                color: #333;
                line-height: 25px;
                margin-bottom: 20px;
                font-weight: 600;
            }
            > p {
                margin-bottom: 9px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        .xinyong,
        .pingjia {
            width: 160px;
            height: 38px;
            line-height: 38px;
            text-align: center;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }
        .pingjia {
            margin-bottom: 16px;
            background-color: #6198E7;
        }
        .xinyong {
            background-color: #2F72D1;
        }
    }
    .nosearchdata {
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-color: #fff;
        color: #666;
    }
    .searchdetail {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        background-color: #fff;
        padding: 0 24px;
        .sortsbox {
            padding: 16px 0;
            border-bottom: 1px solid #f5f5f5;
            .sortsbtn {
                font-size: 0;
                > span {
                display: inline-block;
                height: 34px;
                margin-right: 30px;
                padding: 0 12px;
                line-height: 34px;
                font-size: 14px;
                color: #333;
                cursor: pointer;
                }
                span.active {
                background-color: #2f72d1;
                color: #fff;
                }
            }
        }
        .commonconts {
            overflow: hidden;
            padding: 24px 0;
            background-color: #fff;
            .leftnav {
                float: left;
                padding-top: 26px;
                margin-right: 270px;
                > li {
                    height: 52px;
                    width: 158px;
                    margin-bottom: 30px;
                    line-height: 52px;
                    text-align: center;
                    cursor: pointer;
                    color: #333;
                    font-size: 16px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    &.active {
                        background-color: #6198e7;
                        color: #fff;
                    }
                }
            }
            .rightcharts {
                position: relative;
                float: left;
                height: 100%;
                .ring {
                width: 500px;
                height: 500px;
                }
                .zongshu {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 160px;
                height: 160px;
                margin-left: -80px;
                margin-top: -80px;
                border-radius: 50%;
                font-size: 22px;
                color: #333;
                line-height: 160px;
                text-align: center;
                overflow: hidden;
                }
            }
        }
        .industryfield {
            padding: 24px;
            background-color: #fff;
            .headbox {
                height: 52px;
                line-height: 52px;
                background-color: #6198E7;
                color: #fff;
            }
            .xuhao {
                float: left;
                width: 20%;
                text-align: center;
            }
            .jianshu {
                float: left;
                width: 20%;
                text-align: center;
            }
            .fieldlist {
                margin-bottom: 20px;
                border: 1px solid #F2F2F2;
                border-top: none;
                > li {
                    color: #333;
                    .xuhao {
                        padding: 16px 20px;
                        line-break: 20px;
                    }
                    .jianshu {
                        padding: 16px 20px;
                        line-height: 20px;
                    }
                }
            }
        }
        .devteam {
            padding: 24px;
            background-color: #fff;
            .hotmark {
                margin-bottom: 30px;
                overflow: hidden;
                > span {
                    float: left;
                    padding: 5px 10px;
                    border: 1px solid #2F72D1;
                    color: #2F72D1;
                    border-radius: 2px;
                    margin-right: 15px;
                }
            }
            .teamtitle {
                margin-bottom: 12px;
                line-height: 25px;
                color: #333;
                font-size: 18px;
                font-weight: 600
            }
            .teamintr {
                margin-bottom: 36px;
                line-height: 20px;
                font-size: 14px;
                color: #333;
            }
            .specbar {
                height: 560px;
            }
            .headbox {
                height: 52px;
                margin-top: 70px;
                line-height: 52px;
                background-color: #6198E7;
                color: #fff;
            }
            .xuhao {
                float: left;
                width: 20%;
                text-align: center;
            }
            .leixing {
                float: left;
                width: 60%;
                text-align: center;
            }
            .jianshu {
                float: left;
                width: 20%;
                text-align: center;
            }
            .fieldlist {
                margin-bottom: 20px;
                border: 1px solid #F2F2F2;
                border-top: none;
                > li {
                    height: 52px;
                    line-height: 52px;
                    color: #333;
                }
            }
        }
        .searchdatas {
        padding-bottom: 20px;
        > li {
            height: 112px;
            padding: 24px;
            background-color: #fff;
            margin-bottom: 10px;
            cursor: pointer;
            &:hover {
            background-color: #eff1ff;
            }
        }
        .eachtitle {
            float: left;
            width: 400px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 64px;
            font-size: 18px;
            color: #333;
            font-weight: 600;
        }
        .allnum {
            float: left;
            width: 240px;
        }
        .ipnum {
            float: left;
            width: 240px;
        }
        .ipsqnum {
            float: left;
            width: 240px;
        }
        .nums {
            font-size: 30px;
            color: #2f72d1;
            line-height: 34px;
        }
        .names {
            font-size: 16px;
            line-height: 30px;
            color: #333;
        }
        .eachcont {
            display: inline-block;
            width: 180px;
            text-align: center;
        }
        }
    }
}
</style>

