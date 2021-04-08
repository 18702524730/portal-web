<template>
    <div class="iplivebox" v-loading='loading'>
        <div class="liveconts">
        <div class="beforecont">
            <div class="nowlive" v-if="bannerlist.length">
                <el-carousel trigger="click" height="370px" arrow="never" :interval="5000">
                    <el-carousel-item v-for="(item, index) in bannerlist" :key="index">
                        <a :href="item.advertisementLink" target="_bank" v-if="item.advertisementLink">
                            <div class="nowlive">
                                
                                <img :src="item.advertisementPic" alt="">
                                <!-- <div class="titbox">
                                    <span>{{item.advertisementName}}</span> <span class="mark">直播</span>
                                </div> -->
                                
                            </div>
                        </a>
                        <div class="nowlive" v-else>
                            <img :src="item.advertisementPic" alt="">
                            <!-- <div class="titbox">
                                <span>{{item.advertisementName}}</span> <span class="mark">直播</span>
                            </div> -->
                        </div>
                    </el-carousel-item>
                </el-carousel>
                
            </div>
            <h3 class="recordtype"><span v-for="(item, index) in typelist" :key="index" @click="changetype(item)" :class="{ active: type === item.name }">{{item.name}}</span></h3>
            <ul class="beforelist" v-if="total && !loading">
                <li @click="toinfo(item)" v-for="item in listIpListVO" :key="item.id">
                    <div class="leftpic">
                        <img :src="item.articleCover" alt="">
                    </div>
                    <div class="rightcont">
                        <div class="itemtit">
                            <h3>{{item.articleTitle}}</h3>
                            <p>{{item.createTime | dateFormat}}</p>
                        </div>
                        <!-- <div class="itemcont">
                            {{item.remarks}}
                        </div> -->
                    </div>
                </li>
            </ul>
            <div class="nosearchdata" v-if="!total && !loading">
                暂无数据
            </div>
            <div class="mypagination" v-if="total && !loading">
                <el-pagination class="fr" @current-change="handleCurrentChange" :page-size="pgCount" layout="total,prev,pager,next" :total="total" :current-page="pgIndex"></el-pagination>
            </div>
        </div>
        <div class="hotcont">
            <h3 class="hotest"><span>热门阅读</span><span class="hot">hot</span></h3>
            <ul class="hotlist" v-if="listHotTopVO.length">
                <li v-for="item in listHotTopVO" :key="item.id" @click="toinfo(item)">
                    <div class="title"><span class="circle"></span><span class="tname">{{item.articleTitle}}</span></div>
                </li>
            </ul>
            <div class="friendlinks">
                <span class="fl" @click="tolink('PatentSearchShiBei')">专利检索</span><span class="fr" @click="tolink('BrandSearchShiBei')">商标检索</span>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import filters from '@utils/filters.js'
const listUrl = '/api/pictorial/selectIpPortraitListFromTop'
export default {
    data() {
        return {
            loading: false,
            pgCount: 10,
            pgIndex: 1,
            total: 0,
            bannerlist: [],
            type: '专利',
            listHotTopVO: [],
            listIpListVO: [],
            typelist: [
                { id: 0, name: '专利' },
                { id: 1, name: '商标' },
                { id: 2, name: '版权' },
                { id: 3, name: '其他' }
            ]
        }
    },
    filters: {
        dateFormat: filters.formatDate.dateFormathm,
        monthdayFormat: filters.formatDate.monthdayFormat,
        hourminFormat: filters.formatDate.hourminFormat
    },
    methods: {
        changetype(it) {
            this.type = it.name
            this.searchlist(true)
        },
        handleCurrentChange(i) {
            this.pgIndex = i
            this.searchlist()
        },
        tolink(name) {
            this.$router.push({ name: name })
        },
        searchlist(isf) {
            const data = {
                pgIndex: isf ? 1 : this.pgIndex,
                pgCount: this.pgCount,
                type: this.type
            }
            this.loading = true
            this.$shttp.get(listUrl, { params: data }).then(res => {
                this.loading = false
                this.bannerlist = res.listBannerTopVO || []
                this.listIpListVO = res.listIpListVO || []
                this.listHotTopVO = res.listHotTopVO || []
                this.total = res.totalElements
            }).catch(err => {
                this.loading = false
                this.$messagesebe.error(err.response.data.msg || '获取失败')
            })
        },
        toinfo(it) {
            this.$router.push({ name: 'PortraitInfo', params: { id: it.id } })
        }
    },
    created() {
        this.searchlist(true)
    }
}
</script>

