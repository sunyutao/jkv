<template>
	<div>
		<LoginS :isShow="loginShow" @showFun="showFun"></LoginS>
		<Header link="exper"></Header>
		<div class="topic-detail-container">
			<!--导航-->
			<div class="bread-crumb-container">
                <div class="bread-crumb">
                    <span>当前位置：</span>
                    <router-link target="_blank" to="/exper">体验</router-link> 》
                    <router-link target="_blank" to="/topicList">参与话题</router-link> 》
                    <span>{{topicInfo.topTitle}}</span>
                </div>
            </div>
            <!--主贴信息-->
            <div class="followUpTopMsg">
				<h2 id='top_title'>{{topicInfo.topTitle}}</h2>
				<div class="followUpTopPersonMsg">
					<div class="followUpTopPersonMsgLeft">
						<img :src='addressUrl+topicInfo.userHeadUrl'/>
						{{topicInfo.userNm}}
						<span>{{topicInfo.pubDate}}</span>
					</div>
					<p class="followUpTopPersonMsgRight">浏览&nbsp;{{topicInfo.readNum}}&nbsp;次</p>
				</div>
				<p  id="top_content" @click="showEvent($event)" class="followUpTopText openOffAll" v-html="topicCon" >
				</p>
				<div class="followUpTopMsgFoot">
					<ul>
						<li v-for="(item,index) in topicInfo.labellist" :key="index">
							{{item.labNm}}
						</li>
					</ul>
					<span class="ItemFootActive" @click="isLogin(showTextArea)">
						<div></div>
						跟帖
					</span>
				</div>
			</div>
			<!--添加跟帖-->
			<div class="showTextarea" v-show="textareaShow">
				<div class="followUpTextarea"  id='quillEditorQiniu'>
					<button type="button">
					<img src="../../../assets/exper/Close_a.png" @click="hideTextShow()">
					</button>
					<!-- 基于elementUi的上传组件 el-upload begin-->
			       <el-upload class="avatar-uploader"
			            :action="actionUrl"
			            :accept="'image/*'"			            :show-file-list="false"
			            :on-success="uploadEditorSuccess"
			            :on-error="uploadEditorError"
			            :before-upload="beforeEditorUpload">
			        </el-upload>
			        <!-- 基于elementUi的上传组件 el-upload end-->
			        <quill-editor id="qullEditor"  class="editor"  v-model="content" ref="customQuillEditor" :options="editorOption" @change="onEditorChange($event)">
			        </quill-editor>
				</div>
				<div class="followUpTextareaBtn">
					<button type="button" :class="publicThre?'btnAct':''" id="ItemFootActive" @click="publicThreInfo()">发表</button>
				</div>
			</div>
			<!--跟帖评论列表-->
			<section class="followList" v-if="followList.length >0">
				<div  class='threbox' v-for="(item,index) in followList" :key="index">
					<div class="followUpArea">
						<h4 v-show="index==0">全部跟帖 ( {{followList.length}}条 )</h4>
						<div class="followUpAreaMsg">
							<img :src="addressUrl+item.userHeadUrl">
							<p>{{item.userNm}}<span>{{getCurrentDays(item.pubDate)}}天前</span></p>
						</div>
						<div ref="threcon" class="followUpAreaMsgfoot" :style="{height:item.upDown?'auto':'240px'}" :class="index==0?'firstMsg':''" v-html="item.topContent">
						</div>
						<div class="followUpAreaMsgD">
							<div></div>
							<div class="offFollowUpAreaMsg" @click="upDownBox(index)">
								<i class="layui-icon layui-icon-down"></i>{{item.updowntext?item.updowntext:'展开'}}
							</div>
							<div class="clickUpDown " :class="item.clicked?'clicked':''" @click="addThreLikeNum(index)">
								<div></div>
								<p class="disnone">0</p>
								<span class="clickUp">{{item.likeNum}}</span>
							</div>
						</div>
					</div>
					<div class="CommentReplyBox" style="padding-left:40px">
						<input class="BoxinputText" type="text" placeholder="说点什么..." @input="changeEvent($event,index)">
						<button class="Btnhuifu" :class="item.com?'btnAct':''" type="button" @click="isLogin(addComment,$event,item.topId)">评论</button>
					</div>
					<div class="commentArea" v-if="item.commlist.length > 0">
						<nav class="commentAreaTop">全部评论 ( {{item.commlist.length}}条 )</nav>
						<ul class="commentAreaCnt">
							<li v-for="(item1,index1) in item.commlist" :key="index1">
								<span class="replyBack1" @click="isLogin(showReplayWin,index,index1)">回复</span>
								<h5 class="personName">{{item1.userNm}}<span>{{getCurrentDays(item1.commDate)}}天前</span></h5>
								<p class="firstPersonText" v-html="item1.commContent"></p>
								<div class="CommentReplyBox" :class="item1.showRepaly?'':'huifuBox'">
									<input class="BoxinputText" type="text" :placeholder="'回复'+item1.userNm" ref="commRep" @input="changeEvent($event,index,index1)">
									<button class="Btnhuifu"  type="button" @click="addReply($event,item1)" :class="item1.com?'btnAct':''" >回复</button>
								</div>
								<ul class="replyArea commentReplyArea" v-if="item1.replaylist.length > 0">
									<li v-for="(item2,index2) in item1.replaylist" :key="index2">
										<span class="replyBack"  @click="isLogin(showReplayWin,index,index1,index2)">回复</span>
										<h5 style="margin-top: 0;">
											{{item2.userANm}} &gt; {{item2.userBNm}}
											<span>{{getCurrentDays(item2.repDate)}}天前</span>
										</h5>
										<p class="firstPersonText">{{item2.repContent}}</p>
										<div class="CommentReplyBox" :class="item2.showRepaly?'':'huifuBox'">
											<input class="BoxinputText" type="text" :placeholder="'回复'+item2.userANm" @input="changeEvent($event,index,index1,index2)">
											<button class="Btnhuifu"  :class="item2.com?'btnAct':''" type="button" @click="addReply($event,item2)">回复</button>
										</div>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</section>
			<section class="followList"  v-else>
				<div class='followUpArea' ><div  class='threbox'><div class="followUpArea"><h4>全部跟帖 ( 0条 ) </h4></div></div></div>
			</section>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>
