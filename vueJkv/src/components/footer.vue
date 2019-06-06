<template>
    <div>
        <div class="footer-container" :class="link=='home'?'home-th':''">
            <div class="top"><img src="../assets/footlogo.png" alt=""></div>
            <div class="bottom">
                <div class="footabout">
                    <router-link to="/aboutJkv">关于金凯视界</router-link>
                    <router-link to="/develop">发展历程</router-link>
                    <router-link to="/credentials">运营资质</router-link>
                    <router-link to="/contactus">联系我们</router-link>
                    <router-link to="/join">加入我们</router-link>
                    <router-link to="/legal">法律声明</router-link>
                    <router-link to="/complaint">投诉与建议</router-link>
                </div>
                <div class="callbox">
                    <div class="call">
                         <p class="callnum">0311-89891997</p>
                        <p class="calltime">周一至周日：08:00-23:00 节假日：08:00-20:00</p>
                    </div>
                   <div class="wechat">
                       <img src="../assets/WeChat.png" alt="">
                       <p>关注我们</p>
                   </div>
                </div>
                <p class="copy">河北省石家庄市桥西区南花园步行街C座</p>
                <p class="copy">Copyright © 2013-2017 金凯视界jkv-travel.com ALL rights reserved 河北金凯国际旅行社有限公司 冀ICP备16028793号</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"footerComponents",
        props:['link']

    }
</script>

<style lang="less" scoped>
    .footer-container{
        width: 100%;
        background-color: #f8f8f8;
        padding: 70px 0 40px;
        .top{
            border-bottom: 2px solid #9a9a9a;
            padding-bottom: 20px;
            img{
                width: 200px;
                height: auto;
                display: block;
                margin: 0 auto;
                display: block;
            }
        }
        .bottom{
            .footabout{
                margin: 0 0 50px;
                padding-top: 10px;
                text-align: center;
                a{
                    display: inline-block;
                    padding: 0 10px;
                    border-right: 1px solid #BFBFBF;
                    color: #999;
                    font-size: 14px;
                    &:last-child{
                        border: none;
                    }
                }
            }
            .callbox{
                text-align: center;
                margin-bottom: 40px;
                .call{
                    width: 375px;
                    display: inline-block;
                    text-align: left;
                    vertical-align: middle;
                    .callnum{
                        font-size: 34px;
                        font-weight: bold;
                        background: url(../assets/phone.png) 0 0 no-repeat;
                        line-height: 35px;
                        padding-left: 45px;
                        color: #333;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    .calltime{
                        margin-top: 10px;
                        color: #767676;
                    }
                }
                .wechat{
                    display: inline-block;
                    vertical-align: middle;
                    img{
                        width: 105px;
                    }
                    p{
                        margin-top: 10px;
                        font-weight: bold;
                    }
                }
                
            }
            .copy{
                color: #787878;
                font-size: 12px;
                text-align: center;
                margin-bottom: 5px;
            }
        }
    }
    .home-th{
        background-color:#fff;
    }
</style>