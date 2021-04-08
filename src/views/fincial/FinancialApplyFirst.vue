<template>
  <div id="financialApplyFirst">
    <a-row :gutter="12" class="my-head" type="flex" align="middle">
      <a-col :span="16" class="my-brand-btn">
        <span class="head-span">拟质押的专利：</span>
        <a-button type="primary" size="small" @click="showModal(true)">按企业搜索</a-button>
        <a-button type="primary" size="small" @click="showModal(false)">按专利号搜索</a-button>
        <a-button type="primary" size="small" :disabled="selectedPatentRowKeys.length < 1" @click="delSomePatent">删除
        </a-button>
      </a-col>
      <a-col :span="8" class="hint-span">
        <span>
          提示：最终质押的专利，以您签订的质押登记合同为准。
        </span>
      </a-col>
    </a-row>

    <a-row class="my-table-patent">
      <a-table
        :columns="patentColumns"
        :data-source="portalPledgePatents"
        size="small"
        bordered
        rowKey="key"
        :pagination="false"
        :rowSelection="{selectedRowKeys: selectedPatentRowKeys, onChange: onSelectPatentChange}">
        <template slot="action" slot-scope="text,record">
          <a @click="delPatent(record)" class="my-action">删除</a>
          <a @click="viewPatent(record)" class="my-action">查看</a>
        </template>

        <!--<template slot="patentName" slot-scope="text, record">-->
        <!--<span>-->
        <!--<a-tooltip placement="top" :title="text" class="span-data" style="-webkit-box-orient: vertical;">-->
        <!--{{text}}-->
        <!--</a-tooltip>-->
        <!--</span>-->
        <!--</template>-->

        <!--<template slot="applyer" slot-scope="text, record">-->
        <!--<span>-->
        <!--<a-tooltip placement="top" :title="text" class="span-data" style="-webkit-box-orient: vertical;">-->
        <!--{{text}}-->
        <!--</a-tooltip>-->
        <!--</span>-->
        <!--</template>-->
      </a-table>
    </a-row>
    <a-divider></a-divider>

    <a-row :gutter="12" class="my-head" type="flex" align="middle">
      <a-col :span="16" class="my-brand-btn">
        <span class="head-span">拟质押的商标：</span>
        <a-button type="primary" size="small" @click="showBrandModal">按企业搜索</a-button>
        <a-button type="primary" size="small" @click="addBrandModal">按申请号搜索</a-button>
        <a-button type="primary" size="small" :disabled="selectedBrandRowKeys.length < 1" @click="delSomeBrand">删除
        </a-button>
      </a-col>
      <a-col :span="8" class="hint-span">
        <span>
          提示：最终质押的商标，以您签订的质押登记合同为准。
        </span>
      </a-col>
    </a-row>

    <a-row class="my-table-brand">
      <a-table
        :columns="brandColumns"
        :data-source="portalPledgeTrademarks"
        size="small"
        bordered
        rowKey="detailId"
        :pagination="false"
        :rowSelection="{selectedRowKeys: selectedBrandRowKeys, onChange: onSelectBrandChange}">
        <template slot="action" slot-scope="text,record">
          <a @click="delBrand(record)" class="my-action">删除</a>
          <a @click="viewBrand(record)" class="my-action">查看</a>
        </template>

        <!--<template slot="name" slot-scope="text, record">-->
        <!--<span>-->
        <!--<a-tooltip placement="top" :title="text" class="span-data" style="-webkit-box-orient: vertical;">-->
        <!--{{text}}-->
        <!--</a-tooltip>-->
        <!--</span>-->
        <!--</template>-->

        <!--<template slot="applicant" slot-scope="text, record">-->
        <!--<span>-->
        <!--<a-tooltip placement="top" :title="text" class="span-data" style="-webkit-box-orient: vertical;">-->
        <!--{{text}}-->
        <!--</a-tooltip>-->
        <!--</span>-->
        <!--</template>-->

        <template slot="logoUrl" slot-scope="text, record">
          <span>
            <el-image
              style="width: 50px;height: 50px"
              :src="text"
              fit="contain"></el-image>
          </span>
        </template>

        <span slot="registerDate" slot-scope="text,record">
          <span v-if="text !== ''">{{record.privateStartDate}}-{{record.privateEndDate}}</span>
          <span v-else>{{text}}</span>
        </span>

      </a-table>
    </a-row>

    <a-row class="my-bottom-btn">
      <a-button type="primary" @click="nextPage">下一步</a-button>
    </a-row>

    <financial-patents-modal @func="importPatents" ref="myPatents"></financial-patents-modal>
    <financial-brands-modal ref="myBrands" @func="importBrands"></financial-brands-modal>
    <!--<financial-add-brand-modal ref="addBrand" @func="importBrands"></financial-add-brand-modal>-->
    <financial-new-add-brand-modal ref="addBrand" @func="importBrands"></financial-new-add-brand-modal>
    <financial-add-patent-modal ref="addPatent" @func="importPatents"></financial-add-patent-modal>
  </div>
