<template>
	<div>
		<Header link="exper"></Header>
		<LoginS :isShow="loginShow" @showFun="showFun"></LoginS>
		<div class="exper-container">
			<!-- 精彩瞬间 -->
			<div class="WonderfulMoment">
				<div class="ModuleTitle">
					<h3 class="ModuleTitleTextCnt">
						精彩瞬间
					</h3>
					<p class="ModuleTitleTextBot">
						这没有一场说走就走的旅行
						只有遍布全球的人生体验
					</p>
				</div>
				<div class="ModuleCnt">
					<div class="ModuleTop">
						<div class="ModuleTopLeft">
							<input type="hidden" id="labId"   value="" />
							<ul class="ModuleTopLabel jsWonderfulMomentLabel" id="wonLabType">
								<li v-for="(item,index) in won.wonTypeList" :key="index">
									<a class="clickShowList" :class="won.typeAct == index ?'ModuleTopLabelLiActive':''" @click="chooseWonType(item.labId,index)">{{item.labNm}}</a>
								</li>
							</ul>
						</div>
						<ul class="ModuleTopRight jsWonderfulMomentNewHot">
							<li>
								<a @click="isLogin('addOwnTheme')">
									添加主题<i class="layui-icon layui-icon-down"></i>
								</a>
							</li>
						</ul>
					</div>
					<div class="img-topic">
						<ul class="ModuleContent" id="wonList">
							<li class="ModuleContent_item" v-for="(item,index) in won.wonList" :key="index">
								<router-link target="_blank" :to='{path:"/wonDetail/"+item.wonId}'>
									<img :src="addressUrl+item.imgUrl">
									<p class="hoverShow">{{item.title}}</p>
								</router-link>
							</li>
						</ul>
						<div class="col-more">
							<router-link target="_blank" :to="'/wonList'">
								MORE
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<!-- 那人那事 -->
			<div class="WonderfulMoment">
				<div class="ModuleTitle">
					<h3 class="ModuleTitleTextCnt">
						那人那事
					</h3>
					<p class="ModuleTitleTextBot">
						这没有一场说走就走的旅行
						只有遍布全球的人生体验
					</p>
				</div>
				<div class="ModuleCnt">
					<div class="ModuleTop" >
						<ul class="ModuleTopRight2 jsPersonThing">
							<li><a  :class="thing.typeAct==0?'ModuleTopRightActive':''" @click="chooseThingSort(0)">最新发表</a></li>
							<li><a :class="thing.typeAct==1?'ModuleTopRightActive':''" @click="chooseThingSort(1)">最多评论</a></li>
						</ul>
						<a @click="isLogin('addThing')"  class="thingadd">
							添加文章
						</a>
					</div>
					<ul class="ModuleContent" id="thingList">
						<li class="personThing_item" v-for="(item,index) in thing.thingList" :key="index">
							<router-link target="_blank" :to="{path:'/thingDetail/'+item.thId}">
								<img :src="addressUrl+item.coverImgUrl">
								<p class="personThing_itemText">{{item.title}}</p>
							</router-link>
						</li>
					</ul>
				</div>
				<router-link target="_blank" :to="'/thingList'" class="ModuleTitleTextMore2">
					MORE<i class="layui-icon layui-icon-triangle-r"></i>
				</router-link>
			</div>
			<!-- 参与话题 -->
			<div class="WonderfulMoment">
				<div class="ModuleTitle">
					<h3 class="ModuleTitleTextCnt">
						参与话题
					</h3>
					<p class="ModuleTitleTextBot">
						这没有一场说走就走的旅行
						只有遍布全球的人生体验
					</p>
				</div>
				<div class="ModuleCnt">
					<div class="ModuleTop">
						<div class="ModuleTopLeft">
							<ul class="ModuleTopLabel joinTopic jsJoinTopicLabel" id="catelist">
								<li v-for="(item,index) in topic.topTypeList" @click="chooseTopType(item.cateId,index)"  :key="index">
									<a class="clickShowList" :class="topic.typeAct==index?'ModuleTopLabelLiActive':''">{{item.cateNm}}</a>
								</li>
							</ul>
						</div>
						<div class="add-topic-right">
							<a  @click="isLogin('addTopic')">
								添加话题
							</a>
						</div>
					</div>
					<ul class="ModuleContent TopicContent" id="topicList">
						<li v-for="(item,index) in topic.topList" :key="index">
							<router-link target="_blank" :to='{path:"/topicDetail/"+item.topId}'>
								<p class="TopicContent_left">
									{{item.topTitle}}<span></span>
								</p>
							</router-link>
						</li>
					</ul>
					<router-link target="_blank" :to="'/topicList'" class="ModuleTitleTextMore2">
						MORE<i class="layui-icon layui-icon-triangle-r"></i>
					</router-link>
				</div>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>
