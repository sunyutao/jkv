<template>
    <div>
        <Header foo="foo"></Header>
        <div id="homeimg1" class="homeimg">
            <img src="../assets/shouye1.jpg" alt=""/>
            <div class="home1box hometext-box">
                <p class="home1-1">我们始终致力于为您提供更专业<br/>更简单的旅游体验服务</p>
                <p class="home1-2">在全世界发现生活的一切可能<br/>贩卖有态度的生活方式<br/>做值得您信赖的旅行出行服务内容提供商</p>
            </div>
        </div>
        <!--1.2-->
        <div id="homeimg2"  class="homeimg">
            <img src="../assets/shouye2.jpg" alt=""/>
            <div class="home2box hometext-box">
                <p class="home2-1">每个人的旅行都是独一无二的<br/>一样的经历，不一样的回忆<br/>有共同，有差异</p>
                <p class="home2-2">菜单旅行，想你所想</p>
                <p class="home2-3">定义自我浪漫、省心、自由的方式</p>
                <!-- <button class="home2-4">了解菜单旅行</button> -->
            </div>
        </div>
        <!--1.3-->
        <div id="homeimg3" class="homeimg">
            <img class="severbg" src="../assets/shouye3.jpg" alt=""/>
            <div class="home3box">
                <img src="../assets/layer04.png" alt="" class="server-1"/>
                <img src="../assets/layer03.png" alt="" class="server-2"/>
                <img src="../assets/layer02.png" alt="" class="server-3"/>
                <img src="../assets/layer01.png" alt="" class="server-4"/>
            </div>
        </div>
        <!--1.4-->
        <div id="homeimg4" class="homeimg">
            <div class="home4box hometext-box">
                一群致力于深度旅游的人<br/>对目的地高度概括<br/>专注探索，极致一切<br/><span>用金凯的视界和资讯</span><br/>探寻世界的未知
                <p class="ab">
                <button class="abshijie"><router-link to="">了解视界</router-link></button>
                    <button class="abzixun"><router-link to="">了解资讯</router-link></button>
                </p>
            </div>
            <div class="peo"><img src="../assets/peo.png" alt=""/></div>
            <img src="../assets/shouye4.jpg" alt=""/>
        </div>
        <!--1.5-->
        <div id="homeimg5" class="homeimg">
            <div class="home5box hometext-box">
                <span>提供面向消费者的差异化旅游解决方案</span><br/>
                始终坚持以地面战略为支持<br/>
                做最靠谱的产品服务商
            </div>
            <div class="globe">
                <img src="../assets/globe.png" alt=""/>
                <img class="ball1 ball" src="../assets/ball1.png" alt=""/>
                <img class="ball2 ball" src="../assets/ball2.png" alt=""/>
                <img class="ball3 ball" src="../assets/ball3.png" alt=""/>
                <img class="ball4 ball" src="../assets/ball4.png" alt=""/>
                <img class="ball6 ball" src="../assets/ball6.png" alt=""/>
                <img class="ball7 ball" src="../assets/ball7.png" alt=""/>
            </div>
        </div>
        <!--1.6-->
        <div id="homeimg6" class="homeimg">
            <img src="../assets/shouye6.jpg" alt=""/>
            <div class="home6box">
                <div class="expect"><span>我们</span>期待有态度的你，留下联系方式<br/>
                    开始定义旅行的一切可能。</div>
                <div class="home6box-2">
                    <p>
                        <i>决定只要确定</i><br/>
                        剩下的一切交给我们即可
                    </p>
                <div class="inputbox">
                        <div class="inputline1"><input v-model="name" class="logname" type="text" id="name" placeholder="姓名"/></div>
                        <div class="inputline1">
                            <input v-model="sex" type="radio"  checked="checked" value="男" name="sex"/><span>男</span>
                            <input v-model="sex" type="radio"  name="sex" value="女"/><span>女</span>
                        </div>
                        <div class="inputline2">
                            <input v-model="tel" class="phone" type="text" id="phone" placeholder="联系方式"/>
                        </div>
                        <br>
                        <br>
                        <div class="inputline3">
                            <textarea v-model="words" rows="3"   cols="50" id="context" name="context" style="background:white;border-radius:3px;padding: 10px" placeholder="请简单描述您的需求，我们会尽快与您联系"></textarea>
                        </div>
                        <div class="logbtn"><button @click="subMesgFun()" id="tijiao">提交</button></div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/header'
    import Footer from '@/components/footer'
    export default {
        name:"homeView",
        components:{
            Header,Footer
        },
        data(){
            return{
                name:'',
                sex:'男',
                tel:'',
                words:''

            }
        },
        methods:{
            subMesgFun:function(){
                var _this = this
                if(_this.name == null || _this.name  == ""){
                    _this.$message({message: '请输入您的姓名!',type: 'warning'})
                    return false;
                }
                if(_this.tel == null || _this.tel  == ""){
                    _this.$message({message: '请输入您的联系电话!',type: 'warning'})
                    return false;
                }
                if(_this.words == null || _this.words  == ""){
                    _this.$message({message: '请简单描述您的需求!',type: 'warning'})
                    return false;
                }
                _this.$ajax.post('/travel/home/submit.do',_this.$qs.stringify({name:_this.name,sex:_this.sex,phone:_this.tel,context:_this.words})).then(function(res){
                    // console.log(res.data)
                    if(res.data.flag){
                        _this.$message({message: '提交成功',type: 'success'});
                    }
                    else{
                        _this.$message({message: '提交失败',type: 'warning'})
                    }
                },function(){

                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../styles/home.css';
</style>
<style lang="less">
    .el-message{
        top:40%;
    }
</style>