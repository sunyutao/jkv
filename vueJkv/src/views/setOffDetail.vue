<template>
    <div>
        <div v-if="isShow" class="pho-out-container">
            <img :src="addressUrl+articleCon.historyPriceUrl" alt="">
            <button @click="isShow=false"></button>
        </div>  
        <Header link="setOff"></Header>
        <div class="set-off-detail-container">
            <div class="bread-crumb-container">
                <div class="bread-crumb">
                    <span>当前位置：</span>
                    <router-link target="_blank" to="/setOff">出发</router-link> 》
                    <router-link target="_blank" to="/setOffList">酒店</router-link> 》
                    <span>{{articleCon.artTitle}}</span>
                </div>
            </div>
            <div class="go-view-container">
                <div class="content">
                    <div class="left">
                        <div class="article-con">
                            <h1 class="art-title">{{articleCon.artTitle}}<span></span></h1>
                            <div v-html="conDetail" class="article-view"></div>
                        </div>
                        <div class="comment">
                            <input v-model="commentCon" placeholder="说点什么" type="text">
                            <button @click="submitComment()">发表</button>
                        </div>
                        <div class="comment-list">
                            <h1>文章评论（<span class="comm-number">{{commentList.length}}</span>条）</h1>
                            <ul>
                                <li v-for="(item,index) in commentList" :key="index">
                                    <div class="comment-bar">
                                        <div class="comment-bar-top">
                                            <span class="name">{{item.userNm?item.userNm:item.commIp.substring(0,8)+'****'}}</span>
                                            <span class="day">{{item.pubDate.substring(0,10)}}</span>
                                        </div>
                                        <p>{{item.commContent}}</p>
                                    </div>
                                    <div v-for="(bar,index) in item.replist" :key="index" class="reply-bar">
                                        <h2>官方回复：</h2>
                                        <p>{{bar.replayContent}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="right">
                        <div class="price-analyse">
                            <h1>价格分析<span></span></h1>
                            <div>
                                <img @click="isShow = true" :src="addressUrl+articleCon.historyPriceUrl" alt="">
                            </div>
                        </div>
                        <div class="demand">
                            <h1>资讯预定<span></span></h1>
                            <div>
                                <input v-model="tel" placeholder="留下您的联系电话" type="text">
                                <textarea v-model="demandCon" placeholder="说出您的需求，剩下的我们为您解决" name=""></textarea>
                                <button @click="submitDemand()">提交需求</button>
                            </div>
                        </div>
                        <div class="demand-list">
                            <h1>已解决<span class="needs-number">{{demandList.length-1>0?demandList.length-1:0}}</span>份需求，他们都这么问</h1>
                            <ul>
                               
                                <li v-show="index == showNum||index == showNum+1" v-for="(item,index) in demandList" :key="index">
                                    <p class="tel">{{item.tel.substring(0,3)}}****{{item.tel.substring(7)}}</p>
                                    <p>{{item.content}}</p>
                                    <p class="day">{{item.instDtm.substring(0,4)}}年{{item.instDtm.substring(5,7)}}月{{item.instDtm.substring(8,10)}}日</p>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/header'
    import Footer from '@/components/footer'
    export default {
        name:"setOffDetailView",
        data(){
            return{
                articleCon:{},
                conDetail:'',
                commentCon:'',
                commentList:[],
                tel:'',
                demandCon:'',
                demandList:[],
                isShow:false,
                demandIndex:Number,
                showNum:0
            }
        },
        components:{
            Header,Footer
        },
        created(){
            var _this = this
            var interval
            this.getArticleFun()
            this.loadContent()
            this.getCommentList()
            this.getDemandList()
            if (interval) {
                window.clearInterval(interval);                   
            }
            interval = setInterval(function () {
                   _this.lunboRight()
            }, 3000);
        },
        watch:{
            articleCon: function(newVal,oldVal){
                var _this = this
                _this.loadContent();
                setTimeout(function(){                           
                    _this.videoFun()
                }, 0);
            },
            demandLis: function(newVal,oldVal){
                var _this = this
                // setTimeout(function(){                           
                //      _this.lunboRight()
                // }, 0);
            }
        },
        methods:{
            getArticleFun:function(){
                var _this = this
                _this.$ajax.post('/ctrip/needs/getArtInfo.do',_this.$qs.stringify({artId:_this.$route.params.id})).then(function(res){
                    // console.log(res.data)
                    if(res.data.flag){
                        _this.articleCon = res.data.art
                        console.log(_this.articleCon)
                    }
                },function(){

                })
            },
            loadContent:function(){
                var _this = this
                _this.$ajax.get(_this.sourceUrl + _this.articleCon.mdUrl).then(function(res){
                    // console.log(marked(res.data))
                    var str = marked(res.data).replace(/img src="/g,'img src="'+_this.addressUrl)
                    _this.conDetail = str
                    // console.log(_this.conDetail)
                },function(){

                })
            },
            submitComment:function(){
                var _this = this
                if(_this.commentCon == ''){
                    _this.$message({message: '评论内容不能为空',type: 'warning'});
                }
                else{
                    _this.$ajax.post('/ctrip/needs/addCommInfo.do',_this.$qs.stringify({commIp:returnCitySN["cip"],commContent:_this.commentCon,artId:_this.$route.params.id})).then(function(res){
                        if(res.data.flag){
                            console.log(res.data)
                            _this.$message({message: '发表成功',type: 'success'});
                            _this.commentCon = ''
                            _this.getCommentList()
                        }
                    })
                }
            },
            getCommentList:function(){
                var _this = this
                _this.$ajax.post('/ctrip/needs/getCommAndReplyList.do',_this.$qs.stringify({artId:_this.$route.params.id})).then(function(res){
                    // console.log(res.data)
                    if(res.data.flag){
                        _this.commentList = res.data.list
                        console.log(_this.commentList)
                    }
                })
            },
            submitDemand:function(){
                var _this = this
                if(_this.tel == ''){
                     _this.$message({message: '手机号不能为空',type: 'warning'})
                     return false
                }
                if(_this.demandCon == ''){
                    _this.$message({message: '内容不能为空',type: 'warning'})
                     return false
                }
                if(_this.telTest(_this.tel)){
                    _this.$message({message: '手机号格式不正确',type: 'warning'})
                    return false
                }
                _this.$ajax.post('/ctrip/needs/addNeeds.do',_this.$qs.stringify({tel:_this.tel,content:_this.demandCon,artId:_this.$route.params.id,chargeNo:_this.articleCon.headJobnum})).then(function(res){
                    if(res.data.flag){
                        _this.$message({message: '提交成功',type: 'success'});
                        _this.getDemandList()
                    }
                },function(){

                })
            },
            getDemandList:function(){
                var _this = this
                _this.$ajax.post('/ctrip/needs/getNeedsList.do',_this.$qs.stringify({artId:_this.$route.params.id})).then(function(res){
                    // console.log(res.data)
                    if(res.data.flag){
                        _this.demandList = res.data.list
                        _this.demandList.push(_this.demandList[0])
                        console.log(_this.demandList)
                    }
                })
            },
            telTest:function(a){
                var tel = a
				var reg = /^0?(13|14|15|18)[0-9]{9}$/
				return !reg.test(tel)
            },
            lunboRight:function(){
                var _this = this
                if(_this.demandList.length>0){
                    _this.showNum++
                    if(_this.showNum == _this.demandList.length-1){
                        _this.showNum = 0
                    }
                }
                
                // var interval;
                // $('.go-view-container .demand-list ul li').eq(0).clone().appendTo($('.go-view-container .demand-list ul'));
                //     var li = $('.go-view-container .demand-list ul li');
                //     var i = 0;
                //     li.css({'display':'none','background-color':'rgba(255,255,255,0.4)'});
                //     if (interval) {
                //             window.clearInterval(interval);
                //         }
                //         interval = setInterval(function () {
                //             li.css({'display':'none','background-color':'rgba(255,255,255,0.4)'});
                //             li.eq(i).fadeIn(500);
                //             li.eq(i).css('background-color','rgba(255,255,255,1)');
                //             li.eq(i+1).fadeIn(3000);
                //             i = i+1;
                //             if(i == li.length - 1){
                //                 i = 0;
                //             }
                //         }, 5000);
                    // $('.go-view-container .demand-list ul').hover(function () {
                    //     if (interval) {
                    //         window.clearInterval(interval);
                    //     }
                    // }, function () {
                    //    if (interval) {
                    //         window.clearInterval(interval);
                    //     }
                    //     interval = setInterval(function () {
                    //         li.css({'display':'none','background-color':'rgba(255,255,255,0.4)'});
                    //         li.eq(i).fadeIn(500);
                    //         li.eq(i).css('background-color','rgba(255,255,255,1)');
                    //         li.eq(i+1).fadeIn(3000);
                    //         i = i+1;
                    //         if(i == li.length - 1){
                    //             i = 0;
                    //         }
                    //     }, 5000);
                    // });
            },
            videoFun:function(){
                var _this = this
                $('.set-off-detail-container .go-view-container .content .left .article-con .article-view video').each(function(){
                        var $this = $(this)
                        console.log($(this))
                        var src = $this.attr('src')
                        console.log(src)
                        $this.replaceWith("<video controlsList='nodownload' controls='controls'>"
                            + "<source src='"+_this.addressUrl+ src +"'  type=\"video/ogg\">"
                            + "<source src='"+_this.addressUrl+ src +"'  type=\"video/mp4\">"
                            + "<source src='"+_this.addressUrl+ src +"'  type=\"video/webm\">"
                            + "Your browser does not support the video tag."
                            + "</video>")
                })
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="less">
    .el-message{
        top:40%;
    }
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
    .pho-out-container{
        position: fixed;
        z-index: 110;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: auto;
            height: auto;
            max-width: 80%;
            max-height: 80%
        }
        button{
            width: 48px;
            height: 48px;
            background: url(../assets/close.png) no-repeat;
            position: absolute;
            right: 20px;
            top:20px;
            border: none;
        }
    }
    .set-off-detail-container{
        width: 100%;
        padding-top: 110px;
        .go-view-container{
            width: 100%;
            background-color: #f9f9f9;
            padding-top: 20px;
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
                    float: left;
                    width: 770px;
                    .article-con{
                        padding: 30px;
                        box-sizing: border-box;
                        background-color: #fff;
                        .art-title{
                            font-size: 22px;
                            color: #333;
                            border-bottom: 1px solid #dadada;
                            padding-bottom: 15px;
                            position: relative;
                            span{
                                content: '';
                                width: 86px;
                                border-bottom: 2px solid #FFBF43;
                                position: absolute;
                                left: 0;
                                bottom: -1px;
                            }
                        }
                        .article-view{
                            padding-top: 12px;
                            p,h1,h2,h2,h4,h5{
                                font-size: 14px;
                                color: #666;
                                text-indent: 2em;
                                letter-spacing: 0.5px;
                                line-height: 26px;
                                margin-bottom: 15px;
                            }
                            img,video{
                                max-width: 100%;
                                height: auto;
                                display: block;
                                margin: 0 auto 15px;
                            }
                        }
                    }
                    .comment{
                        padding: 15px 30px 0;
                        background-color: #fff;
                        margin-top: 15px;
                        &:after{
                            content: '';
                            height: 0;
                            visibility: hidden;
                            display: block;
                            clear: both;
                        }
                        input{
                            width: 700px;
                            padding: 25px;
                            box-sizing: border-box;
                            font-size: 16px;
                            height: 50px;
                            border: 1px solid #dddddd;
                            border-radius: 5px;
                            background-color: #f8f8f8;
                            margin: 0 auto 18px;
                            display: block;
                            &:focus{
                                border: 1px solid #ffbf43;
                            }
                        }
                        button{
                            cursor: pointer;
                            width: 94px;
                            height: 32px;
                            background-color: #b5b5b5;
                            font-size: 14px;
                            border: none;
                            color: #fff;
                            border-radius: 5px;
                            letter-spacing: 1px;
                            float: right;
                            &:hover{
                                background-color: #ffbf43;
                                color: #fff;
                            }
                        }
                    }
                    .comment-list{
                        padding: 20px 30px;
                        background-color: #fff;
                        h1{
                            font-size: 18px;
                            color: #333;
                            font-weight: normal;
                            letter-spacing: 1px;
                            padding-bottom: 15px;
                            border-bottom: 1px solid #999;
                        }
                        ul{
                            padding-top: 15px;
                            li{
                                border-bottom: 1px dashed #dadada;
                                padding-bottom: 18px;
                                margin-bottom: 12px;
                                .comment-bar{
                                    margin-bottom: 15px;
                                    .comment-bar-top{
                                        margin-bottom: 15px;
                                        .name{
                                            font-size: 14px;
                                            color: #333;
                                            margin-right: 16px;
                                        }
                                        .day{
                                            font-size: 12px;
                                            color: #999;
                                        }
                                    }
                                    p{
                                        font-size: 16px;
                                        color: #666;
                                        letter-spacing: 1px;
                                        line-height: 24px;
                                    }
                                }
                                .reply-bar{
                                    padding: 15px;
                                    background-color: #f7f7f7;
                                    width: 675px;
                                    box-sizing: border-box;
                                    margin-left: 35px;
                                    h2{
                                        font-size: 14px;
                                        color: #333;
                                        font-weight: normal;
                                        letter-spacing: 1px;
                                        margin-bottom: 5px;
                                        padding-bottom: 5px;
                                    }
                                    p{
                                        font-size: 14px;
                                        color: #666;
                                        letter-spacing: 1px;
                                        word-break: break-all;
                                    }
                                }
                            }
                        }
                    }
                }
                .right{
                    float: right;
                    width: 370px;
                    .price-analyse{
                        background-color: #fff;
                        padding: 15px;
                        h1{
                            font-size: 18px;
                            color: #333;
                            font-weight: normal;
                            letter-spacing: 1px;
                            border-bottom: 1px solid #dadada;
                            padding-bottom: 15px;
                            position: relative;
                            margin-bottom: 16px;
                            span{
                                content: '';
                                width: 86px;
                                border-bottom: 2px solid #FFBF43;
                                position: absolute;
                                left: 0;
                                bottom: -1px;
                            }
                        }
                        div{
                            img{
                               width: 100%;
                                height: auto;
                                cursor: pointer;
                            }
                        }
                    }
                    .demand{
                        background-color: #fff;
                        padding: 15px;
                        margin-bottom: 15px;
                        margin-top: 15px;
                        h1{
                            font-size: 18px;
                            color: #333;
                            font-weight: normal;
                            letter-spacing: 1px;
                            border-bottom: 1px solid #dadada;
                            padding-bottom: 15px;
                            position: relative;
                            margin-bottom: 16px;
                            span{
                                content: '';
                                width: 86px;
                                border-bottom: 2px solid #FFBF43;
                                position: absolute;
                                left: 0;
                                bottom: -1px;
                            }
                        }
                        div{
                            &:after{
                                content: '';
                                height: 0;
                                visibility: hidden;
                                display: block;
                                clear: both;
                            }
                            input{
                                display: block;
                                width: 100%;
                                height: 38px;
                                box-sizing: border-box;
                                border: 1px solid #ddd;
                                margin-bottom: 10px;
                                padding: 10px;
                                &:focus{
                                    border: 1px solid #ffbf43;
                                }
                            }
                            textarea{
                                display: block;
                                width: 100%;
                                height: 150px;
                                box-sizing: border-box;
                                border: 1px solid #ddd;
                                resize: none;
                                padding: 10px;
                                margin-bottom: 18px;
                                &:focus{
                                    border: 1px solid #ffbf43;
                                }
                            }
                            button{
                                width: 100px;
                                height: 30px;
                                border: none;
                                background-color: #b5b5b5;
                                font-size: 16px;
                                color: #fff;
                                float: right;
                                cursor: pointer;
                                &:hover{
                                    background-color: #ffbf43;
                                    color: #fff;
                                }
                            }
                        }
                    }
                    .demand-list{
                        h1{
                            font-size: 16px;
                            color: #fff;
                            text-align: center;
                            background-color: #FFBF43;
                            padding: 10px;
                            font-weight: normal;
                            letter-spacing: 0.5px;
                            border-radius: 5px;
                            margin-bottom: 10px;
                        }
                        ul{
                            li{
                                margin-bottom: 5px;
                                background-color: #fff;
                                padding: 15px;
                                font-size: 14px;
                                color: #666;
                                letter-spacing: 1px;
                                border-radius: 5px;
                                box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                                
                                p{
                                    margin-bottom: 15px;
                                }
                                .day{
                                    text-align: right;
                                }
                            }
                        }
                    }
                }
            }
        }

    }
</style>