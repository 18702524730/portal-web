<template>
    <div class="patentassessmentsebe">
        <div class="searchbgbox">
            <div class="searchbox">
                <div class="intrbox">
                    <h2>专利资产评估系统</h2>
                    <p>本评估系统基于《收益现值评估法》结合专利价值评估为依据设计的。</p>
                    <p>运用货币时间值的概念，将在一定年限内归属于专利技术创造的年净收益按照一定的收益率折现成基础现值。辅以专利价值评价体系从技术、法律、市场三大维度，进行科学、合理、公正的推算专利整体剩余价值。</p>
                    <div class="imgbox">

                    </div>
                </div>
                <div class="inputbox">
                    <h3>专利资产评估</h3>
                    <p>专利号</p>
                    <div class="formitembox">
                        <el-input placeholder="请输入专利公开号" v-model="patentNo">
                        </el-input>
                        <div class="errbox" v-if="keyFormatError">
                            请输入正确的专利公开号（格式："CN"+数字）
                        </div>
                        <div class="errbox" v-else> 注：平台暂时只能评估中国发明专利，中国实用新型专利 </div>
                    </div>
                    <p>年净收益（万元）</p>
                    <div class="formitembox">
                        <el-input placeholder="请输入该专利近一年创造的年净收益" v-model="patentCount">
                        </el-input>
                        <div class="errbox" v-if="nocount">
                            请输入年净收益（数字）
                        </div>
                    </div>
                    <div class="calacbtn" @click="patentassess">开始计算</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            patentNo: '',
            nocount: false,
            patentCount: '',
            keyFormatError: false
        }
    },
    
    methods: {
        patentassess() {
            this.keyFormatError = false
            this.nocount = false
            this.patentNo = this.patentNo.replace(/\s+/g, '')
            this.patentNo = this.patentNo.toUpperCase()
            if (!this.patentNo || !(/^[cC][nN][0-9]+|[a-zA-Z]+$/.test(this.patentNo))) {
               this.keyFormatError = true
            }
            if (!this.patentCount || !(/(^\d+$)|(^\d+\.\d+$)/.test(this.patentCount))) {
               this.nocount = true
            }
            if (!this.keyFormatError && !this.nocount) {
                // localStorage.setItem('patentAssessNum', this.patentNo)
                this.$router.push({ name: 'PatentAssessInfo', params: { num: this.patentNo, count: this.patentCount } })
            }
            
        }
    }
}
</script>

<style lang="less">
.patentassessmentsebe {
    ul,
    h2,
    h3 {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .searchbgbox {
        height: 508px;
        background: url('../../../assets/img/assess.png') center center no-repeat;
        background-size: auto 100%;
        background-color: #f5f5f5;
        .searchbox {
            height: 508px;
            width: 1200px;
            padding: 40px 15px;
            margin: 0 auto;
        }
        .intrbox {
            float: left;
            width: 660px;
            color: #333;
            > h2 {
                margin-bottom: 34px;
                font-size:20px;
                font-weight:500;
                line-height:28px;
            }
            > p {
                font-size: 16px;
                line-height: 22px;
                margin-bottom: 20px;
            }
            .imgbox {
                height: 130px;
                width: 456px;
                margin-left: 100px;
                margin-top: 62px;
                background: url('../../../assets/img/zic.png') center center no-repeat;
                background-size: 100% 100%;
            }
        }
        .inputbox {
            float: right;
            width: 404px;
            height: 404px;
            padding: 36px 30px;
            background-color: #fff;
            > h3 {
                margin-bottom: 18px;
                font-size:20px;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:28px;
                text-align: center;
            }
            > p {
                margin-bottom: 16px;
                height:22px;
                font-size:16px;
                color:rgba(51,51,51,1);
                line-height:22px;
            }
            .formitembox {
                position: relative;
                margin-bottom: 28px;
                .errbox {
                    font-size: 12px;
                    position: absolute;
                    left: 0;
                    top: 40px;
                    line-height: 24px;
                    color: #f00;
                }
            }
            .calacbtn {
                height: 50px;
                margin-top: 44px;
                background-color: #2F72D1;
                color: #fff;
                border-radius: 3px;
                font-size: 16px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
            }
        }
    }
}
</style>
