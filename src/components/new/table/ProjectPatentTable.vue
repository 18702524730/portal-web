<template>
  <div id="projectPatentTable">
    <a-button class="editable-add-btn" @click="handleAdd" type="primary" v-if="haveOper">
      添加
    </a-button>
    <a-table :columns="columns" :data-source="data" bordered :pagination="false" size="small" :scroll="{x:true}">
      <template slot="action" slot-scope="text, record">
        <a @click.prevent="delData(record)">删除</a>
      </template>
      <template slot="qlzm" slot-scope="text, record">
          <span>
            <a :href="urlDownload + text">{{text | changeData}}</a>
          </span>
      </template>


      <template slot="wtzm" slot-scope="text, record">
          <span>
            <a :href="urlDownload + text">{{text | changeData}}</a>
          </span>
      </template>
    </a-table>
  </div>
</template>

<script>
  import { initDictOptions, filterMultiDictText } from '@/components/dict/JDictSelectUtil'

  export default {
    name: 'ProjectPatentTable',
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      haveOper: {
        type: Boolean,
        default: false
      }
    },
    created() {
      if (this.haveOper) {
        this.columns.push(this.actionColumn)
      }
      this.initDictConfig()
    },
    data() {
      return {
        urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
        columns: [
          {
            title: '申请号',
            dataIndex: 'applyNo',
            key: 'applyNo',
            align: 'center'
          },
          {
            title: '专利权人',
            dataIndex: 'patenter',
            key: 'patenter',
            align: 'center'
          },
          {
            title: '法律状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            customRender: (t, r, index) => {
              const dict = 'patent_status'
              if (!t) {
                return ''
              } else {
                return filterMultiDictText(this.dictOptions[`${dict}`], t + '')
              }
            }
          },
          {
            title: '专利名称',
            dataIndex: 'patentName',
            key: 'patentName',
            align: 'center'
          },
          {
            title: '专利类型',
            dataIndex: 'patentType',
            key: 'patentType',
            align: 'center',
            customRender: (t, r, index) => {
              const dict = 'patent_type'
              if (!t) {
                return ''
              } else {
                return filterMultiDictText(this.dictOptions[`${dict}`], t + '')
              }
            }
          },
          {
            title: '权利证明',
            dataIndex: 'qlzm',
            key: 'qlzm',
            align: 'center',
            scopedSlots: { customRender: 'qlzm' }
          },
          {
            title: '委托证明',
            dataIndex: 'wtzm',
            key: 'wtzm',
            align: 'center',
            scopedSlots: { customRender: 'wtzm' }
          }

        ],
        actionColumn: {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        },
        dictOptions: {
          patent_type: [],
          patent_status: []
        }
      }
    },
    methods: {
      handleAdd() {
        this.$emit('func', 'patent')
      },
      addTableData(data) {
        const resArr = this.data.filter(item => item.applyNo === data.applyNo)
        if (resArr.length > 0) {
          this.$message.warning('添加的数据申请号不能相同')
          return false
        }
        this.$message.success('成功添加专利')
        this.data.push(data)
        this.$emit('update:data', this.data)
        // 添加之后出发change
        this.$emit('changeTable')
      },
      delData(data) {
        const newArr = this.data.filter(item => item.applyNo !== data.applyNo)
        this.$emit('update:data', newArr)
      },
      initDictConfig() {
        initDictOptions('patent_status').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'patent_status', res.result)
          }
        })
        initDictOptions('patent_type').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'patent_type', res.result)
          }
        })
      }
    },
    filters: {
      changeData(value) {
        if (value || value === '0') {
          const arr = value.split('/')
          if (arr.length > 0) {
            const fileNames = arr[arr.length - 1].split('.')
            const hz = fileNames[fileNames.length - 1] // 后缀名
            let lastValue = fileNames[0]
            const index = lastValue.lastIndexOf('_')
            lastValue = lastValue.substring(0, index)

            return lastValue + '.' + hz
          } else {
            return value
          }
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./table";

  /deep/ .ant-table {
    td {
      white-space: nowrap;
    }
  }
</style>