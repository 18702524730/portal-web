<template>
    <div class="companyportraitlist">
        <div class="comWidth" v-loading="loading">
        <div class="topresult">
            <h3 class="result">{{`关于“${showname}”共有${total}条结果`}}</h3>
            <div class="search">
                <el-input placeholder="请输入企业名称、统一社会信用代码" v-model="cname">
                    <el-button class="bluebtn" type="primary" slot="append"  @click="search(true)">搜索</el-button>
                </el-input>
            </div>
        </div>
        <ul class="companylist" v-loading="loading">
            <li v-for="(item, index) in dataList" :key="index" @click="toinfo(item.assessId)">
                <h3>{{item.enterpriseName}}</h3>
                <div class="companyinfo">
                    <div>统一社会信用代码： {{item.creditCode}}</div>
                    <div>组织机构代码：{{item.orgCode}}</div>
                    <div>法定代表人：{{item.legalPerson}}</div>
                </div>
            </li>
        </ul>
        <div class="nosearchdata" v-if="!total && !loading">
            暂无数据
        </div>
        <div class="mypagination" v-if="total && !loading">
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
const listUrl = '/api/queryEnterpriseCreditList'
export default {
    data() {
        return {
            pgIndex: 1,
            pgCount: 10,
            total: 0,
            cname: '',
            showname: '',
            loading: false,
            dataList: []
        }
    },
    created() {
        this.cname = this.$route.params.cn
        this.showname = this.cname
        this.search(true)
    },
    methods: {
        search(isf) {
            const data = {
                pgIndex: isf ? 1 : this.pgIndex,
                pgCount: this.pgCount,
                keyword: this.cname
            }
            this.loading = true
            this.$shttp.get(listUrl, { params: data }).then(res => {
                this.loading = false
                this.dataList = res.elements
                this.total = res.totalElements
                this.pgIndex = res.pageNum || 1
                this.showname = this.cname
            }).catch(err => {
                this.loading = false
                this.$messagesebe.error(err.response.data.msg || '获取数据失败')
            })
        },
        handleCurrentChange(i) {
            this.pgIndex = i
            this.search()
        },
        toinfo(id) {
            this.$router.push({ name: 'CompanyCreditInfo', params: { id: id } })
        }
    }
}
</script>

<style lang="less" scoped>
.companyportraitlist {
    background-color: #F2F2F2;
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .comWidth {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 30px;
    }
    .topresult {
        padding: 24px 0 30px;
        overflow: hidden;
        .result {
            float: left;
            line-height: 40px;
            font-size: 18px;
            color: #333;
            font-weight: 600
        }
        .search {
            float: right;
            width: 350px;
            .bluebtn {
                background-color: #2F72D1;
                color: #fff;
                border: none;
                border-radius: 0;
            }
        }
    }
    .companylist {
        padding: 0;
        margin-bottom: 30px;
        list-style: none;
        > li {
            padding: 18px 24px;
            background-color: #fff;
            margin-bottom: 10px;
            
            &:hover {
                background-color: #EFF1FF;
            }
            > h3 {
                font-size: 18px;
                color: #333;
                font-weight: 600;
                line-height: 25px;
                margin-bottom: 22px;
                cursor: pointer;
            }
            .companyinfo {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                font-size: 14px;
                color: #333;
                line-height: 20px;
            }
        }
    }
    .nosearchdata {
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-color: #fff;
        color: #666;
    }
    .mypagination {
        overflow: hidden;
    }
}
</style>

