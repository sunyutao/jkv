<template>
    <div>
        <Header link="sexplorePlan"></Header>
        <div class="sexplore-container">
            <div class="bread-crumb-container">
                <div class="bread-crumb">
                    <span>当前位置：</span>
                    <router-link target="_blank" to="/sexplorePlan">探索与计划</router-link> 》
                    <span>探索</span>
                </div>
            </div>
            <div class="tab-container">
                <div class="tab-content">
                    <span :class="{'span-th':tabIndex==1}" @click="setActive(1)">最新</span>
                    <span :class="{'span-th':tabIndex==2}" @click="setActive(2)">最热</span>
                </div>
            </div>
            <SexploreList :sexploreList="sexploreList"></SexploreList>
            <div class="more-container">
                <span @click="pageAdd()">{{loadText}}</span>
            </div>        
        </div>
    </div>
</template>

<script>
    import Header from '@/components/header'
    import SexploreList from '@/components/sexploreList'
    export default {
        name:"sexploreView",
        data(){
            return{
                tabIndex:'1',
                sexData:{
                    page:1,
                    rows:10,
                    sort:'newest'
                },
                sexploreList:[],
                loadText:'加载更多'
            }
        },
        components:{
            Header,SexploreList,
        },
        created(){
            this.httpSexploreLists()
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
                this.sexploreList = []
                this.sexData.page = 1
                this.httpSexploreLists()
            },
            httpSexploreLists:function(){
                var _this = this
                var str = _this.$qs.stringify(_this.sexData)
                _this.$ajax.post('/cper/explore/getExploresList.do',str).then(function(res){
                    console.log(res.data)
                    if(res.data.flag){
                        if(res.data.list.length<=0){
                            _this.loadText = '没有更多了'
                        }
                        else{
                            _this.sexploreList= _this.sexploreList.concat(res.data.list)
                            console.log(_this.sexploreList)
                        }
                    }
                },function(){

                })
            },
            pageAdd:function(){
                this.sexData.page+=1
                this.httpSexploreLists()
            }
        }
    }
</script>

<style lang="less" scoped>
    .sexplore-container{
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