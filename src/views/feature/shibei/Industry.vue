<template>
  <div class="industrydatabox">
    <div class="industrydata">
      <ul class="latest clearfix">
        <li v-for="(item, index) in datas" :key="index" @click="todetail(item)">
          <div class="picbox">
            <img :src="item.coverUrl" alt="" />
            <div class="titlebox">
              <h3 class="title">{{ item.title }}</h3>
            </div>
          </div>
        </li>
      </ul>
      <h2>最新专题库<span class="english">LIBRARY</span></h2>
      <ul class="cont">
        <li v-for="(item, index) in dataList" :key="index" @click="todetail(item)">
          <div class="leftpic">
            <img :src="item.coverUrl" alt="" />
          </div>
          <div class="rightcont">
            <h3>{{ item.title }}</h3>
            <p>{{ item.brief }}</p>
            <p class="time">更新时间：{{ item.updateTime | dateFormat }}</p>
          </div>
          <div class="result">
            共<span class="count">{{ item.patentCount }}</span> 项专利
          </div>
        </li>
      </ul>
      <div class="mypagination" v-if="dataList.length && !loading">
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
</template>

<script>
import { isLoginAndAdmin } from '@/utils/role'
import filters from '@utils/filters.js'
const recomUrl = '/api/findRecommend'
const listUrl = '/api/findPatentArticleList'

export default {
  data() {
    return {
      datas: [],
      dataList: [],
      pgIndex: 1,
      pgCount: 10,
      total: 0,
      loading: false,
      query: {}
    }
  },
  methods: {
    todetail(it) {
      this.$router.push({ name: 'IndustryInfo', params: { id: it.number } })
    },
    getRecom() {
      const data = {
        type: 1
      }
      this.$shttp.get(recomUrl, { params: data }).then(res => {
        this.datas = res
      }).catch(() => {})
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
    handleCurrentChange(i) {
      this.pgIndex = i
      this.searchpage()
    },
    searchpage() {
      this.query.pgIndex = this.pgIndex
      this.query.pgCount = this.pgCount
      this.query.sortType = 2
      this.query.type = 1
      this.$router.replace({ query: this.query })
      this.getOrderList(this.query)
    },
    getOrderList(paramsData) {
      paramsData = paramsData || {}
      this.loading = true
      this.$shttp
        .get(listUrl, { params: paramsData })
        .then(resp => {
          this.loading = false
          var data = resp
          var dataList = data.elements
          this.dataList = dataList
          this.pgIndex = data.pageNo || 1
          this.total = data.totalElements
        })
        .catch(err => {
          this.loading = false
          this.$message(err.response.data.msg)
        })
    }
  },
  created() {

    if (!isLoginAndAdmin()) {
      this.$router.push({ name: 'PatentShiBeiPort' })
    } else {
      this.getRecom()
      this.searchpage()
    }
  },
  filters: {
    dateFormat: filters.formatDate.datesFormat
  }
}
</script>

<style lang="less" scoped>

.industrydatabox {
  padding-top: 30px;
  padding-bottom: 50px;
  background-color: #f5f6f7;
  .el-pager li {
    background-color: #f5f6f7;
  }
  .el-pagination .btn-prev,
  .btn-next {
    background-color: #f5f6f7;
  }
  .el-pagination button:disabled {
    background-color: #f5f6f7;
  }
  .mypagination {
    position: relative;
    padding-top: 20px;
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
}
.industrydata {
  max-width: 1200px;
  margin: 0 auto;

  .latest {
    margin-bottom: 20px;
    > li {
      float: left;
      width: 285px;
      height: 285px;
      // background-color: #ccc;
      margin-right: 20px;
      margin-bottom: 10px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        box-shadow: 4px 4px 13px 0 #ccc;
      }
    }
    .picbox {
      position: relative;
      width: 285px;
      height: 285px;
      // background-color: #ccc;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
      .titlebox {
        height: 48px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 14px 20px;
        background-color: #000;
        opacity: 0.6;
      }
      .title {
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  h2 {
    height: 28px;
    margin-bottom: 20px;
    line-height: 28px;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    font-family: 'PingFangSC-Semibold', 'PingFang SC';
    .english {
      font-size: 14px;
      line-height: 20px;
      color: #999;
      font-weight: 600;
      padding-left: 10px;
    }
  }
  .cont {
    margin-bottom: 30px;
    > li {
      height: 120px;
      padding: 10px;
      margin-bottom: 20px;
      background-color: #fff;
      cursor: pointer;
      .leftpic {
        float: left;
        width: 100px;
        height: 100px;
        margin-right: 20px;
        // background-color: #ccc;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
      .rightcont {
        float: left;
        max-width: 800px;
        h3 {
          padding-top: 10px;
          margin-bottom: 10px;
          font-size: 16px;
          color: #333;
          line-height: 22px;
          font-weight: 600;
          &:hover {
            color: #2f72d1;
          }
        }
        p {
          line-height: 20px;
          font-size: 14px;
          height: 20px;
          margin-bottom: 10px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          // display: -webkit-box;
          // overflow: hidden;
          // -webkit-line-clamp: 2;
          // -webkit-box-orient: vertical;
        }
        .time {
          color: #999;
        }
      }
      .result {
        float: right;
        padding-top: 36px;
      }
      .count {
        color: #2f72d1;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  .date {
    margin-right: 20px;
  }
  .author {
    margin-right: 10px;
  }
}
</style>
