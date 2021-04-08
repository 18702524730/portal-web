<template>
  <div id="projectIntegrationTable">
    <a-button class="editable-add-btn" @click="handleAdd" type="primary" v-if="haveOper">
      添加
    </a-button>
    <a-table :columns="columns" :data-source="data" bordered :pagination="false" size="small"  :scroll="{x:true}">
      <template slot="action" slot-scope="text, record">
        <a @click.prevent="delData(record)">删除</a>
      </template>

      <template slot="imgUrl" slot-scope="text, record">
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
  export default {
    name: 'ProjectIntegrationTable',
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
            title: '申请号',
            dataIndex: 'applyNo',
            key: 'applyNo',
            align: 'center'
          },
          {
            title: '权利人',
            dataIndex: 'obligee',
            key: 'obligee',
            align: 'center'
          },
          {
            title: '布图名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
          },
          {
            title: '布图文件',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            align: 'center',
            scopedSlots: { customRender: 'imgUrl' }
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
        }
      }
    },
    methods: {
      handleAdd() {
        this.$emit('func', 'integration')
      },
      addTableData(data) {
        const resArr = this.data.filter(item => item.applyNo === data.applyNo)
        if (resArr.length > 0) {
          this.$message.warning('添加的数据申请号不能相同')
          return false
        }
        this.$message.success('成功添加集成电路')
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
    td{
      white-space: nowrap;
    }
  }

</style>