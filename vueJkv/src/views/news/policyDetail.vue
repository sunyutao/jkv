<template>
  <div>
    <Header link="news"></Header>
    <div id="topNav"></div>
    <div class="news-share">
      <span>分享</span>
      <div class="wchat" @mouseenter="block" @mouseleave="none">
        <button></button>
        <div class="qrcode-out" :style="style"  >
          <div class="qrcode" id="qrcode" ></div>
        </div>
      </div>
      <a :href="qqHref"  target="_blank" class="qq"></a>
    </div>
    <!--<div class="n-bread-crumb">
      <div class="content">
        <span>当前位置：</span>
        <router-link target="_blank" to="/news/news">资讯</router-link> 》
        <router-link target="_blank" to="/news/actList">旅行活动</router-link> 》
        <span class="art-title"></span>
      </div>
    </div>-->
    <div class="bread-crumb-container">
      <div class="bread-crumb">
        <span>当前位置：</span>
        <router-link target="_blank" to="/news">资讯</router-link>
        》
        <router-link target="_blank" to="/actList">政策速递</router-link>
        》
        <span>{{detail.poTitle}}</span>
      </div>
    </div>
    <div class="news-view">
      <div class="content">
        <div class="left">
          <h1 class="art-type">{{detail.poTypeNm}}<span>{{formatDate(detail.pubDate,"-")}}</span></h1>
          <h2 class="art-title h2-line">{{detail.poTitle}}</h2>
          <p class="time" style="display:none;">优惠时间：</p>
          <div class="view" v-html="detailText">

          </div>
          <p class="source">来源：<a id="art_resource">{{detail.resource}}</a></p>
          <ul class="label">
            <li v-for="lab in detail.keylist">{{lab.keyName}}</li>
          </ul>
        </div>
        <div class="right">
          <h1><img src="../../assets/news/new/More Yue.png" alt=""/><span>更多阅读</span></h1>
          <ul class="art-list" v-for="item in detalList">
            <li v-if="item.poId !=$route.params.id">
              <span></span>
              <router-link target="_blank" :to='{path:"/policyDetail/"+item.poId}' @click="getDetail()">{{item.poTitle}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/header'
  import Footer from '@/components/footer'
  import QRCode from 'qrcodejs2'

  export default {
    data() {
      return {
        detail: "",
        detalList: [],
        detailText: "",
        qqHref: "javascript:;",
        style:"display:none"
      };
    },
    components: {
      Header, Footer
    },
    created() {
      this.getDetail();
      this.getMore();
      this.qqShare();
    },
    mounted() {
      this.qrcodeMethed();
    },
    methods: {
      getDetail: function () {
        var _this = this
        var str = _this.$qs.stringify({poId: _this.$route.params.id})
        _this.$ajax.post('/cnews/policy/inter/getpolicyone.do', str).then(function (res) {
          if (res.data.flag) {
            _this.detail = res.data.policymap;
            console.log(_this.detail)
            _this.detailText = "";
            var content = _this.detail.poContent.split('<br/>');
            if (content) {
              $.each(content, function (i, v) {
                _this.detailText += "<p>" + v + "</p>";
              });

            } else {
              _this.detailText += "<p>" + detail.content + "</p>";
            }

          }
        })
      },
      formatDate: function (date, type) {
        if (!date) {
          return "";
        }
        date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return year + type + month + type + day;

      },
      getMore: function () {
        var _this = this
        var str = _this.$qs.stringify({number: 6})
        _this.$ajax.post('/cnews/policy/inter/getRecommentPolicys.do', str).then(function (res) {
          if (res.data.flag) {
            if (res.data.list && res.data.list.length > 0) {
              _this.detalList = res.data.list;
              console.log(res.data)
            }
          }

        })
      },
      qqShare: function () {
        let _this = this;
        let p = {
          url: window.location.href,
          //title:_this.detail.title,
          style: '203',
          width: 16,
          height: 16
        };
        let s = [];
        for (let i in p) {
          s.push(i + '=' + encodeURIComponent(p[i] || ''));
        }
        _this.qqHref = "http://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
        //$(".qq").attr({href: qhref, target: "_blank"});
      },
      qrcodeMethed:function () {
        let qrcode = new QRCode('qrcode', {
          width: 120,
          height: 120,
          colorDark : '#000',
          colorLight : '#ffffff',
          correctLevel : QRCode.CorrectLevel.H,
          text:  window.location.href // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        });
      },
      block: function(){
        this.style = "display:block";
      },
      none: function(){
        this.style = "display:none";
      }
    },
    watch: {

      '$route'(to,from){
        this.getDetail();
      }
    }
  };
</script>

<style lang="less">
  @import '../../styles/newsView.css';

  #topNav {
    padding-top: 110px;
  }

  .news-view {
    margin-top: 20px;
  }
</style>
