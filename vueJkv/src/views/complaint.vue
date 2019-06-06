<template>
	<div>
		<div class="complaint-detail-container">
			<Header foo="foo"></Header>
			<div class="bread-crumb-container">
				<div class="bread-crumb">
	                <span>当前位置：</span>
	                <router-link target="_blank" to="/sexplorePlan">出发</router-link> 》
	                <router-link target="_blank" to="/sexplore">酒店</router-link> 》
	                <span>投诉与sd建议</span>
	            </div>
				<div class="complaint-container">
					<div class="content">
						<div class="top">
							<h1>尊敬的用户</h1>
							<p>您好！为了给您提供更好地服务，我们希望收集你在购买我司产品时的意见反馈。对您的配合和支持表示衷心的感谢！</p>
						</div>
						<div class="bottom">
							<div class="con">
								<div class="left">投诉内容<span>*</span></div>
								<textarea ref="con" class="right" placeholder="请输入5-200字以内的内容。如果有截图，请务必上传截图" name=""></textarea>
							</div>
							<div class="upImgList">
								<el-upload
								  :action="actionUrl"
								  list-type="picture-card"
								  :file-list="fileList" 
								  :on-preview="handlePreview"
								  :on-remove="handleRemove"
								  :before-remove="beforeRemove"
								  :on-success="handleAvatarSuccess"
								  multiple
								   >
									<i class="el-icon-plus"></i>
								 </el-upload>
								<el-dialog :visible.sync="dialogVisible">
								  <img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
							</div>
							<div class="contact-information">
								<div class="left">联系信息<span>*</span></div>
								<div class="right">
									<input class="name" placeholder="请输入姓名" type="text" ref="name"/>
									<input class="tel" placeholder="请输入电话" type="text" ref="tel"/>
									<span>请留下您的联系方式，方便我们与您取得联系，谢谢！</span>
								</div>
							</div>
							<button class="submit-btn" @click="saveInfo()"  id="ImgListBtn">立即提交</button>
						</div>
					</div>
				</div>
			</div>
			<Footer></Footer>
		</div>
	</div>
