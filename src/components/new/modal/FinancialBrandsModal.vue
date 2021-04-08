<template>
  <div id="financialBrandsModal">
    <a-modal
      :footer="null"
      title="请选择需质押的商标"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="870px"
      :maskClosable="false">

      <a-form-model layout="inline" :model="formParam" class="my-model"  ref="ruleForm">
        <a-row type="flex">
          <a-col style="width: 50%">
            <a-form-model-item label="企业名称/曾用名" prop="enterpriseName">
              <a-select v-model="formParam.enterpriseName" placeholder="请选择企业名称/曾用名">
                <a-select-option :value="item" v-for="(item,index) in namesArr" :key="index">
                  {{item}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col style="width: 30%">
            <a-form-model-item>
              <a-button type="primary" @click="searchPatent">查询</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>

      <a-table
        :columns="brandColumns"
        :data-source="data"
        size="small"
        bordered
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelecteChange,columnWidth:30}"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        id="my-table"
        rowKey="detailId"
      >
        <template slot="action" slot-scope="text,record">
          <a @click="importBrand('one',record)" class="my-action">导入</a>
          <a @click="viewBrand(record)" class="my-action">查看</a>
        </template>
        <template slot="dataId" slot-scope="text, record">
          <span>
            <a-tooltip placement="top" :title="text" class="span-data" style="-webkit-box-orient: vertical;">
              {{text}}
            </a-tooltip>
          </span>
        </template>
        <template slot="typeCodeName" slot-scope="text, record">
          <span>
            <a-tooltip placement="top" :title="text" class="span-data" style="-webkit-box-orient: vertical;">
              {{text}}
            </a-tooltip>
          </span>
        </template>
        <template slot="name" slot-scope="text, record">
          <span>
            <a-tooltip placement="top" :title="text" class="span-data" style="-webkit-box-orient: vertical;">
              {{text}}
            </a-tooltip>
          </span>
        </template>
        <template slot="applicant" slot-scope="text, record">
          <span>
            <a-tooltip placement="top" :title="text" class="span-data" style="-webkit-box-orient: vertical;">
              {{text}}
            </a-tooltip>
          </span>
        </template>

      </a-table>

      <a-row class="my-btn-group">
        <a-button class="cannel-btn" @click="handleCancel">取消</a-button>
        <a-button class="import-btn" @click="importBrand('more')" type="danger" :disabled="selectedRowKeys.length < 1">
          导入
        </a-button>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  import { filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'FinancialBrandsModal',
    data() {
      return {
        visible: false,
        confirmLoading: false,

        brandColumns: [
          {
            title: '申请号',
            dataIndex: 'dataId',
            key: 'dataId',
            scopedSlots: { customRender: 'dataId' },
            align: 'center',
            width: 90
          },
          {
            title: '商标名称',
            dataIndex: 'name',
            key: 'name',
            scopedSlots: { customRender: 'name' },
            align: 'center',
            width: 160
          },
          {
            title: '商标类别',
            dataIndex: 'typeCodeName',
            key: 'typeCodeName',
            scopedSlots: { customRender: 'typeCodeName' },
            align: 'center',
            width: 160
          },
          {
            title: '申请日',
            dataIndex: 'createDate',
            key: 'createDate',
            align: 'center',
            width: 110
          },
          {
            title: '法律状态',
            dataIndex: 'processName',
            key: 'processName',
            align: 'center',
            width: 80
          },
          {
            title: '权利人',
            dataIndex: 'applicant',
            key: 'applicant',
            scopedSlots: { customRender: 'applicant' },
            align: 'center',
            width: 80
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center'
          }
        ],

        data: [],
        selectedRowKeys: [],
        selectedRows: [],

        url: '/pledge/portalPledgeTrademark/list',
        ipagination: {
          current: 1,
          pageSize: 8,
          showQuickJumper: true,
          total: 0,
          showTotal: total => `总共 ${total} 条`
        },
        loading: {
          spinning: false
        },
        formParam: {
          enterpriseName: ''
        },

        namesUrl: '/org/orgView/getOrgNames',
        namesArr: []
      }
    },
    created() {

      this.loadNames()
    },
    methods: {
      showModal() {
        this.visible = true
        this.searchPatent()
      },
      searchPatent() {
        this.ipagination.current = 1
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      handleTableChange(pagination, filters, sorter) {
        this.ipagination = pagination
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      handleParam(param) {
        const that = this
        that.formParam = param

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current
        newParam.pageSize = that.ipagination.pageSize

        newParam = filterObj(newParam)
        newParam = arrayToStringObj(newParam)

        return newParam
      },
      async loadData(param) {
        this.loading.spinning = true
        const res = await getActionUpdateKeyword(this.url, param)
        console.info(res)
        console.info('哇哈哈哈')
        if (res.success) {
          this.data = res.result.records
          this.ipagination.total = res.result.total
        } else {
          this.$message.error(res.message)
        }
        this.loading.spinning = false
      },
      async loadNames() {
        const res = await getActionUpdateKeyword(this.namesUrl)
        this.namesArr = res
        if (this.namesArr.length > 0){
          this.formParam.enterpriseName = this.namesArr[0]
        }
      },
      handleOk() {

      },
      handleCancel() {
        this.visible = false
        this.$refs.ruleForm.resetFields()
        this.onClearSelected()
      },
      onClearSelected() {
        this.selectedRowKeys = []
        this.selectedRows = []
      },
      onSelecteChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      importBrand(type, item) {
        let arr = []
        if (type === 'more') {
          arr = [...this.selectedRows]
        } else {
          arr = [item]
        }
        const arrIds = arr.map(item => item.detailId)
        this.data = this.data.filter(item => {
          if (!arrIds.includes(item.detailId)) {
            return item
          }
        })
        this.$emit('func', arr)
      },
      viewBrand(item) {
        console.info(item)

        const newpage = this.$router.resolve({
          name: 'TrademarkSearchDetail',
          params: { id: item.detailId }
        })
        window.open(newpage.href, '_blank')
      }
    }
  }
</script>

<style scoped lang="less">

  /deep/ .ant-modal-title {
    text-align: center;
  }

  #my-table {
    /deep/ .ant-table-body {
      margin: 0;
      th {
        background-color: #f9f9f9;
      }
      td {
      }
      .span-data {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        /* autoprefixer: off*/
        -webkit-box-orient: vertical;
        /* autoprefixer: on*/
        -webkit-line-clamp: 1;
      }
      .my-action {
        &:nth-child(1) {
          padding-right: 5px;
        }
        &:nth-child(2) {
          padding-left: 5px;
        }
      }
    }
  }

  .my-btn-group {
    text-align: center;
    margin-top: 20px;
    .ant-btn {
      width: 100px;
      &:nth-child(1) {
        margin-right: 10px;
      }
      &:nth-child(2) {
        margin-left: 10px;
      }
    }
  }

  .my-model {
    /deep/ .ant-form-item-control {
      text-align: left;
      width: 250px;
    }
    .ant-col {
      text-align: end;
    }
    .ant-btn {
      width: 70px;
      &:nth-child(1) {
        margin-right: 10px;
      }
      &:nth-child(2) {
        margin-left: 10px;
      }
    }
    margin-bottom: 20px;
  }

</style>