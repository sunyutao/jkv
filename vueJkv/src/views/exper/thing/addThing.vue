<template>
    <div>
        <div class="add-thing-container">
            <div class="container">
			<div class="top-logo">
				<div class="top-logo-left">
					<a href="###" class="logo"><img src="../../../assets/logo.png"></a>
				</div>
				<div class="top-logo-right">
					<span @click="topLFun()" class="right-img"><img src="../../../assets/biaoti2.png"><span id="whiteTitle">{{topL}}</span></span>
					<span @click="topRFun()" class="right-img"><img src="../../../assets/fengmiantu2.png"><span id="upIndexImg">{{topR}}</span></span>
				</div>
			</div>
			<div class="list">
				<div class="index-page">
					<div class="person-msg-box">
						<h4>标题：{{titleName}}</h4>
						<div class="person-msg">
							<div class="person-msg-left">
								<div class="person-msg-head">
									<img :src="addressUrl+userMsg.headImgUrl">
								</div>
								<h6>作者：{{userMsg.userNm}}</h6>
							</div>
							<button type="button" class="person-msg-right">
								<img src="../../../assets/goright.png">
							</button>
						</div>
					</div>
				</div>
				<div class="list-out-box" id="wrapper">
					<ul class="cnt-list">
						<!-- <li>
							<img src="../../../assets/experImg03.jpg">
							<span class="remove-item">×</span>
							<button type="button"><img src="../../../assets/icon/msgIcon.png" >20</button>
						</li>
						<li class="cnt-text">
							<p class="ppp">wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</p>
							<span class="remove-item">×</span>
						</li> -->
					</ul>
				</div>
			</div>
		</div>
        <div id="mask" v-if="alertCon.alertOut">
			<div id="offMask"></div>
			<div>
				<div v-if="alertCon.titleCon" class="whiteTitle">
					<h3>为你的文章起个名字吧！<span @click="alertCon.alertOut=false;alertCon.titleCon=false" class="maskoff">×</span></h3>
					<input v-model="titleNm" type="text" placeholder="请输入你的文章名称" />
					<button @click="titleNmFun()" type="button" id="titleSubmit" class="submitBtn">确定</button>
				</div>
				<div v-if="alertCon.articleCon" class="whiteText">
					<h3>编辑内容<!-- <span class="maskoff">×</span> --></h3>
					<textarea v-model="articleContent"></textarea>
					<button @click="addThingInfoFun()" type="button" id="textSubmit">确定</button>
				</div>
				<div v-if="alertCon.mainPhoCon" class="upIndexImg">
					<h3>请上传一张最完美的图片<span @click="alertCon.alertOut=false;alertCon.mainPhoCon=false" class="maskoff">×</span></h3>
					<p>注：图片尺寸不得小于1200*676,支持jpg,png图片格式上传</p>
                    <el-upload
                        class="btnimg"
                        :action="addressUrl+'/cexper/thing/inter/kindImg.do'"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                        <div class="clickUpImg">
                            <img v-if="mainPhoUrl" :src="addressUrl+mainPhoUrl" class="avatar">
                            <img src="../../../assets/tianjia.png">
                            <p>点击添加图片</p>
                        </div>
                    </el-upload>
                    <button @click="mainPhoFun()" type="button" id="indexImgBtn" class="submitBtn">确定</button>
				</div>
                <div v-if="alertCon.phosCon" class="upImgList">
                    <h3>请上传文章图片<!-- <span class="maskoff">×</span> --></h3>
                    <p>注：图片尺寸不得小于1200*676,支持jpg,png图片格式上传</p>
                    <div>
                        <!-- <button type="button" id="imgListBtn">
                            <img src="../../../assets/tianjia.png" >
                            <p>点击添加图片<br/>按Ctrl可添加多张</p>
                        </button> -->
                        <button @click="sbtImgListFun()" type="button" id="ImgListBtn" class="submitBtn">保存</button>
                        <!-- <div class="imgList-item">
                            <img src="../../../assets/experImg04.jpg" >
                            <span>×</span>
                        </div> -->
                        <el-upload
                            :action="addressUrl+'/cexper/thing/inter/kindImg.do'"
                            list-type="picture-card"
                            :on-success="imgListSuccess"
                            :on-remove="removeImg"
                            multiple>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                    
				</div>
			</div>
		</div>
		<div class="go-step">
			<button @click="nextFun()" type="button" id="nextStep">{{bottomTab}}</button>
			<button @click="allSubitFun()" v-if="sbtShow" type="button" id="submittopic">发表</button>
		</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"addThingThing",
        data(){
            return{
                topL:'编辑标题',
                topR:'上传封面',
                bottomTab:'下一步',
                sbtShow:false,
                userMsg:{},
                alertCon:{
                    alertOut:false,
                    titleCon:false,
                    articleCon:false,
                    mainPhoCon:false,
                    phosCon:false
                },
                titleNm:'',
                titleName:'',
                thId:'',
                mainPhoUrl:'',
                mainPhoId:'',
                articleContent:'',
                articleShowContent:'',
                imgList:[],
                imgIdLists:''
            }
        },
        created(){
            this.userMsgFun()
            //  var horwheel = require('horwheel'),
            //     view = document.getElementById('wrapper');
            // horwheel(view);
        },
        methods:{
            userMsgFun:function(){
                var _this = this
                _this.$ajax.post('/travel/cmm/checkUser.do').then(function(res){
                    if(res.data.flag){
                        _this.userMsg = res.data
                        console.log(_this.userMsg)
                    }

                },function(){

                })
            },
            topLFun:function(){
                var _this = this
                if(_this.topL == '编辑标题'){
                    _this.alertCon.alertOut = true
                    _this.alertCon.titleCon = true
                }
                else{
                    _this.alertCon.alertOut = true
                    _this.alertCon.articleCon = true
                }
            },
            topRFun:function(){
                var _this = this
                if(_this.thId){
                    if(_this.topR == '上传封面'){
                        _this.alertCon.alertOut = true
                        _this.alertCon.mainPhoCon = true
                    }
                    else{
                        _this.alertCon.alertOut = true
                        _this.alertCon.phosCon = true
                        _this.imgIdLists = ''
                    }
                }
                else{
                    _this.$message({message: '请先添加标题',type: 'warning'});
                }
            },
            titleNmFun:function(){
                var _this = this
                if(_this.titleNm == ''){
                    _this.$message({message: '标题不能为空',type: 'warning'});
                    return false
                }
                else{
                    
                    _this.alertCon.alertOut = false
                    _this.alertCon.titleCon = false
                    _this.$ajax.post('/cexper/thing/inter/addThingInfo.do',_this.$qs.stringify({title:_this.titleNm})).then(function(res){
                        if(res.data.flag){
                            _this.titleName = _this.titleNm
                            _this.thId = res.data.thId
                        }
                        else{
                            _this.$message({message: '添加出错了',type: 'warning'});
                        }
                    },function(){

                    })
                }
            },
            handleAvatarSuccess:function(res,file){
                // this.mainPhoUrl = URL.createObjectURL(file.raw);
                console.log(res)
                this.mainPhoUrl = res.data.src
                this.mainPhoId = res.data.imgId
            },
            mainPhoFun:function(){
                var _this = this
                if(_this.mainPhoId != ''){
                    _this.$ajax.post('/cexper/thing/inter/updThingInfo.do',_this.$qs.stringify({thId:_this.thId,coverImg:_this.mainPhoId})).then(function(res){
                        if(res.data.flag){
                            $('.index-page').css({
                                'background': 'url('+ _this.addressUrl + _this.mainPhoUrl +') no-repeat',
                                'background-size': '100% 100%'
                            });
                            _this.alertCon.alertOut = false
                            _this.alertCon.mainPhoCon = false
                        }
                    },function(){

                    })
                }
            },
            nextFun:function(){
                var _this = this
                if(_this.thId){
                    if(_this.bottomTab == '下一步'){
                        if(!_this.mainPhoId){
                            _this.$message({message: '请先添加封面图',type: 'warning'});
                        }
                        else{
                            _this.bottomTab = '上一步'
                            _this.sbtShow = true
                            $('.container .list').css('left', '-100%');
                            _this.topL = '添加段落'
                            _this.topR = '上传图片'
                        }
                    }
                    else{
                         _this.bottomTab = '下一步'
                            _this.sbtShow = false
                            $('.container .list').css('left', '0');
                            _this.topL = '编辑标题'
                            _this.topR = '上传封面'
                    }
                }
                else{
                     _this.$message({message: '请先添加标题',type: 'warning'});
                }
            },
            addThingInfoFun:function(){
                var _this = this
                _this.articleShowContent = _this.articleContent.replace(/\n/g,"<");
                _this.articleContent = ''
                console.log(_this.articleContent)
                console.log(_this.articleShowContent)
                _this.alertCon.alertOut = false
                _this.alertCon.articleCon = false
                _this.$ajax.post('/cexper/thing/inter/addThingConContentInfo.do',_this.$qs.stringify({thId:_this.thId,parCon:_this.articleShowContent})).then(function(res){
                    $('.cnt-list').append('<li class="cnt-text" data-parid="'+ res.data.parId +'"><span data-parid="'+ res.data.parId +'" class="remove-item">×</span><ul><li><div><p></p></div></li></ul></li>');
					for (var i = 0;i < _this.articleShowContent.length;i++) {
                        var t = _this.articleShowContent.substr(i,1);
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
                    $('.remove-item').hover(function(){
						$(this).parent('li').find('ul li').css('bottom','10px')
						$(this).parent('li').find('ul li').css('box-shadow','1px 1px 15px rgba(0,0,0,0.2)') ;
					},function(){
						$(this).parent('li').find('ul li').css('bottom','0px')
						$(this).parent('li').find('ul li').css('box-shadow','none') 
					});
                },function(){

                })
            },
            imgListSuccess:function(res,file,fileList){
                var _this = this
                file.url = _this.addressUrl+res.data.src
                file.imgId = res.data.imgId
                _this.imgList = fileList
                console.log(_this.imgList)
            },
            removeImg:function(file,fileList){
                var _this = this
                console.log(_this.imgList)
            },
            sbtImgListFun:function(){
                console.log('ggg')
                var _this = this
                if(_this.imgList.length>0){
                    for(var i = 0;i<_this.imgList.length;i++){
                        if(i == 0){
                            _this.imgIdLists += _this.imgList[i].imgId
                        }
                        else{
                            _this.imgIdLists +=',' + _this.imgList[i].imgId
                        }
                    }
                    console.log(_this.imgIdLists)
                    _this.$ajax.post('/cexper/thing/inter/addThingConImgInfo.do',_this.$qs.stringify({thId:_this.thId,imgIds:_this.imgIdLists})).then(function(res){
                        console.log(res.data)
                        for(var i=0; i<res.data.imglist.length;i++){
						$('.cnt-list').append(
							'<li data-parid="'+ res.data.imglist[i].parId +'" class="cnt-img" >'+
								'<img src="'+ _this.imgList[i].url +'" data-imgid="'+ res.data.imglist[i].imgId +'">'+
								'<span class="remove-item" data-parid="'+ res.data.imglist[i].parId +'">×</span>'+
							'</li>'
                        );
                         _this.alertCon.alertOut = false
                        _this.alertCon.phosCon = false
					}
                    },function(){

                    })
                }
                else{
                     _this.$message({message: '请上传图片',type: 'warning'});
                }
            },
            allSubitFun:function(){
                var _this = this
                _this.$ajax.post('/cexper/thing/inter/thingPub.do',_this.$qs.stringify({thId:_this.thId})).then(function(res){
                    if(res.data.flag){
                        _this.$message({message: '发表成功，等待审核!',type: 'success'});
                        setTimeout(function(){  
                            window.close();	                        
                        }, 1000);
                    }
                },function(){

                })
            }
        },
        mounted(){
            var _this_ = this
            $(document).on('click','.remove-item',function(){
                var _this = $(this);
                var liList = $(this).parent('li').find("ul>li");
                var parid = $(this).data('parid');
                console.log();
                $.ajax({
                    url:_this_.addressUrl+'/cexper/thing/inter/delThingConInfo.do',
                    data:{
                        parId : parid
                    },
                    type:'POST',
                    dataType:'json',
                    success:function(data){
                        if(data.flag){
                            _this.parent('li').remove();
                            _this_.$message({message: '删除成功',type: 'success'});
                        }else{
                            _this_.$message({message: '操作失败',type: 'warning'});
                        }
                    }
                });
                
            });
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
			.add-thing-container{
				.index-page {
					min-width: 100%;
					height: 100%;
					background: #D6D6D6;
					/* 	background: url(../image/perThin03.jpg) no-repeat; */
					background-size: 100% 100%;
					position: relative;
				}
	
				.top-logo {
					position: fixed;
					left: 0;
					width: 100%;
					padding: 33px 55px 0;
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
	
				.top-logo .right-img {
					height: 20px;
					margin-right: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}
	
				.top-logo .right-img img {
					width: 24px;
					height: 20px;
					margin-right: 10px;
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
					width: 100%;
					height: 100%;
				}
	
	
				.cnt-list {
					width: auto;
					height: 100%;
					max-height: 100%;
					display: flex;
					align-items: center;
					box-sizing: border-box;
				}
				.cnt-list:after{
					content: '';
					height: 0;
					visibility: hidden;
					display: block;
					clear: both;
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
	
				.cnt-list li img {
					height: 100%;
					width:auto;
					min-width:150px
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
				.cnt-list .cnt-img{
					height: 800px;
					margin-left: 10px;
					box-sizing: border-box;
					margin-top: 60px; 
					float:left;
					position:relative;
				}
				.cnt-list .cnt-img img{
					height:100%;
					width:auto;
				}
				.cnt-list li button img {
					width: 20px;
					height: 20px;
					margin-right: 5px;
				}
				
				.clickUpImg>img{
					width:40px;
					height:40px;
					border-radius:50%;
				}
				.clickUpImg>.avatar{
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					border-radius: 0;
				}
				.remove-item{
					position: absolute;
					top: 20px;
					right: 20px;
					width: 20px;
					height: 20px;
					background: rgba(0,0,0,.5);
					border-radius: 50%;
					text-align: center;
					line-height: 20px;
					color: #fff;
					cursor: pointer;
					z-index:1;
				}
				/* .cnt-text {
					padding: 56px 38px;
					background: #fff;
					font-size: 16px;
					color: #333;
				} */
			.cnt-list .cnt-text ul:after{
					content: '';
					height: 0;
					visibility: hidden;
					display: block;
					clear: both;
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
					transition:bottom 0.2s ;
					-webkit-transition:bottom 0.2s;
			}
			.cnt-list .cnt-text ul li div{
					width: 344px;
					height: 688px;
					overflow: hidden;
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
	
				.recommend-list>div>img {
					width: 100%;
					height: 185px;
				}
	
				.recommend-list>div>p {
					margin-top: 20px;
					text-align: center;
				}
	
				.recommend-list>div:nth-child(2n) {
					margin-right: 0;
				}
	
				.offcmt {
					height: 0 !important;
					display: none !important;
				}
	
				.top-logo-left {
					display: flex;
					align-items: center;
				}
	
				.disnone {
					display: none;
				}
	
				#mask {
					width: 100%;
					height: 100vh;
					position: fixed;
					top: 0;
					left: 0;
					background: rgba(0, 0, 0, .3);
					z-index:2;
				}
				#mask>#offMask{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				#mask>div{
					background:none;
				}
				#mask>div>div {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					margin: auto;
					border-radius: 5px;
					box-sizing: border-box;
					background: #fff;
					padding: 40px;
					z-index: 20;
				}
	
				.whiteTitle {
					width: 512px;
					height: 280px;
				}
	
				.whiteTitle>h3,
				.upIndexImg>h3,
				.upImgList>h3,
				.whiteText>h3{
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 24px;
					color: #333;
				}
	
				.whiteTitle>h3>span,
				.upIndexImg>h3>span,
				.upImgList>h3>span,
				.whiteText>h3>span{
					display: inline-block;
					width: 24px;
					height: 24px;
					border-radius: 50%;
					background: #F4F4F4;
					line-height: 24px;
					text-align: center;
					cursor: pointer;
				}
	
				.top-logo-right {
					display: flex;
					align-items: center;
					height: 20px;
				}
	
				.whiteTitle>input {
					width: 430px;
					height: 50px;
					margin-top: 34px;
					border: 1px solid #DBDADA;
					border-radius: 5px;
					box-sizing: border-box;
					padding: 15px;
					font-size: 14px;
				}
	
				.submitBtn {
					width: 100px;
					height: 40px;
					margin-top: 30px;
					border: none;
					outline: none;
					background: #FFBF43;
					border-radius: 5px;
					color: #fff;
					cursor: pointer;
					float: right;
				}
	
				.upIndexImg {
					width: 512px;
					height: 438px;
				}
	
				.upIndexImg>p,.upImgList>p{
					font-size: 12px;
					color: #999;
					margin-top: 15px;
				}
	
				.btnimg {
					position: relative;
					width: 431px;
					height: 243px;
					border-radius: 5px;
					background: #F2F2F2;
					background-size: 100% 100%;
					background-repeat: no-repeat;
					border: none;
					margin-top: 15px;
					overflow: hidden;
					cursor: pointer;
				}
	
				.btnimg>img {
					width: 100%;
					height: 100%;
				}
	
				.clickUpImg {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-size: 14px;
					color: #999;
				}
	
				.clickUpImg>p {
					margin-top: 10px;
				}
	
				.clickUpImg>input {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
	
				.go-step {
					position: fixed;
					bottom: 20px;
					right: 20px;
				}
	
				.go-step>button {
					width: 152px;
					height: 54px;
					box-sizing: border-box;
					border: 1px solid #fff;
					border-radius: 54px;
					font-size: 24px;
					color: #fff;
					background: rgba(0, 0, 0, .1);
					cursor: pointer;
				}
	
				.upImgList {
					width: 1134px;
					height: 859px;
				}
				#imgListBtn{
					width: 200px;
					height: 200px;
					margin-right: 20px;
					margin-bottom: 20px;
					background: #F2F2F2;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border: none;
					outline: none;
					border-radius: 5px;
					font-size: 14px;
					color: #999;
				}
				.upImgList>div{
					margin-top: 20px;
					width: 100%;
					box-sizing: border-box;
					display: flex;
					flex-wrap: wrap;
					overflow-y: scroll;
					max-height: 653px;
				}
				.upImgList>div::-webkit-scrollbar {
					width: 10px;
					height: 8px;
				}
				
				.upImgList>div::-webkit-scrollbar-thumb {
					border-radius: 5px;
					background: #FFBF43;
				}
				
				.upImgList>div::-webkit-scrollbar-track {
					border-radius: 0;
					background: #F1F1F1;
				}
				
				#imgListBtn>p{
					margin-top: 10px;
				}
				#imgListBtn>img{
					width: 30px;
					height: 30px;
				}
				.imgList-item{
					position: relative;
					width: 200px;
					height: 200px;
					border-radius: 5px;
					overflow: hidden;
					margin-right: 20px;
					margin-bottom: 20px;
				}
				.imgList-item>img{
					width: 100%;
					height: 100%;
				}
				.imgList-item>span{
					position: absolute;
					right: 20px;
					top: 20px;
					display: block;
					width: 20px;
					height: 20px;
					text-align: center;
					line-height: 20px;
					border-radius: 50%;
					background: rgba(0,0,0,.8);
					color: #fff;
					cursor: pointer;
				}
				#ImgListBtn{
					position: absolute;
					bottom: 20px;
					right: 20px;
					width: 100px;
					height: 40px;
					margin-top: 30px;
					border: none;
					outline: none;
					background: #FFBF43;
					border-radius: 5px;
					color: #fff;
					cursor: pointer;
				}
				.whiteText{
					width: 512px;
					height: 906px;
				}
				.whiteText>textarea{
					width: 434px;
					height: 714px;
					resize: none;
					outline: none;
					margin: 0 auto;
					display: block;
					margin-top: 20px;
				}
				.whiteText>textarea::-webkit-scrollbar {
					width: 10px;
					height: 8px;
				}
				
				.whiteText>textarea::-webkit-scrollbar-thumb {
					border-radius: 5px;
					background:#C1C1C1;
				}
				
				.whiteText>textarea::-webkit-scrollbar-track {
					border-radius: 0;
					background: #F1F1F1;
				}
				.whiteText>button{
					float: right;
					margin-top: 20px;
					width: 100px;
					height: 40px;
					border-radius: 5px;
					border: none;
					outline: none;
					background: #FFBF43;
					color: #fff;
					cursor: pointer;
				}
			}
			
			
			
</style>