import Header from '@/components/header';
import Footer from '@/components/footer';
import LoginS from '@/components/loginS';
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
	name:"topDetView",
    data() {
      return {
      	actionUrl:this.addressUrl+"/cexper/topic/inter/kindImg.do",
      	topicInfo:{},
      	topicCon:'',
      	followList:[],
      	textareaShow:false,
      	publicThre:false,
      	content:null,
      	quillUpdateImg:false,
        editorOption:{
        	 modules:{
                toolbar:{
                	container:[
					  	['bold', 'italic', 'underline'],
					  	[{ 'align': [] }], ['image']
					],
					 handlers: {
                        'image': function (value) {
                            if (value) {
                                document.querySelector('#quillEditorQiniu .avatar-uploader input').click()
                            } else {
                                this.quill.format('image', false);
                            }
                        }
                    }
                }
            }
        },
        loginShow:false
      };
    },
    components:{
        Header,Footer,LoginS,quillEditor  
    },
    created(){
    	this.httpTopicInfo();
    	this.httpFollowList();
    	this.readnum();
    },
    mounted(){
    	this.$refs.customQuillEditor.quill.container.style.height = `${300}px`
    },
    methods:{
    	showFun:function(data){
    		this.loginShow = data;
    	},
    	isLogin:function(func,...arr){
    		let _this = this;
    		_this.$ajax.post("/travel/cmm/checkUser.do").then(function(res){
    			if(res.data && res.data.flag){
    				func(...arr);
    			}else{
    				_this.loginShow = true;
    			}
    		});
    	},
    	showEvent:function(e){
    		if(e && e.target && e.target.localName && e.target.localName == 'a'){
    			let con = this.topicInfo.topContent;
    			if(e.target.text == '---->>>详情'){
    				this.topicCon = `${con}<a class="showTextAll">---->>>收起</a>`
    			}else if(e.target.text == '---->>>收起'){
    				this.topicCon = `${con.substring(0, 200)}<a class="showTextAll">---->>>详情</a>`;
    			}
    		}
    	},
    	showTextArea:function(){
    		this.textareaShow = true;
    	},
    	hideTextShow:function(){
    		this.content="";
    		this.textareaShow = false;
    	},
    	onEditorChange:function(){
    		if(this.content){
    			this.publicThre = true;
    		}else{
    			this.publicThre = false;
    		}
    	},
    	publicThreInfo:function(){
    		if(!this.content){
    			return;
    		}
    		let _this = this;
    		_this.$ajax.post("/cexper/topic/inter/addtopicone.do",_this.$qs.stringify({pId:_this.$route.params.id,topType:2,topContent:_this.content})).then(function(res){
    			if(res && res.data && res.data.flag){
    				_this.$alert("发表成功").then(function(){
    					_this.textareaShow = false;
    					_this.content="";
    					_this.httpFollowList();
    				});
    			}else{
    				_this.$alert("系统出错了！~")
    			}
    		});
    	},
    	//上传图片之前
        beforeEditorUpload(res, file){
            //显示上传动画
            this.quillUpdateImg = true;
        },
        // 上传图片成功
        uploadEditorSuccess(res, file) {
        	let imgUrl = "";
        	if(res.code == 0 && res.data){
        		imgUrl = this.addressUrl + res.data.src;
        	}else{
        		this.$alert("上传出错了");
        		return false;
        	}
            // 获取富文本组件实例
            let quill = this.$refs.customQuillEditor.quill;

           // 获取光标所在位置
            let length = quill.getSelection().index;

            // 插入图片  res.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', imgUrl)

            // 调整光标到最后
            quill.setSelection(length + 1)

            //取消上传动画
            this.quillUpdateImg = false;

        },
        // 上传图片失败
        uploadEditorError(res, file) {
        	this.$alert("上传出错了");
            //取消上传动画
            this.quillUpdateImg = false;
        },
    	changeEvent:function(event,index,index1,index2){
    		//监听input
    		let bool = false;
    		if(!event || !event.target){
    			return;
    		}
    		let value = event.target.value;
    		if(value && value != '' ){
    			bool = true;
    		}
    		if(index2 == 0 || index2){
    			let rep = this.followList[index].commlist[index1].replaylist[index2];
    			rep.com = bool;
    			this.followList[index].commlist[index1].replaylist.splice(index2,1,rep);
    		}else if(index1 == 0 || index1){
    			let comm = this.followList[index].commlist[index1];
    			comm.com = bool;
    			this.followList[index].commlist.splice(index1,1,comm);
    		}else{
    			let follow = this.followList[index];
    			follow.com = bool;
    			this.followList.splice(index,1,follow);
    		}
    	},
    	upDownBox:function(index){
    		var udtext = this.followList[index].updowntext;
    		this.followList[index].upDown = this.followList[index].upDown?(!this.followList[index].upDown):true;
    		if(this.followList[index].upDown){
    			this.followList[index].updowntext = "收起";
    		}else{
    			this.followList[index].updowntext = "展开";
    		}
    		this.$refs.threcon[index].style.height='auto';
    		let height = this.$refs.threcon[index].offsetHeight;
    		if(height < 240){
    			this.followList[index].upDown = false;
    			this.followList[index].updowntext = (udtext == "收起"?"展开":"收起");
    			this.$refs.threcon[index].style.height = "240px";
    		}
    		this.followList.splice(index,1,this.followList[index]);
    	},
    	showReplayWin:function(index,index1,index2){
    		if(index2 == 0 || index2){
    			let rep = this.followList[index].commlist[index1].replaylist[index2];
    			rep.showRepaly = rep.showRepaly ? (!rep.showRepaly):true;
    			this.followList[index].commlist[index1].replaylist.splice(index2,1,rep);
    		}else{
    			let comm = this.followList[index].commlist[index1];
    			comm.showRepaly = comm.showRepaly ? (!comm.showRepaly):true;
    			this.followList[index].commlist.splice(index1,1,comm);
    		}
    	},
    	addComment:function(event,topId){
    		if(!event || !event.target){
    			return;
    		}
    		let parentNode = event.target.parentNode;
    		let inputVal = parentNode.getElementsByTagName("input")[0].value;
    		if(!inputVal){
    			return;
    		}
    		let data = {};
    		data.topId = topId;
    		data.topPId = this.$route.params.id;
    		data.commContent = inputVal;
    		let _this = this;
    		_this.$ajax.post("/cexper/topic/inter/addtopiccomm.do",_this.$qs.stringify(data)).then(function(res){
    			if(res && res.data && res.data.flag){
    				_this.$alert("评论成功").then(function(){
    					_this.httpFollowList();
    				});
    			}else{
    				_this.$alert("操作出问题了~！")
    			}
    		});
    	},
    	addReply:function(event,item){
    		if(!event || !event.target){
    			return;
    		}
    		let parentNode = event.target.parentNode;
    		let inputVal = parentNode.getElementsByTagName("input")[0].value;
    		if(!inputVal){
    			return;
    		}
    		let data = {};
    		data.commId = item.commId;
    		data.topId = item.topId;
    		data.topPId = this.$route.params.id;
    		data.userBId = item.userAId?item.userAId:item.userId;
    		data.userBNm = item.userANm?item.userANm:item.userNm;
    		data.repContent = inputVal;
    		let _this = this;
    		_this.$ajax.post("/cexper/topic/inter/addtopicreply.do",_this.$qs.stringify(data)).then(function(res){
    			if(res && res.data && res.data.flag){
    				_this.$alert("回复成功").then(function(){
    					_this.httpFollowList();
    				});
    			}else{
    				_this.$alert("操作出问题了~！")
    			}
    		});
    	},
    	addThreLikeNum:function(index){
    		var _this = this;
    		let follow = _this.followList[index];
    		if(follow.clicked){
    			return;
    		}
    		let str = _this.$qs.stringify({topId:follow.topId});
    		_this.$ajax.post("/cexper/topic/inter/addikenum.do",str).then(function(res){
    			if(res && res.data && res.data.flag){
    				follow.clicked = true;
    				follow.likeNum = follow.likeNum ? (follow.likeNum +1):1;
    				_this.followList.splice(index,1,follow);
    			}
    		});
    	},
    	readnum:function(){
    		var _this = this;
    		let str = _this.$qs.stringify({topId:_this.$route.params.id});
    		_this.$ajax.post("/cexper/topic/inter/addreadnum.do",str).then(function(res){
    			if(res && res.data && res.data.flag){
    				
    			}
    		});
    	},
    	httpTopicInfo:function(){
    		var _this = this;
    		_this.$ajax.post("/cexper/topic/inter/gettopicone.do",_this.$qs.stringify({topId:_this.$route.params.id})).then(function(res){
    			if(res && res.data && res.data.flag && res.data.topicmap){
    				_this.topicInfo = res.data.topicmap;
    				let con = res.data.topicmap.topContent ? res.data.topicmap.topContent :'';
					if(con.length > 200){
		    			 con = `${con.substring(0, 200)}<a class="showTextAll">---->>>详情</a>`;
		    		}
		    		_this.topicCon = con;
    			}
    		});
    	},
    	httpFollowList:function(){
    		var _this = this;
    		_this.$ajax.post("/cexper/topic/inter/gettopiccomm.do",_this.$qs.stringify({pId:_this.$route.params.id})).then(function(res){
    			if(res && res.data && res.data.flag && res.data.topiclist){
    				_this.followList = res.data.topiclist;
    			}
    		});
    	},
    	getCurrentDays: function(pubDate){
		    var date = new Date();
		 	pubDate = new Date(pubDate);
		 	var time=date.getTime()-pubDate.getTime();
		 	var days=parseInt(time/(1000 * 60 * 60 * 24));
		 	return days;
	  }
    }
}
</script>
<style  lang="less" scoped>
	.topic-detail-container{
		padding-top:100px;
		width: 1170px;
	    margin: 0 auto;
	    box-sizing: border-box;
	    .bread-crumb-container{
	    	margin-bottom:20px;
	    }
	    .followUpTopMsg {
			background: #FFFFFF;
			border-radius: 5px;
			padding: 30px;
			padding-bottom: 20px;
			h2 {
				font-size: 34px;
			}
			.followUpTopPersonMsg {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 15px 0;
				p {
					font-size: 12px;
					color: #707070;
				}
				.followUpTopPersonMsgLeft {
					display: flex;
					align-items: center;
					font-size: 16px;
					img {
						width: 48px;
						height: 48px;
						border-radius: 100%;
						border: 2px solid #FFBF43;
						box-shadow: 0px 1px 9px #FFBF43;
						margin-right: 20px;
					}
					span {
						font-size: 12px;
						color: #707070;
						margin-left: 20px;
					}
				}

			}
			.followUpTopMsgFoot {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 15px;
				ul {
					width: 90%;
					display: flex;
					flex-wrap: wrap;
					box-sizing: border-box;
					li {
						padding: 5px 15px;
						border: 1px solid #E7E7E7;
						border-radius: 20px;
						cursor: pointer;
						margin-right: 10px;
						line-height:19px;
						font-size:14px;
					}
				}
				span {
					color: #999999;
					cursor: pointer;
					display: flex;
					align-items: center;
					div {
						display:inline-block;
						width: 20px;
						height: 20px;
						margin-right: 10px;
						background-image:url(../../../assets/exper/comment_a.png);
					}
					&:hover{
						color: #FFBF43;
						div{
							background-image:url(../../../assets/exper/comment_b.png);
						}
					}
				}
			}
			.followUpTopText{
				color: #666666;
				letter-spacing: 3px;
				line-height: 26px;
				border-bottom: 1px solid #F7F7F7;
				padding-bottom: 10px;
				font-size:16px;
				bottom: 5px;
			}
			#top_content{
				a{
					color:#ffbf43;
				}
			}
			.openOffAll{
				position: relative;
				span{
					position: absolute;
					right:0;
					bottom:0;
					background:#ffffff;
					color:#FFBF43;
					cursor:pointer;
					padding-left: 5px;
				}
			}
		}
		.followList{
			.threbox{
				.followUpArea {
					background: #FFFFFF;
					border-radius: 5px;
					position: relative;
					margin-top: 15px;
					h4 {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 16px;
						border-bottom: 1px solid #F7F7F7;
						box-sizing: border-box;
						padding: 15px 40px;
						i{
							margin-left:5px;
						}
						span {
							font-size: 14px;
							color: #999999;
							cursor:pointer;
						}
					}
					.followUpAreaMsg {
						box-sizing: border-box;
						padding:  20px 40px 0 40px;
						display: flex;
						align-items: center;
						img {
							width: 48px;
							height: 48px;
							border-radius: 100%;
							margin-right: 15px;
						}
						p {
							display: flex;
							flex-direction: column;
							justify-content: center;
							margin: 0;
							span {
								margin-top: 10px;
								font-size: 12px;
								color: #999999;
							}
						}
					}
					.followUpAreaMsgfoot {
						box-sizing: border-box;
						padding: 10px 44px;
						display: flex;
						flex-direction: column;
						align-items: center;
						color: #666;
						border-bottom: 1px solid #F7F7F7;
				    	overflow: hidden;
				    	font-size:16px;
				    	line-height:30px;
				    	img {
							max-width: 40%;
							margin: 15px 0;
						}
					}
					.followUpAreaMsgD {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 10px;
						box-sizing: border-box;
						padding: 4px 40px 14px;
						color: #999999;
						.clickUpDown {
							display: flex;
							align-items: center;
							height: 30px;
							cursor: pointer;
							img{
								width:16px;
								margin-right:5px;
							}
							div{
								display:inline-block;
								width:16px;
								height:16px;
								margin-right:5px;
								background-image:url(../../../assets/exper/Fabulous_a.png);
								background-size:100%;
							}
							&:hover{
								div{
									background-image:url(../../../assets/exper/Fabulous_b.png);
								}
								span{
									color:#ffbf43;
								}
							}
							
							i{
								margin-right:5px;
							}
							.clickUp {
								display: flex;
								justify-content: center;
								align-items: center;
							}
							.disnone{
								display:none;
							}
						}
						.clicked{
							div{
								background-image:url(../../../assets/exper/Fabulous_b.png);
							}
							span{
								color:#ffbf43;
							}
						}
						.offFollowUpAreaMsg{
							cursor:pointer;
							i{
								margin-right:5px;
							}
						}
					}
				}
				.commentArea{
					width: 100%;
					background: #FFFFFF;
					box-sizing: border-box;
					padding: 0 15px 15px 15px;
					border-radius: 5px;
					ul{
						li{
							.CommentReplyBox{
								background: #F7F7F7;
							}
							.replyBack1{
								position: absolute;
							    top: 10px;
							    right: 35px;
							    cursor:pointer;
							}
							.huifuBox {
								display: none;
							}
							.toggleClass {
								display: flex !important;
								background: #F7F7F7;
							}
							.firstPersonText {
								color: #666;
								line-height:22px;
							}
							.personName {
								font-size: 16px;
							}
							.replyArea {
								background: #F7F7F7;
								box-sizing: border-box;
								padding: 0 10px;
								width: 98%;
								margin-left: 2%;
								margin-top: 10px;
								border-radius: 5px;
							}
							.commentReplyArea{
								li{
									.replyBack{
									    position: absolute;
									    top: 10px;
									    right: 0;
									    cursor:pointer;
									}
									border-bottom: 1px dashed #B1B1B1;
								}
								li:last-child{
									border:none;
								}
							}
						}
					}
					.commentAreaTop {
						width: 96%;
					    display: block;
					    margin: 0 auto;
						font-size:18px;
						padding:0 0 8px;
						border-bottom: 1px solid #999999;
					}
					.commentAreaCnt {
						width: 100%;
						font-size: 14px;
						span {
							font-size: 14px;
							margin-left: 15px;
							color: #666666;
							/*cursor:pointer;*/
						}
						p {
							margin: 12px 0 0 0;
							font-size:16px;
						}
						li {
							border-bottom: 1px dashed #B1B1B1;
							padding: 20px 25px;
							position: relative;
							top: 10px;
							right: 0px;
							/*cursor:pointer;*/
							img {
								right: 20px;
							}
						}
						li:last-child{
							border:none;
						}
					}
				}
				.CommentReplyBox {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					margin-top: 15px;
					background:#FFF;
					padding: 20px 40px 10px 0;
					button {
						margin-top: 10px;
						width: 100px;
						height: 30px;
						border-radius: 5px;
						background: #B5B5B5;
						color: #FFFFFF;
						border: none;
						outline: none;
					}
					.btnAct{
						background-color:#FFBF43;
					}
					.BoxinputText {
						outline: none;
						background: #F8F8F8;
						border-radius: 5px;
						border: 1px solid #DDDDDD;
						width: 100%;
						box-sizing: border-box;
						padding: 8px 15px;
					}
				}
			}
			
		}
		.showTextarea{
			display:block;
			.followUpTextarea{
				background: #FFFFFF;
				margin-top: 15px;
				position: relative;
				.avatar-uploader{
					height:0px;
				}
				button{
					position: absolute;
					top: 10px;
					right: 26px;
					border: none;
					outline: none;
					background: none;
					width: 20px;
					height: 20px;
					cursor:pointer;
				}
			}
			.followUpTextareaBtn{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin: 15px 0;
				button{
					width: 95px;
					height: 32px;
					border-radius: 5px;
					background: #B5B5B5;
					color: #FFFFFF;
					border: none;
					outline: none;
					cursor:pointer;
				}
				.btnAct{
					background: #FFBF43;
				}
			}

		}
	}
</style>
<style scoped>
#top_content  >>>  a{
	color:#ffbf43 !important;
	cursor:pointer;
}
.followUpAreaMsgfoot  >>> p{
	max-width:100%;
}
.followUpAreaMsgfoot  >>> p img{
	max-width:100%;
}
</style>
