<template>
    <div>
        <Header link="sexplorePlan"></Header>
        <div class="plan-container">
            <div class="bread-crumb-container">
                <div class="bread-crumb">
                    <span>当前位置：</span>
                    <router-link target="_blank" to="/sexplorePlan">探索与计划</router-link> 》
                    <span>计划</span>
                </div>
            </div>
            <div class="tab-container">
                <div class="tab-content">
                    <span :class="{'span-th':tabIndex==1}" @click="setActive(1)">最新</span>
                    <span :class="{'span-th':tabIndex==2}" @click="setActive(2)">最热</span>
                </div>
            </div>
            <PlanList :planList="planList"></PlanList>
            <div class="more-container">
                <span @click="pageAdd()">{{loadText}}</span>
            </div>        
        </div>
    </div>
</template>

<script>
    import Header from '@/components/header'
    import PlanList from '@/components/planList'
    export default {
        name:"planView",
        data(){
            return{
                tabIndex:'1',
                planData:{
                    page:1,
                    rows:10,
                    sort:'newest'
                },
                planList:[],
                loadText:'加载更多'
            }
        },
        components:{
            Header,PlanList
        },
        created(){
            this.httpPlanLists()
        },
        methods:{
            setActive:function(a){
                this.tabIndex = a
                if(a == 1){
                    this.sexData.sort = 'newest'
                }
                else{
                    this.sexData.sort = 'hottest'
                }
                this.planList = []
                this.planData.page = 1
                this.httpPlanLists()
            },
            httpPlanLists:function(){
                var _this = this
                var str = _this.$qs.stringify(_this.planData)
                _this.$ajax.post('/cper/plantrav/getplantravsList.do',str).then(function(res){
                    console.log(res.data)
                    if(res.data.flag){
                        if(res.data.list.length<=0){
                            _this.loadText = '没有更多了'
                        }
                        else{
                            _this.planList= _this.planList.concat(res.data.list)
                            console.log(_this.planList)
                        }
                    }
                },function(){

                })
            },
            pageAdd:function(){
                this.planData.page+=1
                this.httpPlanLists()
            }
        }
    }
</script>

<style lang="less" scoped>
    .plan-container{
        padding-top: 110px;
        padding-bottom: 30px;
        .tab-container{
            margin-top: 20px;
            margin-bottom: 20px;
            .tab-content{
                width: 1170px;
                margin: 0 auto;
                span{
                    font-size: 14px;
                    color: #333;
                    margin-right: 30px;
                    cursor: pointer;
                }
                .span-th{
                    color: #ffbf43;
                }
            }
            
        }
        .more-container{
            span{
                display: block;
                letter-spacing: 4px;
                cursor: pointer;
                background-color: #f9f9f9;
                width: 174px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                border: 1px solid #999;
                border-radius: 5px;
                font-size: 14px;
                color: #999;
                margin: 80px auto 0;
                outline: none;
            }
        }
    }
</style>