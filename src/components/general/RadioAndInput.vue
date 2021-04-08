<template>
  <div id="radioAndInput">
    <a-radio-group :value="radioValue" @change="onChange">
      <a-radio :style="radioStyle" value="0">
        面议
      </a-radio>
      <a-radio :style="radioStyle" value="1">
        <a-input-number :style="{ width: '150px', marginLeft: 10 }" placeholder="请输入交易价格" :value="amount"
                        :disabled="radioValue !== '1'" :min="0" :max="999999999" @change="inputChange"/>
        元
        <a-button type="primary" class="my-btn" @click="cleanAmount">重置</a-button>
      </a-radio>
    </a-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'RadioAndInput',
    props: {
      radioValue: {
        type: String,
        default: ''
      },
      amount: {
        type: [Number, String],
        default: null
      },
      valueAmount: {
        type: String,
        default: ''
      }
    },
    watch: {
      amount: {
        handler(data) {
          const valueAmount = (this.radioValue === null ? '' : this.radioValue) + '-' + (this.amount === null ? '' : this.amount)
          this.$emit('update:valueAmount', valueAmount)
        },
        immediate: true
      },
      radioValue: {
        handler(data) {
          const valueAmount = (this.radioValue === null ? '' : this.radioValue) + '-' + (this.amount === null ? '' : this.amount)
          this.$emit('update:valueAmount', valueAmount)
        },
        immediate: true
      }
    },
    data() {
      return {
        radioStyle: {
          height: '30px',
          lineHeight: '30px'
        }
      }
    },
    methods: {
      inputChange(e) {
        this.$emit('update:amount', e)
      },
      onChange(e) {
        this.$emit('update:radioValue', e.target.value)
        this.$emit('update:amount', null)
      },
      cleanAmount() {
        this.$emit('update:radioValue', '')
        this.$emit('update:amount', null)
      }
    }
  }
</script>

<style scoped lang="less">
  #radioAndInput {
    .my-btn {
      margin-left: 20px;
    }
  }
</style>