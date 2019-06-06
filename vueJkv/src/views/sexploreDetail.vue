<template>
    <div>
        <div class="sexplore-detail-container">
            <Header link="sexplorePlan"></Header>
            <ProgressBar :textName="sexploreDetail.expTitle" :pro="proo" :boon="boon" mainTit="exp"></ProgressBar>
            <div class="bread-crumb-container">
                <div class="bread-crumb">
                    <span>当前位置：</span>
                    <router-link target="_blank" to="/sexplorePlan">探索与计划</router-link> 》
                    <router-link target="_blank" to="/sexplore">探索</router-link> 》
                    <span>{{sexploreDetail.expTitle}}</span>
                </div>
            </div>
            <SexplorePlanDetail :title="sexploreDetail.expTitle" :sexploreDetail="sexploreDetail" @progressFunc="progressFunc" @boonFunc="boonFunc"></SexplorePlanDetail>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/header'
    import ProgressBar from '@/components/progressBar'
    import SexplorePlanDetail from '@/components/sexplorePlanDetail'
    import Footer from '@/components/footer'
    export default {
        name:"sexploreDetailView",
        components:{
            Header,ProgressBar,SexplorePlanDetail,Footer
        },
        data(){
            return{
                proo:Number,
                boon:false,
                sexploreDetail:{}
            }
        },
        created(){
           this.httpSexDetail()
           this.clickNum()
        },
        methods:{
            progressFunc:function(data){
                // console.log(data)
                this.proo=data

            },
            boonFunc:function(data){
                this.boon=data
            },
            httpSexDetail:function(){
                var _this = this
                var str = _this.$qs.stringify({expId:_this.$route.params.id})
                _this.$ajax.post('/cper/explore/getExploreDet.do',str).then(function(res){
                    if(res.data.flag){
                        _this.sexploreDetail = res.data.expInfo
                        console.log(_this.sexploreDetail)
                    }
                },function(){

                })
            },
            clickNum:function(){
                var _this = this
                var str = _this.$qs.stringify({expId:_this.$route.params.id})
                _this.$ajax.post('/cper/explore/addClickNum.do',str)
            }
        },
    }
</script>

<style lang="less" scoped>
    .sexplore-detail-container{
        width: 100%;
        padding-top: 110px;
    }
</style>