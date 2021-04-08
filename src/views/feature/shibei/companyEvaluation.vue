<template>
    <div class="companyevaluation">
        <div class="topsearch">
            <div class="topsearchtitle">
                <h3>创新主体创新评价系统</h3>
                <div class="companyname">
                    <el-input placeholder="请输入厦门企业名称检索" v-model="query.enterpriseName">
                        <el-button slot="append" class="bluebtn" @click="searchpage(true)">搜索</el-button>
                    </el-input>
                </div>
            </div>
            <ul class="searchslist">
                <!-- <li class="clearfix">
                    <div class="leftlabel">
                        区域
                    </div>
                    <div class="rightcont">
                        <span v-for="(it, k) in arealist" :key="k" :class="{ active: it.label === query.region }" @click="selected(it.label, 'region')">{{it.label}}</span>
                    </div>
                </li>
                <li class="clearfix">
                    <div class="leftlabel">
                        行业
                    </div>
                    <div class="rightcont">
                        <span v-for="it in hylist" :key="it.id" :class="{ active: it.id === query.industryId }" @click="selected(it.id, 'industryId')">{{it.industry}}</span>
                    </div>
                </li> -->
                <li class="clearfix">
                    <div class="leftlabel">
                        专利总量
                    </div>
                    <div class="rightcont">
                        <span v-for="(it, k) in allnumlist" :key="k" :class="{ active: it.id === query.patentTotalType }" @click="selected(it.id, 'patentTotalType')">{{it.label}}</span>
                    </div>
                </li>
                <li class="clearfix">
                    <div class="leftlabel">
                        发明授权总量
                    </div>
                    <div class="rightcont">
                        <span v-for="(it, k) in sqnumlist" :key="k" :class="{ active: it.id === query.inventAuthorizeTotalType }" @click="selected(it.id, 'inventAuthorizeTotalType')">{{it.label}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="searchlist" v-loading="loading">
            <div class="sortsbox">
                <h3>排序</h3>
                <div class="sortsbtn">
                    <span v-for="(item, k) in sorts" :key="k" @click="changesort(item)" :class="{ active: item.type === query.sortField }">{{item.label}}</span>
                </div>
            </div>

            <ul class="searchdatas" v-if="total && !loading">
                <li v-for="(item, index) in dataList" :key="index" class="clearfix" @click="toinfo(item)">
                    <h3 class="eachtitle">{{item.enterpriseName}}</h3>
                    <div class="allnum">
                        <h3 class="nums"><span class="eachcont">{{item.patentTotal}}</span></h3>
                        <p class="names"><span class="eachcont">专利总量</span></p>
                    </div>
                    <div class="ipnum">
                        <h3 class="nums"><span class="eachcont">{{item.inventApplyTotal}}</span></h3>
                        <p class="names"><span class="eachcont">发明专利申请</span></p>
                    </div>
                    <div class="ipsqnum">
                        <h3 class="nums"><span class="eachcont">{{item.inventAuthorizeTotal}}</span></h3>
                        <p class="names"><span class="eachcont">发明专利授权</span></p>
                    </div>
                </li>
            </ul>
            <div class="nosearchdata" v-if="!total && !loading">
                暂无数据
            </div>
            <div class="mypagination" v-show="!loading && total">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pgCount"
                    :current-page.sync="pgIndex"
                    layout="total,prev, pager, next"
                    :total="total"
                    class="fr"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
const industryUrl = '/api/queryEnterpriseIndustrys'
const listUrl = '/api/queryEnterpriseAssessList'
const queryobj = {
        enterpriseName: '厦门',
        sortField: "patentTotal",
        sortType: 2, // 1 升序 2 降序
        industryId: 0,
        region: '全部',
        patentTotalType: 0,
        inventAuthorizeTotalType: 0
    }
export default {
    data() {
        return {
            arealist: [
                { id: 0, label: '全部' },
                { id: 1, label: '湖里区' },
                { id: 2, label: '集美区' },
                { id: 3, label: '思明区' },
                { id: 4, label: '海沧区' },
                { id: 5, label: '同安区' },
                { id: 6, label: '翔安区' }
            ],
            hylist: [],
            allnumlist: [
                { id: 0, label: '不限' },
                { id: 1, label: '1000件以上' },
                { id: 2, label: '200-1000件' },
                { id: 3, label: '100-200件' },
                { id: 4, label: '50-100件' },
                { id: 5, label: '50件以下' }
            ],
            sqnumlist: [
                { id: 0, label: '不限' },
                { id: 1, label: '1000件以上' },
                { id: 2, label: '200-1000件' },
                { id: 3, label: '100-200件' },
                { id: 4, label: '50-100件' },
                { id: 5, label: '50件以下' }
            ],
            sorts: [
                { id: 1, label: '专利总量', type: 'patentTotal' },
                { id: 2, label: '发明专利申请', type: 'inventAuthorizeTotal' },
                { id: 3, label: '发明专利授权', type: 'inventApplyTotal' }
            ],
            dataList: [],
            loading: false,
            total: 0,
            pgCount: 10,
            pgIndex: 1,
            query: Object.assign({}, queryobj)
        }
    },
    created() {
        // this.getIndustry()
    },
    mounted() {
        this.getquery()
        if (this.query.enterpriseName) {
            this.searchpage(true)
        }
    },
    methods: {
        getIndustry() {
            this.$shttp.get(industryUrl).then(res => {
                const arr = res || []
                this.hylist = arr
                this.hylist.unshift({ id: 0, industry: '全部' })
            })
        },
        selected(it, tp) {
            this.query[tp] = it
            if (!this.query.enterpriseName) {
                return
            }
            this.searchpage()
        },
        changesort(it) {
            this.query.sortField = it.type
            this.searchpage()
        },
        handleCurrentChange(i) {
            this.pgIndex = i
            this.searchpage()
        },
        toinfo(it) {
            this.$router.push({ name: 'CompanyEvaluationInfo', params: { id: it.assessId } })
        },
        getquery() {
            // const re = {}
            if (this.$route.query) {
                const q = this.$route.query
                for (var k in q) {
                    if (q.hasOwnProperty(k)) {
                        this['query'][k] = q[k]
                    }
                }
                if (q['industryId']) {
                    this.query.industryId = q['industryId'] - 0
                }
                if (q['patentTotalType']) {
                    this.query.patentTotalType = q['patentTotalType'] - 0
                }
                if (q['inventAuthorizeTotalType']) {
                    this.query.inventAuthorizeTotalType = q['inventAuthorizeTotalType'] - 0
                }
            }
        },
        searchpage(isreset) {
            if (!this.query.enterpriseName) {
                this.$messagesebe.warning('请输入企业名称查询')
                return
            }
            this.query.pgIndex = isreset ? 1 : this.pgIndex
            this.query.pgCount = this.pgCount
            const query = Object.assign({}, this.query)
            if (query.region === '全部') {
                delete query.region
            }
            if (query.industryId === 0) {
                delete query.industryId
            }
            if (query.patentTotalType === 0) {
                delete query.patentTotalType
            }
            if (query.inventAuthorizeTotalType === 0) {
                delete query.inventAuthorizeTotalType
            }
            this.$router.replace({ query: query })
            this.getOrderList(query)
        },
        getOrderList(paramsData) {
            paramsData = paramsData || {}
            this.loading = true
            this.$shttp.get(listUrl, { params: paramsData })
            .then(resp => {
                this.loading = false
                var data = resp
                var dataList = data.elements
                this.dataList = dataList
                this.pgIndex = data.pageNum || 1
                this.total = data.totalElements
            })
            .catch(err => {
                this.loading = false
                this.$messagesebe.error(err.response.data.msg)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.companyevaluation {
    background-color: #F2F2F2;
    font-family: 'PingFangSC-Semibold','PingFang SC';
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    h3, p {
        padding: 0;
        margin: 0;
    }
    .fr {
        float: right;
    }
    .topsearch {
        height: 300px;
        padding-top: 32px;
        background-image: url('../../../assets/img/company.png');
        background-size: 100% 100%;
        background-color: #eee;
    }
    .topsearchtitle {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        height: 42px;
        margin-bottom: 24px;
        > h3 {
            float: left;
            line-height: 42px;
            font-size: 18px;
            color: #333;
            font-weight: 600;
        }
        .companyname {
            float: right;
            width: 350px;
            .bluebtn {
                height: 40px;
                background-color: #2F72D1;
                color: #fff;
                border-radius: 0;
            }
        }
    }
    .searchslist {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding: 24px 16px;
        background-color: #fff;
        > li {
            margin-bottom: 16px;
            line-height: 28px;
            &:last-child {
                margin-bottom: 0;
            }
            .leftlabel {
                float: left;
                width: 136px;
                font-weight: 500;
                font-size: 14px;
                text-align: left;
                color: #333;
            }
            .rightcont {
                float: left;
                max-width: 1000px;
                font-size: 0;
                > span {
                    display: inline-block;
                    height: 28px;
                    margin-right: 24px;
                    padding: 0 12px;
                    line-height: 28px;
                    font-size: 14px;
                    color: #333;
                    font-weight: normal;
                    cursor: pointer;
                }
                span.active {
                    background-color: #2F72D1;
                    color: #fff;
                    border-radius: 2px;
                }
            }
        }
    }
    .searchlist {
        width: 1200px;
        padding-top: 20px;
        padding-bottom: 30px;
        margin-left: auto;
        margin-right: auto;
        .sortsbox {
            height: 34px;
            margin-bottom: 20px;
            > h3 {
                float: left;
                font-weight: 500;
                line-height: 34px;
            }
            .sortsbtn {
                margin-left: 80px;
                font-size: 0;
                > span {
                    display: inline-block;
                    height: 34px;
                    margin-right: 30px;
                    padding: 0 12px;
                    line-height: 34px;
                    font-size: 14px;
                    color: #333;
                    cursor: pointer;
                }
                span.active {
                    background-color: #2F72D1;
                    color: #fff;
                }
            }
        }
        .searchdatas {
            padding-bottom: 20px;
            > li {
                height: 112px;
                padding: 24px;
                background-color: #fff;
                margin-bottom: 10px;
                cursor: pointer;
                &:hover {
                    background-color: #EFF1FF;
                }
            }
            .eachtitle {
                float: left;
                width: 400px;
                height: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: 64px;
                font-size: 18px;
                color: #333;
                font-weight: 600;
            }
            .allnum {
                float: left;
                width: 240px;
            }
            .ipnum {
                float: left;
                width: 240px;
            }
            .ipsqnum {
                float: left;
                width: 240px;
            }
            .nums {
                font-size: 30px;
                color: #2F72D1;
                line-height: 34px;
            }
            .names {
                font-size: 16px;
                line-height: 30px;
                color: #333;
            }
            .eachcont {
                display: inline-block;
                width: 180px;
                text-align: center;
            }
        }
    }
    .nosearchdata {
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 16px;
        background-color: #fff;
    }
    .mypagination {
        overflow: hidden;
    }
}
</style>


