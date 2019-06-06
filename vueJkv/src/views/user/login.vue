<template>
    <div>
        <!-- <button @click="show = !show">11</button>
        
        <el-date-picker v-if="show"
            v-model="value1"
            type="date"
            placeholder="选择日期">
        </el-date-picker> -->
        <div id="loginbox">
            <!-- <img style="opacity:0;width:100%" src="/resources/user/image/view_banner3.jpg" alt=""/> -->
            <div class="login">
                <div class="loginlogo">
                    <img src="../../assets/navlogo.png" alt=""/>
                    <h2>登录金凯视界，与大家一起分享旅行、分享快乐吧！</h2>
                </div>
                <div class="logincont">
                    <p>登录</p>
                    <div class="write">
                        <div class="link-sign"><router-link to="/regist">注册</router-link></div>
                        <div class="writeinfo"><input v-model="userMail" type="text" id="userMail" at="邮箱" class="required" placeholder="邮箱"/></div>
                        <div class="writeinfo"><input v-model="userPassword" type="password" id="pwd" at="密码" class="required password" placeholder="密码"/></div>
                        <div class="fordetcode"><router-link to="/forgetPwd">忘记密码？</router-link></div>
                        <button @click="loginFun()" id="my_button">立即登录</button>
                    </div>
                    <i class="closebtn loginclo" @click="winClose()"></i>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from '@/components/footer'
    export default {
        name:"loginUser",
        components:{
            Footer
        },
        data(){
            return{
                userMail:'',
                userPassword:'',
                value1:'',
                show:false
            }
        },
        methods:{
            loginFun:function(){
                var _this = this
                _this.$ajax.post('/user/inter/login.do',_this.$qs.stringify({userMail:_this.userMail,pwd:_this.userPassword},{withCredentials:true})).then(function(res){
                    if(res.data.flag){
                        _this.$message({message: '登录成功',type: 'success'});
                        console.log(res.data)
                        setTimeout(function(){  
                            window.close();	                        
                        }, 500);
                    }
                    else{
                        _this.$message({message: '登录失败',type: 'warning'})
                    }
                })
            },
            winClose:function(){
                window.close()
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../styles/user.css';
</style>
<style lang="less">
    .el-message{
        top:40%;
    }
    // .el-picker-panel{
    //     display: block !important;
    //     z-index: 2005;
    //     position: absolute;
    //     top: 40px;
    //     left: 0px;
    // }
    // .el-input__inner{
    //     // display: none;
    // }
</style>