<template>
  <div id="ownOtherProject">
    <a-card hoverable :bordered="bordered" @click="handleClick(item)">
      <a-row>
        <a-col class="my-img">
          <img :src="getImgNewView(item.imgUrl)" alt="项目图片" :onerror="defaultImg">
        </a-col>
        <a-col class="my-content">
          <a-row class="my-span">
            <span style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip placement="top" :title="item.projectName" style="white-space: initial;">{{ item.projectName }}</a-tooltip></span>
          </a-row>
          <a-row>
            <span class="my-money">{{ newMoney }}</span>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'OwnOtherProject',
    props: {
      bordered: {
        type: Boolean,
        default: true
      },
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        defaultImg: 'https://img.yzcdn.cn/vant/cat.jpeg'
      }
    },
    methods: {
      handleClick(item) {
        console.info(item)
        let keyRoute = ''
        switch (item.supplyRequirementType) {
          case '1':
            keyRoute = 'SupplyProjectDetails'
            break
          case '2':
            keyRoute = 'SupplyPatentDetails'
            break
          case '3':
            keyRoute = 'SupplyBrandDetails'
            break
          case '4':
            keyRoute = 'ProjectDetails'
            break
          case '5':
            keyRoute = 'PatentDetails'
            break
          case '6':
            keyRoute = 'BrandDetails'
            break
        }
        const that = this
        const newPage = that.$router.resolve({ name: `${keyRoute}`, query: { id: item.id } })
        window.open(newPage.href, '_blank')
      },
      getImgNewView(text) {
        if (!text) {
          return this.defaultImg
        }
        return getImgNewView(text)
      }
    },
    computed: {
      newMoney() {
        if (this.item.transactionPrice === '0') {
          return '面议'
        } else {
          return '¥' + this.item.money
        }
      },
      transactionPriceArr() {
        const arr = []
        if (this.item) {
          if (this.item.zr) {
            // 有转让的数据
            const obj = {}
            obj.transactionPrice = this.item.zrTransactionPrice
            if (obj.transactionPrice === '0') {
              obj.money = '面议'
            } else {
              obj.money = this.item.zrMoney
            }
            arr.push(obj)
          }
          if (this.item.xk) {
            if (this.item.dzxkTransactionPrice === '0' || this.item.dzxkTransactionPrice === '1') {
              // 有独占许可的数据
              const obj = {}
              obj.transactionPrice = this.item.dzxkTransactionPrice
              if (obj.transactionPrice === '0') {
                obj.money = '面议'
              } else {
                obj.money = this.item.dzxkMoney
              }
              arr.push(obj)
            }
            if (this.item.ptxkTransactionPrice === '0' || this.item.ptxkTransactionPrice === '1') {
              // 有排他许可的数据
              const obj = {}
              obj.transactionPrice = this.item.ptxkTransactionPrice
              if (obj.transactionPrice === '0') {
                obj.money = '面议'
              } else {
                obj.money = this.item.ptxkMoney
              }
              arr.push(obj)
            }
            if (this.item.putxkTransactionPrice === '0' || this.item.putxkTransactionPrice === '1') {
              // 有普通许可的数据
              const obj = {}
              obj.transactionPrice = this.item.putxkTransactionPrice
              if (obj.transactionPrice === '0') {
                obj.money = '面议'
              } else {
                obj.money = this.item.putxkMoney
              }
              arr.push(obj)
            }
          }
          if (this.item.gqrz) {
            // 有股权融资的数据
            const obj = {}
            obj.transactionPrice = this.item.gqrzTransactionPrice
            if (obj.transactionPrice === '0') {
              obj.money = '面议'
            } else {
              obj.money = this.item.gqrzMoney
            }
            arr.push(obj)
          }
          if (this.item.zyrz) {
            // 有质押融资的数据
            const obj = {}
            obj.transactionPrice = this.item.zyrzTransactionPrice
            if (obj.transactionPrice === '0') {
              obj.money = '面议'
            } else {
              obj.money = this.item.zyrzMoney
            }
            arr.push(obj)
          }
        }
        if (arr.length === 0) {
          const obj = {}
          obj.money = '无'
          arr.push(obj)
        }
        return arr
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #ownOtherProject {
    margin-bottom: 10px;
    .main-css();
    .my-img {
      height: 141px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    /deep/ .ant-card-body {
      padding: 0;
    }
    .my-content {
      padding: 10px;
      font-size: 14px;
      color: @main-font-color;
      .my-span {
        padding-bottom: 10px;
      }
      .my-money {
        color: #ff3300;
      }
    }
  }
</style>