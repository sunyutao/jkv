<template>
    <div>
        <Header link="news"></Header>
        <router-view></router-view>
        <div class="news-index-container">
            <div class="banner">
                <div class="banner-top">
                    <div class="banner-left">
                        <div class="aqts">
                            <ul>
                                <li><img src="../../assets/news/shiliang.png"></li>
                                <li>安全提示</li>
                                <div class="list-box">     
                                    <span :style="{top:tipTop+'px'}" class="aqts_lb list-lb" ref="tiplist">
                                        <router-link target="_blank" v-for="(item,index) in tipsList" :to='"/tipsDetail/"+item.tipId' :key="index">[{{item.tipTypeNm}}]{{item.tipTitle}}</router-link>
                                    </span>
                                </div>
                                <router-link target="_blank" :to='"/tipsList"'  class="right-more">更多</router-link>
                            </ul>
                        </div>
                        <div class="aqts">
                            <ul>
                                <li><img src="../../assets/news/zhineng.png"></li>
                                <li>政策速递</li>
                                <div  class="list-box">
                                    <span :style="{top:poTop+'px'}" class="zcsd_lb list-lb" ref="polist">
                                        <router-link target="_blank" v-for="(item,index) in posList" :to='"/policyDetail/"+item.poId' :key="index">[{{item.poTypeNm}}]{{item.poTitle}}</router-link>
                                    </span>
                                </div>
                                <router-link target="_blank" :to='"/policyList"'  class="right-more">更多</router-link>
                            </ul>
                        </div>
                    </div>
                    <div class="banner-right">
                        <img src="../../assets/news/gongju.png">
                        <router-link to="/news/smallTool"><div class="lv">旅行小工具</div></router-link>
                    </div>
                </div>
                <!-- 旅行日历 -->
                <div class="lunbo">
                	<Cal :calInfo=calInfo></Cal>
                    <div class="lunbo-right">
                        <div class="lo-contont">
                            <ul id="pressInfo">
                                <li v-for="(item,index) in pressList">
                                    <router-link target="_blank" v-if='item.artType=="活动"'  :to='"/actDetail/"+item.actId'>{{item.title}}</router-link>
                                    <router-link target="_blank" v-if='item.artType=="优惠"' :to='"/preferDetail/"+item.preferId'>{{item.title}}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="excursions">
                    <div class=lxhd>旅行活动</div>
                    <div class=tr>TRAVEL ACTIVITLES</div>
                </div>
                <div class="nav">
                    <div class="act-list-container">
                        <ul class="act-list" id="actList">
                            <router-link target="_blank" v-for="(item,index) in actList" :key="index" :to='{path:"/actDetail/"+item.actId}'>
                                <li><span></span><h3>{{item.title}}</h3></li>
                            </router-link>
                        </ul>
                    </div>
                    <div class="more"><router-link target="_blank"  :to='{path:"/actList"}'>更多<img src="../../assets/news/5.png"></router-link></div>
                </div>
                <div class="excursions">
                    <div class=lxhd>优惠信息</div>
                    <div class=tr>PREFERENTIAL INFORMATION</div>
                </div>
                <div class="menuDiv">
                    <ul>
                        <li ref="preType" v-for="(item,index) in preferTypeList" :class="index == preTypeIndex?'li-cli':''" @click="getPreType(item.cateId,index)">
                            {{item.cateNm}}
                        </li>
                    </ul>
                </div>
                <div class="center prefer-list">
                    <div class="prefer-list-container">
                        <router-link target="_blank" v-for="(item,index) in preferList" :key="index" :to='{path:"/preferDetail/"+item.preferId}'>
                            <div  class="prefer-li"><span>{{(index+1>9)?(index+1):"0"+(index+1)}}</span>&nbsp;&nbsp;/&nbsp;&nbsp;<div>{{item.title}}</div></div>
                        </router-link>
                    </div>
                    <div class="more">
                        <router-link target="_blank"  :to='{path:"/preferList"}'>更多<img src="../../assets/news/5.png"></router-link>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '@/components/header';
import Footer from '@/components/footer';
import Cal from '@/views/news/cal'

