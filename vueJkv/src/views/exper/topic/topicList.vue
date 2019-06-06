<template>
	<div>
		<Header link="exper"></Header>
		<div class="topic-list-container">
			<!--导航-->
			<div class="bread-crumb-container">
                <div class="bread-crumb">
                    <span>当前位置：</span>
                    <router-link target="_blank" to="/exper">体验</router-link> 》
                    <span>参与话题</span>
                </div>
            </div>
            <div class="allTypes">
				<ul class="typesList" id="cateList">
					<li v-for="(item,index) in typeList" :key="index" @click="chooseType(item.cateId,index)">
						<h6 class="typesItem" :class="typeAct==index?'typesItemActive':''">{{item.cateNm}}</h6>
					</li>
				</ul>
			</div>
			<div class="NewHotAdd">
				<div class="clickNewHot">
					<span :class="sortAct==0?'clickNewHotActive':''" @click="chooseSort(0)">最新发表</span>
					<span :class="sortAct==1?'clickNewHotActive':''" @click="chooseSort(1)">最多跟帖</span>
				</div>
				<div class="clickNewHot">
					<router-link target="_blank" :to="'/addTopic'">
						<div class="add-topic-right">
							<img src="../../../assets/exper/imgIcon.png"  style="margin-right: 10px;"> 添加话题
						</div>
					</router-link>
				</div>
			</div>
			<ul class="FollowUpList" id="list">
				<li v-for="(item,index) in topicList" :key="index" >
					<div class="zhiding">
						<img v-if="item.topYn=='Y'?true:false" src="../../../assets/exper/zhiding.png">
					</div>
					<h5 class="FollowUpItemTitle">
						<img v-if="item.hcYn=='Y'?true:false" src="../../../assets/exper/jiajing.png">
						<router-link target="_blank" :to="{path:'/topicDetail/'+item.topId}">
							{{item.topTitle}}
						</router-link>
					</h5>
					<span class="FollowUpItemName">{{item.userNm}}</span>
					<p class="FollowUpItemText" v-html="topConList[index]" @click="showEvent($event,index)">
					</p>
					<div class="FollowUpItemFoot">
						<ul>
							<li v-for="(item1,index1) in item.labellist">{{item1.labNm}}</li>
						</ul>
						<div class="replynum">
							<img src="../../../assets/exper/comment_a.png">
							<span>{{item.postsNm}}条</span>
						</div>
					</div>
				</li>
			</ul>
			<div class="seeMore" v-show="seeMoreShow" @click="getNextPage();">查看更多</div>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>
