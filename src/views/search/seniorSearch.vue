<template>
  <div class="seniorsearchsebe">
    <div class="seniorconditions">
      <div class="countries">
        <div class="all">
          <el-checkbox v-model="all">全部国家和地区</el-checkbox>
        </div>
        <div class="allcountry">
          <div class="each" v-for="(item, index) in list" :key="index">
            <el-checkbox v-model="item.ischeck" @change="dosome(item)"  :title="item.valueName">
                <span class="countryiconbox" v-if="item.icon"><img :src="item.icon.replace('http://open.sipop.cn','https://ipop.scjg.xm.gov.cn')" alt=""/></span><span style="vertical-align:middle;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display:inline-block;max-width:80px;">{{ item.valueName }}</span><span style="vertical-align:middle">({{ item.value }})</span>
            </el-checkbox>
            <div style="padding-left: 30px;" v-if="item.list">
              <el-checkbox-group v-model="item.checked" @change="check(item)">
                <el-checkbox v-for="t in item.list" :label="t.value" :key="t.value">{{ t.valueName }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="tabsbtn">
          <span  @click="qiehuan('1')"  :class="{active: current === '1'}">简单检索</span>
          <span  @click="qiehuan('2')"  :class="{active: current === '2'}">高级检索</span>
          <span  @click="qiehuan('3')"  :class="{active: current === '3'}">表达式检索</span>
        </div>
        <div v-if="current === '2'" class="forms">
        <div class="forms clearfix">
          <el-form label-width="120px" :model="cobj">
            <el-col :span="12">
              <el-form-item label="申请号">
                <el-input v-model="cobj.an" class="sqh"></el-input>
                <div class="popbox">
                  <p>格式：国别代码+流水号</p>
                  <p>例：cn201210190399（无校验位）</p>
                  <p>支持模糊匹配</p>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公开(公告)号">
                <el-input v-model="cobj.pn" class="sqh"></el-input>
                <div class="popbox">
                  <p>格式：国别代码+流水号+公布级别</p>
                  <p>例：cn103483447B 或 WO2019011331A1</p>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请人/专利权人">
                <el-input v-model="cobj.applicantSearch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发明人">
                <el-input v-model="cobj.in"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请日期">
                <el-date-picker
                  v-model="date1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公开日期">
                <el-date-picker
                  v-model="date2"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称">
                <el-input v-model="cobj.ti" class="sqh"></el-input>
                <div class="popbox">
                  <p>①支持全字符匹配，支持空格输入，例如输入HPV 人乳头瘤，按HPV OR 人乳头瘤检索</p>
                  <p>②支持OR、AND、NOT运算符的使用，例如HPV OR人乳头瘤，HPV AND 疫苗</p>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="摘要">
                <el-input v-model="cobj.ab" class="sqh"></el-input>
                <div class="popbox">
                  <p>①支持全字符匹配，支持空格输入，例如输入HPV 人乳头瘤，按HPV OR 人乳头瘤检索</p>
                  <p>②支持OR、AND、NOT运算符的使用，例如HPV OR人乳头瘤，HPV AND 疫苗</p>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="权利要求">
                <el-input v-model="cobj.cl" class="sqh"></el-input>
                <div class="popbox">
                  <p>①支持全字符匹配，支持空格输入，例如输入HPV 人乳头瘤，按HPV OR 人乳头瘤检索</p>
                  <p>②支持OR、AND、NOT运算符的使用，例如HPV OR人乳头瘤，HPV AND 疫苗</p>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="IPC分类号">
                <el-input v-model="cobj.ic" class="sqh"></el-input>
                <div class="popbox">
                  <p>支持分类号完全匹配，支持空格输入，例如C07K7/06 C07K16/18，按C07K7/06 or C07K16/18检索</p>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="代理机构">
                <el-input v-model="cobj.agentOrgSearch" class="sqh"></el-input>
                <div class="popbox">
                  <p>支持全字符匹配，支持空格输入；不支持运算符</p>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="代理人名称">
                <el-input v-model="cobj.agentSearch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请人地址">
                <el-input v-model="cobj.dz" class="sqh"></el-input>
                <div class="popbox">
                  <p>支持全字符匹配，支持空格输入；不支持运算符</p>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="hasprovince">
              <el-form-item label="申请人所在省份" class="allprovince">
                <el-cascader :options="options" clearable v-model="sf"></el-cascader>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="btnbox">
          <span class="confirm" @click="haschecked">确定</span>
          <span class="reset" @click="resets">重置</span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { judgeState } from '@utils/util.js'
const cityUrl = '/api/queryProvinceCity'
const condition = {
  an: null,
  pn: null,
  applicantSearch: null,
  in: null,
  cl: null,
  ab: null,
  ic: null,
  agentOrgSearch: null,
  agentSearch: null,
  ti: null,
  dz: null
}
const treeData = [
  {
    id: 0,
    label: '全部国家',
    children: [
      {
        id: 2,
        label: '中国',
        children: [
          {
            id: 21,
            label: '发明'
          },
          {
            id: 22,
            label: '实用新型'
          },
          {
            id: 23,
            label: '外观设计'
          }
        ]
      },
      {
        id: 3,
        label: '美国'
      },
      {
        id: 4,
        label: '日本'
      },
      {
        id: 5,
        label: '韩国'
      },
      {
        id: 6,
        label: '欧专局'
      },
      {
        id: 7,
        label: '英国'
      },
      {
        id: 8,
        label: '法国'
      },
      {
        id: 9,
        label: '俄罗斯'
      },
      {
        id: 10,
        label: '其他国家和地区'
      }
    ]
  }
]

export default {
  inject: ['loginNotReload'],
  data() {
    return {
      sqh: false,
      helpshow: false,
      options: [],
      date1: '',
      date2: '',
      expression: '',
      selectopts: [
        'AND','OR','NOT'
      ],
      sf: [],
      'ap-province': '',
      'ap-city': '',
      hasprovince: true,
      all: true,
      label: ['普通搜索', '高级搜索'],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      cities: [
        { name: '国内', key: '1' },
        { name: '国外', key: '2' }
      ],
      checkedCities: [],
      cont: '',
      cobj: { ...condition },
      ishow: false,
      treeData: treeData,
      current: '2',
      
      checklist: [],
      defaultExpandedKeys: [],
      defaultCheckedKeys: [],
      checkedKeys: [],
      curSelectedSmallIdList: [],
      sqdate: 0,
      gkdate: 0,
      
      tabs: [
        { name: '简单检索', id: 1 },
        { name: '高级检索', id: 2 },
        { name: '检索式检索', id: 3 }
      ],
      list: [
        {
          field: 'dac',
          value: 'CN',
          valueName: '中国',
          count: 15329459,
          percent: '55.95',
          ischeck: false,
          checked: [],
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/CN.png',
          list: [
            { field: 'f-kind', value: '01', valueName: '发明专利', count: 9516527, percent: '62.08', icon: null },
            { field: 'f-kind', value: '02', valueName: '实用新型', count: 9516527, percent: '62.08', icon: null },
            { field: 'f-kind', value: '03', valueName: '外观设计', count: 5812932, percent: '37.92', icon: null }
          ]
        },
        {
          field: 'dac',
          value: 'US',
          valueName: '美国',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/US.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'JP',
          valueName: '日本',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/JP.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'KR',
          valueName: '韩国',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/KR.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'EP',
          valueName: '欧专局',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/EP.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'WO',
          valueName: '世界知识产权组织',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/WO.png',
          ischeck: false,
          list: null
        },
        // {
        //     field: "dac", value: "GB", valueName: "英国",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/GB.png",
        //     ischeck: false,
        //     list: null
        // },
        // {
        //     field: "dac", value: "FR", valueName: "法国",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/FR.png",
        //     ischeck: false,
        //     list: null
        // },
        // {
        //     field: "dac", value: "RU", valueName: "俄罗斯",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/RU.png",
        //     ischeck: false,
        //     list: null
        // },
        {
          field: 'dac',
          value: 'ELSE',
          valueName: '其他国家和地区',
          count: 1559,
          percent: '5.95',
          icon: null,
          ischeck: false,
          list: null
        }
      ]
      
    }
  },
  watch: {
    all() {
      this.list.forEach(item => {
        item.ischeck = this.all
        this.dosome(item)
        if (item.ischeck) {
          const arr = []
          if (item.list) {
            item.list.forEach(it => {
              if (this.all) {
                arr.push(it.value)
              }
            })
          }
          item.checked = arr
        } else {
          item.checked = []
        }
      })
    }
  },
  methods: {
    
    getcity() {
      this.$shttp.get(cityUrl).then(res => {
        console.log(res)
        this.options = res
      })
    },
    doshow() {
      console.log(11111)
    },
    qiehuan(num) {
      
      if (num === '1') {
        this.$router.push({ name: 'PatentSearchShiBei' })
      } 
      if (num === '3') {
        if (!judgeState()) {
          this.loginNotReload()
          return
        }
        this.$router.push({ name: 'ExpressionSearchShibei' })
      }
    },
    getkeys() {
      const re = []
      let type = []
      this.list.forEach(item => {
        if (item.ischeck) {
          re.push(item.value)
          if (item.checked && item.checked.length) {
            type = [...item.checked]
          }
        }
      })
      return { re, type }
    },
    dosome(it) {
      if (it.value === 'CN') {
        if (it.ischeck) {
          this.hasprovince = true
          const arr = []
          if (it['list'] && it['list'].length > 0) {
            it['list'].forEach(w => {
              arr.push(w['value'])
            })
          }
          it.checked = arr
        } else {
          this.hasprovince = false
          it.checked = []
        }
      }
    },
    haschecked() {
      const re = this.getkeys().re
      const type = this.getkeys().type
      if (this.date1) {
        this.cobj.applicationDateStart = this.totimestamp(this.date1[0])
        this.cobj.applicationDateEnd = this.totimestamp(this.date1[1])
      }
      if (this.date2) {
        this.cobj.publishDateStart = this.totimestamp(this.date2[0])
        this.cobj.publishDateEnd = this.totimestamp(this.date2[1])
      }
      if (this.sf.length) {
        if (this.sf.length === 1) {
          this.cobj['apProvince'] = this.sf[0]
        }
        if (this.sf.length === 2) {
          this.cobj['apProvince'] = this.sf[0]
          this.cobj['apCity'] = this.sf[1]
        }
      }

      const aa = this.isempty(this.cobj)
      if (aa) {
        this.$messagesebe('请输入一个筛选条件')
        return
      }
      this.cobj.searchType = 2
      if (re.length) {
        const str = re.join(',')
        this.cobj.dac = str
      }
      if (type.length) {
        const strt = type.join(',')
        this.cobj['fKind'] = strt
      }
      // this.$store.dispatch('set_patent', this.cobj);
      // this.$nextTick(()=>{
      //     this.$router.push({name:'patentsearch'})
      // })
      this.$router.push({ path: '/portal/search/patent-searchlist', query: this.cobj })
      console.log(re, type)
      console.log(this.cobj)
    },
    totimestamp(t) {
      var date = new Date(t)
      return t ? date.getTime() : null
    },
    isempty(obj) {
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          if (obj[p]) {
            return false
          }
        }
      }
      return true
    },
    resets() {
      this.cobj = { ...condition }
      this.date1 = ''
      this.date2 = ''
      this.sf = []
      this.checkall()
    },
    check(it) {
      if (it['checked'].length > 0) {
        it['ischeck'] = true
        this.hasprovince = true
      } else {
        it['ischeck'] = false
        this.hasprovince = false
      }
    },
    checkall() {
      if (this.all) {
        this.hasprovince = true
        this.list.forEach(item => {
          item.ischeck = this.all
          if (item.list) {
            item.list.forEach(it => {
              if (this.all) {
                item.checked.push(it.value)
              } else {
                item.checked = []
              }
            })
          }
        })
      }
    },
    sethover() {
      const sqh = document.querySelectorAll('.sqh')
      const sqhbox = document.querySelectorAll('.popbox')
      const len = sqh.length

      for (let i = 0; i < len; i++) {
        let timer = null
        sqh[i].onmouseover = function() {
          clearTimeout(timer)
          sqhbox[i].style.display = 'block'
        }
        sqh[i].onmouseout = function() {
          timer = setTimeout(() => {
            sqhbox[i].style.display = 'none'
          }, 200)
          sqhbox[i].onmouseover = function() {
            clearTimeout(timer)
            this.style.display = 'block'
          }
          sqhbox[i].onmouseout = function() {
            timer = setTimeout(() => {
              this.style.display = 'none'
            }, 100)
          }
        }
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.checkall()
    this.getcity()
    if (this.current === '2') {
      this.sethover()
    }
  }
}
</script>

<style lang="less">
.countryiconbox {
  display: inline-block;
  width: 20px;
  height: 19px;
  padding: 2px 0;
  margin-right: 10px;
  margin-left: 5px;
  vertical-align: middle;
  img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
}
.el-scrollbar__wrap {
  max-height: 600px;
}
.seniorsearchsebe {
  width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
  background-color: #fff;
  
  .el-input {
    position: relative;
  }
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
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  
  .tabsbtn {
    margin-bottom: 20px;
    font-size: 0;
    > span {
      display: inline-block;
      width: 128px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background-color: #E9E9E9;
      color: #333;
      margin-right: 16px;
      font-size: 14px;
      cursor: pointer;
      &.active {
        background-color: #2F72D1;
        color: #fff;
      }
    }
  }
  .popbox {
    display: none;
    position: absolute;
    top: 44px;
    width: 100%;
    padding: 15px 10px;
    border-radius: 3px;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 0 0 4px #ccc;
    color: #666;
    z-index: 9;
    > p {
      line-height: 20px;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .el-cascader {
    width: 100%;
  }
}
.seniorconditions {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  .countries {
    width: 200px;
    height: 360px;
    border: 1px solid #eee;
    .el-checkbox + .el-checkbox {
      margin-left: 0;
    }
    .all {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .allcountry {
      padding: 10px;
    }
    .each {
      padding-bottom: 10px;
      &:first-child {
        border-bottom: 1px solid #eee;
      }
    }
  }
  .forms {
    width: 900px;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-range-editor.el-input__inner {
    width: 100%;
  }
  .el-date-editor .el-range-separator {
    width: 20px;
  }
}
.btnbox {
  text-align: right;
  padding-top: 30px;
  span {
    display: inline-block;
    width: 160px;
    height: 50px;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    border-radius: 4px;
  }
  .confirm {
    background-color: #379dea;
    color: #fff;
    margin-right: 50px;
  }
  .reset {
    border: 1px solid #eee;
    border-radius: 2px;
    color: #999;
  }
}
</style>
