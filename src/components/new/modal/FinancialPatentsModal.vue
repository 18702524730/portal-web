<template>
  <div id="financialPatentsModal">
    <a-modal
      :footer="null"
      :title="modalType?'请选择需质押的专利':'按专利号搜索'"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="870px"
      :maskClosable="false">
      <a-form-model layout="inline" :model="formParam" class="my-model" ref="ruleForm" v-if="modalType">
        <a-row type="flex">
          <a-col style="width: 40%">
            <a-form-model-item label="申请（专利）号" prop="applyNo">
              <a-input v-model="formParam.applyNo"/>
            </a-form-model-item>
          </a-col>
          <a-col style="width: 30%">
            <a-form-model-item label="专利名称" prop="patentName">
              <a-input v-model="formParam.patentName"/>
            </a-form-model-item>
          </a-col>
          <a-col style="width: 30%">
            <a-form-model-item label="法律状态" prop="lawSataus">
              <j-dict-select-tag v-model="formParam.lawSataus"
                                 dictCode="patent_status"/>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row type="flex">
          <a-col style="width: 40%">
            <a-form-model-item label="专利类型" prop="patentType">
              <j-dict-select-tag v-model="formParam.patentType"
                                 dictCode="patent_type"/>
            </a-form-model-item>
          </a-col>
          <!--<a-col style="width: 30%">-->
          <!--<a-form-model-item label="专利状态" prop="patentStatus">-->
          <!--<j-dict-select-tag v-model="formParam.patentStatus"-->
          <!--dictCode="patent_status_tg"/>-->
          <!--</a-form-model-item>-->
          <!--</a-col>-->
          <a-col style="width: 30%">
            <a-form-model-item>
              <a-button type="primary" @click="searchPatent">查询</a-button>
              <a-button type="primary" @click="resetPatent">重置</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>

      </a-form-model>

      <a-spin :spinning="loading.spinning" size="large" v-else>
        <a-form-model :model="formParam" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol"
                      class="my-tow-model">
          <a-form-model-item label="申请（专利）号" prop="patentNos">
            <a-textarea :rows="5" v-model="formParam.patentNos" placeholder="请输入专利权质押登记通知书的13位质押专利号（如：2014103620773），多个专利以英文逗号,隔开"></a-textarea>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
            <a-row type="flex" justify="center">
              <a-col :span="12" class="col-btn">
                <a-button type="primary" @click="searchInputPatent">确认</a-button>
              </a-col>
              <a-col :span="12" class="col-btn">
                <a-button @click="handleCancel">取消</a-button>
              </a-col>
            </a-row>
          </a-form-model-item>
        </a-form-model>
      </a-spin>

      <a-config-provider v-if="modalType">
        <template v-if="false" #renderEmpty>
          <div style="text-align: center">
            <div class="ant-empty ant-empty-normal">
              <div class="ant-empty-image">
                <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                    <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                    <g fillRule="nonzero" stroke="#D9D9D9">
                      <path
                        d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                      <path
                        d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                        fill="#FAFAFA"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p class="ant-empty-description">暂无数据</p>
              <a @click="gotoLib" v-if="isEnterprise()">维护"我的专利库"</a>
            </div>
          </div>
        </template>
        <a-table
          :columns="patentColumns"
          :data-source="data"
          size="small"
          bordered
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelecteChange,columnWidth:30}"
          :pagination="ipagination"
          :loading="loading"
          @change="handleTableChange"
          id="my-table"
          rowKey="key"
        >
          <template slot="action" slot-scope="text,record">
            <a @click="importPatent('one',record)" class="my-action">导入</a>
            <a @click="viewPatent(record)" class="my-action">查看</a>
          </template>

          <template slot="patentName" slot-scope="text, record">
          <span>
            <a-tooltip placement="top" :title="text" class="span-data" style="-webkit-box-orient: vertical;">
              {{text}}
            </a-tooltip>
          </span>
          </template>
          <template slot="applyer" slot-scope="text, record">
          <span>
            <a-tooltip placement="top" :title="text" class="span-data" style="-webkit-box-orient: vertical;">
              {{text}}
            </a-tooltip>
          </span>
          </template>

        </a-table>
      </a-config-provider>

      <a-row class="my-btn-group" v-if="modalType">
        <a-button class="cannel-btn" @click="handleCancel">取消</a-button>
        <a-button class="import-btn" @click="importPatent('more')" type="danger" :disabled="selectedRowKeys.length < 1">
          导入
        </a-button>
      </a-row>
    </a-modal>

    <a-modal v-model="visible2" title="导入结果提示" @cancel="promptBtn">
      <template slot="footer">
        <a-button @click="promptBtn">取消</a-button>
      </template>
      <a-row :gutter="12" class="my-success-row">
        <a-col :span="5">
          导入成功：
        </a-col>
        <a-col :span="19">
          <a-row>
            {{successArr.length}}条
          </a-row>
          <a-row>
            {{successArr.join(',')}}
          </a-row>
        </a-col>
      </a-row>

      <a-row :gutter="12">
        <a-col :span="5">
          导入失败：
        </a-col>
        <a-col :span="19">
          <a-row>
            {{failArr.length}}条
          </a-row>
          <a-row>
            {{failArr.join(',')}}
          </a-row>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  import { filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import JDictSelectTag from '../../general/JDictSelectTag'
  import { postAction } from '@/api/manage'
  import { isEnterprise } from '@/utils/role'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: 'FinancialPatentsModal',
    components: { JDictSelectTag },
    props: {},
    data() {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        visible: false,
        visible2: false,
        confirmLoading: false,
        customize: false,
        patentColumns: [
          {
            title: '申请（专利）号',
            dataIndex: 'applyNo',
            key: 'applyNo',
            align: 'center',
            width: 160
          },
          {
            title: '专利名称',
            dataIndex: 'patentName',
            key: 'patentName',
            scopedSlots: { customRender: 'patentName' },
            align: 'center',
            width: 160
          },
          {
            title: '申请日',
            dataIndex: 'applyDate',
            key: 'applyDate',
            align: 'center',
            width: 110
          },
          {
            title: '专利类型',
            dataIndex: 'patentTypeName',
            key: 'patentTypeName',
            align: 'center',
            width: 90
          },
          {
            title: '法律状态',
            dataIndex: 'lawSatausName',
            key: 'lawSatausName',
            align: 'center',
            width: 80
          },
          {
            title: '申请人',
            dataIndex: 'applyer',
            key: 'applyer',
            scopedSlots: { customRender: 'applyer' },
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
        inputData: [],

        url: '/trusteeship/portalPatentTrusteeship/pledgeTrusteeshipPatentList',
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
          applyNo: '',
          applyNos: '',
          announcementCodes: '',
          existsApplyNos: '',
          patentName: '',
          lawSataus: '',
          patentType: '',
          patentStatus: '',
          patentNos: ''
        },
        modalType: true,
        portalUrl: '/trusteeship/portalPatentTrusteeship/searchPatentsByPatentNos',


        allArr: [],
        successArr: [],
        failArr: []
      }
    },
    created() {

    },
    methods: {
      isEnterprise,
      gotoLib() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const path = '/trusteeship/portalPatentTrusteeship/list'
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl)
      },
      showModal(applyNos, announcementCodes, type) {
        this.visible = true
        this.formParam.applyNos = applyNos
        this.formParam.announcementCodes = announcementCodes
        this.formParam.existsApplyNos = applyNos
        this.modalType = type
        if (this.modalType) {
          this.searchPatent()
        }
      },
      searchPatent() {
        this.ipagination.current = 1
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      searchInputPatent() {
        this.formParam.patentNos = this.formParam.patentNos.replace(/\s+/g, '')
        this.formParam.patentNos = this.formParam.patentNos.replace(/。/g, '.')

        if (this.formParam.patentNos) {
          const arr = this.formParam.patentNos.split(/[,，]/g)
          if (arr.length > 50) {
            this.$message.warning('最多输入50个申请（专利）号')
            return false
          }
          const param = this.handleParam(this.formParam)
          this.loadInputData(param)
        } else {
          this.$message.warning('请先输入申请（专利）号')
        }
      },
      resetPatent() {
        this.ipagination.current = 1
        this.$refs.ruleForm.resetFields()
        this.searchPatent()
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
        const url = this.modalType ? this.url : this.portalUrl
        const res = await postAction(url, param)
        if (res.success) {
          this.data = res.result.records
          this.ipagination.total = res.result.total
          for (const a of this.data) {
            a.key = a.applyNo + '-' + a.announcementCode
          }
        } else {
          this.$message.error(res.message)
        }
        this.loading.spinning = false
      },
      async loadInputData(param) {
        this.loading.spinning = true
        const url = this.modalType ? this.url : this.portalUrl
        console.info(param, '参数')
        const res = await postAction(url, param)
        if (res.success) {
          this.inputData = res.result.records
          for (const a of this.inputData) {
            a.key = a.applyNo + '-' + a.announcementCode
          }
          if (this.inputData.length > 0) {
            this.allArr = []
            const arr = this.formParam.patentNos.replace(/\s+/g, '').split(/[,，]/g)
            for (let item of arr){
              let resItem = ""
              if (item === ""){
                continue
              }
              if (!item.includes('.')) {
                // 没包含. 需要添加.
                item = item.slice(0, item.length - 1) + '.' + item.slice(item.length - 1)
              }
              if (!item.startsWith('CN')) {
                resItem = 'CN' + item
              } else {
                resItem = item
              }
              this.allArr.push(resItem)
            }
            for (const a of this.inputData) {
              if (!this.successArr.includes(a.applyNo)) {
                this.successArr.push(a.applyNo)
              }
            }
            this.failArr = this.allArr.filter(item => !this.successArr.includes(item))
            this.importPatent('input')
          } else {
            this.$message.warning('没有查询到相关数据')
          }
        } else {
          this.$message.error('请检查输入的专利号格式是否正确，多个专利以英文逗号,隔开')
        }
        this.loading.spinning = false
      },
      handleOk() {

      },
      handleCancel() {
        if (!this.loading.spinning){
          this.visible = false
          this.$refs.ruleForm.resetFields()
          this.onClearPatentSelected()
        }
      },
      onClearPatentSelected() {
        this.selectedRowKeys = []
        this.selectedRows = []
      },
      onSelecteChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      importPatent(type, item) {
        let arr = []
        if (type === 'more') {
          arr = [...this.selectedRows]
        } else if (type === 'input') {
          arr = [...this.inputData]
        } else {
          arr = [item]
        }
        const arrIds = arr.map(item => item.applyNo)
        this.data = this.data.filter(item => {
          if (!arrIds.includes(item.applyNo)) {
            return item
          }
        })
        let oldArr = []
        const arrNos = arr.map(item => item.applyNo)
        if (this.formParam.applyNos !== '') {
          oldArr = this.formParam.applyNos.split(',')
        }
        this.formParam.applyNos = [...oldArr, ...arrNos].join(',')

        let oldCodeArr = []
        const arrCodes = arr.map(item => item.announcementCode)
        if (this.formParam.announcementCodes !== '') {
          oldCodeArr = this.formParam.announcementCodes.split(',')
        }
        this.formParam.announcementCodes = [...oldCodeArr, ...arrCodes].join(',')

        this.$emit('func', arr)
        if (type !== 'input') {
          this.searchPatent()
        } else {
          this.loading.spinning = false
          this.handleCancel()
          this.visible2 = true
        }
      },
      promptBtn() {
        this.visible2 = false
        this.allArr = []
        this.successArr = []
        this.failArr = []
      },
      viewPatent(item) {
        console.info(item)

        const newpage = this.$router.resolve({
          name: 'PatentSearchDetail',
          params: { id: item.applyNo, country: 'CN', num: item.announcementCode, tp: '01' }
        })
        window.open(newpage.href, '_blank')
      }
    }
  }
</script>

<style scoped lang="less">
  #financialPatentsModal {

  }

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
      width: 160px;
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

  .my-tow-model {
    .ant-form-item {
      margin-bottom: 12px;
    }
  }

  .col-btn {
    text-align: center;
    button {
      width: 50%;
    }
  }

  .my-success-row {
    margin-bottom: 20px;
  }
</style>