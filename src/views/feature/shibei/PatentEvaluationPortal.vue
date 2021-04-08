<template>
    <div class="patentevaluationpagesebe">
        <div class="searchbgbox">
            <div class="searchbox">
                <h3>专利价值评价系统</h3>
                <div class="searchbtnbox">
                    <div v-if="keyFormatError" class="errbox">
                        请输入正确的专利公开号（格式："CN"+数字）
                    </div>
                    <el-input placeholder="请输入专利公开号，例：CN234157463" v-model="patentNo">
                        <el-button class="bluebtn" type="primary" slot="append" icon="el-icon-search" @click="tolist()"></el-button>
                    </el-input>
                </div>
                <div class="searchtip">
                    注：平台暂时只能评价中国发明专利，中国实用新型专利
                </div>
                <div class="hotpatent">
                    <h3>热搜：</h3>
                    <ul class="hotlist">
                        <li v-for="(item, index) in hotlist" :key="index" @click="startsearch(item)">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <ul class="intrnav">
            <li v-for="item in tabs" :key="item.id" :class="{ active: item.id === current }" @click="changenav(item)">{{item.name}}</li>
        </ul>
        <div class="navcont" :class="{ bga: current === 1, bgb: current === 2, bgc: current === 3 }">
            <div v-if="current === item.id" v-for="item in tabs" :key="item.id" >
                <h2>{{item.name}}</h2>
                <div class="borderbox"></div>
                <p>{{item.cont}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabs: [
                { id: 1, name: '大数据', cont: '以数据分析为基础的评价理念，高度整合全文、审查、诉讼等8类专利信息，客观、公正评估专利价值' },
                { id: 2, name: '专业化', cont: '最专业的评价体系，综合数十类指标，全面考虑专利法律、技术、市场等多方面价值' },
                { id: 3, name: '智能化', cont: '全自动的专利价值评估，权利语义智能解析' }
            ],
            current: 1,
            patentNo: '',
            hotlist: ['CN101498401', 'CN103245340', 'CN102261979', 'CN101836160', 'CN103150376B', 'CN111339067A'],
            keyFormatError: false
        }
    },
    methods: {
        hotsearch(it) {
            this.cname = it.name
            this.tolist()
        },
        tolist() {
            this.keyFormatError = false
            console.log((/^[cC][nN][0-9]+$/.test(this.patentNo)))
            this.patentNo = this.patentNo.replace(/\s+/g, '')
            this.patentNo = this.patentNo.toUpperCase()
            if (!this.patentNo || !(/^[cC][nN][0-9]+|[a-zA-Z]+$/.test(this.patentNo))) {
               this.keyFormatError = true
            }
            if (!this.keyFormatError) {
                localStorage.removeItem('patentEvaluationNum')
                this.$router.push({ name: 'PatentEvaluationInfo', params: { num: this.patentNo } })
            }
            
        },
        startsearch(it) {
            this.$router.push({ name: 'PatentEvaluationInfo', params: { num: it } })
        },
        changenav(it) {
            this.current = it.id
        }
    }
}
</script>

<style lang="less">
.patentevaluationpagesebe {
    ul,
    h2 {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .searchbgbox {
        height: 510px;
        background: url('../../../assets/img/pjbg.png') center center no-repeat;
        background-size: auto 100%;
        background-color: #f5f5f5;
    }
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
        .searchbtnbox {
            position: relative;
            .errbox {
                position: absolute;
                left: 0;
                top: -20px;
                font-size: 12px;
                color: #f00;
            }
        }
        > h3 {
            font-size: 28px;
            font-weight: normal;
            color: #333;
            margin-bottom: 54px;
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
        .searchtip {
            padding-top: 10px;
            font-size: 14px;
            color: #f00;
        }
        .hotpatent {
            display: flex;
            padding-top: 10px;
            font-size: 14px;
            > h3 {
                width: 60px;
                font-size: 14px;
                font-weight: normal;
                color: #333;
            }
            .hotlist {
                display: flex;
                width: 540px;
                flex-wrap: wrap;
                > li {
                    margin-right: 20px;
                    color: #999;
                    line-height: 20px;
                    cursor: pointer;
                    &:hover {
                        color: #379dea;
                    }
                }
            }
        }
    }
    .intrnav {
        display: flex;
        width:1200px;
        padding: 35px 200px;
        margin-left: auto;
        margin-right: auto;
        justify-content: space-between;
        > li {
            font-size: 20px;
            color: #999;
            font-weight: normal;
            cursor: pointer;
            line-height: 28px;
            padding-bottom: 5px;
            &.active {
                color: #3073D2;
                border-bottom: 2px solid #3073D2;
            }
        }
    }
    .navcont {
        width: 1200px;
        height: 444px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
        padding-top: 90px;
        background-size: auto 100%;
        background-position: right center;
        background-repeat: no-repeat;
        h2 {
            font-size: 49px;
            font-weight: normal;
            color: #333;
            line-height: 69px;
            margin-bottom: 24px;
        }
        .borderbox {
            width: 54px;
            margin-bottom: 45px;
            border-bottom: 5px solid #333;
        }
        p {
            width: 572px;
            font-size: 17px;
            line-height: 24px;
        }
    }
    .bga {
        background-image: url('../../../assets/img/a.png')
    }
    .bgb {
        background-image: url('../../../assets/img/b.png')
    }
    .bgc {
        background-image: url('../../../assets/img/c.png')
    }
}
</style>
