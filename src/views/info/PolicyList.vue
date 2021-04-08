<template>
  <div id="policyList">
    <div class="container">
      <a-tabs type="card" class="myTabs" :activeKey="activeKey" @change="changeTab">
        <a-tab-pane :key="outItem.lawsType" :tab="outItem.lawsTypeName" v-for="(outItem,outIndex) in tabsData"
                    class="myFirstTabs">
          <a-tabs
            v-if="outItem.lawsType === '1' || outItem.lawsType === '2' || outItem.lawsType === '3' || outItem.lawsType === '4'"
            :activeKey="activeKeyChild" @change="changeChildTab" :animated="false">
            <a-tab-pane :key="item.lawsTypeChild" :tab="item.lawsTypeNameChild"
                        v-for="(item,index) in outItem.data">
              <list-card :data="data" :pagination="ipagination" :loading="loading" :change="handleTableChange"
                         @func="refresh"
                         :key-route="keyRoute" :columns="columns"></list-card>
            </a-tab-pane>
          </a-tabs>
          <list-card :data="data" :pagination="ipagination" :loading="loading" :change="handleTableChange"
                     @func="refresh"
                     :key-route="keyRoute" v-else :columns="columns"></list-card>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import ListCard from '../../components/card/ListCard'

  export default {
    name: 'PolicyList',
    components: { ListCard },
    data() {
      return {
        url: '/zscq/portal/policies/policiesRegulationsMoreList',
        tabUrl: '/zscq/portal/policies/policiesRegulationsList',
        formParam: {
          lawsType: this.$route.query.lawsType,
          lawsTypeChild: this.$route.query.lawsTypeChild,
          keyword: ''
        },
        ipagination: {
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          total: 0
        },
        loading: {
          spinning: false
        },
        data: [],
        sort: {
          publishDateSort: 'desc'
        },

        keyRoute: 'NewsConsult',
        columns: [
          {
            title: '标题',
            dataIndex: 'title',
            width: '70%',
            scopedSlots: { customRender: 'my-content' }
          },
          {
            title: '发布时间',
            dataIndex: 'releaseDate',
            sorter: true,
            width: '30%'
          }
        ],
        tabsData: [],
        activeKey: this.$route.query.lawsType,
        activeKeyChild: this.$route.query.lawsTypeChild
      }
    },
    created() {
      this.loadTabData()
      this.loadData(this.getParam(this.formParam, this.ipagination))
    },
    methods: {
      changeTab(activeKey) {
        this.activeKey = activeKey
        this.againLoad()
      },
      changeChildTab(activeKey) {
        this.activeKeyChild = activeKey
        this.againLoad()
      },
      againLoad(){
        this.formParam = {
          lawsType: this.activeKey,
          lawsTypeChild: this.activeKeyChild,
          keyword: ''
        }
        this.ipagination = {
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          total: 0
        }
        this.sort = {
          publishDateSort: 'desc'
        }
        this.loadData(this.getParam(this.formParam, this.ipagination))
      },
      refresh(keyword) {
        this.formParam.keyword = keyword
        this.ipagination.current = 1
        this.loadData(this.getParam(this.formParam, this.ipagination))
      },
      async loadTabData() {
        if (!this.tabUrl) {
          this.$message.error('url有问题!')
          return
        }
        this.loading.spinning = true
        const res = await getActionUpdateKeyword(this.tabUrl)
        if (res.success) {
          const data = res.result
          let allData = []
          allData = data.filter(item => item.lawsType === this.formParam.lawsType)
          // if (this.formParam.lawsType === '2' || this.formParam.lawsType === '3' || this.formParam.lawsType === '4') {
          //   allData = data.filter(item => item.lawsType === '2' || item.lawsType === '3' || item.lawsType === '4')
          // } else {
          // }
          this.tabsData = allData
        } else {
          this.$message.error(res.message)
        }
        console.info(res)
        console.info('wahahaha')
        this.loading.spinning = false
      },
      loadData(param) {
        if (!this.url) {
          this.$message.error('url有问题!')
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = res.result.records
            this.data.forEach(info => {
              info.key = info.id
            })
          }
          this.loading.spinning = false
        }).finally(() => {
          this.loading.spinning = false
        })
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam, this.sort)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      handleTableChange(pagination, filters, sorter) {
        if (Object.keys(sorter).length > 0) {
          this.sort.publishDateSort = sorter.order === 'ascend' ? 'asc' : 'desc'
        }
        this.ipagination = pagination
        this.loadData(this.getParam(this.formParam, this.ipagination))
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #policyList {
    background-color: #f8f8f8;
    padding-top: 10px;
    padding-bottom: 10px;
    .main-css();

    /deep/ .ant-tabs-bar {
      border-bottom: 2px solid @main-color;
      background-color: #f0f0f0;
      padding-bottom: 1px;
      font-size: 18px;
    }

    /deep/ .ant-tabs-ink-bar {
      background-color: @main-color;
    }
    /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
      font-size: 16px;
      border-radius: 0;
      color: @main-font-color;
      background: #f0f0f0;
      border-color: #ffffff;
    }
    /deep/ .ant-tabs-tab-active {
      background: @main-color !important;
      color: #ffffff !important;
    }
    .myFirstTabs {
      /deep/ .ant-tabs-bar {
        border-bottom: 1px solid #e8e8e8;
        background-color: #ffffff;
      }
      /deep/ .ant-tabs-tab-active {
        background-color: #ffffff !important;
        color: @main-color !important;
      }
      /deep/ .ant-tabs-tab:hover {
        color: @main-color;
      }
    }
  }
</style>