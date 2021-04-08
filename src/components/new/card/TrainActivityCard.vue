<template>
  <div id="trainActivityCard">
    <a-card hoverable @click="cardBtn(item)">
      <a-row class="my-card-img">
        <img :src="getImgNewView(item.imgUrl)" :onerror="defaultImg" alt="活动图片">
      </a-row>
      <a-row class="my-content">
        <a-row type="flex" justify="space-between" align="middle" class="my-first">
          <a-col :span="20">
            <h3>
              <span style="-webkit-box-orient: vertical;" class="span-data">
                <a-tooltip :title="item.name">
                  {{item.name | ellipsis(13)}}
                </a-tooltip>
              </span>
            </h3>
          </a-col>
          <a-col :span="4">
            <a-button icon="heart" class="my-btn" @click.stop="yesOrNoCollection(item)"
                      :class="{'click-heart':item.collection}" :disabled="loginBtn"/>
          </a-col>
        </a-row>

        <a-row class="my-content-p">
          <div class="course-content">
            <p v-if="item.firstVideoName">
              <span style="-webkit-box-orient: vertical;" class="span-data">
                <a-tooltip :title="item.firstVideoName" placement="right">
                  1.{{item.firstVideoName | ellipsis(20)}}
                </a-tooltip>
              </span>
            </p>
            <p v-else></p>
            <p v-if="item.secondVideoName">
              <span style="-webkit-box-orient: vertical;" class="span-data">
                <a-tooltip :title="item.secondVideoName" placement="right">
                2.{{item.secondVideoName | ellipsis(20)}}
              </a-tooltip>
              </span>
            </p>
            <p v-else></p>
          </div>

          <a-row type="flex" justify="space-between" class="my-last">
            <a-col :span="16">
              <span style="-webkit-box-orient: vertical;" class="span-data">
                <a-icon type="user"/>主讲：
                 <a-tooltip :title="item.beTheSpeaker">
                      {{item.beTheSpeaker | ellipsis(8)}}
                  </a-tooltip>
              </span>
            </a-col>
            <a-col :span="8">
              <span class="join-span">{{item.signUpNum}}人报名</span>
            </a-col>
          </a-row>

        </a-row>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView, isAdmin, judgmentBrowser } from '@/utils/role'
  import { judgeState } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'TrainActivityCard',
    inject: ['headLogin'],
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        defaultImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
        loginBtn: false
      }
    },
    methods: {
      getImgNewView(text) {
        return getImgNewView(text)
      },
      cardBtn(item) {
        if (judgeState()) {
          this.$router.push({ name: 'TrainCourseDetails', query: { itemId: item.id, keyRoute: 'TrainMessage' } })
        } else {
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      yesOrNoCollection(item) {
        if (judgeState()) {
          if (isAdmin()) {
            this.$message.warning('您没有权限，暂时不能操作!')
            return
          }
          // 登录了，直接触发收藏或者不收藏
          this.collectOper(this.keyRoute)
        } else {
          // 没有登录，则先进行登录
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      collectOper() {
        const that = this
        that.loginBtn = true
        const collectionChildType = '25'

        getActionUpdateKeyword('/user/portalCollection/yesOrNoCollection', {
          collectionChildType: collectionChildType,
          id: this.item.id
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
    },
    filters: {
      ellipsis(value,length) {
        if (value === undefined || value === null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > length) {
          return value.substring(0, length) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #trainActivityCard {
    .my-card-img {
      height: 156px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .my-content {
      padding: 0 5px 10px;
      .my-first {
        h3 {
          margin-bottom: 0;
          font-size: 16px;
          color: @main-font-color;
          font-weight: normal;
        }
        .my-btn {
          float: right;
        }
        margin: 5px 0;
      }

      .my-content-p {
        color: #666666;
        font-size: 13px;
        p {
          margin-bottom: 0;
        }
        .join-span {
          float: right;
        }
        .my-last {
          padding-top: 10px;
        }
      }
    }
    /deep/ .ant-card-body {
      padding: 0;
    }

    /deep/ .click-heart {
      background-color: #4093f7;
      border-color: #4093f7;
      i {
        color: #ffffff;
      }
    }
    .span-data {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      /* autoprefixer: off*/
      -webkit-box-orient: vertical;
      /* autoprefixer: on*/
      -webkit-line-clamp: 1;
    }
    .course-content {
      height: 38px;
    }
  }
</style>