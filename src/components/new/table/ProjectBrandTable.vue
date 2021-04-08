<template>
  <div id="projectBrandTable">
    <a-button class="editable-add-btn" @click="handleAdd" type="primary" v-if="haveOper">
      添加
    </a-button>
    <a-table :columns="columns" :data-source="data" bordered :pagination="false" size="small" :scroll="{x:true}">
      <template slot="action" slot-scope="text, record">
        <a @click.prevent="delData(record)">删除</a>
      </template>

      <template slot="trademarkImgUrl" slot-scope="text, record">
         <span>
          <a :href="urlDownload + item" v-for="(item,index) in (text === undefined ? '':text).split(',')" :key="index">
            {{ item | changeData}} <br/>
          </a>
         </span>
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
    name: 'ProjectBrandTable',
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
            title: '申请号/注册号',
            dataIndex: 'applyNo',
            key: 'applyNo',
            align: 'center'
          },
          {
            title: '权利人',
            dataIndex: 'patenter',
            key: 'patenter',
            align: 'center'
          },
          {
            title: '商标类别',
            dataIndex: 'trademarkType',
            key: 'trademarkType',
            align: 'center',
            customRender: (t, r, index) => {
              const dict = 'trademark_type'
              if (!t) {
                return ''
              } else {
                return filterMultiDictText(this.dictOptions[`${dict}`], t + '')
              }
            }
          },
          {
            title: '适用范围',
            dataIndex: 'applicableField',
            key: 'applicableField',
            align: 'center'
          },
          {
            title: '商标文件',
            dataIndex: 'trademarkImgUrl',
            key: 'trademarkImgUrl',
            align: 'center',
            scopedSlots: { customRender: 'trademarkImgUrl' }
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
          trademark_type: []
        }
      }
    },
    methods: {
      handleAdd() {
        this.$emit('func', 'brand')
      },
      addTableData(data) {
        const resArr = this.data.filter(item => item.applyNo === data.applyNo)
        if (resArr.length > 0) {
          this.$message.warning('添加的数据申请号/注册号不能相同')
          return false
        }
        this.$message.success('成功添加商标')
        this.data.push(data)
        this.$emit('update:data', this.data)
      },
      delData(data) {
        const newArr = this.data.filter(item => item.applyNo !== data.applyNo)
        this.$emit('update:data', newArr)
      },
      initDictConfig() {
        initDictOptions('trademark_type').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'trademark_type', res.result)
          }
        })
      }
    },
    filters: {
      changeData(value) {
        if (value || value === '0') {
          const arr = value.split('/')
          if (arr.length > 0) {
            return arr[arr.length - 1]
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