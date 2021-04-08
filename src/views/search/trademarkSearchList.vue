<template>
  <div class="trademarksearchlist wzWidth">
    <div v-if="loading" v-loading.fullscreen.lock="loading" element-loading-background="rgba(51, 51, 51,0.6)"></div>
    <div class="ordinary-search-trademark">
      <div class="xrightpart">
        <div class="search-box">
          <div class="left-search">
            <el-input
              placeholder="请输入要查询的内容，如申请号、公开公告号、申请（权利）人、发明人、关键字"
              v-model="patent"
              v-if="now === 1"
              @keyup.enter.native="onSearch(1)"
            >
              <el-button slot="append" @click="onSearch(1)" class="comsearchbtn"><i class="el-icon-search"></i></el-button>
            </el-input>
            <el-input
              placeholder="请输入要查询的商标名称、申请号、申请人等信息"
              v-model="mark"
              v-if="now === 2"
              @keyup.enter.native="onSearch(2)"
            >
              <el-button slot="append" @click="onSearch(2)"  class="comsearchbtn"><i class="el-icon-search"></i></el-button>
            </el-input>
            <el-input
              placeholder="请输入要查询的专利申请号，示例：200930172778"
              v-model="cont"
              v-if="now === 3"
              @keyup.enter.native="onSearch(3)"
            >
              <el-select v-model="selected" slot="prepend" placeholder="请选择" class="fl">
                <el-option value="2" label="复审无效">复审无效</el-option>
                <el-option value="1" label="裁判文书">裁判文书</el-option>
              </el-select>
              <el-button slot="append" @click="onSearch(3)"  class="comsearchbtn"><i class="el-icon-search"></i></el-button>
            </el-input>
            <div class="areas" v-if="now === 1">
              <el-row>
                <el-checkbox-group v-model="checkedCities">
                  <el-col :span="4"><el-checkbox label="cn" key="cn">国内</el-checkbox></el-col>
                  <el-col :span="6"><el-checkbox label="docdb" key="docdb">国外及港澳台地区</el-checkbox></el-col>
                </el-checkbox-group>
              </el-row>
            </div>
          </div>
          <p class="senior" @click="tosenior" v-if="now === 1">
            高级搜索
          </p>
        </div>
      </div>
    </div>
    <div>
      <div class="trademark-search-result">
        <div class="screeningbox">
          <span
            v-for="(item, index) in conditions"
            :key="index"
            :class="{ active: marknum === index }"
            @click="changecondition(item, index)"
            >{{ item.name }}</span
          >
          <span class="exportbtn" v-if="total > 0" @click="isvisible = true"><img src="@assets/img/daochu-2.png" alt="" /> <em>导出</em></span>
          <el-dialog :visible.sync="isvisible" title="批量导出" width="30%">
            <div class="exportbtnbox">
              <div class="itembox">
                <span class="left">导出方式：</span>
                <span>
                  <el-radio label="1" v-model="radios">EXCEL</el-radio>
                  <!-- <el-radio label="2" v-model="radios">全文PDF</el-radio> -->
                </span>
              </div>
              <div class="itembox">
                <span class="left">导出条数：</span>
                <span class="exportcount">
                  <input type="text" maxlength="10" v-model="startnum" @keyup="putcheck(1)" /> -
                  <input type="text" maxlength="10" v-model="endnum" @keyup="putcheck(2)" /> 条
                </span>
              </div>
              <p>备注：每次最多导出20条，每日最多可导出100条</p>
            </div>
            <div class="confirmbox">
              <span class="no" @click="quxiao">取消</span>
              <span class="yes" @click="queding">确定</span>
            </div>
          </el-dialog>
        </div>
        <div class="selected-condition">
          <div class="clearfix">
            <h3 class="fl yixuan">已选条件</h3>
            <div class="selectmark fl">
              <span v-for="(mark, key) in selectedcondition" :key="key"
                >{{ mark.typeCodeName }}<i class="closebtn" @click="close(mark, key)"><i class="el-icon-close"></i></i>
              </span>
            </div>
          </div>

          <ul class="morecondition">
            <li>
              <p class="tit">申请类别</p>
              <div class="types" :class="{ hasmore: ishasmore }">
                <span
                  v-for="(types, key) in applytype"
                  :key="key"
                  @click="addtype(types)"
                  :class="{ active: yixuantype.indexOf(types.typeCode) != -1 }"
                  >{{ types.typeCodeName }} ({{ types.num }})</span
                >
              </div>
              <div class="more" @click="changehasemore">
                <span>更多</span><i class="el-icon-arrow-down" v-if="ishasmore"></i
                ><i class="el-icon-arrow-up" v-else></i>
              </div>
            </li>
            <li>
              <p class="tit">法律状态</p>
              <div class="types" :class="{ hasmore: ishasmores }">
                <span
                  v-for="(mark, key) in markstate"
                  :key="key"
                  @click="addtype(mark)"
                  :class="{ active: yixuanstate.indexOf(mark.type) != -1 }"
                  >{{ mark.typeCodeName }} ({{ mark.num }})</span
                >
              </div>
              <div class="more" @click="changehasemores">
                <span>更多</span><i class="el-icon-arrow-down" v-if="ishasmores"></i
                ><i class="el-icon-arrow-up" v-else></i>
              </div>
            </li>
            <li>
              <p class="tit">申请年份</p>
              <div class="types" :class="{ hasmore: ishasmoret }">
                <span
                  v-for="(mark, key) in markyear"
                  :key="key"
                  @click="addtype(mark)"
                  :class="{ active: yixuanyear.indexOf(mark.typeCodeName) != -1 }"
                  >{{ mark.typeCodeName }} ({{ mark.num }})</span
                >
              </div>
              <div class="more" @click="changehasemoret">
                <span>更多</span><i class="el-icon-arrow-down" v-if="ishasmoret"></i
                ><i class="el-icon-arrow-up" v-else></i>
              </div>
            </li>
          </ul>
          <h2 class="found">
            为您找到<span>{{ total }}</span
            >个商标
          </h2>
        </div>
        <div class="middle clearfix">
          <ul class="rightlist" v-if="!loading && dataList.length">
            <li v-for="(item, key) in dataList" :key="key">
              <div class="topcont clearfix">
                <div class="picbox fl">
                  <img :src="item.logoUrl" alt="" />
                </div>
                <div class="intr fr">
                  <h3>
                    <span class="tit" @click="todetail(item)">{{ item.name }}</span>
                    <span class="collect" v-if="item.isCollect === 1" @click.stop="cancelCollect(item)"
                      ><i class="el-icon-star-on shou"></i> 取消收藏</span
                    >
                    <span class="collect" v-if="item.isCollect === 0" @click.stop="addCollect(item)"
                      ><i class="el-icon-star-off"></i> 收藏</span
                    >
                  </h3>
                  <ul class="info">
                    <li>
                      当前状态：<span class="status">{{ item.processName }}</span>
                    </li>
                    <li>
                      商品类别：<span>{{ item.typeCodeName }}</span>
                    </li>
                    <li>
                      申请号：<span>{{ item.dataId }}</span>
                    </li>
                    <li>
                      申请日期：<span>{{ item.createDate }}</span>
                    </li>
                    <li>
                      申请人：<span>{{ item.applicant }}</span>
                    </li>
                    <li>
                      初审公告日期：<span>{{ item.noticeDate }}</span>
                    </li>
                    <li>
                      注册公告日期：<span>{{ item.registerDate }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <div class="nodata" v-if="!loading && !total">
            温馨提示：暂未找到您要的搜索结果
          </div>
        </div>
        <div class="mypagination" v-if="!loading && total">
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
</template>

<script>
import { mapGetters } from 'vuex'
import { judgeState } from '@/utils/util'
import $ from 'jquery'
import rootConfig from '@config/hostConfig.js'
// import filters from '@utils/filters.js'
const listUrl = '/api/brandSearch'
const addCollectUrl = '/api/addMyCollect'
const cancelCollectUrl = '/api/cancelMyCollect'
// import VueCookie from 'vue-cookie'
// const homeUrl = CONFIG.homeUrl

export default {
  inject: ['loginNotReload'],
  data() {
    return {
      isvisible: false,
      startnum: '',
      endnum: '',
      radios: '1',
      field: 'name',
      ishasmore: true,
      ishasmores: true,
      ishasmoret: true,
      label: ['普通搜索', '高级搜索'],
      conditions: [
        { name: '近似商标', id: 'all' },
        { name: '精准商标', id: 'name' },
        { name: '申请号', id: 'data_id' },
        { name: '申请人', id: 'applicant' }
      ],
      checkedCities: ['cn', 'docdb'],
      marknum: 1,
      now: 2,
      patent: '',
      mark: '',
      cont: '',
      selected: '2',
      current: 0,
      world: false,
      selectednum: [],
      all: false,
      china: false,
      search: [
        { name: '专利检索', id: 1 },
        { name: '商标检索', id: 2 },
        { name: '判例检索', id: 3 }
      ],
      applytype: [],
      markstate: [],
      markyear: [],
      yixuantype: [],
      yixuanstate: [],
      yixuanyear: [],
      selectedcondition: [],
      pgIndex: 1,
      pgCount: 10,
      total: 0,
      dataList: [],
      loading: false,
      query: {}
    }
  },
  methods: {
    ...mapGetters(['userInfo']),
    addCollect(it) {
      const uid = judgeState()
      if (uid) {
        const data = {
          collectType: 2,
          processName: it.processName,
          logoUrl: it.logoUrl,
          typeCodeName: it.typeCodeName,
          createDate: it.createDate,
          applicant: it.applicant,
          detailId: it.detailId,
          name: it.name
        }
        this.$shttp
          .post(addCollectUrl, data)
          .then(res => {
            it.isCollect = 1
            this.$messagesebe.success('收藏成功')
          })
          .catch(err => {
            this.$messagesebe(err.response.data.msg)
          })
      } else {
        this.loginNotReload()
      }
    },
    cancelCollect(it) {
      const data = {
        collectType: 2,
        collectItemUuid: it.detailId
      }
      this.$shttp
        .put(cancelCollectUrl, data)
        .then(res => {
          it.isCollect = 0
          this.$messagesebe('取消收藏成功')
        })
        .catch(err => {
          this.$messagesebe(err.response.data.msg)
        })
    },
    quxiao() {
      this.startnum = ''
      this.endnum = ''
      this.isvisible = false
    },
    putcheck(i) {
      const reg = /[^0-9]/g
      if (i === 1) {
        this.startnum = this.startnum.replace(reg, '')
      }
      if (i === 2) {
        this.endnum = this.endnum.replace(reg, '')
      }
    },
    queding() {
      if (!this.startnum) {
        this.$messagesebe('请输入开始条数')
        return
      }
      if (!this.endnum) {
        this.$messagesebe('请输入结束条数')
        return
      }
      if (this.endnum - this.startnum > 19) {
        this.$messagesebe('每次最多导出20条')
        return
      }
      if (this.endnum - this.startnum < 0) {
        this.$messagesebe('请输入正确的开始条数和结束条数')
        return
      }
      if (this.startnum > this.total || this.endnum > this.total) {
        this.$messagesebe(`当前共${this.total}条数据，请输入有效的条数`)
        return
      }
      const uinfo = this.userInfo()
      const userId = uinfo && uinfo.id
      const count = {
        startLine: this.startnum,
        endLine: this.endnum,
        userId: userId || ''
      }
      const urldata = Object.assign({}, this.query, count)
      this.quxiao()
      const openurl = rootConfig.rootUrl + '/api/exportBrandSearch?' + $.param(urldata)
      window.open(openurl)
    },
    isIn(arr, it) {
      if (arr && arr.length) {
        for (let i = 0; i < arr.length; i++) {
          if (arr.indexOf(it) !== -1) {
            return true
          }
        }
        return false
      } else {
        return false
      }
    },
    addtype(it) {
      const type = it['tp']

      if (type === 'typeCode') {
        // if(this.yixuantype.length===0){
        //     this.yixuantype.push(it.typeCode)
        //     qobj[type] = this.yixuantype.join(',')
        // }else{
        //     if(this.isIn(this.yixuantype,it.typeCode)){
        //         return
        //     }
        //     this.yixuantype.push(it.typeCode)
        //     qobj[type] = this.yixuantype.join(',')
        // }
        if (this.isIn(this.yixuantype, it.typeCode)) {
          this.$messagesebe('您已选择该类型')
          return
        }
        this.yixuantype.push(it.typeCode)
        this.query[type] = this.yixuantype.join(',')
        console.log(this.yixuantype, it.typeCode)
      }
      if (type === 'statusName') {
        if (this.isIn(this.yixuanstate, it.type)) {
          this.$messagesebe('您已选择该类型')
          return
        }
        this.yixuanstate.push(it.type)
        this.query[type] = this.yixuanstate.join(',')
      }
      if (type === 'createYear') {
        if (this.isIn(this.yixuanyear, it.typeCodeName)) {
          this.$messagesebe('您已选择该类型')
          return
        }
        this.yixuanyear.push(it.typeCodeName)
        this.query[type] = this.yixuanyear.join(',')
      }
      this.selectedcondition.push(it)
      //     qobj['field'] = this.field
      // var data = Object.assign({},this.query,qobj)
      // this.$router.replace({query:data})
      // this.getOrderList(data)
      this.searchpage()
    },
    close(it, k) {
      // this.applytype.forEach(item=>{
      //     if(item.id===it.id){
      //         item.ischeck = false
      //     }
      // })
      // this.markstate.forEach(item=>{
      //     if(item.id===it.id){
      //         item.ischeck = false
      //     }
      // })
      // this.markyear.forEach(item=>{
      //     if(item.id===it.id){
      //         item.ischeck = false
      //     }
      // })
      this.selectedcondition.splice(k, 1)
      const type = it['tp']

      if (type === 'typeCode') {
        for (let i = 0; i < this.yixuantype.length; i++) {
          if (this.yixuantype[i] === it['typeCode']) {
            this.yixuantype.splice(i, 1)
          }
        }
        this.query[type] = this.yixuantype.join(',')
        if (!this.yixuantype.length) {
          delete this.query['typeCode']
        }
      }
      if (type === 'statusName') {
        for (let i = 0; i < this.yixuanstate.length; i++) {
          if (this.yixuanstate[i] === it['type']) {
            this.yixuanstate.splice(i, 1)
          }
        }
        this.query[type] = this.yixuanstate.join(',')
        if (!this.yixuanstate.length) {
          delete this.query['statusName']
        }
      }
      if (type === 'createYear') {
        for (let i = 0; i < this.yixuanyear.length; i++) {
          if (this.yixuanyear[i] === it['typeCodeName']) {
            this.yixuanyear.splice(i, 1)
          }
        }
        this.query[type] = this.yixuanyear.join(',')
        if (!this.yixuanyear.length) {
          delete this.query['createYear']
        }
      }
      //     qobj['field'] = this.field
      // var data = Object.assign({},this.query,qobj)
      // this.$router.replace({query:data})
      // this.getOrderList(data)
      this.searchpage()
    },
    changehasemore() {
      this.ishasmore = !this.ishasmore
    },
    changehasemores() {
      this.ishasmores = !this.ishasmores
    },
    changehasemoret() {
      this.ishasmoret = !this.ishasmoret
    },
    changecondition(it, i) {
      this.marknum = i
      this.field = it.id
      this.resets()
      this.searchpage()
      // var ret = {};
      // ret.pgIndex = 1;
      // ret.pgCount = this.pgCount;
      // ret.field = this.field;
      // ret['q'] = this.mark;
      // var data = Object.assign({},ret);
      // this.query = data;
      // this.$router.replace({query:data})
      // this.getOrderList(data)
    },
    onSearch(num) {
      const re = {}
      if (num === 1) {
        if (!this.patent) {
          this.$messagesebe('请输入内容查询')
          return
        }
        re.all = this.patent
        re.searchType = 1
        if (this.checkedCities.length === 0 || this.checkedCities.length === 2) {
          re.category = ''
        } else {
          re.category = this.checkedCities[0]
        }
        // re.searchType =1
        // this.$store.dispatch('set_patent',re)
        // this.$nextTick(()=>{
        //     this.$router.push({name:'patentsearch'})
        // })

        this.$router.push({ path: 'patentsearch', query: re })
      }
      if (num === 2) {
        if (!this.mark) {
          this.$messagesebe('请输入内容查询')
          return
        }
        this.resets()
        this.searchpage()
        // var ret = {};
        // ret.pgIndex = 1;
        // ret.pgCount = this.pgCount;
        // ret.field = this.field;
        // ret['q'] = this.mark;
        // var data = Object.assign({},ret);
        // this.query = data;
        // this.$router.replace({query:data})
        // this.getOrderList(data)
      }
      if (num === 3) {
        if (!this.cont) {
          this.$messagesebe('请输入要查询的专利申请号')
          return
        }
        re.applicationDocNum = this.cont
        if (this.selected === 1) {
          this.$router.push({ path: 'panli', query: re })
        }
        if (this.selected === 2) {
          this.$router.push({ path: 'fushen', query: re })
        }
      }
    },
    tosenior() {
      this.$router.push({ name: 'seniorsearch', params: { type: 1 } })
    },
    resets() {
      this.yixuantype = []
      this.yixuanstate = []
      this.yixuanyear = []
      this.selectedcondition = []
      this.pgIndex = 1
      delete this.query['typeCode']
      delete this.query['statusName']
      delete this.query['createYear']
    },
    xuanze(it) {
      this.now = it.id
    },
    todetail(it) {
      const url = `/portal/search/trademark-searchdetail/${it.detailId}`
      window.open(url)
    },
    changeitem(it) {
      it.show = !it.show
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
      if (re['q']) {
        this.mark = re['q']
      }
      this.query = re
    },
    handleCurrentChange(i) {
      this.pgIndex = i
      // this.query.pgIndex = i;
      // this.query.pgCount = this.pgCount;
      // this.$router.replace({query: this.query})
      // this.getOrderList(this.query);
      this.searchpage()
    },
    ranNum(n) {
      var t = ''
      for (var i = 0; i < n; i++) {
        t += String(Math.floor(Math.random() * 10))
      }
      return t
    },
    changeStr(str,index,changeStr) {    
      return str.substr(0,index) + changeStr + str.substr(index + changeStr.length)
    },
    searchpage() {
      // var ret = {};
      // ret.pgIndex = this.pgIndex;
      // ret.pgCount = this.pgCount;
      // ret.field = this.field;
      // ret['q'] = this.mark;
      // var data = Object.assign({},ret);
      // this.$router.replace({query:data})
      // this.getOrderList(data)
      this.query.field = this.field
      this.query['q'] = this.mark
      this.query.pgIndex = this.pgIndex
      this.query.pgCount = this.pgCount
      let randomKey = String(new Date().getTime())
      randomKey = randomKey.replace(/0/g,'b')
      randomKey = randomKey.replace(/1/g,'d')
      randomKey = randomKey.replace(/2/g,'1')
      randomKey = randomKey.replace(/3/g,'e')
      randomKey = randomKey.replace(/4/g,'f')
      randomKey = randomKey.replace(/5/g,'z')
      randomKey = randomKey.replace(/6/g,'3')
      randomKey = randomKey.replace(/7/g,'g')
      randomKey = randomKey.replace(/8/g,'4')
      randomKey = randomKey.replace(/9/g,'k')
      this.query.randomKey = randomKey
      var domNum = this.ranNum(10)
      this.query.secret2 = domNum
      for (var i = 0; i < domNum.length; i++) {
        if (domNum[i] === "0") {
          domNum = this.changeStr(domNum,i,'b')
        } else if (domNum[i] === '1') {
          domNum = this.changeStr(domNum,i,'d')
        } else if (domNum[i] === '2') {
          domNum = this.changeStr(domNum,i,'1')
        } else if (domNum[i] === '3') {
          domNum = this.changeStr(domNum,i,'e')
        } else if (domNum[i] === '4') {
          domNum = this.changeStr(domNum,i,'f')
        } else if (domNum[i] === '5') {
          domNum = this.changeStr(domNum,i,'z')
        } else if (domNum[i] === '6') {
          domNum = this.changeStr(domNum,i,'3')
        } else if (domNum[i] === '7') {
          domNum = this.changeStr(domNum,i,'g')
        } else if (domNum[i] === '8') {
          domNum = this.changeStr(domNum,i,'4')
        } else if (domNum[i] === '9') {
          domNum = this.changeStr(domNum,i,'k')
        }
      }
      this.query.secret1 = domNum
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
          this.pgIndex = data.pageNum || 1
          this.total = data.totalElements

          var type = data.stat.typeCode
          var state = data.stat.status
          var year = data.stat.year
          this.applytype = []
          this.markstate = []
          this.markyear = []
          type.forEach(item => {
            item['ischeck'] = false
            item['tp'] = 'typeCode'
            this.applytype.push(item)
          })
          for (var x in state) {
            if (x && state.hasOwnProperty(x)) {
              const arr = x.split('_')
              this.markstate.push({
                typeCodeName: arr[1],
                num: state[x],
                tp: 'statusName',
                type: arr[0] || 30001
              })
            }
          }
          for (var y in year) {
            if (y && year.hasOwnProperty(y)) {
              this.markyear.push({
                typeCodeName: y,
                num: year[y],
                tp: 'createYear'
              })
            }
          }
        })
        .catch(err => {
          this.loading = false
          this.$messagesebe.error(err.response.data.msg)
        })
    }
  },
  mounted() {
    this.getquery()
    this.resets()
    this.searchpage()
    //  window.parent.postMessage(
    //     document.documentElement.scrollHeight + 'px',
    //     '*'
    // );
    // console.log(document.documentElement.scrollHeight)
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/common';
.trademarksearchlist {
  
  .trademark-search-result {
    padding-bottom: 50px;
    background-color: #fff;
    .top {
      padding: 20px 0 10px;
      border-bottom: 1px solid #eee;
    }
    .middle {
      padding-top: 10px;
      .nodata {
        width: 100%;
      }
    }
    .selected-condition {
      background-color: #eee;
      padding: 10px 20px;
      margin-bottom: 10px;
      .yixuan {
        line-height: 30px;
        width: 100px;
      }
      .morecondition {
        margin-bottom: 10px;
        font-size: 14px;
        > li {
          display: -webkit-box;
          display: -moz-box;
          display: -webkit-flex;
          display: -moz-flex;
          display: -ms-flexbox;
          display: flex;
          justify-content: space-between;
          /* margin-bottom: 10px; */
          font-size: 14px;
          .tit {
            color: #666;
            width: 100px;
            line-height: 30px;
          }
          .types {
            width: 1000px;
            color: #333;
            font-weight: 500;
            span {
              display: inline-block;
              height: 30px;
              padding: 0 5px;
              line-height: 30px;
              margin-right: 20px;
              white-space: nowrap;
              cursor: pointer;
              font-size: 14px;
              /* margin-bottom: 5px; */
            }
            span.active {
              color: orangered;
            }
          }
          .hasmore {
            height: 30px !important;
            overflow: hidden !important;
          }
          .more {
            line-height: 30px;
            width: 60px;
            text-align: right;
            cursor: pointer;
            font-size: 14px;
          }
        }
      }
      .found {
        text-align: right;
        font-size: 14px;
        color: #333;
        border-top: 1px solid #ccc;
        padding-top: 10px;
        span {
          color: #379dea;
        }
      }
      .selectmark {
        width: 1000px;
        span {
          position: relative;
          float: left;
          padding-left: 10px;
          padding-right: 25px;
          height: 30px;
          line-height: 30px;
          background-color: orangered;
          text-overflow: ellipsis;
          color: #fff;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .closebtn {
          position: absolute;
          right: 5px;
          top: 10px;
          width: 10px;
          height: 10px;
          cursor: pointer;
          > i {
            float: left;
          }
        }
      }
    }

    .rightlist {
      > li {
        padding: 10px 20px;
        border: 1px solid #eee;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        color: #999;
      }
      .topcont {
        color: #999;
        .picbox {
          width: 100px;
          height: 100px;
          /* background-color: #ccc; */
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
        .intr {
          width: 1040px;
          h3 {
            padding-top: 10px;
            color: #333;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .info {
            > li {
              float: left;
              width: 25%;
              height: 20px;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 12px;
              color: #999;
              &:last-child {
                margin-bottom: 0;
              }
              span {
                color: #333;
                font-weight: bold;
              }
              span.status {
                color: #379dea;
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
            cursor: pointer;
          }
          .collect {
            float: right;
            vertical-align: middle;
            line-height: 20px;
            cursor: pointer;
            font-size: 14px;
            .shou {
              color: #379dea;
            }
          }
        }
      }
    }
    .screening {
      display: inline-block;
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #379dea;
      color: #379dea;
      font-size: 14px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .screeningbox {
      height: 40px;
      padding: 5px 10px;
      background-color: #efefef;
      margin-bottom: 20px;
      > span {
        float: left;
        padding: 0 20px 0 10px;
        line-height: 30px;
        height: 30px;
        color: #999;
        font-size: 12px;
        margin-right: 10px;
        cursor: pointer;
        &.active {
          color: #379dea;
        }
      }
      .exportbtn {
        float: right;
        padding: 0;
        img {
          vertical-align: middle;
          width: 16px;
          height: 16px;
        }
        em {
          font-style: normal;
          vertical-align: middle;
        }
      }
      .confirmbox {
        padding: 10px 0;
        text-align: right;
        span {
          display: inline-block;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          border-radius: 4px;
        }
        .no {
          margin-right: 20px;
          border: 1px solid #379dea;
          color: #379dea;
        }
        .yes {
          background-color: #379dea;
          color: #fff;
        }
      }
      .exportbtnbox {
        padding-bottom: 30px;
        border-bottom: 1px solid #eee;
        p {
          font-size: 12px;
          color: #999;
          padding-left: 20px;
        }
        .itembox {
          margin-bottom: 20px;
          padding-left: 20px;
          .left {
            margin-right: 20px;
            line-height: 20px;
          }
          .left:before {
            content: '*';
            color: red;
          }
        }
        .exportcount {
          min-width: 220px;
          white-space: nowrap;
          line-height: 24px;
          input {
            width: 100px;
            height: 28px;
            padding: 4px;
            border: 1px solid #eee;
          }
        }
      }
    }
  }

  .ordinary-search-trademark {
    padding-top: 60px;
    padding-bottom: 40px;
    background-color: #fff;
    .el-select .el-input {
      width: 100px;
      height: 40px;
    }
    .el-input .el-input__inner {
      height: 40px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
    .comsearchbtn {
      width: 60px;
      height: 40px;
      text-align: center;
    }
  }
  .search-box {
    display: flex;
    width: 700px;
    margin: 0 auto;
    justify-content: space-between;
    .senior {
      line-height: 40px;
      color: #379dea;
      cursor: pointer;
      font-size: 16px;
    }
  }
  .left-search {
    width: 600px;
  }
  .search-select {
    width: 700px;
    height: 40px;
    /* margin-bottom: 10px; */
    font-size: 0;
    span {
      float: left;
      width: 102px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #eee;
      font-size: 14px;
      cursor: pointer;
    }
    span.active {
      border: none;
      background-color: #379dea;
      color: #fff;
    }
  }
  .areas {
    width: 700px;
    padding-top: 10px;
    margin: 0 auto;
    .ant-checkbox-group {
      width: 100%;
    }
  }
}
</style>
