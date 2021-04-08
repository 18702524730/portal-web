<template>
  <div class="industry-box">
    <div v-loading="loading" element-loading-background="rgba(51, 51, 51,0.6)">
    <div class="industryinfo clearfix">
      <div class="leftcondition">
        <div class="picbox">
          <img :src="info.coverUrl" alt="" />
        </div>
        <h3>{{ info.title }}</h3>
        <p>更新时间：{{ info.updateTime | dateFormat }}</p>
        <div class="shortintr">
          简介：
          <p>
            {{ info.brief }}
          </p>
        </div>
        <div class="tonavdata" @click="todetail">
            查看专题数据库
        </div>
      </div>
      <div class="right-content">
        <div class="searchtype">
            <div class="searchitem">
                <h3>一级分支</h3>
                <ul>
                    <li :class="{ active: nowf === 0 }" @click="changef(0, null)">全部</li>
                    <li :class="{ active: nowf === item.id }" @click="changef(item.id, item.name)" v-for="item in fbranch" :key="item.id">{{item.name}}</li>
                </ul>
            </div>
            <div class="searchitem">
                <h3>二级分支</h3>
                <ul>
                    <li :class="{ active: nows === 0 }" @click="changes(0, null)">全部</li>
                    <li :class="{ active: nows === item.id }" @click="changes(item.id, item.name)" v-for="item in sbranch" :key="item.id">{{item.name}}</li>
                </ul>
            </div>
        </div>
        <div class="top clearfix">
          <div class="counts fl">
            共<span class="color-blue">{{ total }}</span
            >项专利
          </div>
          <div class="fr">
            <el-checkbox v-model="ifselected" :value="1" @change="searchpage(true)">查看重点专利</el-checkbox>
          </div>
        </div>
        <ul class="rightlist" v-if="dataList.length">
          <li v-for="(item, key) in dataList" :key="key" @click="toinfo(item)">
            <div class="topcont clearfix">
              <div class="intr">
                <h3>【{{ item.typeName }}】{{ item.title }}</h3>
                <ul class="info">
                  <li>申请号：{{ item.applicationDocNum }}</li>
                  <li>申请日：{{ item.applicationDate }}</li>
                  <li>公开/公告号：{{ item.publicationDocNum }}</li>
                  <li>公开/公告日：{{ item.publicationDate }}</li>
                  <li>申请人：{{ item.applicant }}</li>
                  <li>发明人：{{ item.inventor }}</li>
                  <li>代理人：{{ item.agentPersonName }}</li>
                  <li>分类号：{{ item.ipcList.join(',') }}</li>
                  <li>代理机构：{{ item.agentName }}</li>
                </ul>
              </div>
            </div>
            <p>摘要：{{ item.abstractDesc }}</p>
          </li>
        </ul>
        <div class="mypagination" v-if="total && !loading">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pgCount"
            :current-page.sync="pgIndex"
            layout="total,prev, pager, next"
            :total="total"
            class="fr"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import filters from '@utils/filters.js'
