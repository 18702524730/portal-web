<template>
  <div class="sebecomWidth">
    <div class="ordinarypsearch">
      <div class="logobox">
        <div class="logo">
          <img src="@assets/img/zl.png" alt="" />
        </div>
        <div class="textbox">
          专利检索
        </div>
      </div>
      <div class="search-box">
        <div class="left-search">
          <a-input-search
            placeholder="请输入要查询的内容，如申请号、公开公告号、申请（权利）人、发明人、关键字"
            enter-button
            class="zhuanli"
            @pressEnter="entersearch"
            @search="onSearch"
            v-model="cont"
          />
          <div class="shili">
            <div class="fl">示例</div>
            <div class="shiliright">
              <div>申请号 cn201210190399 或 cn201210190399.5</div>
              <div>公开号 cn103483447 或 WO2019011331</div>
              <div>申请人 厦门大学</div>
              <div>关键词 hpv</div>
            </div>
          </div>
        </div>
        <div class="senior">
          <span  @click="tosenior" class="jiansuo">高级搜索</span><span @click="toexpression" class="bdsjiansuo">表达式检索 <span class="new">NEW <span class="sanjiao"></span></span></span>
        </div>
      </div>

      <div class="areas">
        <a-row>
          <a-checkbox-group v-model="checkedCities" :options="options"> </a-checkbox-group>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { judgeState } from '@/utils/util'
export default {
  inject: ['loginNotReload', 'headLogin'],
  data() {
    return {
      checkedCities: ['cn', 'docdb'],
      options: [
        { label: '国内', value: 'cn' },
        { label: '国外及港澳台地区', value: 'docdb' }
      ],
      cont: ''
    }
  },
  mounted() {
    this.shilishow()
  },
  methods: {
    shilishow() {
      const zl = document.querySelector('.zhuanli input')
      const sl = document.querySelector('.shili')
      if (sl) {
        zl.onmouseover = function() {
          sl.style.display = 'block'
        }
        zl.onmouseout = function() {
          sl.style.display = 'none'
        }
      }

      const sm = document.querySelector('.shangbiao input')
      const sls = document.querySelector('.shilis')
      if (sls) {
        sm.onmouseover = function() {
          sls.style.display = 'block'
        }
        sm.onmouseout = function() {
          sls.style.display = 'none'
        }
      }
    },
    entersearch(e){
      if (!this.cont) {
        this.$messagesebe.warning('请输入内容查询')
        return
      }
      if (!judgeState()) {
        const obj = { name: 'PatentSearchList' }
        const obk = {
          'query': {
            all: this.cont,
            searchType: 1,
            category: this.checkedCities.length === 0 ? '' : this.checkedCities.length === 2 ? '' : this.checkedCities[0]
          }
        }
        this.headLogin('goto', obj ,obk)
        return
      }
      const re = {}

      re.all = this.cont
      re.searchType = 1
      if (this.checkedCities.length === 0 || this.checkedCities.length === 2) {
        re.category = ''
      } else {
        re.category = this.checkedCities[0]
      }
      console.log(re)
      this.$router.push({ name: 'PatentSearchList', query: re })
    },
    onSearch(val) {
      if (!val) {
        this.$messagesebe.warning('请输入内容查询')
        return
      }
      if (!judgeState()) {
        const obj = { name: 'PatentSearchList' }
        const obk = {
          'query': {
            all: val,
            searchType: 1,
            category: this.checkedCities.length === 0 ? '' : this.checkedCities.length === 2 ? '' : this.checkedCities[0]
          }
        }
        this.headLogin('goto', obj ,obk)
        return
      }
      const re = {}
      re.all = val
      re.searchType = 1
      if (this.checkedCities.length === 0 || this.checkedCities.length === 2) {
        re.category = ''
      } else {
        re.category = this.checkedCities[0]
      }
      console.log(re)
      this.$router.push({ name: 'PatentSearchList', query: re })
    },
    tosenior() {
      if (!judgeState()) {
        const obj = { name: 'SeniorSearchShibei' }
        this.headLogin('goto', obj)
        return
      }
      this.$router.push({ name: 'SeniorSearchShibei' })
    },
    toexpression() {
      if (!judgeState()) {
        const obj = { name: 'ExpressionSearchShibei' }
        this.headLogin('goto', obj)
        return
      }
      this.$router.push({ name: 'ExpressionSearchShibei' })
    }
  }
}
</script>
<style lang="less" scoped>
.sebecomWidth {
  width: 1200px;
  margin: 0 auto;
  .fl {
    float: left;
  }
  .shili {
    display: none;
    position: absolute;
    top: 70px;
    width: 700px;
    color: #ccc;
    font-size: 12px;
    background-color: #fff;
    z-index: 9;
  }
  .shilis {
    display: none;
    position: absolute;
    top: 48px;
    width: 700px;
    color: #ccc;
    font-size: 12px;
    background-color: #fff;
    z-index: 9;
  }
  .shiliright {
    margin-left: 50px;
  }
  .color-red {
    color: red;
  }
  .ordinarypsearch {
    padding: 120px 0 120px;
    min-height: 500px;
    background-color: #fff;
    .logobox {
      width: 240px;
      margin: 0 auto 100px;
      text-align: center;
      p {
        font-size: 20px;
        color: #001833;
        /* text-align: center; */
        line-height: 26px;
        font-weight: 600;
      }
      .textbox {
        float: left;
        padding-left: 15px;
        line-height: 34px;
        font-size: 20px;
        font-weight: bold;
        color: #000;
      }
    }
    .logo {
      float: left;
      width: 34px;
      height: 34px;
      > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .search-box {
    display: flex;
    width: 800px;
    margin: 0 auto;
    justify-content: space-between;
    .senior {
      height: 32px;
      margin: 0;
      line-height: 32px;
      color: #1890ff;
      cursor: pointer;
      font-size: 16px;
      .jiansuo {
        margin-right: 20px;
      }
      .bdsjiansuo {
        position: relative;
        .new {
          position: absolute;
          right: 0;
          top: -32px;
          width: 60px;
          height: 24px;
          text-align: center;
          line-height: 24px;
          color: #fff;
          font-size: 16px;
          background-color: #f66;
          border-radius: 2px;
          .sanjiao {
            position: absolute;
            left: 26px;
            bottom: -6px;
            width: 0;
            height: 0;
            overflow: hidden;
            border-width: 6px 6px 0;
            border-color: #f66 transparent;
            border-style: solid dashed;
          }
        }
      }
    }
  }
  .left-search {
    position: relative;
    width: 620px;
  }
  .areas {
    width: 800px;
    padding-top: 10px;
    margin: 0 auto;
    .ant-checkbox-group {
      width: 100%;
    }
  }
}
</style>
