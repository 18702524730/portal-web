<template>
  <div id="insuranceOrgDetails">
    <a-spin size="large" :spinning="loading">
      <div class="container">
        <a-card class="my-card">
          <a-row type="flex">
            <a-col class="my-img">
              <img :src="getImgNewView(item.logo)" alt="产品" :onerror="'https://img.yzcdn.cn/vant/cat.jpeg'">
            </a-col>
            <a-col class="my-content">
              <h3>{{item.name}}</h3>
              <a-row class="img-content" :style="{width:'114px'}">
                <img
                  :src="require(item.isRealName === '0'?'../../assets/images/financial/g42.png' : '../../assets/images/financial/g41.png')"
                  alt="认证情况">
              </a-row>
              <p>成立时间：{{item.startDate | changeDate}}</p>
            </a-col>
          </a-row>
        </a-card>

        <tab-card-template tab-title="机构简介" style="margin-bottom: 10px">
          <template slot="content">
            <div style="margin-top: 10px">
              <p style="white-space: pre-wrap;word-break: break-all;overflow-x: auto" v-html="item.introduction">
              </p>
            </div>
          </template>
        </tab-card-template>
        <tab-card-template tab-title="主营业务" style="margin-bottom: 10px">
          <template slot="content">
            <div style="margin-top: 10px">
              <p style="white-space: pre-wrap;word-break: break-all;overflow-x: auto" v-html="item.business">
              </p>
            </div>
          </template>
        </tab-card-template>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import TabCardTemplate from '../../components/table/TabCardTemplate'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'InsuranceOrgDetails',
    components: { TabCardTemplate },
    data() {
      return {
        item: {
          id: this.$route.query.id
        },
        url: '/zscq/portal/ipManage/orgInsuranceDetail',
        loading: false
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      getImgNewView,
      async loadData() {
        this.loading = true
        const res = await getActionUpdateKeyword(this.url, { id: this.item.id })
        if (res.success) {
          this.item = res.result
          console.info(this.item)
        } else {
          this.$message.error(res.message)
        }
        this.loading = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #insuranceOrgDetails {
    background-color: @main-bg-color;
    padding-bottom: 10px;
    overflow: hidden;
    .main-css();
    .my-card {
      margin-bottom: 10px;
    }
    .my-img {
      width: 235px;
      height: 110px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .my-content {
      width: 77%;
      padding-left: 20px;
      h3 {
        margin-bottom: 20px;
      }
      p {
        display: flex;
        margin: 0;
      }
      .img-content {
        height: 23px;
        margin-bottom: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    p {
      white-space: normal;
    }
  }
</style>