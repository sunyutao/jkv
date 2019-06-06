<template>
    <div>
        <Header link="exper"></Header>
        <LoginS :isShow="loginShow" @showFun="showFun"></LoginS>   
        <div class="thing-list-container">
            <div class="container">
                <h5 class="currentPosition">当前位置：》 <a class='nav-lab-style' target='_blank'
                            href='/cexper/home/index.do'>体验</a> 》那人那事</h5>
                <div class="WonderfulMomentCnt">
                    <div class="WonderfulMomentCntT-top">
                        <ul class="WonderfulMomentCntT-top-newHot">
                            <li @click="tabFun('')" :class="{'WM-top-newHotActive':sort==''}">最新发表</li>
                            <li @click="tabFun('hottest')" :class="{'WM-top-newHotActive':sort=='hottest'}">最多评论</li>
                        </ul>
                        <ul class="WonderfulMomentCntT-top-right">
                            <li @click="addBtnFun()">
                                <img src="../../../assets/imgIcon.png"  style="margin-right: 10px;"> 添加文章
                            </li>
                        </ul>
                    </div>
                    <ul class="WonderfulMomentCnt-list" id="thingList">
                        <li v-for="(item,index) in thingList" :key="index">
                            <router-link target="_blank" :to='{path:"/thingDetail/"+item.thId}'>
                                <div class="WMItemImgBox">
                                    <img :src="addressUrl+item.coverImgUrl" >
                                    <p>{{item.title}}</p>
                                </div>
                                <div class="WMItemFotMsg">
                                    <p style="color: #333333;">古老的手工熟皮技艺</p>
                                </div>
                            </router-link>
                        </li> 
                    </ul>
                    <div class="lodingImg">
                        <img src="/resources/exper/image/icon/loding.png">
                    </div>
                    <div @click="pageFun()" class="WMSeeMore">
                       {{more}}
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
    import LoginS from '@/components/LoginS'
    export default {
        name:"thingListThing",
        components:{
            Header,Footer,LoginS
        },
        data(){
            return{
                page:1,
                rows:15,
                sort:'',
                thStatus:2,
                thingList:[],
                more:'查看更多',
                loginShow:false
            }
        },
        watch:{
            sort: function(newVal,oldVal){
               this.getThingListFun()
            }
        },
        created(){
            this.getThingListFun()
        },
        methods:{
            getThingListFun:function(){
                var _this = this
                _this.$ajax.post('/cexper/thing/inter/getthingpage.do',_this.$qs.stringify({page:_this.page,rows:_this.rows,sort:_this.sort,thStatus:_this.thStatus})).then(function(res){
                    // console.log(res.data)
                    if(res.data.flag){
                        if(!res.data.thinglist || res.data.thinglist.length == 0){
                            _this.more = '没有更多了'
                        }
                        else{
                            _this.thingList = _this.thingList.concat(res.data.thinglist)
                            console.log(_this.thingList)
                            console.log({page:_this.page,rows:_this.rows,sort:_this.rows,thStatus:_this.thStatus})
                        }
                    }
                },function(){

                })
            },
            pageFun:function(){
                this.page += 1 
                this.getThingListFun()
            },
            tabFun:function(a){
                var _this = this
                _this.sort = a
                _this.page = 1
                _this.thingList = []
            },
            showFun:function(data){
                this.loginShow = data
            },
            addBtnFun:function(){
                var _this = this
                _this.$ajax.post('/travel/cmm/checkUser.do').then(function(res){
                    if(res.data.flag){
                        const { href } = _this.$router.resolve({name: 'addThing'})
                        window.open(href, '_blank')
                    }
                    else{
                        _this.loginShow = true
                    }
                },function(){

                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../styles/secondPublic.css';
    .WMItemFotMsg{
        justify-content: center;
    }
    .WMItemFotMsg>p{
        font-size: 16px;
    }
    .WonderfulMomentCnt-list>li:hover .WMItemFotMsg>p{
        color: #FFBF43!important;
    }
    .WonderfulMomentCnt-list>li{
        width: 32%;
    }
    /* .WMItemImgBox{
        height: 200px;
    } */
    /* 修改开始 */
    .WMItemImgBox{
        height: 277px;
    }
    .WMItemImgBox>img {
        width: 100%;
        height: 200px;
    }
    .WMItemImgBox>p{
        text-align: center;
        padding: 14px 0;
        /* font-weight: 600; */
        font-size: 16px;
        color: #333;
    }
    /* 修改结束*/
    .WonderfulMomentCnt-list>li{
        margin-right: 22px;
    }
    .WonderfulMomentCnt-list>li:nth-child(3n) {
        margin-right:0px;
    }
    .WonderfulMomentCnt-list>li:nth-child(4n) {
        margin-right: 22px;
    }
    .thing-list-container{
        padding-top:110px;
        
    }
    .container{
        width: 1170px;
        height: auto;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>