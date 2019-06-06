<template>
    <div>
        <div v-if="isShow" class="login-container">
            <div class="login-con">
                <div class="top" style="cursor: move;">登录</div>
                <div class="bottom">
                    <div class="login">
                        <div class="write">
                            <div class="writeinfo"><input v-model="eMail" type="text" id="userMail" at="邮箱" class="required" placeholder="邮箱"></div>
                            <div class="writeinfo"><input v-model="pwd" type="password" id="pwd" at="密码" class="required password" placeholder="密码"></div>
                            <div class="fordetcode" style="margin-top:-7px">
                                <span>
                                    <router-link target="_blank" to="/forgetPwd">忘记密码</router-link>
                                </span>
                                <span style="color: #FFBF43">|</span>
                                <span>
                                    <router-link target="_blank" to="/regist">注册</router-link>
                                </span>
                                <button @click="loginFun()" id="my_button">立即登录</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div @click="closeWin()" class="close"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"loginWin",
        props:['isShow'],
        data(){
            return{
                eMail:'',
                pwd:''
            }
        },
        methods:{
            loginFun:function(){
                var _this = this
                 _this.$ajax.post('/user/inter/login.do',_this.$qs.stringify({userMail:_this.eMail,pwd:_this.pwd})).then(function(res){
                    if(res.data.flag){
                        _this.$message({message: '登录成功',type: 'success'});
                        console.log(res.data)
                        setTimeout(function(){  
                           _this.$emit('showFun',false)	                        
                        }, 500);
                    }
                    else{
                        _this.$message({message: '登录失败',type: 'warning'})
                    }
                })
            },
            closeWin:function(){
                this.$emit('showFun',false)	  
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 100;
        .login-con{
            width: 374px;
            height: 300px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -187px;
            margin-top: -150px;
            background-color: #fff;
            .top{
                padding: 0 80px 0 20px;
                height: 42px;
                line-height: 42px;
                border-bottom: 1px solid #eee;
                font-size: 14px;
                color: #333;
                overflow: hidden;
                background-color: #F8F8F8;
                border-radius: 2px 2px 0 0;
            }
            .bottom{
                margin-top: 50px;
                .writeinfo{
                    text-align: center;
                    input{
                        width: 300px;
                        border: 1px solid #E8E8E8;
                        border-radius: 3px;
                        padding: 8px 10px;
                        margin-bottom: 15px;
                    }
                }
                .fordetcode{
                    text-align: right;
                    width: 323px;
                    margin: 0 auto;
                    a{
                        color: #ffbf43;
                        font-size: 14px;
                    }
                    #my_button{
                        display: block;
                        margin: 20px auto 0;
                        padding: 5px;
                        width: 160px;
                        border-radius: 5px;
                        color: #fff;
                        background: #FFBF43;
                        font-size: 16px;
                        cursor: pointer;
                        border: none;
                    }
                }
            }
            .close{
                width: 48px;
                height: 48px;
                position: absolute;
                top: -4px;
                right:-4px;
                background: url(../assets/close.png) no-repeat;
                cursor: pointer;
            }
        }
    }
</style>