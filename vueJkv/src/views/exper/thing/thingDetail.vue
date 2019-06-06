<template>
    <div>
        <LoginS :isShow="loginShow" @showFun="showFun"></LoginS>  
        <div class="thing-detail-container">
            <div class="container">
                <div class="top-logo">
                    <div class="top-logo-left">
                        <span class="logo"><img src="../../../assets/logo.png"></span>
                        <span class="back-index-page"><img style="display:none" src="../../../assets/fengmian2.png"></span>
                    </div>
                    <span @click="cmtShow = !cmtShow" class="right-img2"><img src="../../../assets/cmtIcon.gif"></span>
                </div>
                <div class="list">
                    <div class="index-page">
                        <div class="person-msg-box" id="presoncon">
                            
                        </div>
                        <div v-if="cmtShow" class="cmt-area">
                            <div class="top-textarea">
                                <textarea v-model="commCon" id=commcontent></textarea>
                                <div v-if="isShow" class="tishi">
                                    <p>想要发言，得需要登录哦!<span @click="loginShow = true">登录</span><!-- |<a href="###">注册</a> --></p>
                                </div>
                            </div>
                            <button type="button" class="cmt-btn" id='comment-btn' @click="addrecomm()">评论</button>
                            <div class="clear"></div>
                            <div class="allCmt-area">
                                <h5>全部评论</h5>
                            </div>
                            <ul class="cmt-detail">
                                <div v-for="(item,index) in comments" :key="index">
                                    <li v-for="(items,indexs) in item.replist" :key="indexs">
                                        <p>
                                            <span class="cmt-name">{{items.userANm}}：</span>
                                            <span class="cmt-cnt">回复&nbsp;&nbsp;{{items.userBNm}}：&nbsp;&nbsp;{{items.repContent}}</span>
                                        </p>
                                        <i>{{items.repDate.substring(0,10)}}</i>
                                        <i class="replyBtn" @click="addreply(items.commId,items.userAId,items.userANm)">回复</i>
                                    </li>
                                </div>
                                
                                <li v-for="(item,index) in comments" :key="index">
                                    <p>
                                        <span class="cmt-name">{{item.userNm}}：</span>
                                        <span class="cmt-cnt">{{item.commContent}}</span>
                                    </p>
                                    <i>{{item.commDate.substring(0,10)}}</i>
                                    <i class="replyBtn" @click="addreply(item.commId,item.userId,item.userNm)">回复</i>
                                </li>
                            </ul>
                            <button type="button" class="see-more">滚动加载更多</button>
                        </div>
                    </div>
                    <div class="list-out-box" id="wrapper">
                        <ul class="cnt-list">
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="boxShow" class="reply-box">
                <h4><span>回复</span> <span id="closerepay" @click="boxShow = false">×</span></h4>
                <textarea v-model="replyCon"></textarea>
                <button type="button" @click="addreplyone()">回复</button>
            </div>
            <div v-if="maskShow" id="mask">
                <div class="endTishi">
                    <button @click="maskShow = false" type="button">×</button>
                    <h4>都看到这里了留下点什么吧!</h4>
                    <div>
                        <button @click="likeFun()" id="likeid" type="button"><img :src="src" ><span>点赞</span></button>
                        <button @click="maskShow = false;cmtShow = true" id="commid" type="button"><img src="../../../assets/ping1.png" ><span>评论</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoginS from '@/components/LoginS'
    export default {
        name:"thingDetailThing",
        components:{
            LoginS
        },
        data(){
            return{
                loginShow:false,
                isShow:true,
                comments:[],
                commId:'',
                repContent:'',
                userBId:'',
                userBNm:'',
                boxShow:false,
                replyCon:'',
                commCon:'',
                maskShow:false,
                src:'./static/img/zan1.png',
                isLike:false,
                cmtShow:false
            }
        },
        created(){
            this.readNum()
            this.isLogin()
            this.selrecomm()
        },
        methods:{
             readNum:function(){
                var _this = this
                _this.$ajax.post('/cexper/thing/inter/addreadnum.do',_this.$qs.stringify({thId:_this.$route.params.id})).then(function(res){

                },function(){

                })
            },
            likeFun:function(){
                var _this = this
                _this.src = './static/img/zan2.png'
                if(!_this.isLike){
                     _this.$ajax.post('/cexper/thing/inter/addLikeNum.do',_this.$qs.stringify({thId:_this.$route.params.id})).then(function(res){
                         _this.src = './static/img/zan2.png'
                         _this.isLike = true
                     },function(){

                     })
                }
                else{
                    _this.$message({message: '已经点过赞了哦',type: 'warning'});
                }
               
            },
            isLogin:function(){
                var _this = this
                _this.$ajax.post('/travel/cmm/checkUser.do').then(function(res){
                    if(res.data.flag){
                        _this.isShow = false
                    }
                    else{
                       _this.isShow = true 
                    }
                },function(){

                })
            },
            addrecomm:function(){
                var _this = this
                if(!_this.isShow){
                    if(_this.commCon == ''){
                        _this.$message({message: '请输入内容',type: 'warning'});
                        return false
                    }
                    _this.$ajax.post('/cexper/thing/inter/addthingcomm.do',_this.$qs.stringify({thId:_this.$route.params.id,commContent:_this.commCon})).then(function(res){
                        if(res.data.flag){
                            _this.$message({message: '评论成功',type: 'success'});
                            _this.commCon = ''
                            _this.selrecomm()
                        }
                        else{
                            _this.$message({message: '评论失败',type: 'warning'});
                        }
                    },function(){

                    })
                }
                else{
                     _this.$message({message: '请先登录',type: 'warning'});
                }
            },
            showFun:function(data){
                this.loginShow = data
                this.isLogin()
            },
            selrecomm:function(){
                var _this =this
                _this.$ajax.post('/cexper/thing/inter/getThingCommList.do',_this.$qs.stringify({thId:_this.$route.params.id})).then(function(res){
                    console.log('mmm')
                    console.log(res.data)
                    _this.comments = res.data.list
                },function(){

                })
            },
            addreply:function(a,b,c){
                var _this = this
                if(!_this.isShow){
                    _this.commId = a
                    _this.userBId = b
                    _this.userBNm = c
                    _this.boxShow = true
                }
                else{
                    _this.$message({message: '请先登录',type: 'warning'});
                }
                

            },
            addreplyone:function(){
                var _this = this
                if(_this.replyCon == ''){
                    _this.$message({message: '请输入内容',type: 'warning'});
                    return false
                }
                _this.$ajax.post('/cexper/thing/inter/addthingcommreply.do',_this.$qs.stringify({commId:_this.commId,repContent:_this.replyCon,thId:_this.$route.params.id,userBId:_this.userBId})).then(function(res){
                    if(res.data.flag){
                         _this.$message({message: '评论成功',type: 'success'});
                         _this.replyCon = ''
                         _this.boxShow = false
                         _this.selrecomm()
                    }
                    else{
                        _this.$message({message: '评论失败',type: 'warning'});
                    }
                },function(){

                })                
            },
            getthingdetail:function(){
                var _this = this
                _this.$ajax.post('/cexper/thing/inter/getthingcon.do',_this.$qs.stringify({thId:_this.$route.params.id})).then(function(res){
                    var html="";
	     			var html1="";
	     			if(res.data.flag){
                         console.log(res.data)
	     				html+="<h4>"+res.data.thingmap.title+"</h4>"
	     					+"<div class=\"person-msg\"><div class=\"person-msg-left\"><div class=\"person-msg-head\">"
	     					+"<img src=\""+_this.addressUrl+res.data.thingmap.userHeadUrl+"\">"
							+"</div><h6>作者："+res.data.thingmap.userNm+"</h6></div>"
							+"<button type=\"button\" class=\"person-msg-right\"><img src=\"./static/img/goright.png\"></button></div>";
	     			$("#presoncon").html(html);
	     			$(".cnt-list").html("");
	     			for(var i=0;i<res.data.thingmap.thinglist.length;i++){
	     				console.log(res.data.thingmap.thinglist[i]);
	     				if(res.data.thingmap.thinglist[i].parType==1){
	     					//html1+="<li><img src=\""+data.thingmap.thinglist[i].parImgUrl+"\"></li>";
	     					$(".cnt-list").append("<li class=\"cnt-img\"><img src=\""+_this.addressUrl+res.data.thingmap.thinglist[i].parImgUrl+"\"></li>");
	     				}else if(res.data.thingmap.thinglist[i].parType==2){
	     					//html1+="<li class=\"cnt-text\"><p class=\"ppp\">"+searchText(data.thingmap.thinglist[i].parCon).content+"</p></li>";
	     					var text_str = res.data.thingmap.thinglist[i].parCon;
	     					$('.cnt-list').append('<li class="cnt-text"><ul><li><div><p></p></div></li></ul></li>');
	    					for (var j = 0;j < text_str.length;j++) {
	    								var t = text_str.substr(j,1);
	    								if(t == '<'){
	    									t = "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	    								}
	    								
	    								var h = $('.cnt-list').children('.cnt-text:last-child').find('ul').children('li:last-child').find('div p').height();
	    								
	    								if (h < 690 || h == 690) {
	    									$('.cnt-list').children('.cnt-text:last-child').find('ul').children('li:last-child').find('div p').append(t);
	    									var d = t;
	    								}else{
	    									$('.cnt-list').children('.cnt-text:last-child').find('ul').append('<li><div><p></p></div></li>');
	    									$('.cnt-list').children('.cnt-text:last-child').find('ul').children('li:last-child').find('div p').html('').html(d);
	    									$('.cnt-list').children('.cnt-text:last-child').find('ul').children('li:last-child').find('div p').append(t);
	    								}
	    								
	    							}
	    				}
	     				}
	     			}
	     			html1 = "";
	     			html1+="<li class=\"list-end\"><img src=\"./static/img/endIcon.png\"><p>END</p></li><li class=\"recommend\"></li>";
	     			$(".cnt-list").append(html1);
	     			_this.$ajax.post('/cexper/thing/inter/getHotThingList.do',_this.$qs.stringify({thId:_this.$route.params.id})).then(function(res1){
                         var html2="";
	    	     			/* recommend */
	    	     			html2+="<h3>推荐文章</h3><div class=\"recommend-list\">"
	    	     			for(var j=0;j<res1.data.thinglist.length;j++){
	    	     				html2+="<div onclick=\"_this.todetail("+res1.data.thinglist[j].thId+")\"><a target=\"_blank\" href=\"#thingDetail/"+res1.data.thinglist[j].thId+"\"><img src=\""+_this.addressUrl+res1.data.thinglist[j].coverImgUrl+"\"><p style=\"cursor:pointer\" id=\"hotthingtitle\">"+res1.data.thinglist[j].title+"</p></a></div>";
	    	     			}
							html2+="</div>";
							$(".recommend").html(html2);
	    	     			$(".index-page").css("background","url("+_this.addressUrl+res.data.thingmap.coverImgUrl+") no-repeat");
	    	     			$(".index-page").css("background-size","100% 100%");
                     })
                     
                },function(){

                })
            }
        },
        mounted(){
            var _this = this
            _this.getthingdetail()
            $(document).on('click','.person-msg-right',function(){
                $('.container .list').css('left','-100%')
                $('.back-index-page img').css('display','block')
            })
            $(document).on('click','.back-index-page',function(){
                $('.container .list').css('left','0')
                $('.back-index-page img').css('display','none')
			})
			var s = 0
			
			$('#wrapper').on('mousewheel',function(e){
				e.preventDefault();
				var smax = $('#wrapper')[0].scrollWidth - $(window).width()
				console.log(e.deltaX,e.deltaY,e.deltaFactor)
				console.log($(this)[0].scrollWidth)
				console.log($(window).width())
				s = s+(e.deltaY * e.deltaFactor*-1)
				console.log(s)
				console.log(smax)
				if(s<0){ 
					s = 0
				}
				if(s>smax){
					s = smax
				}
				$(this).scrollLeft(s)
				
			})


			
            var a = true
            $('#wrapper').on('scroll',function(){
                var ulWidth = $('.cnt-list').width(),
                        winWidth = $(window).width();
                if ($('#wrapper').scrollLeft() >= (ulWidth-winWidth)) {
                        // 滚动到底部了
                        if(a){
                            _this.maskShow = true
                        }
                       a = false
                    }
				});
				
        }
    }
</script>

<style lang="less">
    body {
				font-family: "microsoft yahei";
			}

			.container {
				width: 100%;
				height: 100vh;
				position: relative;
			}

			.container .list {
				position: absolute;
				height: 100vh;
				width: 100%;
				display: flex;
				transition: all 500ms;
			}

			body::-webkit-scrollbar {
				width: 0px;
				height: 0px;
			}

			body::-webkit-scrollbar-thumb {
				border-radius: 5px;
				background: #ffbf43;
			}

			body::-webkit-scrollbar-track {
				border-radius: 0;
				background: #F1F1F1;
			}
			.thing-detail-container{
				.index-page {
				min-width: 100%;
				height: 100%;
				position: relative;
			}

			.top-logo {
				position: fixed;
				left: 0;
				width: 100%;
				padding: 16px 16px 0;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				z-index: 1;
			}

			.top-logo a {
				overflow: hidden;
			}

			.top-logo .logo {
				width: 168px;
				height: 36px;
			}

			.top-logo .logo img {
				width: 100%;
				height: 100%;
			}

			.top-logo .right-img2 {
				width: 52px;
				height: 52px;
				background: rgba(0, 0, 0, .7);
				border-radius: 50%;
				text-align: center;
				line-height: 36px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.top-logo .right-img2 img {
				width: 45px;
				height: 45px;
				border-radius: 50%;
			}

			.person-msg-box {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 144px;
				margin: auto;
				height: 300px;
				width: 470px;
			}

			.person-msg-box h4 {
				color: #fff;
				font-size: 36px;
				font-weight: bold;
				line-height: 60px;
				text-shadow: 2px 1px 8px #7d7d7d;
			}

			.person-msg {
				margin-top: 69px;
				display: flex;
				justify-content: space-between;
			}

			.person-msg-head {
				width: 90px;
				height: 90px;
				border: 3px solid #fff;
				box-sizing: border-box;
				border-radius: 50%;
			}

			.person-msg-left {
				display: flex;
				align-items: center;
			}

			.person-msg-head img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}

			.person-msg-left h6 {
				margin-left: 30px;
				font-size: 18px;
				color: #fff;
			}

			.person-msg-right {
				width: 90px;
				height: 90px;
				box-sizing: border-box;
				background: none;
				cursor: pointer;
				outline: none;
				border: none;
			}

			.person-msg-right img {
				width: 90px;
				height: 90px;
			}

			.cmt-area {
				position: fixed;
				bottom: 10px;
				right: 16px;
				height: 90%;
				width: 550px;
				background: rgba(0, 0, 0, .8);
				border-radius: 5px;
				box-sizing: border-box;
				padding: 20px;
				z-index:20;
			}

			.top-textarea {
				position: relative;
				width: 100%;
				height: 100px;
				box-sizing: border-box;
			}

			.top-textarea textarea {
				width: 100%;
				height: 100%;
				resize: none;
				box-sizing: border-box;
				padding: 10px;
				color: #999999;
				font-size: 12px;
			}

			.top-textarea .tishi {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				padding: 10px;
				color: #999999;
				font-size: 12px;
			}

			.top-textarea .tishi span {
                margin: 0 10px;
                color: blue;
                cursor: pointer;
			}

			.cmt-btn {
				float: right;
				width: 80px;
				height: 34px;
				margin-top: 15px;
				border: none;
				border-radius: 5px;
				/* background: #FFBF43; */
				color: #fff;
				cursor: pointer;
				background: #B5B5B5;
			}

			.clear {
				clear: both;
			}

			.allCmt-area h5 {
				color: #FFBF43;
				padding: 15px;
				border-bottom: 1px solid #fff;
			}

			.cmt-detail {
				max-height: 610px;
				overflow-y: scroll;
			}
			.cmt-detail::-webkit-scrollbar {
				width: 10px;
				height: 8px;
			}

			.cmt-detail::-webkit-scrollbar-thumb {
				border-radius: 5px;
				background: #FFBF43;
			}

			.cmt-detail::-webkit-scrollbar-track {
				border-radius: 0;
				background: #F1F1F1;
			}

			.cmt-detail li {
				padding: 15px 0;
				border-bottom: 1px solid #fff;
				color: #fff;
				font-size: 14px;
			}

			.cmt-detail p {
				display: flex;
			}

			.cmt-detail span {
				display: inline-block;
				line-height:24px;
			}

			.cmt-detail .cmt-name {
				margin-right: 30px;
				white-space: nowrap;
			}

			.cmt-detail .cmt-cnt {
				padding-right: 38px;
			}

			.cmt-detail i {
				display: inline-block;
				font-size: 12px;
				color: #999;
				margin-top: 15px;
			}
			.replyBtn{
				float:right;
				margin-right:40px;
				cursor:pointer;
			}

			.see-more {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 38px;
				border: none;
				background: rgba(0, 0, 0, .6);
				color: #FFBF43;
				font-size: 12px;
			}

			.cnt-list {
				width: auto;
				height:100%;
				max-height:100%;
				display: flex;
				align-items: center;
				box-sizing: border-box;
			}

			.cnt-list .cnt-text {
				/* position: relative;
				height: 800px;
				margin-left: 10px;
				box-sizing: border-box;
				margin-top: 60px; */
				float:left;
				position:relative;
				margin-top: 60px;
			}
			.cnt-list .cnt-text ul{
				width:auto;
				display: flex;
				align-items: center;
			}
			.cnt-list .cnt-text ul li:nth-child(1) div p{
				text-indent: 2em;
			}
			.cnt-list .cnt-img{
				height: 800px;
				margin-left: 10px;
				box-sizing: border-box;
				margin-top: 60px; 
				float:left;
				position:relative;
			}
			.cnt-list .cnt-text ul li{
				float:left;
				position: relative;
				height: 800px;
				margin-left: 10px;
				box-sizing: border-box;
				 padding: 56px 38px;
				background: #fff;
				font-size: 16px;
				color: #333;
		}
		.cnt-list .cnt-text ul li div{
				width: 344px;
				height: 688px;
				overflow: hidden;
		}
		.cnt-list .cnt-text ul:after{
				content: '';
				height: 0;
				visibility: hidden;
				display: block;
				clear: both;
		}
		.cnt-list:after{
				content: '';
				height: 0;
				visibility: hidden;
				display: block;
				clear: both;
			}
			.cnt-text ul li div p {
				/* width: 344px;
				height: 100%;
				font-size: 16px;
				text-indent: 32px;
				line-height: 30px;
				overflow:hidden;
				word-break:break-all; */
				height: auto;
				font-size: 16px;
				line-height: 30px;
			}
			.cnt-list li img {
				height: 100%;
				width:auto;
			}

			.cnt-list li button {
				position: absolute;
				right: 20px;
				bottom: 20px;
				border-radius: 5px;
				padding: 5px 10px;
				color: #fff;
				display: flex;
				align-items: center;
				border: none;
				background: rgba(0, 0, 0, .5);
			}

			.cnt-list li button img {
				width: 20px;
				height: 20px;
				margin-right: 5px;
			}

			/* .cnt-text {
				padding: 56px 38px;
				background: #fff;
				font-size: 16px;
				color: #333;
			}

			.cnt-text p {
				width: 344px;
				height: 100%;
				font-size: 16px;
				text-indent: 32px;
				line-height: 30px;
			} */

			.cnt-text div::-webkit-scrollbar {
				width: 4px;
				height: 10px;
			}

			.cnt-text div::-webkit-scrollbar-thumb {
				border-radius: 5px;
				background: #FFBF43;
			}

			.cnt-text div::-webkit-scrollbar-track {
				border-radius: 0;
				background: #F1F1F1;
			}

			.list-out-box {
				min-width: 100%;
				height: 100%;
				overflow-x: scroll;
				overflow-y: hidden;
				display: flex;
			}

			.list-out-box::-webkit-scrollbar {
				width: 4px;
				height: 8px;
			}

			.list-out-box::-webkit-scrollbar-thumb {
				border-radius: 5px;
				background: #FFBF43;
			}

			.list-out-box::-webkit-scrollbar-track {
				border-radius: 0;
				background: #F1F1F1;
			}

			.list-end {
				width: 600px;
				background: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: relative;
    			height: 800px;
    			margin-left: 10px;
    			box-sizing: border-box;
    			margin-top: 60px;
			}

			.list-end img {
				width: 40px;
				height: 48px !important;
			}

			.list-end p {
				margin-top: 20px;
				font-size: 16px;
				color: #666;
			}

			.recommend {
				width: 745px;
				padding: 22px 32px;
				background: #fff;
				position: relative;
    			height: 800px;
    			margin-left: 10px;
    			box-sizing: border-box;
    			margin-top: 60px;
			}

			.recommend h3 {
				font-size: 24px;
				color: #333;
			}

			.recommend-list {
				width: 100%;
				margin-top: 20px;
				display: flex;
				flex-wrap: wrap;
			}

			.recommend-list>div {
				width: 330px;
				margin: 0 20px 20px 0;
			}
			.recommend-list>div:hover{
				color:#ffbf43;
			}

			.recommend-list>div>a>img {
				width: 100%;
				height: 185px;
			}

			.recommend-list>div>a>p {
				margin-top: 20px;
				text-align: center;
			}

			.recommend-list>div:nth-child(2n) {
				margin-right: 0;
			}
			.offcmt{
				height: 0!important;
				display: none!important;
			}
			.top-logo-left{
				display: flex;
				align-items: center;
			}
			.back-index-page{
			margin-top:8px;
				margin-left: 55px;
				width: 30px;
				height: 30px;
			}
			.back-index-page img{
				width: 100%;
				height: 100%;
			}
			.disnone{
				display: none;
			}
			#mask{
				width: 100%;
				height: 100vh;
				position: fixed;
				top: 0;
				left: 0;
				background: rgba(0,0,0,.3);
			}
			.endTishi{
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				width: 320px;
				height: 200px;
				border-radius: 5px;
				background: #fff;
			}
			.endTishi>button{
				position: absolute;
				right: 0;
				top: 0;
				width: 20px;
				height: 20px;
				line-height: 20px;
				border-radius: 50%;
				background: #F4F4F4;
				border: none;
				cursor: pointer;
			}
			.endTishi>h4{
				font-size: 20px;
				color: #333;
				text-align: center;
				margin-top: 20px;
			}
			.endTishi>div{
				display: flex;
				justify-content: space-around;
				margin-top: 30px;
			}
			.endTishi>div>button{
				cursor: pointer;
				border:none;
				background:none;
				outline:none;
			}
			.endTishi>div>button>img{
				width: 53px;
				height: 46px;
			}
			.endTishi>div>button>span{
				display: block;
				margin-top: 10px;
			}
			.reply-box{
			  position: fixed;
			  right: 0;
			  left: 0;
			  top: 0;
			  bottom: 0;
			  margin: auto;
			  width: 400px;
			  height: 285px;
			  background: #fff;
			  border-radius: 5px;
			  box-shadow: 0 0 2px #999;
			}
			.reply-box>h4{
				width: 100%;
			    height: 50px;
			    border-bottom: 1px solid #eaeaea;
			    display: flex;
			    align-items: center;
			    justify-content: space-between;
			    font-size: 16px;
			    box-sizing: border-box;
			    padding: 0 20px;
			}
			.reply-box>h4>span{
				cursor:pointer;
				    font-weight: bold;
			}
			.reply-box>textarea {
			    display: block;
			    width: 90%;
			    height: 150px;
			    margin: 20px auto;
			    resize: none;
			    outline: none;
			    border-radius: 5px;
			}
			.reply-box>button {
			    width: 80px;
			    height: 30px;
			    float: right;
			    margin-right: 20px;
			    border: none;
			    outline: none;
			    background: #ffbf43;
			    color: #fff;
			    border-radius: 5px;
			    cursor:pointer;
			}
			}
			
</style>