</template>
<script>
import Header from '@/components/header';
import Footer from '@/components/footer';
export default {
    name:"complaintView",
    data() {
      return {
      	actionUrl:this.addressUrl+"/ctrip/complaints/kindImg.do",
      	dialogImageUrl:'',
      	dialogVisible: false,
        fileList: []
      };
    },
    components:{
        Header,Footer
    },
    methods:{
    	handleAvatarSuccess(res, file,fileList) {
	        file.url = this.addressUrl+res.data.src;
	        file.imgId = res.data.imgId;
	        console.log(fileList);
	        this.fileList = fileList;
	    },
	    handleRemove(file, fileList) {
	    	this.fileList = fileList;
	    },
	    handlePreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	    },
	    beforeRemove(file, fileList) {
	        return this.$confirm(`确定移除该图片吗？`);
	    },
	    saveInfo(){
	    	var _this = this;
	    	var content = _this.$refs.con.value;
            var name = _this.$refs.name.value;
            var tel = _this.$refs.tel.value;
           	if(!content || content.length<5 || content.length > 200){
           		_this.$alert("投诉内容需在5-200字以内");
           		return false;
           	}
           	if(!name){
           		_this.$alert("联系人姓名不能为空");
           		return false;
           	}
           	if(!tel){
           		_this.$alert("联系人不能为空");
           		return false;
           	}
           	if (this.telTest(tel)) {
				_this.$alert('手机号格式不正确!');
				return false;
			}
	    	_this.$confirm(`确定提交数据吗？`,'提示').then(() => {
	    		var data = {};
				data.name = name;
				data.tel = tel;
				data.content = content;
				console.log(data);
              	var length = _this.fileList.length;
              	if(length > 0){
              		var imgIds = [];
              		_this.fileList.forEach(function(v,i){
              			imgIds.push(v.imgId);
              		});
              		data['imgs'] = imgIds.join(',');
              	}
              	_this.httpAddInfo(data);
            }).catch(() => {
            });;
	    },
	    httpAddInfo:function(params){
	    	var _this = this;
            _this.$ajax.post('/ctrip/complaints/addComplaints.do',_this.$qs.stringify(params)).then(function(res){
            	console.log(res)
            	console.log(res.data.flag)
                if(res.data.flag){
					_this.$alert("提交成功").then(() => {
						window.location.reload();
					});
				}else{
					_this.$alert("系统出错了")
				}
                
            });
	    },
	    telTest:function(a){
	    	var tel = a;
			var reg = /^0?(13|14|15|18)[0-9]{9}$/;
			return !reg.test(tel);
	    }
    }
}
</script>
<style lang="less" scoped>
	.complaint-detail-container{
		width: 100%;
        padding-top: 110px;
        .complaint-container {
		  	width: 100%;
		  	padding-top: 15px;
		  	.content {
				width: 1170px;
				margin: 0 auto;
				.top {
				  	background-color: #fff;
				  	padding: 20px 15px;
				  	h1 {
					  	font-size: 18px;
					  	color: #FFBF43;
					  	margin-bottom: 10px;
					}
					p {
					  	color: #333;
					  	font-size: 16px;
					  	line-height: 24px;
					}
				}
				.bottom {
					background-color: #fff;
					margin-top: 18px;
					padding: 20px 15px 40px;
					.con{
						margin-bottom: 16px;
						&:after{
							content: '';
							height: 0;
							visibility: hidden;
							display: block;
							clear: both;
						}
						.left{
							float: left;
						  	font-size: 16px;
						  	color: #000;
						  	letter-spacing: 0.5px;
						  	span{
						  		color: #ff3e3e;
							  	position: relative;
							  	top: 3px;
							  	margin-left: 5px;
						  	}
						}
						textarea{
							float: right;
						  	width: 1030px;
						  	height: 234px;
						  	box-sizing: border-box;
						  	background-color: #f4f4f4;
						  	border: 1px solid #dddddd;
						  	border-radius: 5px;
						  	padding: 10px;
						  	resize: none;
						  	&:focus{
						  		border: 2px solid #ffbf43;	
						  	}
						}
					}
					.upImgList{
						box-sizing: border-box;
  						padding-left: 110px;
  						.img-box{
  							display:none;
  						}
  						&:after{
  							content: '';
						  	height: 0;
						  	visibility: hidden;
						  	display: block;
						  	clear: both;
  						}
  						.imgList-item {
						  	border-radius: 5px;
						  	overflow: hidden;
						  	float: left;
						  	margin-right: 20px;
						  	position: relative;
						  	width: 100px;
						  	height: 100px;
						  	img{
						  		width: 100%;
  								height: 100%;
						  	}
						  	.removeImgItem {
							  	position: absolute;
							  	right: 5px;
							  	top: 5px;
							  	display: block;
							  	width: 20px;
							  	height: 20px;
							  	text-align: center;
							  	line-height: 20px;
							  	border-radius: 50%;
							  	background: rgba(0, 0, 0, 0.8);
							  	color: #fff;
							  	cursor: pointer;
							}
						}
					}
					.contact-information {
					  	margin-top: 18px;
					  	margin-bottom: 50px;
					  	&:after{
					  		content: '';
						  	height: 0;
						  	visibility: hidden;
						  	display: block;
						  	clear: both;
					  	}
					  	.left {
						  	position: relative;
						  	top: 6px;
						  	float: left;
						  	font-size: 16px;
						  	color: #000;
						  	letter-spacing: 0.5px;
						  	span {
							  	color: #ff3e3e;
							  	position: relative;
							  	top: 3px;
							  	margin-left: 5px;
							}
						}
						.right {
						  	float: right;
						  	width: 1030px;
						  	input {
							  	box-sizing: border-box;
							  	padding-left: 20px;
							  	margin-right: 15px;
							  	padding-right: 20px;
							  	background-color: #f4f4f4;
							  	border: 1px solid #dddddd;
							  	border-radius: 5px;
							  	height: 38px;
							  	&:focus{
									border: 2px solid #ffbf43;
								}
							}
							input:nth-child(1) {
							  	width: 240px;
							}
							input:nth-child(2) {
							  	width: 300px;
							}
							
							span {
							  	font-size: 14px;
							  	color: #333;
							}
						}
					}
					.submit-btn {
					  	width: 200px;
					  	height: 40px;
					  	display: block;
					  	margin: 0 auto;
					  	background-color: #f4f4f4;
					  	border: 1px solid #dddddd;
					  	font-size: 14px;
					  	color: #333;
					  	cursor: pointer;
					  	letter-spacing: 1px;
					  	&:hover {
						  background-color: #FFBF43;
						  color: #fff;
						}
					}
				}
				
			}
		}
	}
	

</style>