<style lang="less" scoped>
.iplivebox {
    background-color: #F2F2F2;
    font-family: '思源黑体';
    // font-family:'PingFangSC-Medium','PingFang SC';
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    h3, p {
        margin: 0;
        padding: 0;
    }
    .liveconts {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 30px;
        display: flex;
        justify-content: space-between;
        .beforecont {
            width: 820px;
            padding-bottom: 30px;
        }
        .nowlive {
            position: relative;
            width: 820px;
            height: 370px;
            margin-bottom: 32px;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
            .titbox {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 65px;
                padding: 20px 24px;
                line-height: 25px;
                // background: rgba(0, 0, 0, 0.5);
                > span {
                    float: left;
                    font-size: 18px;
                    color: #fff;
                    margin-right: 34px;
                    font-weight: 500;
                }
                .mark {
                    height: 25px;
                    padding: 0 10px;
                    background-color: #FF1919;
                    font-weight: normal;
                }
            }
        }
        .recordtype {
            height: 52px;
            padding: 15px 0 0;
            color: #999;
            font-size: 18px;
            font-weight: normal;
            margin-bottom: 20px;
            > span {
                float: left;
                margin-right: 50px;
                padding-bottom: 10px;
                line-height: 22px;
                cursor: pointer;
                &.active {
                    color: #2F72D1;
                    border-bottom: 1px solid #2F72D1;
                }
            }
            
        }
        .beforelist {
            padding: 0 24px;
            min-width: 320px;
            margin-bottom: 30px;
            background-color: #fff;
            > li {
                display: flex;
                padding-top: 24px;
                padding-bottom: 24px;
                border-bottom: 1px solid #E9E9E9;
                cursor: pointer;
                &:last-child {
                    border-bottom: none;
                }
            }
            .rightcont {
                flex: 1;
                .itemtit {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    > h3 {
                        height: 25px;
                        max-width: 450px;
                        line-height: 25px;
                        font-size: 18px;
                        font-weight: normal;
                    }
                    > p {
                        font-size: 12px;
                        color: #999;
                        line-height: 25px;
                    }
                }
                .itemcont {
                    line-height: 20px;
                    height: 60px;
                    font-size: 14px;
                    font-weight: normal;
                    color: #666;
                }
            }
            .leftpic {
                width: 150px;
                height: 100px;
                margin-right: 24px;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .hotlist {
            padding: 18px 24px;
            background-color: #fff;
            padding-bottom: 12px;
            > li {
                height: 22px;
                margin-bottom: 18px;
                cursor: pointer;
            }
            .title {
                
                height: 22px;
                font-weight: normal;
                line-height: 22px;
                color: #333;
                font-size: 0;
                .circle {
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    margin-right: 10px;
                    background-color: #333;
                    vertical-align: middle;
                    overflow: hidden;
                }
                .tname {
                    display: inline-block;
                    max-width: 280px;
                    height: 22px;
                    line-height: 22px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    vertical-align: middle;
                    font-size: 16px;
                }
            }
        }
        .yugao {
            padding: 0 24px 20px;
            font-size: 18px;
            font-weight: 500;
            color: #333;
            background-color: #fff;
        }
        .hotcont {
            width: 350px;
            padding-bottom: 30px;
            .hotest {
                height: 65px;
                padding-left: 24px;
                background-color: #2F72D1;
                color: #fff;
                font-size: 18px;
                font-weight: 500;
                > span {
                    float: left;
                    line-height: 65px;
                }
                .hot {
                    font-size: 14px;
                    height: 20px;
                    margin-top: 22px;
                    line-height: 20px;
                    padding: 0 5px;
                    background-color: #FF1919;
                    margin-left: 10px;
                    font-weight: normal
                }
            }
        }
        .recordlist {
            background-color: #fff;
            padding: 0 24px;
            > li {
                display: flex;
                padding: 15px 0 15px 15px;
                border-top: 1px solid #e9e9e9;
                &:last-child {
                    border-bottom: 1px solid #e9e9e9;
                }
            }
            .leftday {
                width: 60px;
                margin-right: 30px;
                font-size: 16px;
                color: #333;
                .date {
                    position: relative;
                    height: 22px;
                    line-height: 22px;
                    &:before{
                        position: absolute;
                        left: -15px;
                        top: 3px;
                        content: '';
                        height: 16px;
                        border-left: 7px solid #2F72D1;
                    }
                }
                .time {
                    line-height: 22px;
                    color: #666;
                }
            }
            .rtitle {
                flex: 1;
                font-size: 16px;
                color: #333;
                line-height: 22px;
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
    .friendlinks {
        padding: 24px 24px 24px;
        background-color: #fff;
        overflow: hidden;
        > span {
            width: 138px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #fff;
            border-radius: 3px;
            font-size: 16px;
            background-color: #2F72D1;
            cursor: pointer;
        }
    }
}
</style>
