<template>
  <div class="articlecontsebe" :class="{ haspd: from === 1 }">
    <div class="article">
      <h3>{{ info.articleTitle }}</h3>
      <div class="source">
        <span>{{ info.createTime | dateFormat }}</span>
      </div>
      <div class="cont" id="contbox" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
import filters from '@utils/filters.js'
const detailUrl = '/api/pictorial/selectIpPortraitList'
// import $ from 'jquery'
export default {
// inject: ['reload'],  
  data() {
    return {
      id: '',
      info: {},
      zb: '',
      from: 1
    }
  },
  filters: {
    dateFormat: filters.formatDate.dateFormathm
  },
  methods: {
    toback() {
      this.$router.go(-1)
    },
    getDetail() {
      const data = {
        id: this.id
      }
      this.$shttp.get(detailUrl, { params: data }).then(res => {
        const resdata = res
        this.info = resdata
      })
    }
  },
  updated() {
    var box = document.getElementById('contbox')
    var parr = box.getElementsByTagName('p')
    for (var j = 0; j < parr.length; j++) {
      if (parr[j].innerText === parr[j].innerHTML) {
        parr[j].style.justifyContent = 'flex-start'
      }
    }
  },
  created() {
    // window.scrollTo(0,0)
    this.id = this.$route.params.id
    this.getDetail()
  }
}
</script>

<style lang="less">
.articlecontsebe {
  background-color: #f5f6f7;
  padding-bottom: 50px;
  .haspd {
    padding-top: 30px;
  }
  .fromadmin {
    height: 60px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    color: #333;
    > h3 {
      max-width: 1200px;
      padding: 15px 0;
      margin: 0 auto;
      line-height: 30px;
      font-size: 14px;
      span {
        float: right;
        margin-left: 10px;
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #ccc;
        color: #999;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }
  .article {
    width: 1200px;
    margin: 0 auto;
    min-height: 800px;
    background-color: #fff;
    padding: 60px 90px;

    > h3 {
      font-size: 22px;
      color: #333;
      line-height: 30px;
      margin-bottom: 10px;
      text-align: center;
    }
    .source {
      text-align: center;
      font-size: 16px;
      color: #999;
      line-height: 22px;
      margin-bottom: 30px;
      > span:first-child {
        margin-right: 20px;
      }
    }
    .cont {
      text-indent: 2em;
      font-size: 16px;
      color: #333;
      line-height: 28px;
      p {
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      img {
        max-width: 100%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