</template>

<script>
  import FinancialPatentsModal from '../../components/new/modal/FinancialPatentsModal'
  import FinancialBrandsModal from '../../components/new/modal/FinancialBrandsModal'
  import FinancialAddPatentModal from '../../components/new/modal/FinancialAddPatentModal'
  import FinancialNewAddBrandModal from '../../components/new/modal/FinancialNewAddBrandModal'

  export default {
    name: 'FinancialApplyFirst',
    components: { FinancialNewAddBrandModal, FinancialAddPatentModal, FinancialBrandsModal, FinancialPatentsModal },
    props: {
      portalPledgePatents: {
        type: Array,
        default: () => {
          return []
        }
      },
      portalPledgeTrademarks: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        patentColumns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
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
            ellipsis: true
          },
          {
            title: '专利类型',
            dataIndex: 'patentTypeName',
            key: 'patentTypeName',
            align: 'center',
            ellipsis: true
          },
          {
            title: '申请日',
            dataIndex: 'applyDate',
            key: 'applyDate',
            align: 'center'
          },
          {
            title: '法律状态',
            dataIndex: 'lawSatausName',
            key: 'lawSatausName',
            align: 'center',
            ellipsis: true
          },
          {
            title: '权利人',
            dataIndex: 'applyer',
            key: 'applyer',
            scopedSlots: { customRender: 'applyer' },
            align: 'center',
            ellipsis: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center'
          }
        ],
        selectedPatentRowKeys: [],
        selectedPatentRows: [],

        brandColumns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '商标',
            dataIndex: 'logoUrl',
            key: 'logoUrl',
            scopedSlots: { customRender: 'logoUrl' },
            align: 'center'
          },
          {
            title: '申请号',
            dataIndex: 'dataId',
            key: 'dataId',
            align: 'center',
            ellipsis: true
          },
          {
            title: '商标名称',
            dataIndex: 'name',
            key: 'name',
            scopedSlots: { customRender: 'name' },
            align: 'center',
            ellipsis: true
          },
          {
            title: '商标类别',
            dataIndex: 'typeCodeName',
            key: 'typeCodeName',
            align: 'center'
          },
          {
            title: '申请日期',
            dataIndex: 'createDate',
            key: 'createDate',
            align: 'center'
          },
          {
            title: '专用权期限',
            dataIndex: 'registerDate',
            key: 'registerDate',
            align: 'center',
            scopedSlots: { customRender: 'registerDate' }
          },
          {
            title: '法律状态',
            dataIndex: 'processName',
            key: 'processName',
            align: 'center'
          },
          {
            title: '权利人',
            dataIndex: 'applicant',
            key: 'applicant',
            scopedSlots: { customRender: 'applicant' },
            align: 'center',
            ellipsis: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center'
          }
        ],
        selectedBrandRowKeys: [],
        selectedBrandRows: []
      }
    },
    methods: {
      addModal() {
        const arr = this.portalPledgePatents.map(item => item.applyNo)
        this.$refs.addPatent.showModal(arr)
      },
      addBrandModal() {
        this.$refs.addBrand.showModal()
      },
      showBrandModal() {
        this.$refs.myBrands.showModal()
      },
      showModal(type) {
        const arr = this.portalPledgePatents.map(item => item.applyNo)
        const arrCode = this.portalPledgePatents.map(item => item.announcementCode)
        this.$refs.myPatents.showModal(arr.join(','), arrCode.join(','), type)
      },
      nextPage() {
        if (this.portalPledgePatents.length === 0 && this.portalPledgeTrademarks.length === 0) {
          this.$message.warning('质押的商标或专利至少上传一个')
          return false
        }
        this.$emit('nextPage')
      },
      onSelectPatentChange(selectedRowKeys, selectionRows) {
        this.selectedPatentRowKeys = selectedRowKeys
        this.selectedPatentRows = selectionRows
      },
      viewPatent(item) {
        const newpage = this.$router.resolve({
          name: 'PatentSearchDetail',
          params: { id: item.applyNo, country: 'CN', num: item.announcementCode, tp: '01' }
        })
        window.open(newpage.href, '_blank')
      },
      delPatent(item) {
        const that = this
        that.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
          onOk: function() {
            const newArr = that.portalPledgePatents.filter(a => item.applyNo !== a.applyNo)
            that.$emit('update:portalPledgePatents', newArr)
            that.onClearOneSelected(item)
            that.$message.success('删除成功')
          }
        })
      },
      importPatents(arr) {
        if (arr.length > 0) {
          for (const a of arr) {
            let contains = false
            for (let b of this.portalPledgePatents) {
              if (b.key === a.key) {
                contains = true
                break
              } else if (b.applyNo === a.applyNo) {
                contains = true
                if (b.announcementCode.slice(-1) === 'A') {
                  b = a
                  this.$emit('update:portalPledgePatents', this.portalPledgePatents)
                  break
                }
              }
            }
            if (!contains) {
              // 不包含
              a.trusteeshipId = a.id
              this.portalPledgePatents.push(a)
              this.$emit('update:portalPledgePatents', this.portalPledgePatents)
            }
          }
        }
      },
      onClearPatentSelected() {
        this.selectedPatentRowKeys = []
        this.selectedPatentRows = []
      },
      onClearOneSelected(item) {
        this.selectedPatentRowKeys = this.selectedPatentRowKeys.filter(a => a !== item.key)
        this.selectedPatentRows = this.selectedPatentRows.filter(a => a.key !== item.key)
      },
      delSomePatent() {
        const that = this
        that.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
          onOk: function() {
            const newArr = that.portalPledgePatents.filter(a => {
              let contains = false
              for (const b of that.selectedPatentRows) {
                if (a.applyNo === b.applyNo) {
                  contains = true
                  break
                }
              }
              if (!contains) {
                return a
              }
            })
            that.$emit('update:portalPledgePatents', newArr)
            that.onClearPatentSelected()
            that.$message.success('删除成功')
          }
        })
      },
      onSelectBrandChange(selectedRowKeys, selectionRows) {
        this.selectedBrandRowKeys = selectedRowKeys
        this.selectedBrandRows = selectionRows
      },
      viewBrand(item) {
        const newpage = this.$router.resolve({
          name: 'TrademarkSearchDetail',
          params: { id: item.detailId }
        })
        window.open(newpage.href, '_blank')
      },
      delBrand(item) {
        const that = this
        that.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
          onOk: function() {
            const newArr = that.portalPledgeTrademarks.filter(a => item.detailId !== a.detailId)
            that.$emit('update:portalPledgeTrademarks', newArr)
            that.onClearOneBrandSelected(item)
            that.$message.success('删除成功')
          }
        })
      },
      importBrands(arr, flag = true) {
        if (arr.length > 0) {
          for (const a of arr) {
            let contains = false
            for (const b of this.portalPledgeTrademarks) {
              if (b.detailId === a.detailId) {
                if (flag){
                  this.$message.warning('已经导入该商标')
                }
                contains = true
                break
              }
            }
            if (!contains) {
              // 不包含
              this.portalPledgeTrademarks.push(a)
              this.$emit('update:portalPledgeTrademarks', this.portalPledgeTrademarks)
            }
          }
        }
      },
      onClearBrandSelected() {
        this.selectedBrandRowKeys = []
        this.selectedBrandRows = []
      },
      onClearOneBrandSelected(item) {
        this.selectedBrandRowKeys = this.selectedBrandRowKeys.filter(a => a !== item.detailId)
        this.selectedBrandRows = this.selectedBrandRows.filter(a => a.detailId !== item.detailId)
      },
      delSomeBrand() {
        const that = this
        that.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
          onOk: function() {
            const newArr = that.portalPledgeTrademarks.filter(a => {
              let contains = false
              for (const b of that.selectedBrandRows) {
                if (a.detailId === b.detailId) {
                  contains = true
                  break
                }
              }
              if (!contains) {
                return a
              }
            })
            that.$emit('update:portalPledgeTrademarks', newArr)
            that.onClearBrandSelected()
            that.$message.success('删除成功')
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #financialApplyFirst {
    .main-css();
    .my-head {
      padding: 20px;
      .head-span {
        color: #7f7f7f;
        font-size: 16px;
      }
      .ant-btn {
        width: 135px;
        margin: 0 10px;
      }
      .hint-span {
        text-align: center;
        color: #f59a23;
        font-size: 14px;
      }
      .my-brand-btn {
        .ant-btn {
          width: 110px;
          margin: 0 10px;
        }
      }
    }
    .my-bottom-btn {
      margin-top: 20px;
      text-align: center;
      .ant-btn {
        width: 150px;
      }
    }

    .my-action {
      display: inline-block;
      width: 60px;
    }

    /deep/ .ant-table-body {
      margin: 0;
      th {
        background-color: #f9f9f9;
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
    }

  }
</style>