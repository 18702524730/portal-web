<template>
  <div id="protectView">
    <div class="container">
      <a-spin size="large" :spinning="loading">
        <a-layout style="padding-top: 10px">
          <a-layout>
            <a-layout-sider style="margin-right: 10px;" theme="light" width="26%">
              <protect-navigation :data="data" @func="clickData"></protect-navigation>
            </a-layout-sider>
            <a-layout-content>
              <content-card :item="item"></content-card>
            </a-layout-content>
          </a-layout>

          <a-layout-footer>
            <a-row type="flex" align="middle" justify="center">
              <img src="../../assets/images/liulan.png" alt="浏览量" style="height: 16px;width: 16px;margin-right: 10px">浏览量：{{result}}
            </a-row>
          </a-layout-footer>
        </a-layout>
      </a-spin>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import ProtectNavigation from '../../components/table/ProtectNavigation'
  import ContentCard from '../../components/card/ContentCard'

  export default {
    name: 'ProtectView',
    components: { ContentCard, ProtectNavigation },
    data() {
      return {
        url: '/zscq/portal/safeguarding/safeguardingRightList',
        type: '',
        data: [],
        item: {},
        addUrl: '/zscq/portal/safeguarding/browseStatistics',
        result: 0,

        loading: false,
        allData: []
      }
    },
    created() {
    },
    methods: {
      async clickData(item) {
        this.item = item
        const res = await getActionUpdateKeyword(this.addUrl, { id: item.id })
        if (res.success) {
          this.result = res.result
        }
      },
      async loadData() {
        this.loading = true
        if (this.allData.length > 0) {
          const allObj = this.allData.filter(item => item.module === this.type)[0]
          this.data = allObj.data
          this.item = {}
        } else {
          const res = await getActionUpdateKeyword(this.url)
          if (res.success) {
            this.allData = res.result
            const resObj = res.result.filter(item => item.module === this.type)[0]
            this.data = resObj.data
            this.item = {}
          } else {
            this.$message.error(res.message)
          }
        }
        this.loading = false
      }
    },
    watch: {
      '$route': {
        handler(to, from) {
          switch (to.name) {
            case 'NewFastActivist':
              this.type = '1'
              break
            case 'MultDisputeResolution':
              this.type = '2'
              break
            case 'ActivistNetwork':
              this.type = '3'
              break
            case 'OverseasRights':
              this.type = '4'
              break
            case 'NewActivistResources':
              this.type = '5'
              break
          }
          this.loadData()
        },
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #protectView {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
    .ant-layout-sider {
      border-right: 1px solid #e8e8e8;
    }
    .ant-layout-footer {
      text-align: center;
      padding: 12px;
    }
  }
</style>