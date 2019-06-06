<template>
  <div>
    <Header foo="foo"></Header>
    <div class="our">
      <div class="ourbanner">
        <img src="../assets/about/ourbanner.jpg" alt=""/>
        <h2 class="ourtit">联系我们</h2>
      </div>
      <div class="comwrap">
        <div class="ourtext">
          <p>联系我们 <i class="circle_i"></i></p>
          <div class="callus" style="margin-top:20px;">
            <span>电话：</span><i>0311-89891997</i>
          </div>
          <div class="callus">
            <span>E-mail：</span><i>jkv@jkv-travel.com</i>
          </div>
          <div class="callus" style="margin-bottom:50px;">
            <span>地址：</span><i>河北省石家庄市桥西区南花园步行街C座</i>
          </div>
          <p>意见反馈 <i class="circle_i"></i></p>
          <div class="mail">
            <input type="text" id="mailAddress" placeholder="您的邮箱地址" v-model="sendData.mailAddress"/>
            <textarea cols="30" rows="10" id="content" placeholder="此处录入内容" v-model="sendData.content"></textarea>
            <button @click="send()" id="tijiao">发送</button>
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
    name: "planView",
    data() {
      return {
        sendData: {
          mailAddress: '',
          content: ''
        }


      }
    },
    components: {
      Header, Footer
    },
    created() {

    },
    methods: {
      send: function () {
        //alert("email:"+this.email+"text:"+this.text)
        let _this = this;
        if (_this.sendData.mailAddress == null || _this.sendData.mailAddress == "") {
          alert("请输入您的邮箱!");
          return false;
        }
        let emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!emailReg.test(_this.sendData.mailAddress)) {
          alert("邮箱格式不正确，请重新输入！");
          return false;
        }

        if (_this.sendData.content == null || _this.sendData.content == "") {
          alert("请输入您的意见及反馈!");
          return false;
        }
        $("#tijiao").html("发送中...");
        /* $.ajax({
           url : '/travel/aboutus/submit.do',
           type : 'POST',
           data : data,
           success : function(data) {
             $("#tijiao").html("发送成功!");
             //alert("bingo!提交成功,我们会尽快与您联系!");
           }
         });*/

        this.$ajax.post('/travel/aboutus/submit.do', _this.$qs.stringify(_this.sendData)).then(function (res) {
          console.log(res.data)
          $("#tijiao").html("发送成功!");
        });
      }

    }
  }
</script>

<style lang="less" scoped>

  .ourbanner {
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
  }

  .ourbanner img {
    width: 100%;
    min-width: 1100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
  }

  .ourtit {
    font-size: 34px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    color: #fff;
    font-weight: 400;
  }

  .ourtext {
    width: 800px;
    margin: 0 auto;
    padding: 30px 0 0;
  }

  .circle_i {
    position: absolute;
    top: 50%;
    left: -20px;
    width: 8px;
    height: 8px;
    margin-top: -4px;
    border-radius: 10px;
    background: #333;
  }

  .ourtext p {
    font-size: 24px;
    position: relative;
  }

  .ourintro {
    line-height: 24px;
    padding: 20px 0;
    border-bottom: 1px dotted #666;
  }

  .ourintrolast {
    border: none;
  }

  .ourintroimg {
    text-align: center;
    margin: 20px 0 30px;
  }

  .ourdevelop {
    text-align: center;
    margin: 90px 0 0;
  }

  /**/
  .callus {
    margin-bottom: 20px;
  }

  .callus span {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color: #999;
    width: 100px;
  }

  .callus i {
    display: inline-block;
    vertical-align: middle;
    color: #FFBF43;
    font-size: 16px;
  }

  .mail input, .mail textarea {
    display: block;
    width: 100%;
    border: 1px solid #CCCCCC;
    padding: 5px;
    border-radius: 3px;
    margin: 20px 0;
    padding-left: 40px;
  }

  .mail button {
    padding: 5px 20px;
    background: #E8E8E8;
    color: #666;
    border-radius: 5px;
    cursor: pointer;
  }

  .mail button:hover {
    background: #FFBF43;
    color: #fff;
  }

  .ourjoin {
    padding: 30px 0;
  }

  .ourjoin p {
    font-size: 24px;
    position: relative;
    margin: 20px 0;
  }

  .ourjoin ul {
    overflow: hidden
  }

  .ourjoin ul li {
    float: left;
    padding-left: 88px;
    margin-top: 20px;
    width: 390px;
    height: 90px;
    background: url(../assets/about/job.png) no-repeat top left;
  }

  .ourjoin ul li b {
    display: block;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .job span {
    font-size: 16px;
  }

  .job span i {
    color: #FFBF43;
    font-size: 16px;
  }

  .ourzizhi {
    text-align: center;
    margin-top: 90px;
  }

  .permit {
    width: 289px;
    margin-bottom: 30px;
  }

  .cence {
    width: 652px;
  }


</style>
