<template>
  <div id="professorDetails">
    <a-spin :spinning="spinning" size="large">
      <div class="container">
        <div class="my-head">
          <a-card hoverable :bordered="false">
            <a-row :gutter="16">
              <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="my-img">
                  <a-avatar
                    alt="无图片"
                    :src="getImgNewView(item.imgUrl)"
                    :onerror="defaultImg"
                    style="height: 100%;width: 100%;display: block"
                  />
                </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                <a-row>
                  <a-col :span="12">
                    <span class="span-title">{{item.name}}</span>
                  </a-col>
                  <a-divider/>
                </a-row>
                <a-row class="my-row">
                  <a-col>
                    <a-row>
                      <p>工作经验: {{item.workingYearsStr}}年</p>
                      <p>提供服务: {{item.provideServiceName }}</p>
                      <p>
                        <a-icon type="environment" theme="twoTone"/>
                        {{item.cityName}}
                      </p>
                    </a-row>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </div>

        <div class="my-body">
          <a-row :gutter="16">
            <a-col :span="6">
              <a-row class="my-row">
                <tab-card-template tab-title="专家著作展示">
                  <template slot="content">
                    <p class="my-book" v-for="(innerItem,index) in item.portalExpertBooks" :key="innerItem.id">
                    <span class="span-data" style="-webkit-box-orient: vertical;">
                      <a-tooltip :title="innerItem.bookName">
                        {{innerItem.bookName}}
                      </a-tooltip>
                    </span>
                    </p>
                  </template>
                </tab-card-template>
              </a-row>
              <a-row class="my-row">
                <tab-card-template tab-title="专家发表的文章">
                  <template slot="content">
                    <p class="my-article" v-for="(innerItem,index) in item.portalExpertArticles" :key="innerItem.id">
                    <span class="span-data" style="-webkit-box-orient: vertical;">
                      <a-tooltip :title="innerItem.title">
                        {{innerItem.title}}
                      </a-tooltip>
                    </span>
                    </p>
                  </template>
                </tab-card-template>
              </a-row>
            </a-col>
            <a-col :span="18" class="my-row">
              <tab-card-template tab-title="专家详情">
                <template slot="content">
                  <a-row class="main-h3 my-row">
                    <h3>简介</h3>
                  </a-row>
                  <a-row class="my-sketch my-content">
                    <h4>所在行业</h4>
                    <p>{{item.industryName}}</p>
                    <h4>擅长技能</h4>
                    <p>{{item.goodAtSkillsName}}</p>
                    <h4>职业资格</h4>
                    <p>{{item.title}}</p>
                  </a-row>
                  <a-row class="main-h3 my-row">
                    <h3>自述</h3>
                  </a-row>
                  <a-row class="my-content">
                    <p>
                      {{item.selfDescription}}
                    </p>
                    <!--<p v-html=""  style="white-space: pre-wrap;word-break: break-all;overflow-x: auto">-->
                    <!--</p>-->
                  </a-row>
                </template>
              </tab-card-template>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { getImgNewView } from '@/utils/role'
  import { judgeState } from '@/utils/util'

  import TabCardTemplate from '../../components/table/TabCardTemplate'

  export default {
    name: 'ProfessorDetails',
    components: { TabCardTemplate },
    props: {},
    data() {
      return {
        defaultImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
        url: '/zscq/portal/getExpertDetail',
        item: {},
        spinning: false
      }
    },
    created() {
      // 如果没有登录，需要退到培训课程页面
      if (!judgeState()) {
        this.$router.push({ name: 'ProfessorBank' })
      } else {
        this.loadData()
      }
    },
    methods: {
      async loadData() {
        this.spinning = true
        const res = await getActionUpdateKeyword(this.url, { id: this.$route.query.itemId })
        if (res.success){
          this.item = res.result
        }
        this.spinning = false
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      /* 图片预览 */
      getImgView(text) {
        if (text === null || text === undefined) {
          text = this.defaultIcon
          return text
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #professorDetails {
    .main-css();
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    overflow: hidden;
    .my-head {
      margin-bottom: 20px;
      .my-img {
        height: 150px;
        width: 150px;
        margin: 0 auto;
      }
      .span-title {
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        line-height: 28px;
        color: #333333;
        padding-left: 10px;
      }
      .ant-divider-horizontal {
        height: 1px;
        background-color: #666666;
        margin-bottom: 8px;
      }
    }
    .my-body {
      .my-row {
        margin-bottom: 20px;
      }
    }
    .main-h3 {
      h3 {
        font-size: 14px;
        color: #666666;
      }
    }
    .my-content {
      padding: 0 20px;
      p {
        white-space: normal;
      }
    }
    .my-sketch {
      h4 {
        font-size: 16px;
      }
    }
    .my-book {
      white-space: normal;
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
    .my-article {
      white-space: normal;
    }
  }
</style>