const detailUrl = '/api/findPatentArticleDetail/{number}'
const listUrl = '/api/findMatchPatentList'
const fzUrl = '/api/findTechBranch'
export default {
  data() {
    return {
      pgIndex: 1,
      pgCount: 10,
      total: 0,
      loading: false,
      selected: '',
      title: '',
      dataList: [],
      nowf: 0,
      nowfn: '',
      nows: 0,
      nowsn: '',
      fbranch: [],
      sbranch: [],
      query: {},
      info: {},
      ifselected: false,
      number: ''
    }
  },
  filters: {
    dateFormat: filters.formatDate.datesFormat
  },
  mounted() {
    this.number = this.$route.params.id
    this.getDetail()
    this.getbranch()
    this.searchpage(true)
  },
  methods: {
    changef(n, na) {
        this.nowf = n
        this.nowfn = na
        this.searchpage()
    },
    changes(n, na) {
        this.nows = n
        this.nowsn = na
        this.searchpage()
    },
    getbranch() {
        const data = {
            number: this.number
        }
        this.$shttp.get(fzUrl, { params: data }).then(res => {
            this.fbranch = res.firstBranch
            this.sbranch = res.secondBranch
        })
    },
    toinfo(it) {
        const url = `/portal/search/patent-searchdetail/${it.applicationDocNum}/${it.country}/${it.publicationDocNum}/${it.type}/${it.validateName}`
        window.open(url)
    },
    todetail() {
      const url = `/portal/feature-service/patent-nav-sysinfo/${this.number}`
      window.open(url)
      // this.$router.push({ name: 'PatentNavSysInfo', params: { id: this.number } })
    },
    getquery() {
      var re = {}
      if (this.$route.query) {
        var q = this.$route.query
        for (var k in q) {
          if (q.hasOwnProperty(k)) {
            if (q[k]) {
              re[k] = q[k]
            }
          }
        }
      }
      this.query = re
    },
    getDetail() {
      this.$shttp.get(detailUrl.replace('{number}', this.number)).then(res => {
        this.info = res
      })
    },
    handleCurrentChange(i) {
      this.pgIndex = i
      this.searchpage()
    },
    searchpage(isf) {
      const data = {
        pgIndex: isf ? 1 : this.pgIndex,
        pgCount: this.pgCount,
        number: this.number,
        ifKey: this.ifselected ? 1 : 0
      }
      if (this.nowfn) {
        data.firstBranch = this.nowfn
      }
      if (this.nowsn) {
        data.secondBranch = this.nowsn
      }
      // this.$router.replace({ query: this.query })
      this.getOrderList(data)
    },
    getOrderList(paramsData) {
      paramsData = paramsData || {}
      this.loading = true
      this.$shttp
        .get(listUrl, { params: paramsData })
        .then(resp => {
          this.loading = false
          var data = resp
          if (resp) {
            var dataList = data.elements 
            this.dataList = dataList
            this.total = data.totalElements
          }
        })
        .catch(err => {
          this.loading = false
          this.$message(err.response.data.msg)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.industry-box {
  
  background-color: #f5f6f7;
  padding-top: 30px;
  padding-bottom: 50px;
  .industryinfo {
    width: 1200px;
    margin: 0 auto;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .fr {
    float: right;
  }
  .fl {
    float: left;
  }
  .top {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
    height: 20px;
    font-size: 14px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    margin-bottom: 20px;
    .color-blue {
      padding: 0 5px;
      color: #2f72d1;
    }
  }
  .middle {
    padding-top: 10px;
  }
  .counts {
    font-size: 14px;
  }
  .sortlist {
    color: #999;
    span {
      display: inline-block;
      font-size: 14px;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #eee;
      margin-left: 10px;
      border-radius: 2px;
      cursor: pointer;
    }
  }
  .leftcondition {
    float: left;
    width: 210px;
    height: 900px;
    padding: 20px;
    background-color: #fff;
    color: #666;
    .shortintr {
      color: #333;
      > p {
        text-indent: 2em;
        color: #666;
      }
    }
    > h3 {
      font-size: 16px;
      font-family: 'PingFangSC-Semibold', 'PingFang SC';
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      margin-bottom: 5px;
    }
    .picbox {
      width: 170px;
      height: 170px;
      margin-bottom: 15px;
      // background-color: #ccc;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
    > p {
      height: 17px;
      margin-bottom: 20px;
      font-size: 12px;
      font-family: 'PingFangSC-Regular', 'PingFang SC';
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
    }
    .tonavdata {
      height: 40px;
      padding: 0 10px;
      background-color: #379dea;
      color: #fff;
      cursor: pointer;
      line-height: 40px;
      text-align: center;
      border-radius: 3px;
      font-size: 16px;
    }
  }
  .right-content {
    width: 980px;
    float: right;
    background-color: #fff;
    .searchbox {
      .el-input__icon {
        line-height: 30px;
      }
      .search-btn {
        display: inline-block;
        width: 80px;
        height: 30px;
        margin-left: 20px;
        line-height: 30px;
        text-align: center;
        background-color: #379dea;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
    }
        .searchtype {
            padding: 20px 15px;
            margin-left: auto;
            margin-right: auto;
            .searchitem {
                display: flex;
                margin-bottom: 10px;
                &:last-child {
                    margin-bottom: 0;
                }
                > h3 {
                    width: 100px;
                    font-size: 16px;
                    color: #333333;
                    line-height: 30px;
                    flex-shrink: 0;
                }
                > ul {
                    display: flex;
                    flex-wrap: wrap;
                    > li {
                        padding: 0 10px;
                        height: 30px;
                        line-height: 30px;
                        margin-right: 10px;
                        cursor: pointer;
                        border-radius: 2px;
                        &.active {
                            background-color: #379dea;
                            color: #fff;
                        }
                    }
                }
            }
        }
  }
  .rightlist {
    // width: 940px;
    border-bottom: 1px solid #eee;
    > li {
      padding: 20px 20px;
      border-top: 1px solid #eee;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 6px 0 #ccc;
      }
    }
    > p {
      font-size: 13px;
      color: #333;
      line-height: 24px;
    }
    .topcont {
      // margin-bottom: 10px;
      color: #999;
      .picbox {
        width: 152px;
        height: 152px;
        // background-color: #ccc;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
      .intr {
        h3 {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          line-height: 20px;
          margin-bottom: 10px;
          color: #333;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .info {
          height: 140px;
          > li {
            float: left;
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 6px;
            height: 18px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 18px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
        .state {
          display: inline-block;
          width: 60px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 12px;
          color: #fff;
          background-color: #379dea;
          border-radius: 10px;
          vertical-align: middle;
        }
        .tit {
          display: inline-block;
          max-width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 20px;
          vertical-align: middle;
        }
        .collect {
          float: right;
          vertical-align: middle;
          line-height: 20px;
          i {
            color: #379dea;
          }
        }
      }
    }
  }
  .mypagination {
      padding: 20px 0;
      overflow: hidden;
  }
}
</style>
