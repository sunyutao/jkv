<template>
    <div>
        <div class="plan-list-container">
            <div class="plan-list">
                <router-link target="_blank" v-for="(item,index) in planList" :key="index" :to='{path:"/planDetail/"+item.planId}'>
                    <div class="pho"><img :src="addressUrl+item.planCoverUrl" alt=""></div>
                    <div class="introduction">
                        <h3>{{item.planTitle}}</h3>
                        <p>{{item.planBrief}}</p>
                    </div> 
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"planListComponents",
        data(){
            return{
                
            }
        },
        props:['planList'],
        
        
    }
</script>

<style lang="less" scoped>
    .plan-list-container{
        width: 100%;
        background-color: #f9f9f9;
        .plan-list{
            width: 1191px;
            margin: 0 auto;
            &:after{
                content: '';
                height: 0;
                visibility: hidden;
                display: block;
                clear: both;
            }
            a{
                display: block;
                transition: bottom 0.2s;
                -webkit-transition: bottom 0.2s;
                position: relative;
                bottom: 0;
                float: left;
                margin-left: 10px;
                margin-right: 10px;
                margin-bottom: 20px;
                &:hover{
                    bottom: 5px;
                    .introduction{
                        h3{
                            color: #ffbf43;
                        }
                    }
                }
                .pho{
                    width: 377px;
                    height: 212px;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .introduction{
                    width: 377px;
                    h3{
                        transition: color 0.2s;
                        -webkit-transition: color 0.2s;
                        font-weight: normal;
                        font-size: 16px;
                        color: #333333;
                        margin-top: 20px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    p{
                        font-size: 14px;
                        color: #666;
                        line-height: 24px;
                        margin-top: 12px;
                        height: 72px;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>