<template>
  <div id="insuranceProductDetails">
    <a-spin size="large" :spinning="loading">
      <div class="container">
        <tab-card-template tab-title="基础信息" style="margin-bottom: 10px" :no-title="true">
          <template slot="content">
            <div style="margin-top: 10px">
              <a-row type="flex">
                <a-col class="my-img">
                  <img :src="getImgNewView(item.productImage)" alt="产品" :onerror="'https://img.yzcdn.cn/vant/cat.jpeg'">
                </a-col>
                <a-col class="my-content">
                  <h3>{{item.name}}</h3>
                  <p><span style="display: inline-block;width: 13%">主要服务对象：</span>
                    <span style="display: inline-block;width: 87%">{{item.serviceObjects}}</span>
                  </p>
                </a-col>
              </a-row>
            </div>
          </template>
        </tab-card-template>

        <tab-card-template tab-title="产品介绍" style="margin-bottom: 10px">
          <template slot="content">
            <div style="margin-top: 10px">
              <p v-html="item.introduction" style="white-space: pre-wrap;word-break: break-all;overflow-x: auto">
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
    name: 'InsuranceProductDetails',
    components: { TabCardTemplate },
    data() {
      return {
        item: {
          id: this.$route.query.id
        },
        url: '/zscq/portal/ipManage/productInsuranceDetail',
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

  #insuranceProductDetails {
    background-color: @main-bg-color;
    padding-bottom: 10px;
    overflow: hidden;
    .main-css();
    .my-img {
      width: 265px;
      height: 125px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .my-content {
      width: 75%;
      padding-left: 20px;
      h3 {
        margin-bottom: 1.5em;
      }
      p {
        display: flex;
        span:nth-child(1) {
          width: 100px;
        }
      }
    }
    p {
      white-space: normal;
    }
  }
</style>