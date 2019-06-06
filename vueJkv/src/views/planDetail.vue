<template>
    <div>
        <div class="plan-detail-container">
            <Header link="sexplorePlan"></Header>
            <ProgressBar :textName="planDetail.planTitle" :pro="proo" :boon="boon" mainTit="plan"></ProgressBar>
            <div class="bread-crumb-container">
                <div class="bread-crumb">
                    <span>当前位置：</span>
                    <router-link target="_blank" to="/sexplorePlan">探索与计划</router-link> 》
                    <router-link target="_blank" to="/plan">计划</router-link> 》
                    <span>{{planDetail.planTitle}}</span>
                </div>
            </div>
            <SexplorePlanDetail :title="planDetail.planTitle" :sexploreDetail="planDetail" @progressFunc="progressFunc" @boonFunc="boonFunc"></SexplorePlanDetail>
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
                planDetail:{}
            }
        },
        created(){
           this.httpPlanDetail()
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
            httpPlanDetail:function(){
                var _this = this
                var str = _this.$qs.stringify({expId:_this.$route.params.id})
                _this.$ajax.post('/cper/plantrav/getplantravDet.do',str).then(function(res){
                    if(res.data.flag){
                        _this.planDetail = res.data.planInfo
                        console.log(_this.planDetail)
                    }
                },function(){

                })
            },
            clickNum:function(){
                var _this = this
                var str = _this.$qs.stringify({planId:_this.$route.params.id})
                _this.$ajax.post('/cper/plantrav/addClickNum.do',str)
            }
        },
    }
</script>

<style lang="less" scoped>
    .plan-detail-container{
        width: 100%;
        padding-top: 110px;
    }
</style>