export default {
    name:"newsView",
    components:{
        Header,Footer,Cal
    },
    data(){
        return{
            date:'',
            calInfo:{},
            tipsList:[],
            tipTop:0,
            posList:[],
            poTop:0,
            pressList:[],
            actList:[],
            preTypeIndex:0,
            preferTypeList:[],
            preferList:[],
            preferParams:{
                rows:10,
                preferType:''
            }
        }
    },
    created(){
        //安全提示列表
        this.httpTipsList();
        //政策速递列表
        this.httpPosList();
        //热点资讯列表
        this.httpPressList();
        //活动列表
        this.httpActList();
        //优惠信息列表
        this.httpPreferType();
        this.setIntervalList();
        this.formatterDate(new Date());
        //查询旅行日历
        this.httpCalInfo();
    },
    methods:{
        setIntervalList:function(){
            var _this = this;
            var setIn = setInterval(function(){
                var length = _this.tipsList.length;
                _this.tipTop - 40 == -(40*length)?_this.tipTop=0:(_this.tipTop -= 40);
                var polength = _this.posList.length;
                _this.poTop - 40 == -(40*polength)?_this.poTop=0:(_this.poTop -= 40);
                
            },3000);
        },
        httpTipsList:function(){
            var _this = this;
            _this.$ajax.post('/cnews/tips/inter/gettips.do',_this.$qs.stringify({number:10})).then(function(res){
                if(res.data && res.data.flag && res.data.tipslist){
                    _this.tipsList = res.data.tipslist;
                }
                
            });
        },
        httpPosList:function(){
            var _this = this;
            _this.$ajax.post('/cnews/policy/inter/getpolicy.do',_this.$qs.stringify({number:10})).then(function(res){
                if(res.data && res.data.flag && res.data.policylist){
                    _this.posList = res.data.policylist;
                }
                
            });
        },
        httpPressList:function(){
            var _this = this;
            _this.$ajax.post('/cnews/act/inter/getLastestPreferAndAct.do').then(function(res){
                if(res.data && res.data.flag && res.data.list){
                    _this.pressList = res.data.list;
                }
                
            });
        },
        httpActList:function(){
            var _this = this
            _this.$ajax.post('/cnews/act/inter/getLatestActs.do',_this.$qs.stringify({rows:10})).then(function(res){
                if(res.data && res.data.flag && res.data.actList){
                    _this.actList = res.data.actList;
                }
            },function(){

            });
        },
        httpPreferType:function(){
            var _this = this
            _this.$ajax.post('/cnews/prefer/inter/getPreferTypeList.do',_this.$qs.stringify({topYn:'Y'})).then(function(res){
                if(res.data && res.data.flag && res.data.list){
                    _this.preferTypeList = res.data.list;
                }
                _this.preferParams.preferType=res.data.list[0].cateId?res.data.list[0].cateId:'';
                _this.httpPreferList();
            },function(){

            });
        },
        httpCalInfo:function(){
             var _this = this;
             console.log(_this.date);
            _this.$ajax.post('/cnews/cal/inter/getCalInAndDayInfo.do',_this.$qs.stringify({calDate:_this.date})).then(function(res){
                if(res.data && res.data.flag && res.data.cal){
                    _this.calInfo = res.data.cal;
                }
            },function(){

            });
        },
        getPreType:function(type,index){
            this.preTypeIndex=index;
            this.preferParams.preferType=type;
            this.httpPreferList();
        },
        httpPreferList:function(){
            var _this = this
            _this.$ajax.post('/cnews/prefer/inter/getLatestPrefers.do',_this.$qs.stringify(_this.preferParams)).then(function(res){
                if(res.data && res.data.flag && res.data.preferList){
                    _this.preferList = res.data.preferList
                }
            },function(){

            });
        },
        formatterDate:function(date){
            date = new Date(date);
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            this.date = currentdate;        
        }

    }
}
</script>
<style lang="less" scoped>
    .news-index-container{
        .banner{
            width: 100%;
            height:100%;
            margin-top: -18px;
            padding-top: 128px;
            background-color: #f9f9f9;
            .banner-top{
                width: 1172px;
                height: 80px;
                margin:auto;
                margin-bottom: 20px;
                .banner-left{
                    width: 1170px;
                    height:80px;
                    float: left;
                    border-radius: 8px;
                    background-color: #ffffff;
                    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.08);
                    .aqts{
                        width: 1172px;
                        height: 40px;
                        line-height: 40px;
                        ul{
                            li{
                                img{
                                    display: block;
                                    width: 20px;
                                    height: 22px;
                                    margin:8px  25px 0px 23px;
                                }
                            }
                            .list-box{
                                height: 40px;
                                overflow: hidden;
                                max-width:780px;
                                float:left;
                                font-size:14px;
                                .list-lb{
                                    display: flex;
                                    flex-direction: column;
                                    overflow: hidden;
                                }
                                .zcsd_lb{
                                    transition: top 1s;
                                }
                            }
                            .right-more{
                                float:right;
                                display:block;
                                font-size:15px;
                                color:#ffbf43;
                                margin-right:20px;
                                padding-right:14px;
                                background:url(../../assets/news/gengd.png) no-repeat right center;
                                cursor:pointer;
                            }
                        }
                        ul:nth-child(1){
                            width: 1170px;
                            height: 38px;
                        }
                        span{
                            margin-left: 47px;
                            position: relative; 
                            a{
                                color: #666;
                            }
                        }
                    }
                    ul{
                        li{
                            float: left;
                            margin-right: 25px;
                        }
                        li:nth-child(2){
                            color:#555555;
                            font-weight: 700;
                            font-size:15px;
                        }
                        li:last-child{
                            color:#bcbcbc;
                        }
                    }
                }
                .banner-right{
                    width: 40px;
                    height: 116px;
                    /* line-height: 80px; */
                    float: right;
                    text-align: center;
                    border-radius: 5px;
                    position: relative;
                    background-color: #ffffff;
                    border:1px solid #fff;
                    cursor: pointer;
                    position:fixed;
                    left:calc(50% + 586px );
                    top:110px;
                    z-index:1;
                    &:hover{
                        border-color:#ffbf43;
                        .lv{
                            color:#ffbf43;
                        }
                    }
                    img{
                        width:20px;
                        height:18px;
                        display:block;
                        margin:8px auto;
                    }
                    .lv{
                        width:20px;
                        color: #666666;
                        /* position: absolute;
                        bottom: -20px; */
                        font-size:14px;
                        font-weight:bold;
                        cursor: pointer;
                        line-height:14px;
                        text-align:center;
                        margin-left:9px;
                    }
                }
                .banner-right-cli{
                    background-color:#ffbf43;
                    .lv{
                        color:#fff;
                    }
                }
            }
            .lunbo{
                width:1172px;
                height: 400px;
                margin:auto;
                .lunbo-right{
                    width: 366px;
                    height: 400px;
                    float: right;
                    position: relative;
                    .lo-contont{
                        /*height: 278px;*/
                        margin-top: 24px;
                        ul{
                            li{
                                margin-top: 18px;
                                margin-left: 14px;
                                a{
                                    font-size: 14px;
                                    line-height:19px;
                                    color:#333333;
                                    width:342px;
                                    display:block;
                                    overflow:hidden;
                                    white-space: nowrap;
                                    text-overflow:ellipsis;
                                }
                                &:hover a{
                                    color:#ffbf43;
                                }
                            }
                        }
                    }
                }
            }
            .more{
                color:#ffbf43;
                float: right;
                cursor: pointer;
            }
            .excursions{
                width: 1172px;
                margin:auto;
                .lxhd{
                    text-align: center;
                    font-size: 36px;
                    margin-top: 74px;
                    color: #333333;
                }
                .tr{
                    text-align: center;
                    margin-top: 21px;
                    margin-bottom: 45px;
                    color:#333333;
                }
            }
            .nav{
                width: 1172px;
                margin:auto;
                .nav-top{
                    position: relative;
                    display:none;
                    ul{
                        background-color: red;
                        margin-left: 30px;
                        margin-top: 36px;
                        li{
                            float: left;
                            color:black;
                            a{
                                color:#232323;
                                font-size: 14px;
                            }
                            span{
                                color:#232323;
                                margin:0 37px;
                            }
                        }
                    }
                }
                .act-list-container{
                    width: 100%;
                    ul{
                        width: 1172px;
                        margin:auto;
                        li{
                            color:#232323;
                            margin:25px 0;
                            a{
                                color:#232323;
                                font-size:15px;
                            }
                            &:hover{
                                a{
                                    color:#ffbf43;
                                }
                            }
                            span{
                                display: block;
                                width: 10px;
                                height: 10px;
                                line-height: 10px;
                                color: #ffbf43;
                                float: left;
                                margin:6px 14px 0px 32px;
                                text-align: center;
                                background-image: url(../../assets/news/3_29.png);
                            }
                        }
                    }
                }
                .more {
                    float: right;
                    cursor: pointer;
                    a{
                        color: #ffbf43;
                    }
                }
            }
            .menuDiv { 
                overflow: hidden; 
                width: 1172px;
                margin:auto;
                height: 30px;
                ul{
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    float: left;
                    li {
                        display: block;
                        float: left;
                        font-size: 14px;
                        padding-left:40px;
                        padding-right:40px;
                        line-height: 30px;
                        text-align: center;
                        display: block;
                        border-left:1px solid #333;
                        cursor:pointer;
                        &:hover {
                            color:#ffbf43;
                        }
                    }
                    .li-cli{
                        color:#ffbf43;
                    }
                    li:first-child{
                        border-left: none;
                    }
                } 
            }
            .center{
                width: 1172px;
                margin:auto;
                padding-bottom:50px;
                .prefer-list-container{
                    margin-top: 5px;
                    .prefer-li{
                        margin-top: 30px;
                        margin-left: 35px;
                        margin-bottom: 30px;
                        span{
                            color:#ffbf43;
                        }
                        div{
                            display:inline-block;
                            cursor:pointer;
                        }
                        &:hover{
                            div{
                                color:#ffbf43;
                            }
                        }

                    }

                }
                .more {
                    float: right;
                    cursor: pointer;
                    a{
                        color: #ffbf43;
                    }
                }
            }

        }
    }
</style>
