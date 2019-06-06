<template>
    <div>
        <Header link="setOff"></Header>
        <div class="set-off-container">
            <div class="recommend-show">
                <div class="content">
                    <div class="left">
                        <el-carousel trigger="click">
                            <el-carousel-item v-for="(item,index) in topPartList[topIndex].topImgList" :key="index">
                                <img :src="addressUrl+item.imgUrl" alt="">
                            </el-carousel-item>
                        </el-carousel>
                        <router-link target="_blank" class="intro" :to='{path:"/setOffDetail/"+topPartList[topIndex].artId}'>
                            <h1>{{topPartList[topIndex].artTitle}}</h1>
                            <div class="label">
                                <span v-for="(item,index) in topPartList[topIndex].statusLabList" :key="index">{{item.labNm}}</span>
                            </div>
                            <p class="address">{{topPartList[topIndex].cityNm}}</p>
                        </router-link>
                    </div>
                    <div class="right">
                        <div class="right-con">
                            <img src="../assets/cirelce.png" alt="">
                            <div class="connect">视界观点</div>
                            <p>{{topPartList[topIndex].jkvContent}}</p>
                            <span class="tit">金凯视界</span>
                        </div>
                        <div class="sd1"></div>
                        <div class="sd2"></div>
                    </div>
                </div>
            </div>
            <div class="show-list">
                <div class="content">
                    <swiper :options="swiperOption" ref="mySwiper">
                        <swiper-slide v-for="(item,index) in topPartList" :key="index">
                            <div class="list-bar">
                                <div @click="tabTopFun(index)" class="pho">
                                    <img :src="addressUrl+item.bdImgUrl" alt="">
                                </div>
                                <div class="intro">
                                    <router-link target="_blank" :to='{path:"/setOffDetail/"+item.artId}'>{{item.artTitle}}</router-link>
                                    <div class="label">
                                        <span v-for="(lab,index) in item.statusLabList" :key="index">{{lab.labNm}}</span>
                                    </div>
                                    <p class="address">{{item.cityNm}}</p>
                                </div>
                            </div>
                        </swiper-slide>
                        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </div>
            </div>
            <div class="new-article">
                <div class="content">
                    <div class="top">
                        <span>最新的文章</span>
                        <router-link target="_blank" to="/setOffList">检索></router-link>
                    </div>
                    <div class="bottom">
                        <router-link target="_blank" :to='{path:"/setOffDetail/"+item.artId}' v-for="(item,index) in newPartList" :key="index">
                            <span class="title">{{item.artTitle}}</span>
                            <div class="label">
                                <span v-for="(lab,index) in item.statusLabList" :key="index">{{lab.labNm}}</span>
                            </div>
                            <div class="pho">
                                <img :src="addressUrl+item.historyPriceUrl" alt="">
                            </div>
                            <span class="day">{{item.pubDate}}</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Footer from '@/components/footer'

    export default {
        name:"setOffView",
        data(){
            return{
                topPartList:[],
                newPartList:[],
                swiperOption:{
                    notNextTick: true, // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                    direction: 'horizontal',
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    slidesPerView:3
                },
                topIndex:0
            }
        },
        components:{
            Header,swiper,swiperSlide,Footer
        },
        created(){
            this.getTopPart()
            this.getNewPart()
        },
        methods:{
            getTopPart:function(){
                var _this = this
                _this.$ajax.post('/ctrip/art/inter/getTopArtList.do',_this.$qs.stringify({useYn:"Y"})).then(function(res){
                    if(res.data.flag){
                        _this.topPartList = res.data.list
                         console.log(_this.topPartList)
                    }
                },function(){

                })
            },
            tabTopFun:function(i){
                var _this = this
                _this.topIndex = i
            },
            getNewPart:function(){
                var _this = this
                console.log('ggg')
                _this.$ajax.post('/ctrip/art/inter/getNewestArtList.do',_this.$qs.stringify({number:5,useYn:"Y"})).then(function(res){
                    if(res.data.flag){
                        _this.newPartList = res.data.list
                        console.log(_this.newPartList)
                    }
                },function(){

                })
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="less">
    .set-off-container{
        padding-top: 110px;
        width: 100%;
        .recommend-show{
            background-color: #f9f9f9;
            .content{
                width: 1170px;
                margin: 0 auto;
                &:after{
                    content: '';
                    height: 0;
                    visibility: hidden;
                    display: block;
                    clear: both;
                }
                .left{
                    border-radius: 8px;
                    overflow: hidden;
                    width: 744px;
                    height: 422px;
                    float: left;
                    position: relative;
                    &:hover{
                        a{
                            height: 96px;
                        }
                    }
                    .el-carousel{
                        width: 100%;
                        height: 100%;
                        .el-carousel__container{
                            width: 100%;
                            height: 100%;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    a{     
                             display: block;
                             padding-left: 20px;
                             padding-top: 10px;
                             box-sizing: border-box;
                            width: 100%;
                            height: 0px;
                            transition: height 0.3s;
                            -webkit-transition: height 0.3s;
                            overflow: hidden;
                            background-color: rgba(0, 0, 0, 0.5);
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            z-index: 10;
                            h1{
                                font-family: "微软雅黑";
                                font-size: 18px;
                                color: #ffffff;
                                font-weight: normal;
                                margin-bottom: 10px;
                            }
                            .label{
                                margin-bottom: 10px;
                                span{
                                    background-color: #ffbf43;
                                    font-size: 12px;
                                    color: #fff;
                                    padding: 3px;
                                    margin-right: 5px;
                                }
                            }
                            .address{
                                font-family: "微软雅黑";
                                font-size: 14px;
                                color: #fff;
                                padding-left: 18px;
                                background: url(../assets/address_w.png) no-repeat 0 0px;
                            }
                    }
                }
                .right{
                    position: relative;
                    float: right;
                    margin-top: 36px;
                    .right-con{
                        box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.3);
                        border-radius: 8px;
                        z-index: 10;
                        width: 416px;
                        min-height: 206px;
                        height: auto;
                        padding: 54px 40px;
                        box-sizing: border-box;
                        position: relative;
                        background: url(../assets/jiao.png) #ffffff no-repeat;
                        background-position: right bottom;
                        img{
                            position: absolute;
                            left: 70px;
                            top: -36px;
                            display: block;
                            width: 256px;
                            height: 72px;
                        }
                        .connect{
                            font-size: 12px;
                            color: #fff;
                            width: 70px;
                            line-height: 40px;
                            padding-left: 5px;
                            box-sizing: border-box;
                            height: 61px;
                            background: url(../assets/bg1.png) no-repeat;
                            position: absolute;
                            left: -40px;
                            top: 70px;
                            z-index: 100;
                        }
                        p{
                            font-size: 16px;
                            font-weight: bold;
                            color: #333333;
                            font-style: italic;
                            letter-spacing: 0.5px;
                            line-height: 26px;
                            max-height: 156px;
                            margin-bottom: 20px;
                            overflow: hidden;
                        }
                        .tit{
                            font-size: 16px;
                            font-weight: bold;
                            color: #333333;
                            font-style: italic;
                            display: block;
                            float: right;
                            height: 50px;
                            line-height: 52px;
                            background: url(../assets/pen.png) no-repeat;
                            padding-left: 50px;
                        }
                    }
                    .sd1{
                        width: 80%;
                        height: 100px;
                        position: absolute;
                        bottom: 20px;
                        left: 15px;
                        background-color: #007AFF;
                        transform: skew(-13deg, -6deg);
                        -ms-transform: skew(-13deg, -6deg);
                        -webkit-transform: skew(-13deg, -6deg);
                        box-shadow: -5px 5px 30px rgba(0, 0, 0, 0.5);
                    }
                    .sd2{
                        width: 80%;
                        height: 100px;
                        position: absolute;
                        bottom: 20px;
                        right: 15px;
                        background-color: #007AFF;
                        transform: skew(13deg, 6deg);
                        -ms-transform: skew(13deg, 6deg);
                        -webkit-transform: skew(13deg, 6deg);
                        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.5);
                    }
                }
            }
        }
        .show-list{
            width: 100%;
            background-color: #F9F9F9;
            padding-top: 20px;
            padding-bottom: 42px;
            .content{
                width: 1260px;
                margin: 0 auto;
                position: relative;
                .swiper-container{
                    width: 1170px;
                    padding-top: 10px;
                    margin: 0 auto;
                    overflow: hidden;
                    .swiper-slide{
                        .list-bar{
                            position: relative;
                            bottom: 0;
                            transition: bottom 0.3s;
                            -webkit-transition: bottom 0.3s;
                            margin: 0 auto;
                            width: 384px;
                            box-sizing: border-box;
                            height: 313px;
                            background-color: #007AFF;
                            padding: 8px;
                            border-radius: 5px;
                            background-color: #fff;
                            .pho{
                                width: 368px;
                                height: 207px;
                                margin-bottom: 10px;
                                border-radius: 8px;
                                overflow: hidden;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .intro{
                                padding-left: 10px;
                                padding-right: 10px;
                                a{
                                    display: block;
                                    font-size: 16px;
                                    color: #333333;
                                    transition: color 0.3s;
                                    -webkit-transition: color 0.3s;
                                    font-weight: normal;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    margin-bottom: 8px;
                                    &:hover{
                                        color: #ffbf43;
                                    }
                                }
                                .label{
                                    margin-bottom:8px; 
                                    span{
                                        background-color: #ffbf43;
                                        font-size: 12px;
                                        color: #fff;
                                        padding: 3px;
                                        margin-right: 5px;
                                    }
                                }
                                .address{
                                    font-size: 12px;
                                    color: #4d4d4d;
                                    padding-left: 16px;
                                    background: url(/resources/trip/img/address_b.png) no-repeat 0 2px;
                                }
                            }
                        }
                    }
                }
                .swiper-button-prev{
                    width: 44px;
                    height: 44px;
                    background: url(../assets/l.png) no-repeat;
                    left: 0;
                    cursor: pointer;
                }
                .swiper-button-next{
                    width: 44px;
                    height: 44px;
                    background: url(../assets/r.png) no-repeat;
                    right: 0;
                    cursor: pointer;
                }
            }
        }
        .new-article{
            width: 100%;
            background-color: #f9f9f9;
            padding-bottom: 20px;
            .content{
                width: 1170px;
                margin: 0 auto;
                .top{
                    margin-bottom: 10px;
                    &:after{
                        content: '';
                        height: 0;
                        visibility: hidden;
                        display: block;
                        clear: both;
                    }
                    span{
                        font-size: 16px;
                        color: #333333;
                        float: left;
                        font-weight: bold;
                    }
                    a{
                        font-size: 16px;
                        color: #ffbf43;
                        float: right;
                    }
                }
                .bottom{
                    background-color: #fff;
                    padding-left: 20px;
                    padding-right: 20px;
                    a{
                        height: 60px;
                        display: block;
                        border-top: 1px dashed #dadada;
                        &:nth-child(1){
                            border-top: none;
                        }
                        .title{
                            transition: margin-left 0.2s;
                            -webkit-transition: margin-left 0.2s;
                            font-size: 16px;
                            height: 60px;
                            line-height: 60px;
                            color: #333333;
                            float: left;
                            margin-right: 25px;
                            max-width: 420px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            display: block;
                        }
                        .label{
                            float: left;
                            margin-right: 5px;
                            height: 60px;
                            line-height: 60px;
                            span{
                                background-color: #ffbf43;
                                font-size: 12px;
                                color: #fff;
                                padding: 3px;
                                margin-right: 5px;
                            }
                        }
                        .pho{
                            float: left;
                            height: 60px;
                            line-height: 60px;
                            img{
                                width: 15px;
                                height: 18px;
                            }
                        }
                        .day{
                            transition: margin-right 0.2s;
                            -webkit-transition: margin-right 0.2s;
                            float: right;
                            font-size: 16px;
                            color: #666666;
                            height: 60px;
                            line-height: 60px;
                        }
                    }
                }
            }
        }
    }
</style>