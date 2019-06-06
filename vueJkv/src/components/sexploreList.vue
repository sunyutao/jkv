<template>
    <div>
        <div class="sexplore-list-container">
            <div class="sexplore-list">
                <router-link target="_blank" v-for="(item,index) in sexploreList" :key="index" :to='{path:"/sexploreDetail/"+item.expId}'>
                    <div class="left"><img :src="addressUrl+item.expCoverUrl" alt=""></div>
                    <div class="right">
                        <h3>{{item.expTitle}}</h3>
                        <div class="day">{{item.instDtm}}</div>
                        <div class="introduction">
                            <p>{{item.expBrief}}</p>
                        </div>
                        <p class="times">
                            <span>{{item.clickNum}}</span>次阅读
                        </p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"sexploreListComponents",
        data(){
            return{
                
            }
        },
        props:['sexploreList'],
    }
</script>

<style lang="less" scoped>
    .sexplore-list-container{
        width: 100%;
        background-color: #f9f9f9;
        .sexplore-list{
            width: 1190px;
            margin: 0 auto;
            &:after{
                content: '';
                  height: 0;
                  visibility: hidden;
                  display: block;
                  clear: both;
            }
            a{
                width: 575px;
                float: left;
                margin-left: 10px;
                margin-right: 10px;
                margin-bottom: 20px;
                display: block;
                &:after{
                    content: '';
                    height: 0;
                    visibility: hidden;
                    display: block;
                    clear: both;
                }
                &:hover{
                    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                }
                .left{
                    width: 243px;
                    height: 324px;
                    float: left;
                    img{
                         width: 100%;
                         height: 100%;
                    }
                }
                .right{
                        position: relative;
                        background-color: #fff;
                        float: right;
                        width: 332px;
                        height: 324px;
                        box-sizing: border-box;
                        padding: 20px;
                    h3{
                        font-size: 16px;
                        color: #333;
                        font-weight: normal;
                        margin-bottom: 24px;
                        max-height: 42px;
                         overflow: hidden;
                    }
                    .day{
                        font-size: 14px;
                        color: #999;
                        margin-bottom: 20px;
                        }
                    .introduction{
                         font-size: 14px;
                        color: #666;
                        line-height: 24px;
                        text-indent: 2em;
                        max-height: 144px;
                        overflow: hidden;   
                    }
                    .times{
                        font-size: 14px;
                        color: #999;
                        position: absolute;
                         bottom: 20px;
                         right: 20px;   
                    }
                }  
            }
        }
    }
</style>