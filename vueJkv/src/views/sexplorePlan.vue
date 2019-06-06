<template>
    <div>
        <Header link="sexplorePlan"></Header>
        <div class="sexplore-plan-container">
            <div class="sexplore-container">
                <h1 class="title-ch">探索</h1>
                <h1 class="title-en">SEXPLORE</h1>
                <SexploreList :sexploreList = "sexploreList"></SexploreList>
                <div class="btn-container">
                    <div class="btn">
                        <router-link target="_blank" to="/sexplore">更多<img src="../assets/tsjh_more.png" alt=""></router-link>
                    </div>
                </div>
            </div>
            <div class="plan-container">
                <h1 class="title-ch">计划</h1>
                <h1 class="title-en">PLAN</h1>
                <PlanList :planList = "planList"></PlanList>
                <div class="btn-container">
                    <div class="btn">
                        <router-link target="_blank" to="/plan">更多<img src="../assets/tsjh_more.png" alt=""></router-link>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/header'
    import SexploreList from '@/components/sexploreList'
    import PlanList from '@/components/planList'
    import Footer from '@/components/footer'
    export default {
        name:"sexplorePlanView",
        data(){
            return{
                sexploreList:[],
                planList:[]
            }
        },
        components:{
            Header,SexploreList,PlanList,Footer
        },
        created(){
            this.httpSexploreList()
            this.httpPlanList()
        },
        methods: {
            httpSexploreList:function(){
                var _this = this
                _this.$ajax.post('/cper/explore/getLatestExplores.do',_this.$qs.stringify({rows:1})).then(function(res){
                    if(res.data.flag){
                        _this.sexploreList = res.data.list
                        console.log(_this.sexploreList)
                    }
                },function(){

                })
            },
            httpPlanList:function(){
                var _this = this
                _this.$ajax.post('/cper/plantrav/getplantravs.do',3).then(function(res){
                    if(res.data.flag){
                        _this.planList = res.data.list
                        console.log(_this.planList)
                    }
                },function(){

                })
            }
        },
    }
</script>

<style lang="less" scoped>
    .sexplore-plan-container{
        .sexplore-container{
            margin-bottom: 48px;
        }
        padding-top: 110px;
        padding-bottom: 30px;
        .title-ch{
            font-size: 34px;
            color: #333;
            text-align: center;
            margin-bottom: 15px;
        }
        .title-en{
            font-size: 18px;
            counter-reset: #333;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
            margin-bottom: 45px;
        }
        .btn-container{
            width: 100%;
            background-color: #f9f9f9;
            .btn{
                width: 1170px;
                margin: 0 auto;
                &:after{
                    content: '';
                    height: 0;
                    visibility: hidden;
                    display: block;
                    clear: both;
                }
                a{
                    margin-top: 16px;
                    display: block;
                    width: 160px;
                    height: 48px;
                    background-color: #ffbf43;
                    float: right;
                    line-height: 48px;
                    font-size: 14px;
                    color: #fff;
                    text-decoration: none;
                    box-sizing: border-box;
                    padding-left: 62px;
                    &:hover{
                        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.225);
                        img{
                            left: 15px;
                        }
                    }
                    img{
                        transition: left 0.2s;
                        position: relative;
                        left: 20px;
                        transition: left 0.2s;
                        -webkit-transition: left 0.2s;
                    }
                }
            }
        }
    }
</style>
