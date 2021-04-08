<template>
    <div class="companycreditsebe">
        <div class="searchbox">
            <h3>创新主体信用查询</h3>
            <div>
                <el-input placeholder="请输入企业名称、统一社会信用代码" v-model="cname">
                    <el-button class="bluebtn" type="primary" slot="append" icon="el-icon-search" @click="tolist()"></el-button>
                </el-input>
            </div>
            <div class="hotnames">
                <h3 class="hotsearch">热搜：</h3>
                <div class="hotbox clearfix">
                    <span v-for="(item, key) in hotlist" :key="key" @click="hotsearch(item)">{{item}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const hotUrl = '/api/queryHotSearchOfEnterpriseCredit'
export default {
    data() {
        return {
            hotlist: [],
            cname: ''
        }
    },
    created() {
        this.gethot()
    },
    methods: {
        hotsearch(it) {
            this.cname = it
            this.tolist()
        },
        gethot() {
            this.$shttp.get(hotUrl).then(res => {
                this.hotlist = res
            })
        },
        tolist() {
            if (!this.cname) {
                this.$messagesebe.warning("请输入企业名称、统一社会信用代码查询")
                return
            }
            this.$router.push({ name: 'CompanyCreditList', params: { cn: this.cname } })
        }
    }
}
</script>

<style lang="less">
.companycreditsebe {
    height: 510px;
    background: url('../../../assets/img/credit.png') center center no-repeat;
    background-size: auto 100%;
    background-color: #f5f5f5;
    .el-input__inner {
        height: 70px;
        padding: 15px;
        font-size: 18px;
    }
    .searchbox {
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 145px;
        > h3 {
            font-size: 28px;
            font-weight: normal;
            color: #333;
            margin-bottom: 34px;
            text-align: center;
        }
        .bluebtn {
            background-color: #3073D2;
            border: none;
            border-radius: 0;
            color: #fff;
            width: 110px;
            height: 70px;
            font-size: 25px;
        }
        .hotnames {
            display: flex;
            padding-top: 20px;
            .hotsearch {
                width: 60px;
                vertical-align: middle;
                color: #333;
            }
            .hotbox {
                flex: 1;
            }
        }
        .hotbox {
            color: #333;
            font-size: 16px;
            line-height: 23px;
            vertical-align: middle;
            > span {
                float: left;
                margin-right: 20px;
                line-height: 23px;
                color: #999;
                cursor: pointer;
                &:hover {
                    color: #3073D2;
                }
            }
        }
    }
}
</style>
