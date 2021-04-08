<template>
  <div id="treeSelectForDict">
    <a-tree-select
      allowClear
      labelInValue
      :treeCheckable="treeCheckable"
      style="width: 100%"
      :disabled="disabled"
      :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
      :placeholder="placeholder"
      :value="treeValue"
      :treeData="treeData"
      :multiple="multiple"
      @change="onChange"
      @search="onSearch"
      :treeCheckStrictly="treeCheckStrictly"
    >
    </a-tree-select>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'TreeSelectForDict',
    props: {
      value: {
        type: String,
        required: false
      },
      treeCheckable: {
        type: Boolean,
        required: false,
        default: true
      },
      multiple: {
        type: Boolean,
        required: false,
        default: true
      },
      treeCheckStrictly: {
        type: Boolean,
        required: false,
        default: false
      },
      placeholder: {
        type: String,
        default: '请选择',
        required: false
      },
      dict: {
        type: String,
        default: 'belong_industry',
        required: false
      },
      pidField: {
        type: String,
        default: 'pid',
        required: false
      },
      pidValue: {
        type: String,
        default: '',
        required: false
      },
      disabled: {
        type: Boolean,
        default: false,
        required: false
      },
      hasChildField: {
        type: String,
        default: '',
        required: false
      },
      condition: {
        type: String,
        default: '',
        required: false
      },
      loadTriggleChange: {
        type: Boolean,
        default: false,
        required: false
      },
      alreadyLoad: {
        type: Array,
        default: () => {
          return []
        },
        required: false
      },
      alreadyLoadValue: {
        type: Boolean,
        default: false
      },
      disabledParent: {
        type: Boolean,
        default: false
      },
      load: {
        type: Boolean,
        default: true
      },
      datas: {
        type: Array,
        default: () => {
          return []
        }

      }
    },
    data() {
      return {
        dictUrl: '/zscq/portal/getDictInfo',
        view: '/sys/dict/loadDictItem/',
        treeData: [],
        treeValue: null,
        childItems: [],
        visible: false
      }
    },
    created() {
      this.loadData(this.dict)
    },
    methods: {
      loadItemByCode(itemList) {
        // const value = {
        //   value: key
        // }
        // if (this.treeData.length > 0) {
        //   this.onChange(value)
        // } else {
        //   const param = { code: this.dict }
        //   getActionUpdateKeyword(this.dictUrl, param).then((res) => {
        //     if (res.success) {
        //       this.treeData = res.result
        //       this.onChange(value)
        //     }
        //   })
        // }
        if (itemList.length === 0) {
          this.treeValue = null
          return
        }
        if (this.value || this.value === '0') {
          const arr = this.value.split(',')
          const value = []
          for (const a of arr) {
            value.push(itemList.filter(item => item.value === a)[0])
          }
          this.treeValue = value
        } else {
          this.treeValue = null
        }
      },
      getChildrenItems(itemList) {
        if (!itemList) {
          return
        }
        for (const a of itemList) {
          if (a.isLeaf) {
            this.childItems.push(a)
          } else {
            this.childItems.push(a)
            this.getChildrenItems(a.children)
          }
        }
      },
      loadData(code) {
        if (this.load) {
          const param = { code: code }

          getActionUpdateKeyword(this.dictUrl, param).then((res) => {
            if (res.success) {
              this.treeData = res.result
              this.getChildrenItems(this.treeData)
              this.loadItemByCode(this.childItems)
            }
          })
        } else {
          this.treeData = this.datas
          this.getChildrenItems(this.treeData)
          this.loadItemByCode(this.childItems)
        }

      },
      onChange(value) {
        if (!value) {
          this.$emit('change', '')
          this.treeValue = ''
        } else if (value instanceof Array) {
          this.$emit('change', value.map(item => item.value).join(','))
          this.treeValue = value
        } else {
          this.$emit('change', value.value, value.label)
          this.treeValue = value
        }
      },
      onSearch(value) {
        console.log(value)
      },
      getCurrTreeData() {
        return this.treeData
      }
    },
    watch: {
      // value() {
      //   // debugger
      //   // this.loadItemByCode(this.childItems)
      // },
      alreadyLoadValue(data) {
        this.loadItemByCode(this.childItems)
      },
      dict(newData, oldData) {
        this.loadData(newData)
      },
      datas: {
        handler() {
          this.loadData()
        },
        deep: true
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    }
  }

</script>

<style scoped lang="less">

</style>