<template>
	<div>
		<LoginS :isShow="loginShow" @showFun="showFun"></LoginS>
		<Header link="exper"></Header>
		<div class="add-topic-container">
			<div class="addTopicTop">
				<h4>话题信息</h4>
				<div>
					<input class="addTopicName" type="text" placeholder="请输入话题名称" ref="topTitle"/>
				</div>
			</div>
			<div class="topicType">
				<h4>话题类别</h4>
				<div>
					<select name="" id="firLev" ref="firLev">
						<option v-for="(item,index) in typeList" :key="index"  :value="item.cateId">
							{{item.cateNm}}
						</option>
					</select>
				</div>
			</div>
			<div class="topicLabel">
				<h4>添加标签</h4>
				<ul class="labelList">
					<li v-for="(item,index) in chooseLabelList">
						{{item.labNm}}
						<span class="labRemove" @click="removeLab($event)">×</span>
					</li>
				</ul>
				<div class="upLoadLabelText">
					<input id="search_label" class="addtopicLabel" type="text"  value="" @input="labInputChange()" ref="labInput"/>
					<div class="upLoadLabelTextList" v-show="labelShow">
						<div class="upLoadLabelTextListTop">
							<span id='addLabNm'>{{labelKey}}</span>
							<span class="clickHandleUpLabel" @click="addLabel()">添加为标签</span>
						</div>
						<ul  class="upLoadLabelTextListCnt">
							<li v-for="(item,index) in labelList" @click="chooseLabel(item);">
								{{item.labNm}}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="topicText">
				<h4>话题内容</h4>
				<div class="topicTextarea">
					<textarea rows=""  cols="" id='topDescr' ref="topContent"></textarea>
				</div>
				<div class="addtopicbtn">
					<button type="button" @click="isLogin()"  class="clickPublish">发表</button>
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
	name:"addTopicView",
	inject:['reload'],
    components:{
        Header,Footer,LoginS
    },
    data(){
    	return {
    		typeList:[],
    		labelKey:'',
    		labelShow:false,
    		labelList:[],
    		chooseLabelList:[],
    		loginShow:false
    	}
    },
    created(){
    	this.httpTopicTypeList();
    },
    methods:{
    	showFun:function(data){
    		this.loginShow = data;
    	},
    	isLogin:function(){
    		let _this = this;
    		_this.$ajax.post("/travel/cmm/checkUser.do").then(function(res){
    			if(res.data && res.data.flag){
    				_this.publishTopic();
    			}else{
    				_this.loginShow = true;
    			}
    		});
    	},
    	httpTopicTypeList:function(){
    		let _this = this;
    		_this.$ajax.post("/cexper/topic/inter/gettopiccate.do").then(function(res){
    			console.log(res);
    			if(res && res.data && res.data.flag && res.data.list){
    				_this.typeList = res.data.list;
    			}
    		});
    	},
    	labInputChange:function(){
    		let label = this.$refs.labInput.value;
    		let _this = this;
    		_this.labelShow = label ? (function(){
    			_this.labelKey = label;
    			_this.httpLabelList();
    			return true;
    		}()):false;
    	},
    	httpLabelList:function(){
    		let str = this.$qs.stringify({labNm :this.labelKey,labType:3});
    		let _this = this;
    		_this.$ajax.post("/cexper/base/inter/getLabelList.do",str).then(function(res){
    			if(res && res.data && res.data.flag && res.data.labList){
    				_this.labelList = res.data.labList;
    			}
    		});
    	},
    	chooseLabel:function(item){
    		let data = {labId:item.labId,labNm:item.labNm};
    		this.chooseLabelList.push(data);
    		this.labelShow = false;
    	},
    	addLabel:function(item){
    		let _this = this;
    		let value = _this.labelKey.trim()
            value = value.replace("\\u200B","");
            if(value && value.length > 0){
            	console.log(_this.labelKey);
            	let str = _this.$qs.stringify({labNm:_this.labelKey,labType:3,showHome:"N"});
            	_this.$ajax.post("/cexper/base/inter/addLabel.do",str).then(function(res){
            		if(res && res.data && res.data.flag){
            			_this.$alert("添加成功");
            			let json = {labId:res.data.labId,labNm:_this.labelKey};
            			_this.chooseLabelList.push(json);
    					_this.labelShow = false;
            		}else{
            			_this.$alert("操作出错了");
            		}
            	});
            }else{
            	this.$alert("标签不能为空或字符串");
            }
    	},
    	removeLab:function(event){
    		if(!event || !event.target){
    			return;
    		}
    		let parentNode = event.target.parentNode;
    		parentNode.remove();
    	},
    	publishTopic:function(){
    		var data = {};
    		if(!this.$refs.topTitle || !this.$refs.topTitle.value){
    			this.$alert("话题名称不能为空");
    			return false;
    		}
    		data.topTitle = this.$refs.topTitle.value;

    		let firLev = this.$refs.firLev.value;
    		if(!this.$refs.firLev || this.$refs.firLev.value == 0){
    			this.$alert("请选择话题类别!");
    			return false;
    		}
    		data.firLev = this.$refs.firLev.value;

    		let topContent = this.$refs.topContent.value;
    		if(!this.$refs.topContent || !this.$refs.topContent.value){
    			this.$alert("话题内容不能为空!");
    			return false;
    		}
    		data.topContent = this.$refs.topContent.value;
    		if(this.chooseLabelList.length > 0){
    			let labIds = [];
    			this.chooseLabelList.forEach(function(v,i){
    				labIds.push(v.labId);
    			});
    			labIds = labIds.join(',');
    			data.labIds = labIds;
    		}
    		let _this = this;
    		_this.$confirm(`确定提交数据吗？`,'提示').then(()=>{
    			_this.$ajax.post("/cexper/topic/inter/addtopic.do",_this.$qs.stringify(data)).then(function(res){
	    			if(res.data && res.data.flag){
	    				_this.$alert("添加成功").then(function(){
	    					_this.reload();
	    				});
	    			}else{
	    				_this.$alert("添加出错了")
	    			}
	    		});
    		}).catch(() => {
            });
    		
    	}
    }
}
</script>
<style  lang="less" scoped>
.add-topic-container{
	padding-top:100px;
	width: 1170px;
    margin: 0 auto;
    box-sizing: border-box;
    div{
		background: #FFFFFF;
		border-radius: 5px;
		box-sizing: border-box;
		margin-top: 15px;
		h4{
			box-sizing: border-box;
			padding: 20px;
			font-size: 16px;
			border-bottom:1px solid #ddd;
		}
	}
	.addTopicTop{
		div{
			box-sizing: border-box;
			padding: 20px;
			.addTopicName{
				border: 1px solid #DDDDDD;
				background: #F4F4F4;
				outline: none;
				width: 534px;
				height:42px;
				box-sizing: border-box;
				padding: 10px;
				border-radius: 5px;
			}
		}
	}
	.topicType{
		div{
			box-sizing: border-box;
			padding: 15px;
			display: flex;
			select{
				outline: none;
				margin-right: 15px;
				padding:5px 15px;
				border-radius: 5px;
				cursor: pointer;
				width:174px;
				height:42px;
			}
		}
	}
	.topicLabel{
		padding-bottom:15px;
		.labelList{
			display: flex;
		    padding-left:15px;
		    font-size: 14px;
		    color: #999999;
		    li{
				margin-top:15px;
				padding: 5px 5px 5px 10px;
			    border: 1px solid #999999;
			    border-radius: 30px;
			    display: flex;
			    align-items: center;
			    margin-right: 15px;
			    &:hover{
					color:#ffbf43;
					border:1px solid #ffbf43;
				}
				span{
					display: inline-block;
				    width: 14px;
				    height: 14px;
				    margin-left: 5px;
				    cursor: pointer;
				}
			}
		}
		.upLoadLabelText{
			width: 300px;
			border: 1px solid #EEAE3D;
			border-radius: 5px;
			position: relative;
			margin:20px 0 10px 15px;
			.addtopicLabel{
				box-sizing: border-box;
				outline: none;
				border-radius: 5px;
				padding:0 15px;
				height: 40px;
			}
			input{
				width: 100%;
				border: none;
				outline: none;
			}
			.upLoadLabelTextList{
				position: absolute;
				top: 30px;
				left: 0px;
				width: 100%;
				padding: 5px 0;
				border-radius: 5px;
				box-shadow: 0 0 3px #E8E8E8;
				background: #FFFFFF;
				font-size: 14px;
				.upLoadLabelTextListTop{
					width: 100%;
					height: 30px;
					box-sizing: border-box;
					padding: 0 15px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #F7F7F7;
					.clickHandleUpLabel{
						color: #EEAE3D;
					    cursor: pointer;
					    display: block;
					    min-width: 16%;
					}
				}
				.upLoadLabelTextListCnt{
					width: 100%;
					li{
						box-sizing: border-box;
						height: 30px;
						padding: 0 15px;
						line-height: 30px;
						cursor: pointer;
						&:hover{
							background:#EEAE3D;
							color:#fff;
						}
					}
					span{
						display:block;
					}
				}
			}
		}
	}
	.topicText{
		div{
			box-sizing: border-box;
			padding:0 20px 20px 20px;
		}
		.topicTextarea{
			padding-top:20px;
			textarea{
				width: 100%;
				outline: none;
				background: #F4F4F4;
				border: 1px solid #DDDDDD;
				height: 200px;
				border-radius: 5px;
				resize: none;
			}
		}
		.addtopicbtn{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			button{
				 width: 90px;
				 height: 30px;
				 background: #FFBF43;
				 border-radius: 5px;
				 color: #FFFFFF;
				 border: none;
				 outline: none;
				 cursor: pointer;
			}
		}
	}
}
</style>