import Header from '@/components/header';
import Footer from '@/components/footer';
import LoginS from '@/components/loginS';
export default {
	name:"experView",
    data() {
      return {
      	won:{
      		disnone:true,
      		typeAct:-1,
      		wonTypeList:[],
      		labId:'',
      		wonList:[]
      	},
      	thing:{
      		typeAct:0,
      		thingList:[]
      	},
      	topic:{
      		typeAct:-1,
      		cateId:'',
      		topTypeList:[],
      		topList:[]
		},
		loginShow:false
      };
    },
    components:{
        Header,Footer,LoginS
    },
    created(){
    	this.httpWonTypeList();
    	this.httpWonList();
    	this.httpThingList();
    	this.httpTopTypeList();
    	this.httpTopicList();
    },
    methods:{
		showFun:function(data){
    		this.loginShow = data;
		},
		isLogin:function(url){
			let _this = this;
    		_this.$ajax.post("/travel/cmm/checkUser.do").then(function(res){
    			if(res.data && res.data.flag){
					const { href } = _this.$router.resolve({name: url})
                	window.open(href, '_blank')
    			}else{
    				_this.loginShow = true;
    			}
    		});
    	},
    	chooseWonType:function(labId,index){
    		if(this.won.typeAct == index){
    			this.won.typeAct = -1;
    			this.won.labId = '';
    		}else{
    			this.won.typeAct = index;
    			this.won.labId = labId;
    		}
    		this.httpWonList();
    	},
    	httpWonTypeList:function(){
    		var _this = this;
            _this.$ajax.post('/cexper/base/inter/getLabelList.do',_this.$qs.stringify({'labType': 1,'showHome': 'Y'})).then(function(res){
                if(res.data && res.data.flag && res.data.labList){
					_this.won.wonTypeList = res.data.labList;
				}else{
				}
                
            });
    	},
    	httpWonList:function(){
    		var _this = this;
            _this.$ajax.post('/cexper/won/inter/getLatestWonList.do',_this.$qs.stringify({'labId':_this.won.labId})).then(function(res){
                if(res.data && res.data.flag && res.data.wonList){
					_this.won.wonList = res.data.wonList;
				}else{
				}
                
            });
    	},
    	chooseThingSort:function(sort){
    		this.thing.typeAct = sort;
    		this.httpThingList();
    	},
    	httpThingList:function(){
    		var _this = this;
    		let sort = this.thing.typeAct == 1 ? 'hottest':'';
            _this.$ajax.post('/cexper/thing/inter/getthinglist.do',_this.$qs.stringify({sort:sort})).then(function(res){
                if(res.data && res.data.flag && res.data.thinglist){
					_this.thing.thingList = res.data.thinglist;
				}else{
				}
                
            });
    	},
    	httpTopTypeList:function(){
    		var _this = this;
            _this.$ajax.post('/cexper/topic/inter/gettopiccate.do').then(function(res){
                if(res.data && res.data.flag && res.data.list){
					_this.topic.topTypeList = res.data.list;
				}else{
				}
                
            });
    	},
    	chooseTopType:function(labId,index){
    		if(this.topic.typeAct == index){
    			this.topic.typeAct = -1;
    			this.topic.cateId = '';
    		}else{
    			this.topic.typeAct = index;
    			this.topic.cateId = labId;
    		}
    		this.httpTopicList();
    	},
    	httpTopicList:function(){
    		var _this = this;
            _this.$ajax.post('/cexper/topic/inter/gettopiclist.do',_this.$qs.stringify({topFir:_this.topic.cateId})).then(function(res){
                if(res.data && res.data.flag && res.data.list){
					_this.topic.topList = res.data.list;
				}else{
				}
                
            });
    	}

    }
}
</script>
<style lang="less" scoped>
.exper-container {
    width: 1170px;
    padding-top: 100px;
    margin: 0 auto;
    box-sizing: border-box;
    .WonderfulMoment{
    	.disnone{
			display:none!important;
		}
		.ModuleTitle {
			width: 300px;
			height: 200px;
			margin: 90px auto 50px auto;
			background: url(../../assets/exper/navBg.png) no-repeat;
			background-size: 100% 100%;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			.ModuleTitleTextCnt {
				font-size: 46px;
				font-weight: bold;
				color: #525252;
				position: relative;
			}
			.ModuleTitleTextBot {
				width: 60%;
				position: absolute;
				bottom: 0;
				line-height: 18px;
				text-align: center;
				font-size:14px;
			}
		}
		.ModuleCnt{
			.ModuleTop {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20px 0;
				border-bottom: 1px solid #EBEBEB;
				.ModuleTopLeft {
					display: flex;
					justify-content: center;
					align-items: center;
					.ModuleTopLabel {
						display: flex;
						justify-content: center;
						align-items: center;
						li {
							position: relative;
							cursor:pointer;
							min-width:53px;
							height:30px;
							margin-right:20px;
						}
						.clickShowList{
							display: inline-block;
							width:100%;
							height:100%;
							line-height:30px;
							padding:0 5px;
							white-space: nowrap;
							text-align: center;
							font-size: 14px;
							&:hover{
								color:#333;
							}
						}
						.ModuleTopLabelLiActive{
							background: #FFBF43;
							color: #FFFFFF;
							&:hover{
								color:#fff !important;
							}
						}
						
					}
					.joinTopic{
						li{
							a {
								position: relative;
							}
						}
					}
				}
				.ModuleTopRight{
					display: flex;
					align-items: center;
					i{
						font-size:14px;
						margin-left:5px;
					}
					li {
						cursor:pointer;
						background:#FFBF43;
						width:110px;
						height:30px;
						position: relative;
						border-radius:5px;
						.wonAddTopic{
							position: absolute;
							right: 0;
						    top: 35px;
							width:103px;
							border-radius:5px;
							overflow: hidden;
						    background: #fff;
						    z-index:1;
						    a{
								display:block;
								width:100%;
								height:100%;
								color:#333;
							}
						    li{
						    	height:30px;
								line-height: 30px;
							    text-align: center;
							    font-size: 14px;
						    	&:hover{
									color:#fff;
									background:#ffbf43;
									a{
										color:#fff;
									}
								}
						    }
						}
						a{
							display:flex;
							align-items: center;
						    justify-content: center;
							white-space: nowrap;
							color:#fff!important;
							width:100%;
							height:100%;
							font-size: 14px;
							line-height: 30px;
							&:hover{
								color:#fff;
							}
						}
					}
					
				}
				.ModuleTopRight2{
					display: flex;
					align-items: center;
					li {
						cursor:pointer;
						width:110px;
						height:30px;
						position: relative;
						border-radius:5px;
						a{
							display:flex;
							align-items: center;
						    justify-content: center;
							white-space: nowrap;
							color:#333;
							width:100%;
							height:100%;
							/* font-size: 16px; */
							font-size: 14px;
							line-height: 30px;
						}
					}
					.ModuleTopRightActive{
						color:#fff!important;
						background:#ffbf43;
						border-radius:5px;
					}

				}
				.add-topic-right{
					width: 110px;
				    height: 30px;
				    background: #ffbf43;
				    border-radius: 5px;
				    color: #fff;
				    text-align: center;
				    line-height: 30px;
				    cursor: pointer;
				    a{
				    	display:block;
				    	width:100%;
				    	height:100%;
				    	color:#fff;
				    	font-size:14px;
				    }
				}
				.thingadd{
					width: 110px;
				    height: 30px;
				    background: #ffbf43;
				    text-align: center;
				    line-height: 30px;
				    color: #fff;
				    font-size:14px;
				    border-radius: 5px;
				    cursor: pointer;
				}
			}
			.img-topic{
				padding-top:20px;
				display:flex;
				align-items: center;
			    justify-content: space-between;
				.ModuleContent {
					display: flex;
					flex-wrap: wrap;
					.ModuleContent_item {
						width: 263px;
						height:263px;
						box-sizing: border-box;
						margin-right:19px;
						&:hover{
							.hoverShow {
								display: flex;
							}
						}
						a {
							display: block;
							width: 100%;
							height: 100%;
							position: relative;
						}
						img {
							width: 100%;
							height: 100%;
						}
					}
					.ModuleContent_item:last-child{
						margin-right:0px;
					}
				}
				.col-more{
					width:40px;
					height:263px;
					border-radius:5px;
					background:rgba(0,0,0,.05);
					position: relative;
					a{
						display:block;
						width:263px;
						height:40px;
						color:#ffbf43;
						position: absolute;
					    top: 50%;
					    left: 50%;
					    transform: translate(-50%,-50%) rotateZ(90deg);
					    line-height: 40px;
					    text-align: center;
					    font-weight: bold;
					    &:hover{
							color:#ffbf43;
						}
					}
				}
			}
			.ModuleContent{
				display: flex;
	    		flex-wrap: wrap;
				.personThing_item {
					width: 377px;
					box-sizing: border-box;
					margin-right:19px;
					a {
						display: block;
						width: 100%;
						text-align: center;
						img {
							width: 100%;
							height: 211px;
						}
						p {
							text-align: center;
							padding: 14px 0;
							font-size: 16px;
						}
					}
					&:hover{
						.personThing_itemText {
							color: #FFBF43;
						}
					}
				}
				.personThing_item:nth-child(3n){
					margin-right:0;
				}
			}
			.TopicContent {
				box-sizing: border-box;
				padding: 20px 10px;
				li {
				    width: 100%;
				    display: flex;
				    justify-content: space-between;
				    align-items: center;
				    padding: 0px 6px;
				    height: 40px;
				    font-size: 16px;
				    .TopicContent_left {
				    	&:before {
							content: '▪';
							margin-right: 10px;
						}
						display: flex;
						align-items: center;
						cursor: pointer;
						font-size: 16px;
						span {
							color: #A3A3A3;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-left: 10px;
						}
						img {
							display: inline-block;
							width: 16px;
						}
					}
					.TopicContent_right {
						font-size: 12px;
						display: flex;
						li {
							margin-right: 10px;
						}
						li:last-child {
							margin-right: 0;
						}
						a {
							display: block;
							padding: 5px 10px;
							border: 1px solid #E8E8E8;
							border-radius: 30px;
						}
					}
					&:hover{
						.TopicContent_left {
							color: #FFBF43;
						}
					}
				}
				li:last-child {
					border: none;
				}
			}
		}
		.ModuleTitleTextMore2 {
			width:170px;
			height:45px;
			padding: 5px 8px;
			color: #ffbf43;
			font-size: 14px;
			display: block;
		    margin: 0 auto;
		    text-align: center;
		    line-height: 45px;
		    border-radius: 45px;
		    border: 2px solid #ffbf43;
		    margin-top:30px;
		    i {
		    	display:inline-block;
			    margin-left: 10px;
			    width:0;
			    height:0;
			    border-left:6px solid #ffbf43;
			    border-top:6px solid transparent;
			    border-right:6px solid transparent;
			    border-bottom:6px solid transparent;
			}
		}
    }
    
}
</style>
<style  lang="css" scoped>
.hoverShow {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, .4);
	color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: Xscale 1s ease;
	display: none;
	font-size: 22px;
}

@keyframes Xscale {
	0% {
		transform: scale(0, 0);
	}
	100% {
		transform: scale(1, 1);
	}
}
</style>