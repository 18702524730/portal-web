<template>
  <div id="otherTable">
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

  export default {
    name: 'OtherTable',
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
    },
    data() {
      return {
        urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
        columns: [
          {
            title: '知识产权名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
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
        this.$emit('func', 'other')
      },
      addTableData(data) {
        const resArr = this.data.filter(item => item.name === data.name)
        if (resArr.length > 0) {
          this.$message.warning('已经存在该知识产权名称')
          return false
        }
        this.$message.success('成功添加其他知识产权')
        this.data.push(data)
        this.$emit('update:data', this.data)
      },
      delData(data) {
        const newArr = this.data.filter(item => item.applyNo !== data.applyNo)
        this.$emit('update:data', newArr)
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