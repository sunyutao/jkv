<template>
    <div>
    	<div class="slider">
			<div class="slider-beijing">
				<img class="book-yy" alt="" src="../../assets/news/yinying.png">
				<div class="slider-nav">
					<ul>
						<li><img id="" width="100%" height="100%" :src="addressUrl+dataInfo.imgUrl" ></li>
					</ul>
				</div>
			</div>
			<div class="zuobian">
				<div class="navlogo">
					<router-link target="_blank" :to='"/news"'>
						<img src="../../assets/news/tuoyuan1.png">
					</router-link>
				</div>
				<div class="riqi" :class="rqclick=='riqi-cli'?rqclick:''" @mousedown="rqshow1()" @mouseup="rqshow2()">
				</div>
				<!-- 日期 -->
				<Calendar v-on:choseDay="clickDay" v-show="play"></Calendar>
			</div>
			<div class="contont" id="contont">
				<a>{{day}}日</a>
				<a>{{month}}月</a>
			</div>
			<div class="arrow">
				<span class="arrow-left" @click="prevDate()">
					<img src="../../assets/news/10_81.png">
					<a href="javascript:void(0);">前一天</a>
				</span> 
				<span class="arrow-zhong" @click="showDescr()">
					<img src="../../assets/news/5_73.png">
					<a href="#">详情</a>
				</span> 
				<span class="arrow-right" @click="nextDate()">
					<img src="../../assets/news/10.png">
					<a href="javascript:void(0);">后一天</a>
				</span>
			</div>
			<div class="text" id="text" :class="showDes?'text-cli':''" v-html="content"></div>
		</div>
    </div>
</template>

