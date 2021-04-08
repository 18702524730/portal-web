<template>
  <div id="trainCourseDetailsPage">
    <a-spin :spinning="spinning">
      <div class="container">
        <a-breadcrumb separator=">" class="my-breadcrumb">
          <a-breadcrumb-item>
            <router-link :to="{name:'TrainMessage'}">培训信息</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="{name:'TrainCourse',query:{keyRoute:'TrainMessage'}}">培训课程</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            课程详情
          </a-breadcrumb-item>
        </a-breadcrumb>

        <a-row :gutter="16">
          <a-col :span="16">
            <a-row>
              <a-card class="my-video">
                <video :src="getImgView(selectVideo.videoUrl)" controls v-if="haveVideo"
                       id="videoPlayer"></video>
                <img src="../../../assets/images/novideo.png" alt="无视频" v-else>
                <h2 class="span-data" style="-webkit-box-orient: vertical;" v-if="selectVideo">
                  <a-tooltip :title="selectVideo.name" v-if="JSON.stringify(selectVideo) !== '{}'">
                    {{selectVideo.numName}}
                  </a-tooltip>
                  <span v-else>无</span>
                </h2>
                <a-row :gutter="16" class="my-course-content">
                  <a-col :span="8">
                    <span class="span-data" style="-webkit-box-orient: vertical;">课程类型：
                      <a-tooltip :title="item.typeName">
                        {{item.typeName}}
                      </a-tooltip>
                    </span>
                  </a-col>
                  <a-col :span="8">
                    <span class="span-data" style="-webkit-box-orient: vertical;">课程分类：
                      <a-tooltip :title="item.classificationName">
                        {{item.classificationName}}
                      </a-tooltip>
                    </span>
                  </a-col>
                  <!--<a-col :span="8">-->
                  <!--<span class="span-data" style="-webkit-box-orient: vertical;">视频时长：-->
                  <!--<a-tooltip :title="item.title">-->
                  <!--{{item.title}}-->
                  <!--</a-tooltip>-->
                  <!--</span>-->
                  <!--</a-col>-->
                </a-row>
              </a-card>
            </a-row>
            <a-row>
              <a-card>
                <h3 class="main-train-h3">课程简介</h3>
                <div class="my-content">
                  {{item.remark}}
                </div>
                <h3 class="main-train-h3">课程详情</h3>
                <div class="my-content" v-html="item.detail"
                     style="white-space: pre-wrap;word-break: break-all;overflow-x: auto"></div>
              </a-card>
            </a-row>
            <a-row>
              <a-card>
                <h3 class="main-train-h3">课件下载</h3>
                <div class="my-content">
                  <template v-for="(file, index) in fileUrls">
                    <a :href="file" style="display: block;margin-left: 20px;" :key="index" class="my-a">
                      <a-icon type="file" theme="twoTone"/>&nbsp;{{file.substr(file.lastIndexOf('/') + 1) | changeData}}</a>
                  </template>
                </div>
              </a-card>
            </a-row>
          </a-col>
          <a-col :span="8">
            <a-row>
              <a-card>
                <a-row type="flex" justify="space-between" align="middle">
                  <a-col :span="20">
                    <h3 class="main-train-h3">课程信息</h3>
                  </a-col>
                  <a-col>
                    <a-button icon="heart" @click.stop="yesOrNoCollection(item)"
                              :class="{'click-heart':item.collection}"
                              :disabled="collectBtn" size="small"/>
                  </a-col>
                </a-row>
                <div class="my-content h2-content">
                  <h2>
                    <span style="-webkit-box-orient: vertical;-webkit-line-clamp: 2;" class="span-data">
                       <a-tooltip :title="item.name">
                            {{item.name}}
                        </a-tooltip>
                    </span>
                  </h2>
                  <p>
                    <span style="-webkit-box-orient: vertical;" class="span-data">
                        主讲：
                       <a-tooltip :title="item.beTheSpeaker">
                            {{item.beTheSpeaker}}
                        </a-tooltip>
                    </span>
                  </p>
                  <p>
                    已有<span class="sign-span">{{item.signUpNum}}</span>人报名
                  </p>
                  <a-row class="btn-group">
                    <a-button-group>
                      <a-button @click.stop="applyCourse(item)" :type="`${item.signUp?'primary':''}`" size="small"
                                class="my-btn" :disabled="applyBtn">
                        {{ itemTitle }}
                      </a-button>

                    </a-button-group>
                  </a-row>
                </div>
              </a-card>
            </a-row>
            <a-row>
              <a-card>
                <h3 class="main-train-h3">课程视频目录</h3>
                <ul v-if="item.portalCourseVideos && item.portalCourseVideos.length > 0" class="my-video-group">
                  <li v-for="(innerItem,index) in item.portalCourseVideos" :key="index"
                      @click="videoClick(innerItem)"
                      :class="[innerItem.status === '2'? 'success-video':'',innerItem.id === selectVideo.id?'select-video':'']">
                    <a-tooltip style="-webkit-box-orient: vertical;"
                               class="span-data" :title="innerItem.name" placement="right">
                      <span style="width: 14px;display: inline-block;">
                        <a-icon type="check" v-if="innerItem.status === '2'"/>
                      </span>
                      {{innerItem.numName}}
                    </a-tooltip>
                  </li>
                </ul>
                <p v-else class="my-content">
                </p>
              </a-card>
            </a-row>
            <a-row>
              <a-card>
                <h3 class="main-train-h3">已报名用户</h3>
                <a-row class="my-content" type="flex" v-for="(outItem,outIndex) in userList" :key="outIndex">
                  <a-col style="width: 20%" v-for="(item,index) in outItem" :key="index">
                    <a-avatar :size="46" :src="getImgView(item)" v-if="item"/>
                    <a-avatar :size="46" icon="user" v-else/>
                  </a-col>
                </a-row>
              </a-card>
            </a-row>
            <a-row>
              <a-card>
                <h3 class="main-train-h3">讲师其他课程</h3>
                <ul v-if="otherList" class="my-content">
                  <li v-for="(innerItem,innerIndex) in otherList" :key="innerItem.id"
                      @click="liBtn(innerItem)">
                    <a-tooltip style="-webkit-box-orient: vertical;"
                               class="span-data" :title="innerItem.name">
                      {{innerItem.name}}
                    </a-tooltip>
                  </li>
                </ul>
              </a-card>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </a-spin>

  </div>
