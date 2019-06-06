<template>
    <div>
        <div ref="artDetail" class="sexplore-plan-detail-container">
            <div class="sexplore-plan-detail">
                <div class="view">
                    <h1 class="con-title">{{title}}</h1>
                    <p class="times"><span>{{sexploreDetail.clickNum}}</span>次阅读</p>
                    <div v-html="conDetail" class="main-view"></div>
                    <div class="copyright">
						<p>版权所有·侵权必究</p>
						<div>转载请联系本公司获得授权<span></span></div>
					</div>
                    <div v-if="sexploreDetail.labArray" class="label">
					    <span v-for="(item,index) in sexploreDetail.labArray" :key="index">{{item.labNm}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"sexplorePlanDetailView",
        data(){
            return{
                pro:Number,
                conDetail:'',
            }
        },
        props:['sexploreDetail','title'],
        created(){
            this.loadContent();
        },
        watch:{
            sexploreDetail: function(newVal,oldVal){
                this.loadContent();
            },
            conDetail: function(newVal,oldVal){
                var _this = this
                _this.loadContent();
                setTimeout(function(){                           
                    _this.videoFun()
                }, 0);
            }
        },
        methods:{
            scrollPro:function(){
                var _this = this
                var h = _this.$refs.artDetail.offsetHeight
                var top_h = _this.$refs.artDetail.offsetTop
                var sc = document.documentElement.scrollTop 
                var s = document.documentElement.clientHeight
                var l = top_h + h - s;
                // console.log(h,top_h,sc)
                var a
                var boo
                if(top_h - sc <= 80){
                    a = (sc - top_h + 80)/(l - top_h + 80)
                    if(a > 1){
                        a = 1
                    }
                    _this.pro = a *100
                    // console.log(_this.pro)
                    _this.$emit("progressFunc",_this.pro)
                    boo = true
						
				}
				if(top_h -sc > 80 ){
					boo = false
                }
                _this.$emit("boonFunc",boo)
            },
            loadContent:function(){
                var _this = this
                console.log(_this.sourceUrl + _this.sexploreDetail.mkUrl)
                _this.$ajax.get(_this.sourceUrl + _this.sexploreDetail.mkUrl).then(function(res){
                    // console.log(marked(res.data))
                    // console.log(marked(res.data))
                    var str = marked(res.data).replace(/img src="/g,'img src="'+_this.addressUrl)
                    _this.conDetail = str
                },function(){

                })
                // import aa from 'http://192.168.3.15:8098/file/markdown/bdafb301-36f1-402f-bf23-4b1264bd87ab.md'
               
            },
            videoFun:function(){
                var _this = this
                $('.sexplore-plan-detail-container .sexplore-plan-detail .view .main-view video').each(function(){
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
            var _this =this
            window.onscroll= function(){
                _this.scrollPro()
            }
            
        },
        // Destroy(){
        //     var _this = this
        //     window.removeEventListener('onscroll',scrollPro())
        // }
    }
</script>

<style lang="less">
    .sexplore-plan-detail-container{
        margin-top: 30px;
        width: 100%;
        background-color: #f9f9f9;
        .sexplore-plan-detail{
            width: 1170px;
            margin: 0 auto;
            position: relative;
            padding-top: 30px;
            background-color: #fff;
            .view{
                width: 750px;
                margin: 0 auto;
                position: relative;
                &:after{
                    content: '';
                    height: 0;
                    visibility: hidden;
                    display: block;
                    clear: both;
                }
                .con-title{
                    font-size: 24px;
                    color: #333;
                    font-weight: normal;
                    text-align: center;
                }
                .times{
                    font-size: 14px;
                    color: #999;
                    text-align: center;
                    margin-top: 10px;
                    margin-bottom: 40px;
                    border-bottom: 1px solid #ffb80087;
                    padding-bottom: 10px;
                }
                .main-view{
                    margin-bottom: 70px;
                    img{
                        display: block;
                        max-width: 700px;
                        height: auto;
                        margin: 0 auto 20px;
                    }
                    *{
                        letter-spacing: 1px;
                        width: 700px;
                        margin: 0 auto 20px;
                        font-size: 16px;
                        color: #666;
                        text-indent: 2em;
                        line-height: 30px;
                    }
                    video{
                        display: block;
                        max-width: 700px;
                        height: auto;
                        margin: 0 auto 20px;
                    }
                }
                .copyright{
                    width: 120px;
                    margin-bottom: 60px;
                    float: right;
                    cursor: pointer;
                    position: relative;
                    &:hover{
                        div{
                            height: 40px;
                            opacity: 1;
                        }
                    }
                    p{
                        font-size: 14px;
                        color: #999;
                    }
                    div{
                        opacity: 0;
                        height: 0px;
                        border-radius: 5px;
                        width: 204px;
                        line-height: 40px;
                        background-color: #191919;
                        color: #fff;
                        font-size: 14px;
                        text-align: center;
                        position: absolute;
                        right: -40px;
                        bottom: 26px;
                        span{
                            display: block;
                            content: '';
                            width: 0;
                            height: 0;
                            border-top: 5px solid #191919;
                            border-right: 5px solid transparent;
                            border-bottom: 5px solid transparent;
                            border-left: 5px solid transparent;
                            position: absolute;
                            left: 50%;
                            margin-left: -5px;
                            bottom: -10px;
                        }
                    }
                }
                .label{
                    width: 100%;
                    box-sizing: border-box;
                    padding-top: 24px;
                    /* height: 70px; */
                    float: left;
                    border-top: 2px solid #cdcdcd;
                    span{
                        margin-bottom: 18px;
                        font-size: 14px;
                        color: #333;
                        padding: 6px 15px;
                        border: 1px solid #dedede;
                        border-radius: 20px;
                        margin-right: 10px;
                        display: inline-block;
                    }
                }
            }
        }
    }
</style>