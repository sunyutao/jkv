<template>
    <div class="header-container" :class="foo=='foo'?'foo':''">
        <div class="header">
            <div v-if="foo=='foo'" class="logo"><router-link to="/"><img src="../assets/navlogo.png" alt=""></router-link></div>
            <div v-if="!(foo=='foo')" class="logo"><router-link to="/"><img src="../assets/logo.png" alt=""></router-link></div>
            <div class="main-nav">
                <router-link :class="link=='exper'?'a-th':''" to="/exper">体验333</router-link>
                <router-link :class="link=='sexplorePlan'?'a-th':''" to="/sexplorePlan">探索与计划旅行</router-link>
                <router-link :class="link=='news'?'a-th':''" to="/news">资讯</router-link>
                <router-link :class="link=='setOff'?'a-th':''" to="/setOff">出发</router-link>
            </div>
            <div v-if="isShow" class="reg-log">
                <router-link target="_blank" to="/login">登录</router-link>
                <router-link target="_blank" to="/regist">注册</router-link>
            </div>
            <div v-if="!isShow" class="user">
                <img :src="addressUrl+userMesg.headImgUrl" alt="">
                <span>{{userMesg.userNm}}</span>
                <div class="user-r">
                    <router-link to="">设置</router-link>
                    <span @click="userQuit()">退出</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"headerComponents",
        data(){
            return{
                userMesg:{},
                isShow:true
            }
        },
        props:['link','foo'],
        created(){
            this.isLoginFun()
        },
        // watch:{
        //     userMesg: function(newVal,oldVal){
        //         this.isLoginFun();
        //     }
        // },
        methods:{
            isLoginFun:function(){
                var _this = this
                _this.$ajax.post('/travel/cmm/checkUser.do').then(function(res){
                    console.log(res.data)
                    if(res.data.flag){
                        _this.userMesg = res.data
                        _this.isShow = false
                    }
                },function(){

                })
            //    axios({
            //         method: 'post',
            //         url: '/travel/cmm/checkUser.do',
            //         withCredentials:true,
            //     }).then(function(res){
            //         console.log(res.data)
            //         if(res.data.flag){
            //             _this.userMesg = res.data
            //              _this.isShow = false
            //         }
            //     })
            },
            userQuit:function(){
                var _this = this
                _this.$ajax.post('/user/inter/userQuit.do').then(function(){
                     _this.userMesg = {}
                    _this.isShow = true
                },function(){

                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .header-container{
        background-color: #fff;
        z-index: 100;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.08);
        .header{
            width: 1170px;
            margin: 0 auto;
            height: 80px;
            &:after{
                content: '';
                height: 0;
                visibility: hidden;
                display: block;
                clear: both;
            }
            .logo{
                float: left;
                margin-top: 23px;
            }
            .main-nav{
                margin-top: 27px;
                margin-left: 200px;
                float: left;
                &:after{
                    content: '';
                    height: 0;
                    visibility: hidden;
                    display: block;
                    clear: both;
                }
                a{
                    display: block;
                    padding: 6px 8px;
                    font-size: 14px;
                    float: left;
                    margin: 0 10px;
                    &:hover{
                        background-color: #ffbf43;
                        color: #fff;
                        
                    }
                }
                .a-th{
                    background-color: #ffbf43;
                    color: #fff;
                }
            }
            .reg-log{
                font-size: 0;
                float: right;
                height: 80px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                a{
                    font-size: 14px;
                    color: #333;
                    display: inline-block;
                    padding: 0 10px;
                    &:nth-child(1){
                        border-right: 1px solid #333;
                    }
                }
                
            }
            .user{
                font-size: 0;
                float: right;
                height: 80px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                position: relative;
                margin-right: 100px;
                &:hover{
                    .user-r{
                        height: auto;
                    }
                }
                img{
                   width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 10px;
                }
                span{
                     font-size: 14px;
                    color: #333;
                }
                .user-r{
                    position: absolute;
                    width: 30px;
                    right: -40px;
                    padding-left:40px; 
                    top: 20px;
                    height: 0;
                    overflow: hidden;
                    a{
                        font-size: 14px;
                        color: #333;
                        display: block;
                        margin-bottom: 10px;
                    }
                    span{
                        font-size: 14px;
                         color: #333;
                         display: block;
                    }
                }
            }
        }
    }
    .foo{
        background:linear-gradient(to bottom,rgba(0,0,0,0.7),rgba(0,0,0,0));
        .header{
            .main-nav{
                a{
                    color:#fff;
                }
            }
            .reg-log{
                a{
                    color: #fff;
                    &:nth-child(1){
                        border-right: 1px solid #fff;
                    }
                }
            }
        }
    }
</style>