<template>
  <div id="messageSearch">
    <div class="container">
      <div style="margin-bottom: 1em;margin-top: 1em;">
        <a-row>
          <div class="innerDiv" style="padding: 0 20px;">
            <a-col :xs="6" :sm="6" :md="6" :lg="4" :xl="4">
              <order-button title="发布时间排序" @changeSort="changeTimeSort($event)"></order-button>
            </a-col>
            <a-col :xs="18" :sm="18" :md="18" :lg="20" :xl="20">
              <div style="float: right;    margin-top: 5px">
                <span style="font-size:14px;font-height:16px;vertical-align:middle;text-align:center">共计<span
                  style="color: #ff3300; padding-right: 5px;padding-left: 5px">{{ipagination.total}}</span>条</span>
              </div>
            </a-col>
          </div>
        </a-row>
      </div>

      <div>
        <message-list :data="data" :loading="loading" :pagination="ipagination"></message-list>
      </div>
    </div>
  </div>
</template>

<script>
  import { filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import OrderButton from '../../components/general/OrderButton'
  import MessageList from '../../components/table/MessageList'

  export default {
    name: 'MessageSearch',
    components: { MessageList, OrderButton },
    data() {
      return {
        data: [],
        getDataUrl: '/zscq/portal/searchInformationPageList',
        formParam: {
          keyword: ''
        },
        ipagination: {
          current: 1,
          pageSize: 12,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          spinning: false
        },
        allParam: {
          orderParam: {
            publishDateSort: ''
          }
        }
      }
    },
    created() {
      this.formParam.keyword = this.$route.query.kwtext
      const param = this.handleParam(this.formParam)
      this.loadData(param)
    },
    methods: {
      refresh(param) {
        if (param === undefined) {
          param = this.formParam
        } else {
          this.formParam.keyword = param
          param = this.formParam
        }
        const newParam = this.handleParam(param)
        this.loadData(newParam)
      },
      changeTimeSort(item) {
        this.allParam.orderParam.publishDateSort = item
      },
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      handleParam(param) {
        const that = this
        that.formParam = param

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current
        newParam.pageSize = that.ipagination.pageSize

        newParam.publishDateSort = that.allParam.orderParam.publishDateSort

        newParam = filterObj(newParam)
        newParam = arrayToStringObj(newParam)

        return newParam
      },
      loadData(param) {
        if (!this.getDataUrl) {
          this.$message.error('getDataUrl.demandUrl属性!')
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.getDataUrl, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = res.result.records
          }
          this.loading.spinning = false
        }).finally(() => {
          this.loading.spinning = false
        })
      }
    },
    watch: {
      allParam: {
        handler(newData, oldData) {
          const param = this.handleParam(this.formParam)
          this.loadData(param)
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #messageSearch {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
  }

</style>