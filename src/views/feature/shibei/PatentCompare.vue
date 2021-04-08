<template>
<div class="patentcomparebox">
  <div class="patentevaluation" v-loading.fullscreen="loading" element-loading-text="专利价值评价中..." element-loading-background="rgba(0,0,0,0.4)">
    <div class=" media_w m_0_auto c_3">
      <div class="eval_search_container bgc_f pl_20 pr_20 clearfix">
        <div class="fl f16">
          <h3>专利价值评价对比<span style="font-size: 14px;color: #999;">{{`（${compareList.length}/4 您最多还可以添加${leftnum}条专利进行对比）`}}</span></h3>
        </div>
        <div class="eval_search_wrapper fr f14">
          <div v-if="keyFormatError" class="f12" style="margin-top: -20px;color: #f00;">
            请输入正确的专利公开号（格式："CN"+数字）
          </div>
          <input
            class="eval_search_input top_input_box pl_10 fl bgc_f5"
            placeholder="请输入专利公开号"
            v-model="searchKey"
          />
          <div
            class="eval_search_btn fl tc bgc_2080fb c_f"
            :class="{ btn_disable: searchResultState === 'loading' }"
            @click="searchHandle()"
          >
            添加对比
          </div>
        </div>
      </div>
      <div class="clearfix">
      <div class="itempatent mt_10" v-for="(item, index) in compareList" :key="index">
        <div class="bgc_f">
          <div class="f0 mb_10 h_34 pl_10 pr_10">
            <div class="d_lb v_m bgc_2080fb" style="width: 4px;height: 16px;"></div>
            <span class="lh_24 ml_10 v_m c_2080fb f16 mr_10">{{ item['patInfo']['patentName'] }}</span>
            <span class="delbtn" @click="del(index)">删除</span>
          </div>
          <div id="total_item_left" class="total_item_left pos_r">
            <div :id="'total' + index" class="w" style="height: 350px;"></div>
            <div class="pos_a w tc c_2080fb" style="top: 135px;font-size: 30px">
              <span>{{ item['totalScore'] }}</span
              >分
            </div>
          </div>
          <div class="total_item_right  pl_10 pr_10">
            <div class="lh_24 mt_30">
                <div class="f0 text_over">
                  <p class="d_lb v_m c_9 f14" style="min-width: 110px;">申请号</p>
                  <p class="d_lb v_m c_3 f14 text_over">
                    {{ item['patInfo']['applicantNo'] }}
                  </p>
                </div>
                <div class="f0 text_over">
                  <span class="d_lb v_m c_9 f14" style="min-width: 110px;">公开（公告）号</span>
                  <span class="d_lb v_m c_3 f14 text_over">{{
                    item['patInfo']['patentNo']
                  }}</span>
                </div>
                <div class="f0 text_over">
                  <p class="d_lb v_m c_9 f14" style="min-width: 110px;">申请日</p>
                  <p class="d_lb v_m c_3 f14 text_over">
                    {{ item['patInfo']['applicantDate'] }}
                  </p>
                </div>
                <div class="f0 text_over">
                  <span class="d_lb v_m c_9 f14" style="min-width: 110px;">公开（公告）日</span>
                  <span class="d_lb v_m c_3 f14 text_over">{{
                    item['patInfo']['publicDate']
                  }}</span>
                </div>
                <div class="f0 text_over">
                  <p class="d_lb v_m c_9 f14" style="min-width: 110px;">IPC分类号</p>
                  <p class="d_lb v_m c_3 f14 text_over" :title="item['patInfo']['ipcNo']">
                    {{ item['patInfo']['ipcNo'] }}
                  </p>
                </div>
                <div class="f0 text_over">
                  <span class="d_lb v_m c_9 f14" style="min-width: 110px;">发明（设计）人</span>
                  <span
                    class="d_lb v_m c_3 f14 text_over"
                    :title="item['patInfo']['inventorName']"
                    >{{ item['patInfo']['inventorName'] }}</span
                  >
                </div>
                <div class="f0 text_over">
                  <p class="d_lb c_9 v_m f14" style="min-width: 110px;">专利权人</p>
                  <p
                    class="d_lb c_3 v_m f14 text_over"
                    :title="item['patInfo']['applicantName']"
                  >
                    {{ item['patInfo']['applicantName'] }}
                  </p>
                </div>
                <div class="f0 text_over">
                  <span class="d_lb v_m c_9 f14" style="min-width: 110px;">代理机构</span>
                  <span
                    class="d_lb v_m c_3 f14 text_over"
                    :title="item['patInfo']['agency']"
                    >{{ item['patInfo']['agency'] }}</span
                  >
                </div>
              <div class="f0 text_over">
                <p class="d_lb v_m w_90 c_9 f14" style="min-width: 110px;">申请人</p>
                <p class="d_lb v_m c_3 f14 text_over" :title="item['patInfo']['applicantName']">
                  {{ item['patInfo']['applicantName'] }}
                </p>
              </div>
              <div id="abstract_wrapper" class="pos_r clearfix">
                <p id="abstract_name" class="fl v_b c_9 f14" style="min-width: 90px;line-height: 30px;">
                  摘要
                </p>
                <p
                  id="abstract_content"
                  class="fl v_b c_3 f14"
                  :title="item['patInfo']['abstracts']"
                  style="display: -webkit-box;max-height: 262px;line-height: 20px;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 6;text-overflow: ellipsis;word-break: break-all;word-wrap: break-word;"
                >
                  {{ item['patInfo']['abstracts'] }}
                </p>
              </div>
              <div class="tc pt_10">
                <span class="f16 c_2080fb cursor" @click="toevaluation(item)">查看详情</span>
              </div>
            </div>
          </div>
          
        </div>

        <div class="eval_legal_item_container bgc_f" v-if="item['law'][0]">
          <div class="legal_item_left">
            <div class="c_2080fb f0 mb_20">
              <div class="d_lb v_b bgc_2080fb" style="width: 4px;height: 24px;"></div>
              <span class="lh_24 ml_20 v_b f24">{{item['law'][0]['indexChName']}}</span>
              <span class="lh_24 v_b f24">（</span>
              <span class="lh_24 v_b f24">{{item['law'][0]['resultValue']}}</span>
              <span class="lh_24 v_b f24">分）</span>
              <div class="d_lb cursor" @click="setDetailData(item, 'law')">
                <div class="tip_icon d_lb "></div>
                <span class="ml_5 f14">详情</span>
              </div>
            </div>
            <div class="c_3">
              <div class="f0" v-for="(legalItem, index) in item['law'][0]['children']" :key="index">
                <p class="d_lb v_b f16" style="width: 50%;">{{legalItem['indexChName']}}</p>
                <p class="d_lb text_over c_2080fb f16" style="width: 50%;">
                  <span class="">{{legalItem['resultValue']}}</span>
                  分
                </p>
              </div>
            </div>
          </div>
          <!-- <div id="legal" class="legal_item_right fr h "></div> -->
        </div>

        <div class="eval_tech_item_container bgc_f" v-if="item['technology'][0]">
          <div class="tech_item_left">
            <div class="c_2080fb f0  mb_20">
              <div class="d_lb v_b bgc_2080fb" style="width: 4px;height: 24px;"></div>
              <span class="lh_24 ml_20 v_b f24">{{item['technology'][0]['indexChName']}}</span>
              <span class="lh_24 v_b f24">（</span>
              <span class="lh_24 v_b f24">{{item['technology'][0]['resultValue']}}</span>
              <span class="lh_24 v_b f24">分）</span>
              <div class="d_lb cursor" @click="setDetailData(item, 'technology')">
                <div class="tip_icon d_lb "></div>
                <span class="ml_5 f14">详情</span>
              </div>
            </div>
            <!-- <div id="technology" class="mt_50" style="height: 360px;"></div> -->
          </div>
          <div class="tech_item_right">
            <div class="c_3">
              <div
                class="f0"
                v-for="(techItem, index) in item['technology'][0]['children']" :key="index"
              >
                <p class="d_lb v_b f16" style="width: 50%;">{{techItem['indexChName']}}</p>
                <p class="d_lb text_over c_2080fb f16" style="width: 50%;">
                  <span class="">{{techItem['resultValue']}}</span>
                  分
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="eval_tech_item_container bgc_f" v-if="item['market'][0]">
          <div class="market_item_left">
            <div class="c_2080fb f0 mb_20">
              <div class="d_lb v_b bgc_2080fb" style="width: 4px;height: 24px;"></div>
              <span class="lh_24 ml_20 v_b f24">{{item['market'][0]['indexChName']}}</span>
              <span class="lh_24 v_b f24">（</span>
              <span class="lh_24 v_b f24" >{{item['market'][0]['resultValue']}}</span>
              <span class="lh_24 v_b f24">分）</span>
              <div class="d_lb cursor" @click="setDetailData(item, 'market')">
                <div class="tip_icon d_lb "></div>
                <span class="ml_5 f14">详情</span>
              </div>
            </div>
            <div class="c_3" v-if="item['market'][0]['children']">
              <div
                class="f0"
                v-for="(marketItem, index) in item['market'][0]['children']" :key="index"
              >
                <p class="d_lb v_b f16" style="width: 50%;">{{marketItem['indexChName']}}</p>
                <p class="d_lb text_over c_2080fb f16" style="width: 50%;">
                  <span class="">{{marketItem['resultValue']}}</span>
                  分
                </p>
              </div>
            </div>
          </div>
          <!-- <div id="market" class="market_item_right fr h "></div> -->
        </div>
      </div>
      </div>
    </div>

    <div v-if="detailshow" class="showmask">
      <div class="legal-modal-wrapper p_f border_r4 bgc_f c_3 f12">
        <div class="indicator-edit-close fr" style="margin-top: 6px;" @click="closeModal"></div>
        <div class="mt_30 c_2080fb f24" style="line-height: 24px;">
          <div class="d_lb v_b bgc_2080fb" style="width: 4px;height: 24px;margin-right: 10px;"></div>
          <span>{{detailData['indexChName']}}</span>
          <span>{{detailData['resultValue']}}</span>分
        </div>
        <div class="tc f0" style="width:800px;">
          <div class="d_lb v_m f12" style="width:399px;border-right: solid 1px #eee;">
            <table class="w" style="line-height: 24px;border-collapse: collapse;">
              <tbody v-for="(level2Item, index) in detailData.dataLeft" :key="index">
                <tr style="height: 24px;">
                  <td v-if="index" class="bt_e"></td>
                  <td v-if="index" class="bt_e"></td>
                  <td v-if="index" class="bt_e"></td>
                  <td v-if="index" class="bt_e"></td>
                </tr>
                <tr>
                  <td
                    :rowspan="detailData.dataLeft[index]['children'].length + 1"
                  >{{level2Item['indexChName']}}</td>
                  <td :rowspan="detailData.dataLeft[index]['children'].length + 1">{{level2Item['resultValue']}}
                    分
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-for="(level3Item, index) in level2Item['children']" :key="index">
                  <td>{{level3Item['indexChName']}}</td>
                  <td>{{level3Item['resultValue']}}</td>
                </tr>
                <tr style="height: 24px;"></tr>
              </tbody>
            </table>
          </div>
          <div class="d_lb v_m f12" style="width:400px;">
            <table class="w" style="line-height: 24px;border-collapse: collapse;">
              <tbody v-for="(level2Item, index) in detailData.dataRight" :key="index">
                <tr style="height: 24px;">
                  <td v-if="index" class="bt_e"></td>
                  <td v-if="index" class="bt_e"></td>
                  <td v-if="index" class="bt_e"></td>
                  <td v-if="index" class="bt_e"></td>
                </tr>
                <tr>
                  <td
                    :rowspan="detailData.dataRight[index]['children'].length + 1"
                  >{{level2Item['indexChName']}}</td>
                  <td :rowspan="detailData.dataRight[index]['children'].length + 1">{{level2Item['resultValue']}}
                    分
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-for="(level3Item, index) in level2Item['children']" :key="index">
                  <td>{{level3Item['indexChName']}}</td>
                  <td>{{level3Item['resultValue']}}</td>
                </tr>
                <tr style="height: 24px;"></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      currentState: 'evaluation',
      keyFormatError: false,
      searchResultState: '',
      noticeMessage: '',
      detailshow: false,
      loading: false,
      compareList: [],
      evaluationData: {
          patInfo: {
          },
          law: [],
          market: [],
          technology: [],
          patentGrade: '',
          totalScore: ''
      },
      detailData: {
      },
      dataLeft: [],
      dataRight: [],
      searchKey: ''
    }
  },
  computed: {
    leftnum() {
      return 4 - this.compareList.length
    }
  },
  created() {
    this.searchKey = localStorage.getItem('patentEvaluationNum')
    const pdata = localStorage.getItem('compareItemOne')
    const edata = JSON.parse(pdata)
    this.compareList.push(edata)
  },
  mounted() {
    this.searchResultState = 'ready'
    this.renderChart()
    // this.loadData()
  },
  methods: {
    del(k) {
      this.compareList.splice(k, 1)
    },
    toevaluation(item) {
      const url = '/portal/feature-service/patent-evaluationinfo/' + item['patInfo']['patentNo']
      window.open(url)
      // this.$router.push({ name: 'PatentEvaluationInfo' })
    },
    // 检索提交
    searchHandle() {
      // 如果正在请求中，则禁止再请求
      if (this.leftnum === 0) {
        this.$messagesebe.error('最多只能添加4条专利')
        return
      }

      // 去空格，小写字母变大写
      this.searchKey = this.searchKey.replace(/\s+/g, '')
      this.searchKey = this.searchKey.toUpperCase()
      this.keyFormatError = !this.searchKey && !(/^[cC][nN][0-9]+$/.test(this.searchKey))
      if (!this.keyFormatError) {
        this.loadData()
      }
    },
    closeModal() {
        this.detailshow = false
    },
    // 加载评价数据
    loadData() {
      this.loading = true
      this.$shttp.get('/api/analysis/calculate?patentNo=' + this.searchKey)
        .then(res => {
            if (res.code === 200) {
                this.loading = false
                this.compareList.push(res['data'])
                this.$nextTick(() => {
                   this.renderChart()
                })
                
            }
          
        })
        .catch((err) => {
          this.loading = false
          this.$messagesebe.error(err.response.data.msg || '未查到相关数据')
        })
    },

    setDetailData(item, type) {
        
      var detailData = item[type][0]
      this.detailData = item[type][0]
      console.log(type, detailData)
      this.detailData.dataLeft = detailData['children'].slice(0, Math.ceil(detailData['children'].length / 2))
      this.detailData.dataRight = detailData['children'].slice(Math.ceil(detailData['children'].length / 2))
      this.dataLeft = detailData['children'].slice(0, Math.ceil(detailData['children'].length / 2))
      this.dataRight = detailData['children'].slice(Math.ceil(detailData['children'].length / 2))
      this.detailshow = true
    },

    // 将返回的数据解析为图表显示可用的数据
    hcOptionDataConvert(originData) {
      var optionData = []
      var arr = originData['children']
      for (var i = 0; i < arr.length; i++) {
        var item = []
        item[0] = arr[i]['indexChName']
        item[1] = arr[i]['resultValue']
        optionData.push(item)
      }
      return optionData
    },

    optionDataConvert(originData) {
      var optionData = []
      var arr = originData['children']
      for (var i = 0; i < arr.length; i++) {
        var item = {}
        item.name = arr[i]['indexChName']
        item.value = arr[i]['resultValue']
        optionData.push(item)
      }
      return optionData
    },

    optionNameConvert(originData) {
      var optionName = []
      var arr = originData['children']
      for (var i = 0; i < arr.length; i++) {
        optionName.push(arr[i]['indexChName'])
      }
      return optionName
    },

    optionValueConvert(originData) {
      var optionValue = []
      var arr = originData['children']
      for (var i = 0; i < arr.length; i++) {
        optionValue.push(arr[i]['resultValue'])
      }
      return optionValue
    },

    renderChart() {
      this.compareList.forEach((item, index) => {

      const id = `total${index}`
      var totalChart = echarts.init(document.getElementById(id))
      var totalOptionData = []
      var lawItem = {}
      lawItem.name = item['law'][0]['indexChName']
      lawItem.value = item['law'][0]['resultValue']
      totalOptionData.push(lawItem)
      var marketItem = {}
      marketItem.name = item['market'][0]['indexChName']
      marketItem.value = item['market'][0]['resultValue']
      totalOptionData.push(marketItem)
      var techItem = {}
      techItem.name = item['technology'][0]['indexChName']
      techItem.value = item['technology'][0]['resultValue']
      totalOptionData.push(techItem)

      // 指定图表的配置项和数据
      var totalOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          // x: 'left',
          itemWidth: 30,
          itemHeight: 30,
          icon: 'rect',
          bottom: 0,
          // data:['法律','技术','市场']
          formatter: '{name}',
          textStyle: {
            color: '#333',
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '45%'],
            radius: ['45%', '90%'],
            color: ['#261e9c', '#007ffa', '#66b8f7'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: '{b}: {c}'
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: totalOptionData
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      totalChart.setOption(totalOption)
      })
    }
  }
}
</script>