</template>

<script>
  import { judgeState, changeArr } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { isAdmin } from '@/utils/role'

  export default {
    name: 'TrainCourseDetailsPage',
    inject: ['reload'],
    data() {
      return {
        item: {},
        selectVideo: {},
        fileUrls: [],
        spinning: false,

        dataUrl: '/zscq/portal/queryDetailById',
        otherDataUrl: '/zscq/portal/courseSearch',
        userDataUrl: '/zscq/portal/getSignUpUserHeadUrl',

        updateUrl: '/training/portalCourseSignup/updateStatus',
        videoPlayUrl: '/zscq/portal/videoViewCal',
        applyUrl: '/training/portalCourse/signUp',

        userList: [],
        otherList: [],
        applyBtn: false,
        collectBtn: false,

        videoTime: '',
        haveVideo: true,

        playOne: [],
        successOne: []
      }
    },
    created() {
      // 如果没有登录，需要退到培训课程页面
      if (!judgeState()) {
        this.$router.push({ name: 'TrainCourse', query: { keyRoute: 'TrainMessage' } })
      } else {
        this.loadData()
        this.loadUsersData()
      }
    },
    mounted() {
      if (document.getElementById('videoPlayer')) {
        const that = this
        document.getElementById('videoPlayer').addEventListener('play', that.play, false)
        document.getElementById('videoPlayer').addEventListener('ended', that.ended, false)
      }
    },
    beforeDestroy() {
      const that = this
      document.getElementById('videoPlayer').removeEventListener('play', that.play)
      document.getElementById('videoPlayer').removeEventListener('ended', that.ended)
    },
    methods: {
      async play() {
        if (this.playOne.indexOf(this.selectVideo.id) === -1) {
          // 只统计一次
          const res = await getActionUpdateKeyword(this.videoPlayUrl, { id: this.selectVideo.id })
          if (res.success) {
            this.playOne.push(this.selectVideo.id)
          }
        }
      },
      async ended() {
        if (this.successOne.indexOf(this.selectVideo.id) === -1) {
          // 只统计一次
          const res = await getActionUpdateKeyword(this.updateUrl, {
            courseId: this.selectVideo.courseId,
            courseVideoId: this.selectVideo.id
          })
          if (res.success) {
            this.successOne.push(this.selectVideo.id)
            this.selectVideo.status = '2'
          }
        }
      },
      yesOrNoCollection(item) {
        if (judgeState()) {
          // 登录了，直接触发收藏或者不收藏
          if (isAdmin()) {
            this.$message.warning('您没有权限，暂时不能操作!')
            return
          }
          this.collectOper(item)
        } else {
          // 没有登录，则先进行登录
          this.$message.warning('请先进行登录！')
          this.$router.push({ name: 'TrainCourse', query: { keyRoute: 'TrainMessage' } })
        }
      },
      collectOper(item) {
        const that = this
        that.loginBtn = true
        const collectionChildType = '25'

        getActionUpdateKeyword('/user/portalCollection/yesOrNoCollection', {
          collectionChildType: collectionChildType,
          id: item.id
        }).then((res) => {
          if (res.success) {
            if (res.result) {
              that.$message.success('收藏成功！')
              item.collection = true
            } else {
              that.$message.success('取消收藏成功！')
              item.collection = false
            }
            that.$emit('func')
          } else {
            that.$message.warning(res.message)
          }
        }).finally(() => {
          that.loginBtn = false
        })
      },
      async applyCourse(item) {
        if (judgeState()) {
          if (isAdmin()) {
            this.$message.warning('您没有权限，暂时不能操作!')
            return
          }
          this.applyBtn = true
          // 登录了，直接触发收藏或者不收藏
          const res = await getActionUpdateKeyword(this.applyUrl, { id: item.id })
          if (res.success) {
            if (item.signUp) {
              this.$message.success('报名成功')
              item.signUp = false
              item.signUpNum += 1
            } else {
              this.$message.success('取消报名成功')
              item.signUp = true
              item.signUpNum -= 1
            }
            this.loadUsersData()
          }
          this.applyBtn = false
        } else {
          // 没有登录，则先进行登录
          this.$message.warning('请先进行登录！')
          this.$router.push({ name: 'TrainCourse', query: { keyRoute: 'TrainMessage' } })
        }
      },
      videoClick(item) {
        this.selectVideo = item
      },
      async loadData() {
        const res = await getActionUpdateKeyword(this.dataUrl, { id: this.$route.query.itemId })
        if (res.success) {
          this.item = res.result
          this.item.portalCourseVideos = this.item.portalCourseVideos === null ? [] : this.item.portalCourseVideos
          if (this.item.portalCourseVideos && this.item.portalCourseVideos.length === 0) {
            this.haveVideo = false
          }
          for (const a in this.item.portalCourseVideos) {
            this.item.portalCourseVideos[a].numName = (Number(a) + 1) + '：' + (this.item.portalCourseVideos[a].name ? this.item.portalCourseVideos[a].name : '')
            if (a === '0') {
              this.selectVideo = this.item.portalCourseVideos[a]
            }
          }
          if (this.item.fileUrl !== undefined && this.item.fileUrl !== null && this.item.fileUrl !== '') {
            const urls = this.item.fileUrl.split(',')
            urls.forEach(file => {
              file = window._CONFIG['downloadUrl'] + '/' + file
              this.fileUrls.push(file)
            })
          }
          const otherRes = await getActionUpdateKeyword(this.otherDataUrl, {
            id: this.$route.query.itemId,
            beTheSpeaker: res.result.beTheSpeaker
          })
          console.info(otherRes)
          console.info('typeName')
          if (otherRes.success) {
            this.otherList = otherRes.result.records
          }
        }
      },
      getImgView(text) {
        if (!text) {
          return require('../../../assets/img/user.png')
        }
        if (text && text.indexOf('http') === 0) {
          return text
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['videoUrl'] + '/' + text
      },
      async loadUsersData() {
        const res = await getActionUpdateKeyword(this.userDataUrl, { courseId: this.$route.query.itemId, num: 15 })
        if (res.success) {
          this.userList = changeArr(res.result, 5)
        }
      },
      liBtn(item) {
        console.info(item)
        this.$router.push({ name: 'TrainCourseDetails', query: { itemId: item.id, keyRoute: 'TrainMessage' } })
        this.reload()
      }
    },
    computed: {
      itemTitle() {
        if (!this.item.signUp) {
          return '取消报名'
        } else {
          return '课程报名'
        }
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
  @import "../../../components/main";
  @import "index";

  #trainCourseDetailsPage {
    .main-css();
    background-color: @main-bg-color;
    overflow: hidden;
    margin-top: 2px;
    color: #555555;
    .ant-card {
      margin-bottom: 10px;
    }
    /deep/ .ant-card-body {
      padding: 24px 12px;
    }
    ul {
      padding: 0 12px 0 0;
      li {
        list-style: inherit;
        line-height: 30px;
      }
    }
    .my-content {
      padding: 10px 20px;
    }
    .my-video {
      background-color: #F2F2F2;
      /deep/ .ant-card-body {
        padding: 12px;
      }
      video, img {
        background-color: #FFFFFF;
        width: 100%;
        height: 423px;
        margin-bottom: 12px;
      }
      h2 {
        font-size: 22px;
        color: #333333;
        font-weight: normal;
      }
      .my-course-content {
        color: #333333;
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
    li {
      list-style: inherit;
      cursor: pointer;
    }
    .my-a {
      color: #333333;
      &:hover {
        color: @main-color;
      }
    }
    .sign-span {
      color: @main-color;
    }
    .my-video-group {
      list-style: none;
      li {
        line-height: 32px;
        padding: 0 10px;
      }
    }
    .success-video {
      color: @main-color;
    }
    .select-video {
      color: #FFFFFF;
      background-color: @main-color;
    }
    .h2-content {
      h2 {
        font-size: 16px;
      }
      p {
        margin-bottom: 0.5em;
      }
      .btn-group {
        margin-top: 10px;
        .my-btn {
          padding: 0 30px;
        }
      }
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