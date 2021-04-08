<template>
  <div id="hostingCardList">
    <div class="container">
      <a-row class="head-row">
        <template v-for="(item, key) in dictOptions">
          <div style="display: inline-block;width: 20%;" :key="key">
            <a-card style="margin: 5px;cursor: pointer" @click="imgBtn">
              <a-row class="header-row">
                <div
                  style="padding:10px;margin: 0 auto;padding-top:20px;text-align: center;max-height: 150px;max-width: 138px">
                  <img
                    alt="无图片"
                    :src="item.imgUrl"
                    style="height: 100%;width: 100%;"
                  />
                </div>
              </a-row>
              <p class="p-size">{{item.title}}</p>
            </a-card>
          </div>
        </template>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { judgeState } from '@/utils/util'
  import { isInstitution2 } from '@/utils/role'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: 'HostingCardList',
    inject: ['headLogin'],
    data() {
      return {
        dictOptions: [
          {
            title: '专利分类管理',
            imgUrl: require('../../assets/images/general/1_03.png')
          },
          {
            title: '年费期限监控',
            imgUrl: require('../../assets/images/general/1_05.png')
          },
          {
            title: '年费缴费辅助',
            imgUrl: require('../../assets/images/general/1_07.png')
          },
          {
            title: '专利运营机会',
            imgUrl: require('../../assets/images/general/1_09.png')
          },
          {
            title: '信息定向推送',
            imgUrl: require('../../assets/images/general/1_11.png')
          }
        ]
      }
    },
    methods: {
      imgBtn() {
        if (judgeState()) {
          if (isInstitution2()){
            const path = '/trusteeship/portalPatentTrusteeship/trusteeshipCenter'

            const token = Vue.ls.get(ACCESS_TOKEN)
            const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
            window.open(newUrl)

          } else {
            this.$message.warning('您没有权限，暂时不能操作!')
          }
        } else {
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #hostingCardList {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    .container {
      background-color: #ffffff;
    }
    overflow: hidden;
    p {
      text-align: center;
      margin-top: 0.5em;
      color: #999999;
    }
    /deep/ .ant-card-body {
      padding: 0;
    }
    .p-size {
      font-size: 18px;
    }
  }

</style>