<template>
  <a-card hoverable :style="'width: '+myWidth" @click="clickBtn">
    <div style="display:flex;align-items:center;" class="my-div">
      <span style="text-align:left;padding: 0 5px;" class="my-span">{{title}}</span>
      <span style="display:flex;flex-direction:column;justify-content:center;position:relative">
      <a-icon type="caret-up" :class="{'blue':isActiveType === '1'}"
              style="position:absolute;transform:translate(0,-30%);top: -9px;"/>
      <a-icon type="caret-down" :class="{'blue':isActiveType === '2'}"
              style="position:absolute;transform:translate(0,30%);top: -7px;"/>
    </span>
    </div>
  </a-card>
</template>

<script>
  export default {
    name: 'OrderButton',
    props: {
      title: {
        type: String,
        default: ''
      },
      myWidth: {
        type: String,
        default: '140px;'
      },
      needSort: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isActive1: false,
        isActive2: false,
        isActive: false,
        isActiveType: '0'
      }
    },
    methods: {
      clickBtn() {
        let sort = ''
        switch (this.isActiveType) {
          case '0':
            sort = 'asc'
            this.isActiveType = '1'
            break
          case '1':
            sort = 'desc'
            this.isActiveType = '2'
            break
          case '2':
            sort = ''
            this.isActiveType = '0'
            break
        }
        this.$emit('changeSort', sort)
      },
      click1() {
        this.isActive1 = !this.isActive1
        if (this.isActive2 === this.isActive1 && this.isActive1 === true) {
          this.isActive2 = false
        }
        if (this.isActive1) {
          // 升序
          this.$emit('changeSort', 'asc')
        }
      },
      click2() {
        this.isActive2 = !this.isActive2
        if (this.isActive2 === this.isActive1 && this.isActive2 === true) {
          this.isActive1 = false
        }
        if (this.isActive2) {
          // 降序
          this.$emit('changeSort', 'desc')
        }
      },
      reset() {
        this.isActive1 = false
        this.isActive2 = false
        this.$emit('changeSort', '')
      }
    }
  }

</script>

<style scoped lang="less">
  @import "../main";

  .my-div:hover {
    .my-span {
      color: @main-color;
    }

  }

  .my-div {
    padding-left: 10px;
  }

  .blue {
    color: @main-color;
  }

  /deep/ .ant-card-body {
    padding: 5px;
    zoom: 1;

  }

  .ant-card {
    border-radius: 1em;
  }
</style>