<template>
    <div class="companyportraitlist" v-loading="loading">
        <div class="comWidth">
            <div class="topresult">
                <h3 class="result">创新主体信用详情</h3>
                <div class="search">
                    <el-input placeholder="请输入企业名称、统一社会信用代码" v-model="enterpriseName" >
                        <el-button class="bluebtn" type="primary" slot="append"  @click="search()">搜索</el-button>
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
                    <div class="xinyong" @click="toportrait">查看创新主体画像</div>
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
                <div class="credit" v-if="sortsnow === 1" key="a">
                    <template v-if="xipopLegalPersonCredits.length">
                        <div v-for="(item, key) in xipopLegalPersonCredits" :key="key" class="itemcredit">
                            <h3 class="eachtitle">{{item.prompt}}</h3>
                            <div class="tablebox">
                                <table>
                                    <tbody>
                                        <tr class="headbox">
                                            <td class="wenhao" :class="{ 'xuke': tit === '许可内容' }" v-for="(tit,k) in item.titles" :key="k">{{tit}}</td>
                                        </tr>
                                        <tr class="wenzi">
                                            <td class="wenhao" v-for="(cont,k) in item.columns" :key="k">{{cont}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </template>
                    <div v-if="!xipopLegalPersonCredits.length">
                        暂无数据
                    </div>
                </div>
                <div class="black" v-if="sortsnow === 2" key="d">
                    <template v-if="xipopEnterpriseBlacklists.length">
                        <div class="headbox">
                            <span class="xuhao">序号</span>
                            <span class="xuhao">备注</span>
                            <span class="xuhao">法人姓名</span>
                            <span class="jigou">法人证件号</span>
                            <span class="jigou">黑名单事项</span>
                            <span class="xuhao">列入事由</span>
                            <span class="xuhao">列入依据</span>
                            <span class="riqi">列入名单日期</span>
                            <span class="rjigou">认定机构</span>
                            <span class="xuhao">公示期限</span>
                            <span class="leixing">信用类型</span>
                            <span class="riqi">生效时间</span>
                        </div>
                        <ul class="fieldlist" v-if="xipopEnterpriseBlacklists.length">
                            <li v-for="item in xipopEnterpriseBlacklists" :key="item.id" class="clearfix">
                                <span class="xuhao">{{item.seqNo}}</span>
                                <span class="xuhao">{{item.bz}}</span>
                                <span class="xuhao">{{item.fddbrxm}}</span>
                                <span class="jigou">{{item.fddbrzjhm}}</span>
                                <span class="jigou">{{item.hmdsxmc}}</span>
                                <span class="xuhao"><span class="chakan" @click="openlook(item.lrmdsy, 1)">查看</span></span>
                                <span class="xuhao"><span class="chakan" @click="openlook(item.lrmdyj, 2)">查看</span></span>
                                <span class="riqi">{{item.lrmdrq}}</span>
                                <span class="rjigou">{{item.rdjg}}</span>
                                <span class="xuhao">{{item.expireDays}}</span>
                                <span class="leixing">{{item.grade}}</span>
                                <span class="riqi">{{item.beginTime}}</span>
                            </li>
                        </ul>
                    </template>
                    <div v-if="!xipopEnterpriseBlacklists.length">
                        暂无数据
                    </div>
                </div>
                <div class="black" v-if="sortsnow === 3">
                    <div v-if="againstNum">
                        <div class="detailres">
                            <div class="detaLi">
                                <div>{{againstNum?againstNum.totalNum:''}}笔</div>
                                <div>累计完成交易</div>
                            </div>
                            <div class="detaLi">
                                <div>{{againstNum?againstNum.againstNum:''}}次</div>
                                <div>违规次数</div>
                            </div>
                            <div class="detaLi">
                                <div>{{againstNum?againstNum.totalSum:''}}万</div>
                                <div>累计交易金额</div>
                            </div>
                        </div>
                        <div class="tables">
                            <div class="tab_tr1">
                                <div>序号</div>
                                <div>交易商品</div>
                                <div>交易金额</div>
                                <div>交易状态</div>
                                <div>交易评价</div>
                                <div>评价内容</div>
                            </div>
                            <div class="tab_tr2" v-for="(item,key) in dishonestyRecords?dishonestyRecords.elements:''" :key="key">
                                <div>{{item.seqNo}}</div>
                                <div>{{item.serviceName}}</div>
                                <div>{{item.servePrice}}万</div>
                                <div>{{item.orderStatusDictText}}</div>
                                <div><img v-for="(image,index) in item.serveScore" :key="index" src="../../../assets/images/xingxing.png" alt=""></div>
                                <div>{{item.evalContent}}</div>
                            </div>
                        </div>
                        <div class="paginationbox fy_cred">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page=1
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="10"
                            layout="prev, pager, next, sizes, jumper"
                            :total=12>
                            </el-pagination>
                        </div>
                    </div>
                    <div v-else>暂无数据</div>
                </div>
                <el-dialog :title="looktitle" :visible.sync="lookshow" width="500px" top="30vh">
                    <div class="neirongbox">
                        {{neirong}}
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
const detailUrl = '/api/queryEnterpriseCreditDetail/{assessId}'
export default {
    data() {
        return {
            pgIndex: 1,
            pgCount: 10,
            total: 20,
            loading: false,
            dataList: [],
            sortsnow: 1,
            intrshow: false,
            xipopLegalPersonCredits: [],
            xipopEnterpriseBlacklists: [],
            againstNum: '',
            dishonestyRecords: '',
            sorts: [
                { id: 1, label: '企业法人信用信息' },
                { id: 2, label: '严重违法失信企业名单（黑名单）信息' },
                { id: 3, label: '系统内不诚信行为' }
                // { id: 3, label: '风险提示' }
            ],
            cur: 'zl',
            lookshow: false,
            looktitle: '查看列入事由',
            neirong: '',
            assessId: null,
            enterpriseName: '',
            info: {
                enterpriseName: '',
                businessScope: '',
                creditCode: '',
                legalPerson: '',
                orgCode: ''
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
  },
  methods: {
    handleSizeChange(val) {
      console.log("每页" + `${val}` + "条")
      this.pgCount = `${val}`
      this.getdetail()
    },
    handleCurrentChange(val) {
      console.log("第" + `${val}` + "页")
      this.pgIndex = `${val}`
      this.getdetail()
    },
    search() {
      if (!this.enterpriseName) {
        this.$messagesebe.warning('请输入企业名称、统一社会信用代码查询')
        return
      }
      this.$router.push({ name: 'CompanyCreditList', params: { cn: this.enterpriseName } })
    },
    toevaluation() {
      const url = `/portal/innovate/company-evaluationinfo/${this.assessId}`
      window.open(url)
    //   this.$router.push({ name: 'CompanyEvaluationInfo', params: { id: this.assessId } })
    },
    toportrait() {
      const url = `/portal/innovate/company-portraitinfo/${this.assessId}`
      window.open(url)
    //   this.$router.push({ name: 'CompanyPortraitInfo', params: { id: this.assessId } })
    },
    changesort(it) {
      this.sortsnow = it.id
      this.$router.replace({ query: { cur: it.id } })
    },
    getdetail() {
      this.loading = true
      const data = {
            pgIndex: this.pgIndex,
            pgCount: this.pgCount
        }
        console.log(data)
      this.$shttp.get(detailUrl.replace('{assessId}', this.assessId),{ params: data }).then(resp => {
          this.loading = false
          this.info = resp
          this.xipopLegalPersonCredits = resp.xipopLegalPersonCredits
          this.xipopEnterpriseBlacklists = resp.xipopEnterpriseBlacklists
          this.againstNum = resp.againstNum
          this.dishonestyRecords = resp.dishonestyRecords
        })
        .catch(err => {
          this.loading = false
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    openlook(it, n) {
        this.neirong = it
        if (n === 1) {
            this.looktitle = "查看列入事由"
        }
        if (n === 2) {
            this.looktitle = "查看列入依据"
        }
        this.lookshow = true
    }
  },
  created() {
    const now = this.$route.query.cur || 1
    this.sortsnow = now - 0
    this.assessId = this.$route.params.id
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
    ul,p,tr,td,h3 {
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
        .credit {
            padding: 24px 0;
            background-color: #fff;
            .headbox {

                background-color: #6198E7;
                color: #fff;
            }
            .itemcredit {
                overflow:hidden;
                margin-bottom: 30px;
                border:1px solid #f5f5f5;
            }
            .eachtitle {
                font-size: 14px;
                padding: 10px;
            }
            .tablebox {
                overflow-x: auto;
            }
            .wenhao {
               min-width: 180px;
               line-height: 18px;
               padding: 5px;
               text-align: center;
            }
            td.xuke {
                min-width: 520px;
            }
            .fieldlist {
                margin-bottom: 20px;
                border: 1px solid #F2F2F2;
                border-top: none;
                > li {
                    padding: 6px 0;
                    line-height: 20px;
                    color: #333;
                }
            }
        }
        .black {
            padding: 24px 0;
            background-color: #fff;
            .detailres{
                display: flex;
                padding-left: 8px;
                .detaLi{
                    width: 180px;
                    height: 120px;
                    background: #dcdcdc;
                    margin-right: 35px;
                    >div{
                        width: 100%;
                        text-align: center;
                    }
                    >div:first-child{
                        font-size: 26px;
                        font-weight: bold;
                        margin: 26px 0 10px;
                    }
                }
            }
            .tables{
                border: 1px solid #dcdcdc;
                margin: 20px 0 0 8px;
                .tab_tr1{
                    display: flex;
                    background: #2f72d1;
                    color: #fff;
                    padding: 10px 0;
                    >div{
                        text-align: center;
                    }
                    >div:first-child{
                        width: 14%;
                    }
                    >div:nth-child(2){
                        width: 22%;
                    }
                    >div:nth-child(3){
                        width: 16%;
                    }
                    >div:nth-child(4){
                        width: 16%;
                    }
                    >div:nth-child(5){
                        width: 16%;
                    }
                    >div:nth-child(6){
                        width: 16%;
                    }
                }
                .tab_tr2{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #dcdcdc;
                    img{
                        width: 20px;
                    }
                    >div{
                        text-align: center;
                    }
                    >div:first-child{
                        width: 14%;
                    }
                    >div:nth-child(2){
                        width: 22%;
                    }
                    >div:nth-child(3){
                        width: 16%;
                    }
                    >div:nth-child(4){
                        width: 16%;
                    }
                    >div:nth-child(5){
                        width: 16%;
                    }
                    >div:nth-child(6){
                        width: 16%;
                    }
                }

                .tab_tr2:last-child{
                    border: 0;
                }
            }
            .fy_cred{
                display: flex;
                justify-content: center;
                padding: 10px 0;
            }
            .headbox {
                height: 52px;
                line-height: 52px;
                background-color: #6198E7;
                color: #fff;
            }
            .xuhao {
                float: left;
                width: 60px;
                text-align: center;
            }
            .riqi {
                float: left;
                width: 120px;
                text-align: center;
            }
            .jigou {
                float: left;
                width: 140px;
                text-align: center;
            }
            .rjigou {
                float: left;
                width: 160px;
                text-align: center;
            }
            .leixing {
                float: left;
                width: 100px;
                text-align: center;
            }
            .chakan {
                color: #2F72D1;
                cursor: pointer;
            }
            .fieldlist {
                margin-bottom: 20px;
                border: 1px solid #F2F2F2;
                border-top: none;
                > li {
                    padding: 6px 0;
                    line-height: 20px;
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
    .neirongbox {
        padding: 30px;
        min-height: 250px;
        text-indent: 2em;
    }
}
</style>

