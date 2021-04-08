<template>
  <div id="headerNavigation">
    <div class="container">
      <a-row>
        <a-col :xs="4" :sm="2" :md="2" :lg="2" :xl="2" style="padding-top: 10px;">
          <div style="background-size: contain;height: 40px;width: 65px;background-repeat: no-repeat;
        background-position: center;" :style="{backgroundImage:`url(${getImgView(data.logo)})`}">
          </div>
        </a-col>
        <a-col :span="20" style="padding-top: 10px;">
          <router-link :to="routerLink">
            <p
              style="display: inline-block;font-size: 25px;font-weight: bold;padding-right: 10px;cursor: pointer;color: #333333">
              {{data.name |
              ellipsis}}</p>
          </router-link>
          <a-button icon="heart" class="heart-button" :class="{'click-heart':data.collection}"
                    @click.stop="yesOrNoCollection(data)" :disabled="loginBtn" v-if="haveHeart"></a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { judgeState } from '@/utils/util'
  import { isAdmin } from '@/utils/role'

  export default {
    name: 'HeaderNavigation',
    inject: ['headLogin'],
    props: {
      data: {
        type: Object,
        default: () => {
        }
      },
      haveHeart: {
        type: Boolean,
        default: true
      },
      routerLink: {
        type: Object,
        default: () => {
          return { name: 'ServiceCenter' }
        }
      }
    },
    data() {
      return {
        loginBtn: false,
        defaultImg: 'this.src="' + require('../../assets/images/navigation/logo.png') + '"'
      }
    },
    created() {
      if (this.$route.query.preview === '2'){
        this.loginBtn = true
      }
    },
    filters: {
      ellipsis(value) {
        if (value === undefined) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (value.length > 20) {
          return value.substring(0, 20) + '...'
        }
        return value
      }
    },
    methods: {
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return encodeURI('\'' + window._CONFIG['imgDomainURL'] + '/' + text + '\'')
      },
      yesOrNoCollection(item) {
        if (judgeState()) {
          if (isAdmin()) {
            this.$message.warning('您没有权限，暂时不能操作!')
            return
          }
          // 登录了，直接触发收藏或者不收藏
          this.collectOper()
        } else {
          // 没有登录，则先进行登录
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }

      },
      collectOper() {
        const that = this
        that.loginBtn = true
        const collectionChildType = '20'
        getActionUpdateKeyword('/user/portalCollection/yesOrNoCollection', {
          collectionChildType: collectionChildType,
          id: this.data.id
        }).then((res) => {
          if (res.success) {
            if (res.result) {
              that.$message.success('收藏成功！')
            } else {
              that.$message.success('取消收藏成功！')
            }
            that.$emit('func')
          } else {
            that.$message.warning(res.message)
          }
        }).finally(() => {
          that.loginBtn = false
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";
  #headerNavigation {
    .main-css();
    color: #333333;
    background-color: #ffffff;
    font-size: 14px;
    overflow: hidden;
    .container {
      padding-top: 20px;
      padding-bottom: 10px;
    }
    .heart-button {
      font-size: 20px;
      box-shadow: none;
      border-color: #ffffff;
    }
    /deep/ .click-heart {
      background-color: #4093f7;
      border-color: #4093f7;
      i {
        color: #ffffff;
      }
    }
  }


</style>