<style lang="less" scoped>
/*公共样式*/

body,
div,
p,
a,
ul,
li,
ol,
dl,
dt,
dd,
form,
h1,
h2,
h3,
h4,
h5,
h6,
input,
fieldset,
legend,
optgroup,
select,
table,
textarea {
  margin: 0;
  padding: 0;
  list-style: none;
}

img {
  border: none 0;
  cursor: pointer;
}
a {
  cursor: pointer;
  color: #ffffff;
}
a:link {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
  color: #ffffff;
}
a:hover {
  text-decoration: none;
  color: #ffffff;
}
a:active {
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
}
.cursor {
  cursor: pointer;
}
em {
  font-style: normal;
}
.p_f {
  position: fixed;
}
.w {
  width: 100%;
}
.w_90 {
  width: 90px;
}
.lh_34 {
  line-height: 34px;
}
.lh_24 {
  line-height: 24px;
}

.h {
  height: 100%;
}
.h_34 {
  height: 34px;
}

.f0 {
  font-size: 0;
}
.f12 {
  font-size: 12px;
}

.f14 {
  font-size: 14px;
}

.f16 {
  font-size: 16px;
}
.f24 {
  font-size: 24px;
}

.fb {
  font-weight: bold;
}

.unl {
  text-decoration: underline;
}


