<template>
    <div>
        <div id="loginbox">
            <!-- <img style="opacity:0;width:100%" src="/resources/images/per-center/view_banner3.jpg" alt=""/> -->
            <div class="signin">
                <div class="signinlogo">
                    <img src="../../assets/navlogo.png" alt=""/>
                </div>
                <div class="signokcont">
                    <p>忘记密码？</p>
                    <div class="forget">
                        <div class="forcode">
                            <h2>电子邮箱</h2>
                            <p>请提供注册账户时使用的用户名或电子邮箱地址。我们将给您发送一封电子邮件，让您重设密码。</p>
                            <input v-model="userMail" type="text" id="userMail"/>
                        </div>
                        <button @click="sendMailFun()" id="my_button">发送电子邮件</button>
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
        name:"forgetPwdUser",
        components:{
            Footer
        },
        data(){
            return{
                userMail:''
            }
        },
        methods:{
            sendMailFun:function(){
                var _this = this
                if(_this.userMail == ''){
     				_this.$message({message: '请输入邮箱',type: 'warning'})
     				return false;
     			}
                _this.$ajax.post('/user/inter/getPassword.do',_this.$qs.stringify({userMail:_this.userMail,forwardUrl:_this.addressUrl+'/user/center/userReset.do'})).then(function(res){
                    if(res.data.flag){
                        _this.$message({message: '邮件发送成功,请登录邮箱进行激活(2小时内有效)!',type: 'success'});
                    }
                    else{
                        _this.$message({message: res.data.msg,type: 'warning'})
                    }
                },function(){
                     _this.$message.error('请求异常,请重试!');
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
</style>