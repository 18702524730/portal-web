<template>
  <div id="trainOfflinePage">
    <div class="container">
      <a-breadcrumb separator=">" class="my-breadcrumb">
        <a-breadcrumb-item>
          <router-link :to="{name:'TrainMessage'}">培训信息</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          沙龙活动
        </a-breadcrumb-item>
      </a-breadcrumb>

      <a-card class="my-search">
        <a-form-model layout="inline" :model="form" @submit="handleSubmit" @submit.native.prevent>
          <a-form-model-item label="活动名称">
            <a-input v-model="form.title" placeholder="请输入活动名称">
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="发布时间">
            <a-range-picker @change="onChange"/>
          </a-form-model-item>
          <a-form-model-item label="活动状态">
            <a-select v-model="form.activityStatus" style="width: 200px"
                      :getPopupContainer="triggerNode => triggerNode.parentNode">
              <a-select-option value="">请选择</a-select-option>
              <a-select-option value="1">预告</a-select-option>
              <a-select-option value="2">进行中</a-select-option>
              <a-select-option value="3">已结束</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              type="primary"
              html-type="submit"
            >
              搜索
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>


      <a-card class="my-list">
        <a-list item-layout="horizontal" :data-source="data" :loading="loading" :pagination="ipagination">
          <a-list-item slot="renderItem" slot-scope="item, index" @click="onClick(item)">
            <a-list-item-meta>
              <div slot="title">
                <a-row type="flex" justify="space-between" align="top">
                  <a-col :span="20">
                    <h2 class="my-title">
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                          <a-tooltip :title="item.title">{{ item.title }}</a-tooltip>
                      </span>
                    </h2>
                  </a-col>
                  <a-col :span="4">
                    <div class="my-time">
                      <div v-if="item.activityStatus === '1'">
                        <img src="../../../assets/images/s2.png" alt="预告">
                      </div>
                      <div v-else-if="item.activityStatus === '2'">
                        <img src="../../../assets/images/s1.png" alt="进行中">
                      </div>
                      <div v-else>
                        <img src="../../../assets/images/s3.png" alt="已结束">
                      </div>
                    </div>
                  </a-col>
                </a-row>
              </div>
              <div slot="avatar" class="my-img-div">
                <img :src="getImgNewView(item.activityIcons)" alt="案例展示">
              </div>

              <div slot="description" class="description">
                <p>活动时间：{{ item.beginDate }}</p>
                <p class="active-p">
                  <span
                    style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                    <a-tooltip :title="item.activityAddress">活动地点：{{ item.activityAddress }}</a-tooltip>
                  </span>
                </p>
                <a-row class="my-details-row">
                  <span class="my-details-btn">查看详情 >></span>
                </a-row>
              </div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, cloneObject } from '@/utils/util'
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'TrainOfflinePage',
    data() {
      return {
        data: [],
        url: '/zscq/portal/training/offlineSalonPageList',
        ipagination: {
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          delay: 500,
          spinning: false
        },
        formParam: {
          activityDate_begin: '',
          activityDate_end: '',
          title: '',
          activityStatus: ''
        },
        form: {
          activityDate_begin: '',
          activityDate_end: '',
          title: '',
          activityStatus: ''
        }
      }
    },
    created() {
      this.handleSubmit()
    },
    methods: {
      onChange(date, dateString) {
        if (dateString && dateString.length > 0) {
          this.form.activityDate_begin = dateString[0]
          this.form.activityDate_end = dateString[1]
        }
      },
      onClick(item) {
        this.$router.push({ name: 'TrainOfflineDetails', query: { itemId: item.id, keyRoute: 'TrainMessage' } })
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      handleSubmit() {
        this.ipagination.current = 1
        Object.assign(this.formParam, this.form)
        this.loadData(this.handleParam(this.formParam))
      },
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      handleParam(param) {
        const that = this
        that.formParam = param

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current
        newParam.pageSize = that.ipagination.pageSize

        newParam = filterObj(newParam)

        return newParam
      },
      async loadData(param) {
        this.loading.spinning = true
        const res = await getActionUpdateKeyword(this.url, param)
        this.loading.spinning = false
        if (res.success) {
          this.data = res.result.records
          console.info(res)
          console.info('请求成功')
          this.ipagination.total = res.result.total
        } else {
          this.$message.error('请求失败')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";
  @import "index";

  #trainOfflinePage {
    .main-css();
    background-color: @main-bg-color;
    overflow: hidden;
    margin-top: 2px;
    .my-search {
      margin-bottom: 10px;
    }

    .my-list {
      margin-bottom: 10px;
      /deep/ .ant-card-body {
        padding: 0;
      }
      h2 {
        color: #555555;
        font-size: 20px;
        font-weight: bold;
      }
      .my-img-div {
        width: 295px;
        height: 155px;
        img {
          padding: 0 5px;
          width: 100%;
          height: 100%;
        }
      }
      .my-time {
        .ant-btn {
          color: #ffffff;
          font-size: 16px;
          width: 120px;
          height: 40px;
          border-radius: 30px;
          border: none;
          font-weight: bold;
          box-shadow: 5px 5px 5px #999999;;
        }
        img {
          width: 63px;
          height: 64px;
          position: absolute;
          top: -18px;
        }
        position: relative;
      }
      .my-details-row {
        position: relative;
        height: 50px;
      }
      .my-details-btn {
        display: inline-block;
        font-size: 16px;
        width: 150px;
        color: @main-color;
        bottom: 0;
        position: absolute;
        bottom: 0;
      }
      .description {
        p:nth-child(1) {
          margin-bottom: 10px;
        }
        p:nth-child(2) {
          margin-right: 30px;
        }
      }
    }
    /deep/ .ant-list-pagination {
      padding: 10px;
    }
    .ant-list {
      cursor: pointer;
    }
  }
</style>