<script>
	import Calendar from 'vue-calendar-component';
    export default {
    	components: {
		    Calendar
		},
    	data(){
    		return{
    			date:this.$route.query.day,
    			month:9,
    			day:10,
    			play:false,
    			showDes:false,
    			content:'',
    			dataInfo:{},
    			rqclick:''
    		}
    	},
    	created(){

    		this.httpCalInfo(this.date);
    	},
        methods:{
        	httpCalInfo:function(date){
        		var _this = this;
	            _this.$ajax.post('/cnews/cal/inter/getCalDayInfo.do',_this.$qs.stringify({calDate:date})).then(function(res){
	                if(res.data && res.data.flag && res.data.cal && res.data.cal.calId){
	                    _this.dataInfo = res.data.cal;
	                    _this.date = date;
	                    var content = res.data.cal.content ? res.data.cal.content : '';
	                    _this.content = content.replace(/<br\/>/gi,'<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	                    _this.getMonthAndDay(date);
	                }else{
	                	_this.$alert('没有数据');
	                }
	            },function(){
	            });
        	},
        	showDescr:function(){
        		this.showDes = this.showDes ? false:true;
        	},
        	prevDate:function(){
	          var day = this.addDate(this.date,-1);
	          if(day){
	            this.httpCalInfo(day);
	          }
	          
	        },
	        nextDate:function(){
	          var day = this.addDate(this.date,1);
	          if(day){
	            this.httpCalInfo(day);
	          }
	        },
	        addDate:function(date,days){
	          if (days == undefined || days == '') {
	              days = 1;
	          }
	          date = new Date(date);
	          date.setDate(date.getDate() + days);
	          var month = date.getMonth() + 1;
	          var day = this.getFormatDate(date.getDate());
	          return date.getFullYear() + '-' + this.getFormatDate(month) + '-' + day;      
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
	        },
	        getFormatDate:function(arg){
	          if (arg == undefined || arg == '') {
	              return '';
	          }
	          var re = arg + '';
	          if (re.length < 2) {
	              re = '0' + re;
	          }
	          return re;
	        },
	        getMonthAndDay:function(date){
	        	date = new Date(date);
	        	var month = date.getMonth() + 1;
	            var strDate = date.getDate();
	            if (month >= 1 && month <= 9) {
	                month = "0" + month;
	            }
	            if (strDate >= 0 && strDate <= 9) {
	                strDate = "0" + strDate;
	            }
	            this.month = month;
	            this.day = strDate;

	        },
        	rqshow1:function(){
            	this.rqclick = "riqi-cli";
            	this.play = !this.play;
	        },
	        rqshow2:function(){
	            this.rqclick = "";
	        },
	        clickDay(data) {
		      console.log(data); //选中某天
		      this.httpCalInfo(data);
		    }
        }
    }
</script>

<style lang="less" scoped>
	.slider{
	    width: 100%;
	    height:100vh;
	    overflow:hidden;
	    position: relative;
	    .slider-beijing{
		    background:url(../../assets/news/bookbg.jpg) no-repeat;
		    background-size: 100% 100%;
		    width:100%;
		    height:100%;
		    position: relative; 
		    .book-yy{
				position: absolute;
				left:50%;
				top:0;
				height:100%;
				z-index:1;
				opacity:0.5;
				margin-left:-7px;
				width:60px;
			}
			.slider-nav{
				height:calc(100% - 12px);
			    width:calc(100% - 32px);
			    position: relative; 
			    top:6px;
			    left:16px;
				ul{
				    width: 100%;
				    height:100%;
				    li{
				    	float: left;
					    width:100%;
					    display: none;
					    height:100%;
					    border-radius:10px;
					    overflow:hidden;
				    	img{
				    		width: 100%;
						    height:100%;
				    	}
				    }
				    :first-child{
					    display: block;
					}
				}
			} 
   		}
   		.contont{
		    width: 230px;
		    height: 60px;
		    position: absolute;
		    top: 15px;
		    left: 50%;
		    margin-left: -82px;
		    font-size: 30px;
		    a{
			    width: 100px;
			    display: block;
			    text-align: center;
			    line-height: 60px;
			    color: white;
			    float: left;
			    background-color: #ffbf43;
			    border:1px solid #ffbf43;
			    border-radius: 45px 0 0 45px;
			    margin-left: 2px;
			}
			a:nth-child(2){
				border-radius:0 45px 45px 0;
			}
		}
		.zuobian{
		    width: 400px;
		    position: absolute;
		    left: 0;
		    top: 0;
		    .navlogo{
			    width: 300px;
			    height: 100px;
			    display: block;
			    margin-top: 15px;
			    margin-left: 45px;
			    line-height: 100px;
			}
			.riqi{
				cursor:pointer;
			    width: 50px;
			    height: 50px;
			    text-align: center;
			    line-height: 60px;
			    position: absolute;
			    right: -35px;
			    top: 36px;
			    float: left;
			    background:url(../../assets/news/rili_often.png);
			    &:hover{
			    	background:url(../../assets/news/rili_hover.png);
			    }
			}
			.riqi-cli{
				background:url(../../assets/news/rili_click.png);
				&:hover{
			    	background:url(../../assets/news/rili_click.png);
			    }
			}
			
		}
		.arrow{
            cursor: pointer;
            img{
			    display: block;
			    position: relative;
			    left:8px;
			}
			a{
			    display: block;
			    color:#ffffff;
			    width: 50px;
			    font-size: 14px;
			    text-decoration:none;
			    text-align:center;
			}
			.arrow-left{
	          	width: 50px;
	            height: 32px;
	            position: absolute;
	            right: 230px;
	            bottom: 100px;
	            cursor: pointer;
	            line-height: 60px;
	            color: #fff;
	        }
	        .arrow-zhong{
	            width: 50px;
	            height: 32px;
	            position: absolute;
	            right: 180px;
	            bottom: 100px;
	            cursor: pointer;
	            line-height: 60px;
	            color: #fff;
	               
			}
			.arrow-right{
			    width: 50px;
	            height: 32px;
	            position: absolute;
	            right: 130px;
	            bottom: 100px;
	            cursor: pointer;
	            line-height: 60px;
	            color: #fff;
	        }

        }
        .text{
			text-indent:2em;
		    width: 300px;
		    height: 720px;
		    background-color:red;
		    position: absolute;
		    right: 40px;
		    bottom: -1000px;
			padding:14px;
		    background: rgba(0, 0, 0, 0.5);
		    overflow: hidden;
		    overflow-y:scroll;
		    color:#fff;
		    font-size:14px;
		    line-height:24px;
		    border-radius:6px;
		    transition:bottom 0.5s;
		    -webkit-transition:0.5s;
		}
		.text-cli{
			bottom:140px;
		}
		.text::-webkit-scrollbar{
			width:5px;
		}
		.text::-webkit-scrollbar-thumb{
			background-color:#fff;
			border-radius: 10px;
		}
	}
</style>
<style  lang="css" scoped>
	.wh_container{
		position: absolute;
	    right: -260px;
	    top: 100px;
	}
    .wh_container >>> .wh_content_all {
	  background-color: #FFFFFF !important;
	  box-shadow: 2px 2px 15px 2px #e3e3e3;
    	border-radius: 5px;
	}
	.wh_container >>> .wh_content_item,.wh_container >>> .wh_top_changge li{
		color:#333 !important;
	}
	.wh_container >>> .wh_top_changge li .wh_jiantou1{
		border-top: 2px solid #333;
    	border-left: 2px solid #333;
	}
	.wh_container >>> .wh_top_changge li .wh_jiantou2{
		border-top: 2px solid #333;
    	border-right: 2px solid #333;
	}
</style>