.tl {
  text-align: left;
}

.tc {
  text-align: center;
}

.tr {
  text-align: right;
}


.fl {
  float: left;
}

.fr {
  float: right;
}

.text_over {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.d_lb {
  display: inline-block;
}


.v_m {
  vertical-align: middle;
}

.v_t {
  vertical-align: top;
}
.v_b {
  vertical-align: bottom;
}

.pos_r {
  position: relative;
}

.pos_r_left {
  position: relative;
  left: 0;
}

.pos_r_right {
  position: relative;
  right: 0;
}

.pos_a {
  position: absolute;
}

.pos_a_left {
  position: absolute;
  left: 0;
}

.pos_a_right {
  position: absolute;
  right: 0;
}
.zoom {
  zoom: 1;
}

.hidden {
  visibility: hidden;
}

.none {
  display: none;
}

.m_0_auto {
  margin: 0 auto;
}

.m_0 {
  margin: 0;
}

.m_5 {
  margin: 5px;
}

.m_10 {
  margin: 10px;
}

.m_15 {
  margin: 15px;
}

.m_20 {
  margin: 20px;
}

.m_25 {
  margin: 25px;
}

.m_30 {
  margin: 30px;
}

.mt_0 {
  margin-top: 0;
}

.mt_2 {
  margin-top: 2px;
}
.mt_3 {
  margin-top: 3px;
}
.mt_5 {
  margin-top: 5px;
}
.mt_7 {
  margin-top: 7px;
}
.mt_8 {
  margin-top: 8px;
}
.mt_05 {
  margin-top: -5px;
}

.mt_10 {
  margin-top: 10px;
}
.mt_12 {
  margin-top: 12px;
}
.mt_15 {
  margin-top: 15px;
}

.mt_20 {
  margin-top: 20px;
}

.mt_25 {
  margin-top: 25px;
}

.mt_30 {
  margin-top: 30px;
}

.mt_35 {
  margin-top: 35px;
}

.mt_40 {
  margin-top: 40px;
}

.mt_45 {
  margin-top: 45px;
}

.mt_50 {
  margin-top: 50px;
}
.mt_55 {
  margin-top: 55px;
}
.mt_60 {
  margin-top: 60px;
}
.mt_65 {
  margin-top: 65px;
}

.mb_0 {
  margin-bottom: 0;
}

.mb_5 {
  margin-bottom: 5px;
}

.mb_10 {
  margin-bottom: 10px;
}

.mb_15 {
  margin-bottom: 15px;
}

.mb_20 {
  margin-bottom: 20px;
}

.mb_25 {
  margin-bottom: 25px;
}

.mb_30 {
  margin-bottom: 30px;
}

.mb_35 {
  margin-bottom: 35px;
}

.mb_40 {
  margin-bottom: 40px;
}

.mb_45 {
  margin-bottom: 45px;
}

.mb_50 {
  margin-bottom: 50px;
}

.mb_70 {
  margin-bottom: 70px;
}
.mb_80 {
  margin-bottom: 80px;
}

.ml_0 {
  margin-left: 0;
}
.ml_1 {
  margin-left: 1px;
}
.ml_2 {
  margin-left: 2px;
}
.ml_3 {
  margin-left: 3px;
}
.ml_4 {
  margin-left: 4px;
}
.ml_5 {
  margin-left: 5px;
}
.ml_7 {
  margin-left: 7px;
}
.ml_10 {
  margin-left: 10px;
}
.ml_15 {
  margin-left: 15px;
}

.ml_20 {
  margin-left: 20px;
}

.ml_25 {
  margin-left: 25px;
}

.ml_30 {
  margin-left: 30px;
}

.ml_35 {
  margin-left: 35px;
}

.ml_40 {
  margin-left: 40px;
}

.ml_45 {
  margin-left: 45px;
}

.ml_50 {
  margin-left: 50px;
}
.ml_60 {
  margin-left: 60px;
}
.ml_63 {
  margin-left: 63px;
}
.ml_65 {
  margin-left: 65px;
}

.ml_70 {
  margin-left: 70px;
}

.ml_105 {
  margin-left: 105px;
}

.ml_135 {
  margin-left: 135px;
}

.mr_0 {
  margin-right: 0;
}

.mr_5 {
  margin-right: 5px;
}

.mr_10 {
  margin-right: 10px;
}

.mr_15 {
  margin-right: 15px;
}

.mr_20 {
  margin-right: 20px;
}

.mr_25 {
  margin-right: 25px;
}

.mr_30 {
  margin-right: 30px;
}

.mr_35 {
  margin-right: 35px;
}

.mr_40 {
  margin-right: 40px;
}

.mr_45 {
  margin-right: 45px;
}

.mr_50 {
  margin-right: 50px;
}

.p_s23 {
  padding: 23px 20px;
}

.p_s_23 {
  padding: 0 20px 0 20px;
}

.p_20-t {
  padding: 0 20px 50px 20px;
}
.p_0 {
  padding: 0;
}

.p_10 {
  padding: 10px;
}

.p_15 {
  padding: 15px;
}

.p_20 {
  padding: 20px;
}

.p_25 {
  padding: 25px;
}

.p_30 {
  padding: 30px;
}

.pt_0 {
  padding-top: 0;
}

.pt_5 {
  padding-top: 5px;
}

.pt_6 {
  padding-top: 6px;
}

.pt_7 {
  padding-top: 7px;
}

.pt_8 {
  padding-top: 8px;
}

.pt_10 {
  padding-top: 10px;
}

.pt_15 {
  padding-top: 15px;
}

.pt_20 {
  padding-top: 20px;
}

.pt_23 {
  padding-top: 23px;
}

.pt_25 {
  padding-top: 25px;
}

.pt_30 {
  padding-top: 30px;
}

.pt_35 {
  padding-top: 35px;
}

.pt_40 {
  padding-top: 40px;
}

.pt_45 {
  padding-top: 45px;
}

.pt_50 {
  padding-top: 50px;
}

.pb_0 {
  padding-bottom: 0;
}

.pb_5 {
  padding-bottom: 5px;
}

.pb_10 {
  padding-bottom: 10px;
}

.pb_15 {
  padding-bottom: 15px;
}

.pb_20 {
  padding-bottom: 20px;
}

.pb_25 {
  padding-bottom: 25px;
}

.pb_30 {
  padding-bottom: 30px;
}

.pb_35 {
  padding-bottom: 35px;
}

.pb_40 {
  padding-bottom: 40px;
}

.pb_45 {
  padding-bottom: 45px;
}

.pb_50 {
  padding-bottom: 50px;
}

.pl_0 {
  padding-left: 0;
}

.pl_5 {
  padding-left: 5px;
}

.pl_10 {
  padding-left: 10px;
}

.pl_15 {
  padding-left: 15px;
}

.pl_20 {
  padding-left: 20px;
}

.pl_25 {
  padding-left: 25px;
}

.pl_30 {
  padding-left: 30px;
}

.pl_35 {
  padding-left: 35px;
}

.pl_40 {
  padding-left: 40px;
}

.pl_45 {
  padding-left: 45px;
}

.pl_50 {
  padding-left: 50px;
}

.pr_0 {
  padding-right: 0;
}

.pr_5 {
  padding-right: 5px;
}

.pr_10 {
  padding-right: 10px;
}

.pr_15 {
  padding-right: 15px;
}

.pr_20 {
  padding-right: 20px;
}

.pr_25 {
  padding-right: 25px;
}

.pr_30 {
  padding-right: 30px;
}

.pr_35 {
  padding-right: 35px;
}

.pr_40 {
  padding-right: 40px;
}

.pr_45 {
  padding-right: 45px;
}

.pr_50 {
  padding-right: 50px;
}

.b_e6 {
  border: solid 1px #e6e6e6;
}
.b_e {
  border: solid 1px #eee;
}
.b_333 {
  border: solid 1px #333333 !important;
}
.bt_e {
  border-top: solid 1px #eee;
}
.bt_e6 {
  border-top: solid 1px #e6e6e6;
}

.c_f {
  color: #fff;
}
.c_3 {
  color: #333;
}
.c_9 {
  color: #999;
}
.c_007ffa {
  color: #007ffa;
}
.c_2080fb {
  color: #2080fb;
}
.c_fa3 {
  color: #fa3744;
}

.bgc_f {
  background-color: #fff;
}
.bgc_f5 {
  background-color: #f5f5f5;
}
.bgc_007ffa {
  background-color: #007ffa;
}
.bgc_2080fb {
  background-color: #2080fb;
}

.ofh {
  overflow: hidden;
}

.ofs {
  overflow: scroll;
}

.ofa {
  overflow: auto;
}


/*表单相关的样式*/
input,
textarea {
  outline: none;
}
textarea {
  resize: none;
}

.showmask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
}
.legal-modal-wrapper{
    top: 50%;
    left: 50%;
    margin-left: -480px;
    margin-top: -334px;
    padding: 0 40px 40px 40px ;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.16);
    z-index: 9;
}
.indicator-edit-close{
    width: 20px;
    height: 20px;
    margin-right: -30px;
    background: url("../../../assets/img/close.png");
    -webkit-background-size: 100%;
    background-size: 100%;
}
.patentcomparebox {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
.patentevaluation {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    .addcompare {
      background-color: #72B6EF;
      text-align: center;
    }
    .btn_disable {
      background-color: #aaa;
      border-right: 1px solid #fff;
    }
    .itempatent {
      float: left;
      width: 290px;
      margin-right: 13px;
      padding-top: 20px;
      padding-bottom: 30px;
      background-color: #fff;
      &:last-child {
        margin-right: 0;
      }
      .delbtn {
        display: inline-block;
        width: 60px;
        height: 17px;
        line-height: 17px;
        font-size: 14px;
        text-align: center;
        color: #fff;
        background-color: #999;
        border-radius: 2px;
        cursor: pointer;
        vertical-align: middle;
      }
    }
}
.eval_search_container {
  padding-top: 34px;
  padding-bottom: 34px;
}
.eval_search_input {
  width: 266px;
  height: 34px;
  line-height: 32px;
  border: solid 1px #e6e6e6;
}
.eval_search_btn {
  width: 84px;
  height: 34px;
  line-height: 34px;
  // border-radius: 0 2px 2px 0;
  cursor: pointer;
}
.btn_disable {
  background-color: #aaa;
}
.dl_PDF {
  width: 110px;
  height: 34px;
  line-height: 34px;
  cursor: pointer;
}
.tip_icon {
  width: 14px;
  height: 14px;
  background: url('../../../assets/img/tip.png');
  background-size: 100%;
}
.tip_loading_img {
  width: 450px;
  height: 450px;
  background: url('../../../assets/img/loading.gif');
  background-size: 100%;
}
.tip_error_img {
  width: 600px;
  height: 600px;
  background: url('../../../assets/img/error.gif');
  background-size: 100%;
}
.eval_hidden {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}
.eval_total_item_container {
  padding: 80px 15px 45px 15px;
  height: 494px;
}
.eval_legal_item_container {
  padding: 30px 10px 0;
}
.eval_tech_item_container {
  padding: 30px 10px 0;
}
.total_item_left {
  width: 100%;
  height: 350px;
}
.total_item_right {
  width: 100%;
  min-height: 400px;
}
.legal_item_left {
  width: 100%;
}
.legal_item_right {
  width: 100%;
}
.tech_item_left {
  width: 100%;
}
.tech_item_right {
  width: 100%;
}
.market_item_left {
  width: 100%;
}
.market_item_right {
  width: 100%;
}
</style>