import Header from '@/components/header';
import Footer from '@/components/footer';
export default {
	name:"experView",
    data() {
      return {
      	page:1,
      	rows:10,
      	pageTotal:1,
      	typeAct:-1,
      	cateId:'',
      	sortAct:0,
      	typeList:[],
      	topConList:[],
      	topicList:[],
      	seeMoreShow:false
      };
    },
    components:{
        Header,Footer
    },
    created(){
    	this.httpTypeList();
    	this.httpTopicList();
    },
    methods:{
    	showEvent:function(e,index){
    		if(e && e.target && e.target.localName && e.target.localName == 'a'){
    			let con = this.topicList[index].topContent;
    			if(e.target.text == '......收起'){
    				con = `${con.substring(0, 200)}<a class="showTextAll">......显示全部</a>`
    			}else if(e.target.text == '......显示全部'){
    				con = `${con}<a class="showTextAll">......收起</a>`;
    			}
    			this.topConList.splice(index,1,con);
    		}
    	},
    	getNextPage:function(){
    		this.page ++;
    		this.httpTopicList(true);
    	},
    	chooseType:function(cateId,index){
    		if(this.typeAct == index){
    			this.typeAct = -1;
    			this.cateId = '';
    		}else{
    			this.typeAct = index;
    			this.cateId = cateId;
    		}
    		this.httpTopicList();
    	},
    	chooseSort:function(sort){
    		if(this.sortAct != sort){
    			this.sortAct = sort;
    			this.httpTopicList();
    		}
    	},
    	httpTypeList:function(){
    		var _this = this;
            _this.$ajax.post('/cexper/topic/inter/gettopiccate.do',_this.$qs.stringify({cateLev : 1})).then(function(res){
            	
                if(res.data && res.data.flag && res.data.list){
					_this.typeList = res.data.list;
				}else{
				}
                
            });
    	},
    	httpTopicList:function(b){
    		var _this = this;
    		let sort = this.sortAct == 1 ? 'comm':'';
    		_this.page = !b ? 1:_this.page;
            _this.$ajax.post('/cexper/topic/inter/gettopicpage.do',_this.$qs.stringify({page:_this.page,rows:_this.rows,sort : sort,topFir:_this.cateId})).then(function(res){
                if(res.data && res.data.flag && res.data.list){
					_this.pageTotal = res.data.pageTotal;
					if(b){
						_this.topicList = _this.topicList.concat(res.data.list);
					}else{
						_this.topConList = [];
						_this.topicList = res.data.list;
					}
					if(res.data.list.length > 0){
						res.data.list.forEach(function(v,i){
							let con = v.topContent ? v.topContent :'';
							if(con.length > 200){
				    			 con = `${con.substring(0, 200)}<a class="showTextAll">......显示全部</a>`;
				    		}
				    		_this.topConList.push(con);
						});
					}
					if(_this.pageTotal==0 || _this.pageTotal == _this.page){
		    			
		    			_this.seeMoreShow = false;
		    		}else{
		    			
		    			_this.seeMoreShow = true;
		    		}
				}else{
					_this.$alert("查询出错了！~");
					_this.seeMoreShow = false;
				}
                
            });
    	}
    }
}
</script>
<style  lang="less" scoped>
	.topic-list-container{
		padding-top:100px;
		width: 1170px;
	    margin: 0 auto;
	    box-sizing: border-box;
		.allTypes{
			border-radius: 5px;
			margin-top: 15px;
			.typesList{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				li{
					width: 63px;
					height:30px;
					box-sizing: border-box;
					position: relative;
					margin-right:20px;
					.typesItem{
						display: block;
					    width: 100%;
					    height: 100%;
						cursor: pointer;
						text-align: center;
						border-radius: 5px;
						line-height:30px;
						font-size:14px;
					}
					.typesItemActive{
						color: #FFFFFF!important;
						background: #FFBF43;
					}
				}
			}
		}
		.NewHotAdd{
			padding: 20px 0;
			display: flex;
		    align-items: center;
		    justify-content: space-between;
		    .clickNewHot{
				font-size: 16px;
				display: flex;
			    align-items: center;
			    span{
					margin-right: 16px;
					cursor: pointer;
					font-size: 14px;
				}
				.clickNewHotActive{
					color: #FFBF43;
				}
				.add-topic-right{
					display: flex;
				    align-items: center;
					background-color:#FFBF43;
					height:30px;
					padding: 0 10px;
				    color: #FFFFFF;
				    border-radius: 5px;
				    cursor:pointer;
				    img{
						width:18px;
						height:18px;
					}
				}
			}

		}
		.FollowUpList{
			li{
				width: 100%;
				box-sizing: border-box;
				padding: 20px;
				background: #FFFFFF;
				border-radius: 5px;
				margin-bottom: 15px;
				position: relative;
				.FollowUpItemName{
					font-size:14px;
					color:#333;
					display: inline-block;
					padding: 10px 0;
				}
				.FollowUpItemText{
					color: #666666;
					font-size:16px;
					letter-spacing: 3px;
					line-height: 30px;
					border-bottom: 1px solid #F7F7F7;
					padding-bottom: 10px;
					
				}
				.FollowUpItemTitle{
					font-weight: bold;
					font-size: 18px;
					display: flex;
				    align-items: center;
				    img{
						width:13px;
						height:17px;
						margin-right:10px;
					}
				}
				.FollowUpItemFoot{
					display: flex;
					justify-content: space-between;
					margin-top: 15px;
					.replynum{
						display: flex;
						font-size:14px;
						color:#999;
						img{
							width:20px;
							height:20px;
							margin-right:10px;
						}
					}
					ul{
						width: 90%;
						display: flex;
						flex-wrap: wrap;
						box-sizing: border-box;
						li{
							width:auto;
							display: flex;
							padding: 5px 15px;
							border: 1px solid #E7E7E7;
							border-radius: 20px;
							cursor: pointer;
							margin-right: 10px;
							font-size:14px;
						}
					}
				}
				.zhiding{
					width:56px;
					height:46px;
					position: absolute;
				    top: 0;
				    right: 0;
				    img{
						width:100%;
						height:100%;
					}
				}
			}
		}
		.seeMore{
			width: 160px;
			height: 35px;
			line-height: 35px;
			border: 1px solid #9A9A9A;
			color: #9A9A9A;
			text-align: center;
			border-radius: 5px;
			margin: 50px auto;
			cursor: pointer;
		}
	}
</style>
<style lang="css" scoped>
.FollowUpList >>> .FollowUpItemText  .showTextAll{
	cursor:pointer;
	color:#ffbf43;
}
</style>