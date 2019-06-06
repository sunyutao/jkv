<template>
    <div>
        <div id="loginbox">
            <!-- <img style="opacity:0;width:100%" src="/resources/user/image/view_banner3.jpg" alt=""/> -->
            <div class="signin">
                <div class="signinlogo">
                    <img src="../../assets/navlogo.png" alt=""/>
                </div>
                <div class="signcont">
                    <p>注册</p>
                    <div class="fillin">
                        <div class="creat">
                            创建账户 <span>或者 <router-link to="/login">登录</router-link></span>
                        </div>
                        <div class="fillinfo">
                            <p>电子邮箱：</p>
                            <input v-model="userMail" type="text" id="userMail" at="邮箱号" class="required" placeholder="邮箱(登陆用)"/>
                        </div>
                        <div class="fillinfo">
                            <p>昵称：</p>
                            <input v-model="userName" type="text" id="userNm" at="用户名" class="required" placeholder="昵称"/>
                        </div>
                        <div class="fillinfo">
                            <p>密码：</p>
                            <input v-model="userPwd" type="password" id="pwd" at="密码" class="required password" placeholder="密码"/>
                        </div>
                        <!-- <div class="fillinfo codeinfo">
                            <div id="v_container"></div>
                            <input type="text" id="code_input" value="" placeholder="请输入验证码"/>
                        </div> -->
                        <button @click="registFun()" id="my_button">注册</button>
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
        name:"registUser",
        components:{
            Footer
        },
        data(){
            return{
                userMail:'',
                userName:'',
                userPwd:''
            }
        },
        methods:{
            registFun:function(){
                var _this = this
                if(_this.userMail==null||_this.userMail==''){
                     _this.$message({message: '请输入邮箱',type: 'warning'})
                    return false;
                }
                if(_this.userName==null||_this.userName==''){
                     _this.$message({message: '请输入昵称',type: 'warning'})
                    return false;
                }
                if(_this.userPwd==null||_this.userPwd==''){
                     _this.$message({message: '请输入密码',type: 'warning'})
                    return false;
                }
                _this.$ajax.post('/user/inter/regist.do',_this.$qs.stringify({userMail:_this.userMail,userNm:_this.userName,pwd:_this.userPwd,headImgId:1})).then(function(res){
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