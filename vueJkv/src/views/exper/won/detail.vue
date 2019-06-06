<template>
  <div>
    <Header link="exper"></Header>
    <Login :isShow="loginShow" @showFun="showFun"></Login>
    <div id="topNav"></div>
    <div class="container" style="padding-top: 100px;">
      <!-- <h5 class="currentPosition">当前位置：》
        <router-link  to="/wonList" class='nav-lab-style' target='_blank'>体验</router-link>
        》精彩瞬间
      </h5> -->
      <div class="bread-crumb-container">
                <div class="bread-crumb">
                    <span>当前位置：</span>
                    <router-link target="_blank" to="/exper">体验</router-link> 》
                    <router-link target="_blank" to="/wonList">精彩瞬间</router-link> 》
                    <span>{{won.title}}</span>
                </div>
            </div>
      <div class="personDetails" id="wonDetail" v-if="won.title">
        <h1>
          <span>#</span>
          {{won.title}}
        </h1>
        <div class="personDetails-left">
          <a href="javascript:;">
            <img class="b_bg"
                 :src="won.imgList[0].imgUrl ?  addressUrl+won.imgList[0].imgUrl : '../../../assets/exper/image/fmImg.jpg'">
            <!-- <div class="banner_bg"
                 :style="{'background-image': 'url('+addressUrl+won.imgList[0].imgUrl+')'}">
                
            </div> -->

            <img class="firImg"
                 :src="won.imgList[0].imgUrl ?  addressUrl+won.imgList[0].imgUrl : '../../../assets/exper/image/fmImg.jpg'">

            <div id="FontScroll">
              <ul :style="{top:-40*showInd+'px'}">
                <li v-for="item in won.commlist"><!--xh-->
                  <img class="headPho" :src="addressUrl+item.userHeadUrl">
                  <span>{{searchText(item.commContent).content}}</span>
                </li>
              </ul>
            </div>
            <div class='personDetails-left-footMsg'>
              <div class='readyNum' data-usernm='data.won.userNm'
                   @click="comment(won.userId, won.userNm, won.wonId)">评论
              </div>
            </div>
          </a>
          <ul class='little-imgList'>
            <li v-for="item in won.imgList">
              <img @click="smallToBig(addressUrl+item.imgUrl)" class='litimg' :src="addressUrl+item.imgUrl"/>
            </li>
          </ul>
        </div>
        <div class='personDetails-right'>
          <div class='personTextMsg'>
            <img :src='addressUrl+won.userHeadUrl'>
            <div class='personMsg'><p>{{won.userNm}}</p>
              <span>{{won.pubDate}} </span></div>
          </div>
          <p>{{searchText(won.descr).content}}</p>
        </div>
        <ul class='likeShareBtnList'>
          <li :class="'likeBtn likeWonId'+ won.wonId" @click='like(won.wonId )'>
            <img :src=likeImg>喜欢
          </li>
          <li class='followUpBtn' @click='threWon(won.wonId)'>跟帖</li>
        </ul>
      </div>

      <div class="follow-all">
        <h3>全部跟随</h3>
        <ul class="msgNewHot">
          <!--<input type="hidden" id="sortType" value="newest"/>-->
          <li><a href="javascript:;" @click="sortDetail(sortType='newest')"
                 :class="sortType=='newest'?'msgNewHotActive':''">最新发布</a></li>
          <li><a href="javascript:;" @click="sortDetail(sortType='hottest')"
                 :class="sortType=='hottest'?'msgNewHotActive':''">评论最多</a></li>
        </ul>
      </div>
      <div class="Xcomment-body">
        <div class="Xcomment-item" v-for="(won,index) in wonList">
          <div class="Xcomment-item-top">
            <nav>
              <div class="follow-head"><img :src="addressUrl+won.userHeadUrl"></div>
              <h5 class="follow-name">{{won.userNm}}</h5>
              <span class="follow-time">{{won.pubDate}}</span>
            </nav>
            <div class="follow-switchImg">
              <div class="item-littleImg-box">
                <swiper :options="swiperOption" ref="mySwiper">
                        <swiper-slide v-for="(img,index) in won.imgList" :key="index">
                             <img :src="addressUrl+img.imgUrl">
                        </swiper-slide>
                        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                <!-- <div class="item-littleImg-list">
                  <div class="item-littleImg-item" v-for="img in won.imgList">
                    <img :src="addressUrl+img.imgUrl">
                  </div>
                </div>
                <div :class="won.imgList.length<=3 ? 'followPrev clickBtn hide-btn' : 'followPrev clickBtn' "
                     data-index="0"><i class="layui-icon layui-icon-left"></i></div>
                <div :class="won.imgList.length<=3 ? 'followNext clickBtn hide-btn' : 'followNext clickBtn' "
                     data-index="0"><i class="layui-icon layui-icon-right"></i></div> -->
              </div>
              <div class="follow-btn">
                <div class="follow-like" @click="followLike(won.wonId,won.likeNum,index)">
                  <!--<img src="/static/like_a.png">-->
                  <img :src="wonLikeImgs[index]">
                  <p>{{num=won.likeNum}}</p>
                </div>
                <hr>
                <!--点击评论-->
                <div class="follow-cmt" @click="comment(won.userId, won.userNm, won.wonId)">
                  <img src="../../../assets/exper/image/comment_bb.png">
                  <p>{{won.commNum}}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="Xcomment-item-bottom">
            <h3><span>全部评论</span><span class="cmtNum">{{won.commNum}}&nbsp;&nbsp;条</span></h3>
            <ul class="follow-cmt-list">

              <li class="follow-cmt-Item" v-for="comm in won.commlist">
                <div class="itemTop">
                  <div class="follow-cmt-headImg">
                    <img :src="addressUrl+comm.userAHeadUrl">
                  </div>
                  <div class="follow-cmt-msg">
                    <h5><span>{{comm.userNm}}</span><span class="follow-cmtMsg-time">{{comm.commDate}}</span></h5>
                    <p>{{searchText(comm.commContent).content}}</p>
                  </div>

                  <p class="follow-reply" @click="reply(comm.userId,comm.userNm,comm.commId)">回复124</p>
                </div>
                <div class="itemBottom">
                  <div class="follow-cmt-Item follow-cmt-Item2" v-if="comm.replist" v-for="rep in comm.replist">
                    <div class="follow-cmt-headImg">
                      <img :src="addressUrl+rep.userAHeadUrl">
                    </div>
                    <div class="follow-cmt-msg">
                      <h5><span>{{rep.userANm}}</span><span class="follow-cmtMsg-time">{{rep.repDate}}</span></h5>
                      <p><span>回复</span><span>{{rep.userBNm}}</span>{{ searchText(rep.repContent).content}}</p>
                    </div>
                    <p class="follow-reply" @click="reply(rep.userAId,rep.userANm,rep.commId)">回复</p>
                  </div>
                </div>


                <!--回复评论-->

              </li>
              <!--<li class="follow-cmt-Item">
                <div class="follow-cmt-headImg">
                  <img src="../../../assets/exper/image/fmImg.jpg">
                </div>
                <div class="follow-cmt-msg">
                  <h5><span>HHHH</span><span class="follow-cmtMsg-time">2018-08-09&nbsp;&nbsp;12:30</span></h5>
                  <p><span>回复</span><span>HHHH</span>最向往的地方</p>
                </div>
                <p class="follow-reply">回复</p>
              </li>
              <li class="follow-cmt-Item">
                <div class="follow-cmt-headImg">
                  <img src="../../../assets/exper/image/fmImg.jpg">
                </div>
                <div class="follow-cmt-msg">
                  <h5><span>HHHH</span><span class="follow-cmtMsg-time">2018-08-09&nbsp;&nbsp;12:30</span></h5>
                  <p><span>回复</span><span>HHHH</span>最向往的地方</p>
                </div>
                <p class="follow-reply">回复</p>
              </li>
              <li class="follow-cmt-Item">
                <div class="follow-cmt-headImg">
                  <img src="../../../assets/exper/image/fmImg.jpg">
                </div>
                <div class="follow-cmt-msg">
                  <h5><span>HHHH</span><span class="follow-cmtMsg-time">2018-08-09&nbsp;&nbsp;12:30</span></h5>
                  <p><span>回复</span><span>HHHH</span>最向往的地方</p>
                </div>
                <p class="follow-reply">回复</p>
              </li>
              <li class="follow-cmt-Item">
                <div class="follow-cmt-headImg">
                  <img src="../../../assets/exper/image/fmImg.jpg">
                </div>
                <div class="follow-cmt-msg">
                  <h5><span>HHHH</span><span class="follow-cmtMsg-time">2018-08-09&nbsp;&nbsp;12:30</span></h5>
                  <p><span>回复</span><span>HHHH</span>最向往的地方</p>
                </div>
                <p class="follow-reply">回复</p>
              </li>-->
            </ul>
          </div>
        </div>

        <!--<div class="Xcomment-item" >
          <div class="Xcomment-item-top">
            <nav>
              <div class="follow-head"><img ></div>
              <h5 class="follow-name"></h5>
              <span class="follow-time"></span>
            </nav>
            <div class="follow-switchImg">
              <div class="item-littleImg-box">
                <div class="item-littleImg-list">
                  <div class="item-littleImg-item">
                    <img src="/resources/exper/image/fmImg.jpg">
                  </div>
                  <div class="item-littleImg-item">
                    <img src="/resources/exper/image/perThin03.jpg">
                  </div>
                  <div class="item-littleImg-item">
                    <img src="/resources/exper/image/1.jpg">
                  </div>
                  <div class="item-littleImg-item">
                    <img src="/resources/exper/image/6.jpg">
                  </div>
                  <div class="item-littleImg-item">
                    <img src="/resources/exper/image/fmImg.jpg">
                  </div>
                  <div class="item-littleImg-item">
                    <img src="/resources/exper/image/perThin03.jpg">
                  </div>
                  <div class="item-littleImg-item">
                    <img src="/resources/exper/image/1.jpg">
                  </div>
                  <div class="item-littleImg-item">
                    <img src="/resources/exper/image/6.jpg">
                  </div>
                </div>
                <div class="followPrev clickBtn" data-index="1"><i class="layui-icon layui-icon-left"></i></div>
                <div class="followNext clickBtn" data-index="1"><i class="layui-icon layui-icon-right"></i></div>
              </div>
              <div class="follow-btn">
                <div class="follow-like">
                  <img src="/resources/exper/image/fmImg.jpg">
                  <p>120</p>
                </div>
                <hr>
                <div class="follow-cmt">
                  <img src="/resources/exper/image/fmImg.jpg">
                  <p>10</p>
                </div>
              </div>
            </div>
          </div>
          <div class="Xcomment-item-bottom">
            <h3><span>全部评论</span><span class="cmtNum">3&nbsp;&nbsp;条</span></h3>
            <ul class="follow-cmt-list">
              <li class="follow-cmt-Item">
                <div class="follow-cmt-headImg">
                  <img src="/resources/exper/image/fmImg.jpg">
                </div>
                <div class="follow-cmt-msg">
                  <h5><span>HHHH</span><span class="follow-cmtMsg-time">2018-08-09&nbsp;&nbsp;12:30</span></h5>
                  <p>最向往的地方</p>
                </div>
                <p class="follow-reply">回复</p>
              </li>
              <li class="follow-cmt-Item">
                <div class="follow-cmt-headImg">
                  <img src="/resources/exper/image/fmImg.jpg">
                </div>
                <div class="follow-cmt-msg">
                  <h5><span>HHHH</span><span class="follow-cmtMsg-time">2018-08-09&nbsp;&nbsp;12:30</span></h5>
                  <p>最向往的地方</p>
                </div>
                <p class="follow-reply">回复</p>
              </li>
              <li class="follow-cmt-Item">
                <div class="follow-cmt-headImg">
                  <img src="/resources/exper/image/fmImg.jpg">
                </div>
                <div class="follow-cmt-msg">
                  <h5><span>HHHH</span><span class="follow-cmtMsg-time">2018-08-09&nbsp;&nbsp;12:30</span></h5>
                  <p><span>回复</span><span>HHHH</span>最向往的地方</p>
                </div>
                <p class="follow-reply">回复</p>
              </li>
              <li class="follow-cmt-Item">
                <div class="follow-cmt-headImg">
                  <img src="/resources/exper/image/fmImg.jpg">
                </div>
                <div class="follow-cmt-msg">
                  <h5><span>HHHH</span><span class="follow-cmtMsg-time">2018-08-09&nbsp;&nbsp;12:30</span></h5>
                  <p><span>回复</span><span>HHHH</span>最向往的地方</p>
                </div>
                <p class="follow-reply">回复</p>
              </li>
              <li class="follow-cmt-Item">
                <div class="follow-cmt-headImg">
                  <img src="/resources/exper/image/fmImg.jpg">
                </div>
                <div class="follow-cmt-msg">
                  <h5><span>HHHH</span><span class="follow-cmtMsg-time">2018-08-09&nbsp;&nbsp;12:30</span></h5>
                  <p><span>回复</span><span>HHHH</span>最向往的地方</p>
                </div>
                <p class="follow-reply">回复</p>
              </li>
              <li class="follow-cmt-Item">
                <div class="follow-cmt-headImg">
                  <img src="/resources/exper/image/fmImg.jpg">
                </div>
                <div class="follow-cmt-msg">
                  <h5><span>HHHH</span><span class="follow-cmtMsg-time">2018-08-09&nbsp;&nbsp;12:30</span></h5>
                  <p><span>回复</span><span>HHHH</span>最向往的地方</p>
                </div>
                <p class="follow-reply">回复</p>
              </li>
            </ul>
          </div>
        </div>-->

      </div>
      <ul class="layui-row layui-col-space10 publishedContent" id="wonComment"></ul>
    </div>
    <!-- <div class="htmleaf-container">
      <div class="container">
          跟帖区域
          <div class="waterfall" id="wonComment">

          </div>
      </div>
  </div> -->
    <div class="lodingImg">
      <img src="/resources/exper/image/navBg.png">
    </div>
    <!-- <div class="WMSeeMore">
      查看更多
  </div> -->
    <!-- 内容详情 --没用-->
   <!-- <div class="msgPopUps">
      <img class="handleClickOff"
           src="/resources/exper/image/icon/clickOff.png">
      <div class="ZZscol"></div>
      <div class="msgPopUpsCnt">
        <input type="hidden" id="hideWonId" value='${wonId}'/>
        <div class="articleDetailTop" id="wonConDetTop"></div>
        &lt;!&ndash; 小图 &ndash;&gt;
        <div class="litleImgBox">
          <div class="imgList" id="imgList">
            &lt;!&ndash; <div class="imgItem"><img src="../explore/images/listImg01.jpg" ></div>
              <div class="imgItem"><img src="../explore/images/listImg02.jpg" ></div>
              <div class="imgItem"><img src="../explore/images/listImg03.jpg" ></div> &ndash;&gt;
          </div>
          &lt;!&ndash; Add Pagination &ndash;&gt;
          <div class="img-button-prev nextPrevBtn" data-type="prev"><</div>
          <div class="img-button-next nextPrevBtn" data-type="next">></div>
        </div>
        &lt;!&ndash;  &ndash;&gt;
        <ul class="labelList">
          &lt;!&ndash; <li><a href="###">肯德基</a></li> &ndash;&gt;
        </ul>
        <div class="articleDetailCommentBox" id="artBox">
          <div class="articleDetailCommentInput">
            <input type="text" id="pubComment" placeholder="说点什么" v-model="pubCommText" @click="sendComment"/>{{pubCommText}}
          </div>
          <div class="clickrightBtn">
            <button type="button" id="pubComm">发表</button>
          </div>
        </div>
        &lt;!&ndash; 评论区 &ndash;&gt;
        <div class="commentArea">
          &lt;!&ndash; 评论数 &ndash;&gt;
          <nav class="commentAreaTop" id="alCommentNum"></nav>
          &lt;!&ndash; 评论详情 &ndash;&gt;
          <ul class="commentAreaCnt" id="commentAreaCnt">

          </ul>
        </div>
        &lt;!&ndash; <p class="rollingMouse">滚动鼠标加载更多</p> &ndash;&gt;
      </div>
    </div>-->

    <div :class=" showMask ? 'Mask': 'Mask disnone'">
      <div id="allOffMask"></div>
      <div class="Xcomment">
        <h3 class="commentTitle">
          <span>{{maskTitle}}</span>
          <span id="offMask" @click="showMask=false">×</span>
        </h3>
        <textarea class="comment-area" v-model="commentArea">{{commentArea}}</textarea>
        <button class="commentBtn" @click="commentButn">评论</button>
      </div>
    </div>


    <!--跟帖-原-->

 <!--   <div class="followUpCnt">
      &lt;!&ndash; 跟帖图片 &ndash;&gt;
      <div>
        <h4 class="followUpTitle">
          跟帖图片 <span>注：图片尺寸不得小于1620*737,图片大小不得大于10M,支持jpg/gif/png格式</span>
        </h4>
        <div class="clickUpImg">
          <div class="upImgList">
            <button type="button" class="clickNoImg" id="upload">
              <img src="../../../assets/exper/image/icon/uploadImgIcon.png"> <input
              type="hidden" id="threImgId" value="-1"/>
              <p>点击添加图片</p>
            </button>
          </div>
        </div>

      </div>
      &lt;!&ndash; 跟帖内容 &ndash;&gt;
      <div>
        &lt;!&ndash; <h4 class="followUpTitle">跟帖内容</h4> &ndash;&gt;
        <div class="followUpText">
          &lt;!&ndash; <textarea rows="" cols="" id='wonDescr' placeholder="请输入跟帖内容"></textarea> &ndash;&gt;
          <div>
            <button type="button" class="clickPublish" @click="sendThreWon">发表</button>
          </div>
        </div>
      </div>

    </div>-->

    <div :class="showFollow ? 'addFollow': 'addFollow disnone'">
      <h4 class="followUpTitle">
        跟帖图片 <span>注：图片尺寸不得小于1620*737,图片大小不得大于10M,支持jpg/gif/png格式</span>
      </h4>
      <el-upload
        :action='addressUrl+"/cexper/won/inter/kindImg.do"'
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="uploadImgSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
      <div>
        <button type="button" class="clickPublish" @click="sendThreWon" :style="{backgroundColor: imgId ==='' ? '#B5B5B5' : '#FFBF43'}">发表</button>
      </div>
    </div>
    <Footer></Footer>
  </div>

</template>

<script>
  import Header from '@/components/header'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import Footer from '@/components/footer'
  import Login from '@/components/loginS'

  export default {
    name: "list",
    data() {
      return {
        showInd:0,
        sortType: "newest",
        loginShow: false,
        isLogin: false,
        shieldWordList: [],
        won: {},
        swiperOption:{
                    notNextTick: true, // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                    direction: 'horizontal',
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    slidesPerView:4,
                    spaceBetween : 20,
                },

        likeImg:"/static/like_a.png",//主贴点赞图片
        //likeclick: false,//点赞状态-未点赞
        wonLikeImgs:[],//跟帖点赞图标集合与wonList相对应
        //clickIndex:"",//选择



        pubCommText: "",//说点什么
        wonList: [],//跟帖列表

        commentArea: "",//评论内容
        showMask: false,//回复弹框
        maskTitle: "",
        commentData: {//回复的请求数据
          wonId: "",
          userBId: "",
          commId: "",
          userNm: ""
        },
        followLikeChoose: false,//是否点赞-没有
        //跟帖组件
        showFollow:false,//是否展示跟帖弹框-否
        dialogImageUrl: '',
        dialogVisible: false,
        imgId: ""//图片id字符串

      };
    },
    components: {
      Header, Footer,swiperSlide, Login
    },
    created() {
      var _this = this
      this.getShieldWord();
      this.getWonDet();
      this.getThreList();
      var interval
      if (interval) {
                window.clearInterval(interval);                   
            }
            interval = setInterval(function () {
                   _this.showComFun()
            }, 3000);
    },
    methods: {
      showComFun:function(){
        var _this = this
        if(_this.won.commlist.length>3){
           _this.showInd += 1
          if(_this.showInd == _this.won.commlist.length - 2){
            _this.showInd = 0
          }
           

        }
        
      },
      //屏蔽词汇
      getShieldWord: function () {
        let _this = this;
        _this.$ajax.post('/cexper/base/inter/getShieldWordList.do').then(function (res) {
          if (res.data.flag) {
            _this.labList = res.data.labList;
            if (res.data.list && res.data.list.length && res.data.list.length > 0) {
              _this.shieldWordList = res.data.list;
            }
            console.log(_this.shieldWordList)
          }
        })
      },
      //精彩瞬间详情
      getWonDet: function (sortType) {
        let _this = this;
        _this.$ajax.post('/cexper/won/inter/getWonDet.do', _this.$qs.stringify({wonId: _this.$route.params.id})).then(function (res) {
          if (res.data.flag) {

            _this.won = res.data.won;

            console.log(_this.won)
          }
        })

      },
      searchText: function (content) {
        let _this = this;
        var index = 0;
        var str = content;

        _this.$ajax.post('/cexper/won/inter/getWonDet.do', _this.$qs.stringify({wonId: _this.$route.params.id})).then(function (res) {
          if (_this.shieldWordList) {
            $.each(_this.shieldWordList, function (i, v) {
              if (v.cateNm) {
                if (content.indexOf(v.cateNm) > -1) {
                  index++;
                  str = content.replace(new RegExp(v.cateNm, ("gm")), "**");
                }
              }
            });
          }
        })
        return {
          number: index,
          content: str
        };
      },
      //点赞-未完
      like: function (wonId) {
        let _this = this;

          if (_this.likeImg =="/static/like_c.png") {
            _this.open2('已经点赞成功了!');
            return false;
          }
        _this.$ajax.post('/cexper/won/inter/addLikeNum.do', _this.$qs.stringify({wonId: wonId})).then(function (res) {
          if (res.data.flag) {
            // $('.likeWonId' + wonId).css('color', '#E25857');
            // $('.likeWonId' + wonId).children('img').attr('src', '../../../assets/exper/image/like_c.png');
            _this.likeImg = "/static/like_c.png"
            _this.open1('点赞成功!');
          }
        })
      },
      //跟帖点赞
      followLike: function (wonId, likeNum, index) {
        //this.clickIndex=index
        let jQery_this = $(this);
        let _this = this;
       /* if (jQery_this.find("img").attr('src') == "/static/like_c.png") {
          _this.open1('已经点赞成功了!');
          return false;
        }*/
        if (_this.wonLikeImgs[index] == "/static/like_c.png") {
          _this.open2('已经点赞成功了!');
          return false;
        }

        _this.$ajax.post('/cexper/won/inter/addLikeNum.do', _this.$qs.stringify({wonId: wonId})).then(function (res) {
          if (res.data.flag) {

            _this.wonList[index].likeNum = Number(likeNum) ? Number(likeNum) + 1 : 1;
            _this.wonLikeImgs[index] = "/static/like_c.png"
            // jQery_this.find("p").text(Number(likeNum) ? Number(likeNum) + 1 : 1);
            // jQery_this.find("img").attr('src', '/static/like_c.png');
            _this.open1('点赞成功!');

          }
        })
      },
      //点击跟帖
      threWon: function (wonId) {
        this.imgId = "";//图片至制空
        let _this = this;
        _this.$ajax.post('/travel/cmm/checkUser.do').then(function (res) {
          if (res.data.flag) {
            //显示弹框
            _this.showFollow = true;
          } else {
            //未登录
            _this.loginShow = true;
          }
        })
      },
      //发送跟帖
      sendThreWon: function () {
        let _this = this;

        if (!_this.imgId || _this.imgId === "") {
          this.$message.error('请上传跟帖图片!');
          return false;
        }
        let queryData = {showType: 1, imgIds: _this.imgId, wonId: _this.$route.params.id};
        _this.$ajax.post('/cexper/won/inter/addFollowPosts.do', _this.$qs.stringify(queryData)).then(function (res) {
          if (res.data.flag) {
            _this.open1("发表成功，等待审核!");
            //关闭弹窗...
            _this.showFollow = false;
            //清空imgId
            _this.imgId = "";

          } else {
           // alert('添加出错了!');
            _this.$message.error('添加出错了!');
          }
        })

      },
      //右侧评论图标
      sendComment: function () {
        let _this = this;
        if (_this.pubCommText == null || _this.pubCommText == '') {
          _this.open1("请输入评论内容");
        }
        _this.$ajax.post('/cexper/won/inter/getWonDet.do', _this.$qs.stringify({
          wonId: _this.$route.params.id,
          commContent: _this.pubCommText
        })).then(function (res) {
          if (res.data.flag) {

            _this.open1('评论成功');
            _this.viewDetail(_this.$route.params.id);
          }
        })
      },
      //评论列表
      getThreList: function (sort) {
        let _this = this;
        _this.$ajax.post('/cexper/won/inter/getThreList.do', _this.$qs.stringify({
          wonId: _this.$route.params.id,
          sort: sort
        })).then(function (res) {
          if (res.data.flag) {
            if (res.data.wonList.length > 0) {
              //跟帖
              _this.wonList = res.data.wonList;

              for(let i=0; i<res.data.wonList.length; i++) {
                _this.wonLikeImgs.push("/static/like_a.png")

              }

              //
            }
            console.log(_this.wonList)
          }
        })
      },
      //点击回复
      reply: function (userId, userNm, commId) {
        let _this = this;
        _this.$ajax.post('/travel/cmm/checkUser.do').then(function (res) {
          console.log(res.data)
          if (res.data.flag) {
            console.log("已经登录")

            _this.maskTitle = '回复' + userNm + ':';
            _this.commentData = {
              userBId: userId,
              userNm: userNm,
              commId: commId,

            }
            //显示评论框
            _this.showMask = true;
          } else {
            //未登录
            _this.loginShow = true;
          }
        })
      },
      //点击评论
      comment: function (userId, userNm, wonId) {
        let _this = this;
        _this.$ajax.post('/travel/cmm/checkUser.do').then(function (res) {
          console.log(res.data)
          if (res.data.flag) {
            console.log("已经登录");
            _this.maskTitle = '评论' + userNm + ':';
            _this.commentData = {
              userBId: userId,
              userNm: userNm,
              wonId: wonId
            };
            //显示评论框
            _this.showMask = true;
          } else {
            //未登录
            _this.loginShow = true;
          }
        })
      },
      //提交评论
      commentButn: function () {
        let _this = this;

        let url = '';
        let queryData;

        if (_this.commentArea == null || _this.commentArea == '') {
          this.$message.error('请输入评论内容!');
          return false;
        }
        if (_this.commentData.wonId) {
          url = '/cexper/won/inter/addComm.do';
          queryData = {
            wonId: _this.commentData.wonId,
            commContent: _this.commentArea
          };
        } else {
          url = '/cexper/won/inter/addRep.do';
          queryData = {
            commId: _this.commentData.commId,
            userBId: _this.commentData.userBId,
            repContent: _this.commentArea
          };
        }

        _this.$ajax.post(url, _this.$qs.stringify(queryData)).then(function (res) {

          if (res.data.flag) {//未登录
            _this.open1('评论成功!');
            _this.showMask = false;
            if (_this.commentData.wonId) {
              _this.getWonDet();
            }
            _this.getThreList(_this.sort);
          }
        })
      },
      //排序
      sortDetail: function (sortType) {
        this.getThreList(sortType);
      },
      //查看帖子详情内容
      viewDetail: function (wonId) {
        _this.$ajax.post('/cexper/won/inter/getWonDetAndComment.do', _this.$qs.stringify({wonId: wonId})).then(function (res) {
          if (data.flag) {

          }

        })


      },
      //点击小图放大
      smallToBig: function (imgUrl) {

        $('.personDetails-left>a>img').attr('src', imgUrl);
        $('.personDetails-left .banner_bg').css('background-image', 'url(' + imgUrl + ')');
      },

      //登录
      showFun: function (data) {
        this.loginShow = data;
      },
      //跟帖- 图片上传组件

      beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
        //console.log(file);

        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';

        const isLt10M = file.size / 1024 / 1024 < 10;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!');
        }
        if (!isGIF && !isPNG && !isJPG) {
          this.$message.error('仅支持jpg/gif/png格式!');
        }

        return isGIF && isPNG && isJPG && isLt10M;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;

        console.log(file)

      },
      //图片上传成功
      uploadImgSuccess: function (response, file, fileList) {
        let _this = this;
        console.log(response)
        console.log(file)
        console.log(fileList)

        if (response.data.imgId) {
          this.imgId += response.data.imgId + ",";
          console.log(_this.imgId)
        }


      },


      //ele弹窗
      open1(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },

      open2(msg) {
        this.$message({
          message: msg,
          type: 'warning'
        });
      },


    }
  };



</script>


<style lang="less" scoped>
  @import '../../../styles/exper/css/reset.css';
  @import '../../../styles/exper/css/thirdPage/wonDetails.css';
  .swiper-container{
    height: 100%;
  }
  #FontScroll ul{
    position: relative;
    top: 0;
    transition: top 0.5s;
    -webkit-transition: top 0.5s;
  }
  .swiper-container .swiper-wrapper .swiper-slide{
    height: 100%;

  }
  .container{
    height: auto;
  }
  .swiper-container .swiper-wrapper .swiper-slide img{
    width: 100%;
    height: 100%;
  }
  .swiper-button-next,.swiper-button-prev{
    margin-top: -18px;
  }
  
  .personDetails-left .b_bg{
     width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-filter: blur(5px); /* Chrome, Opera */
       -moz-filter: blur(5px);
        -ms-filter: blur(5px);    
            filter: blur(5px);  

  }
  .headPho{
    
	width:25px;
	height:25px;
	border:2px solid #ffbf43;
	box-sizing:border-box;
	border-radius: 50%;
	margin-right:20px;

  }
  /* .msgPopUpsCnt {
     width: 60.3%;
   }

   .litleImgBox {
     width: 100%;
     height: 130px;
     margin: 60px 0;
     position: relative;
     overflow: hidden;
   }

   .imgList {
     width: 1000%;
     display: flex;
     height: 100%;
   }

   .imgItem>img {
     width: 100%;
     height: 100%;
   }

   .nextPrevBtn {
     position: absolute;
     margin: auto;
     width: 40px;
     height: 40px;
     line-height: 40px;
     text-align: center;
     color: #FFFFFF;
     cursor: pointer;
     background: rgba(0, 0, 0, .5);
     top: 0;
     bottom: 0;
   }

   .img-button-next {
     right: 0;
   }

   .img-button-prev {
     left: 0;
   }

   .labelList {
     width: 100%;
     display: flex;
     flex-wrap: wrap;
   }

   .labelList>li {
     margin-right: 10px;
     margin-bottom: 10px;
   }

   .labelList a {
     padding: 3px 10px;
     border-radius: 30px;
     background: #F8F8F8;
   }

   .TopMsgLeft {
     display: flex;
     align-items: center;
   }

   .personMsg2 {
     display: flex;
     align-items: center;
   }

   .personMsg2>p {
     margin-right: 10px;
   }
   .item-littleImg-box > .hide-btn{
     display:none;
   }
   .follow-cmt-msg>p{
     overflow:hidden;
     overflow-wrap:break-word;
   }
   !* .currentPosition .nav-lab-style{
       color: #B6B6B6;
   } *!
   .currentPosition{
     color: #B6B6B6;}
   .personDetails-left>a{
     overflow:hidden;
   }
   .personDetails-left>a .banner_bg{
     width:100%;
     height:100%;
     background-repeat:no-repeat;
     background-size:cover;
     -webkit-filter:blur(10px);
     -moz-filter:blur(10px);
     -o-filter:blur(10px);
     -ms-filter:blur(10px);
     filter:blur(10px);
     position:absolute;
     left:0;
     top:0;
   }
   .personDetails-left>a>.firImg{
     height:auto;
     width:auto;
     position:absolute;
   }
   .personDetails-left>a{
     height: 563px;
 

  //----跟帖弹框
  body {
    background: #FFFFFF;
  }

  .followUpCnt {
    box-sizing: border-box;
    padding: 0 15px 15px 15px;
  }

  .followUpTitle {
    display: flex;
    align-items: center;
    font-size: 16px;
    height: 50px;
    border-bottom: 1px solid #F7F7F7;
  }

  .followUpTitle > span {
    font-size: 12px;
    margin-left: 15px;
    color: #737373;
  }

  /* 上传图片 */
  .clickUpImg {
    padding: 15px 0;
  }

  .clickNoImg {
    background: #F2F2F2;
    width: 200px;
    height: 180px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    outline: none;
  }

  .clickNoImg > img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }

  .clickNoImg > p {
    color: #A6A6A6;
    font-size: 14px;
  }

  .imgLabel > h6 {
    font-size: 16px;
    color: #7A7A7A;
    margin: 0 0 15px 0;
  }

  .selectLabel {
    position: relative;
    width: 350px;
  }

  .labelText {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
    padding: 0 15px;
    outline: none;
  }

  .selectLabel > div {
    position: absolute;
    width: 99%;
    box-shadow: 0 0 2px #999999;
    top: 35px;
    left: 0px;
    right: 0;
    margin: auto;
    background: #FFFFFF;
    font-size: 14px;
    display: none;
  }

  .Ylabel {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    border-bottom: 1px solid #FFBF43;
  }

  .labelList {
    max-height: 170px;
    overflow-y: scroll;
  }

  /* 设置水平滚动条的高度，垂直滚动的宽度 */
  .labelList::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* 设置滚动条里面的滑块样式 */
  .labelList::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #C1C1C1;
  }

  /* 设置滚动条的轨道背景样式 */
  .labelList::-webkit-scrollbar-track {
    border-radius: 0;
    background: #F1F1F1;
  }

  .labelList > li {
    padding: 5px 15px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
  }

  .labelList > li:hover {
    background: #F2F2F2;
  }

  .followUpText {
    padding: 15px 0;
  }

  .followUpText > textarea {
    width: 100%;
    height: 100px;
    border-radius: 5px;
    box-sizing: border-box;
    resize: none;
    padding: 10px 15px;
    outline: none;
  }

  .followUpText > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
  }

  .followUpText button {
    width: 100px;
    height: 30px;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
    outline: none;
    background: #B5B5B5;
  }

  .imgLabel .addlabelList {
    display: flex;
    margin: 15px 0;
    font-size: 14px;
    color: #999999;
  }

  .imgLabel .addlabelList > li {
    padding: 5px 5px 5px 10px;
    border: 1px solid #999999;
    border-radius: 30px;
    display: flex;
    align-items: center;
    margin-right: 15px;
  }

  .imgLabel .addlabelList span {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-left: 5px;
    cursor: pointer;
  }

  .clickHandleUpLabel {
    cursor: pointer;
    border: none;
    background: none;
    color: #FFBF43;
    outline: none;
  }

  /*.upLoadLabelTextListCnt {*/
  /*max-height:*/
  /*}*/

  .labelType {
    white-space: nowrap;
  }

  .labelName {
    color: #666666;
    margin: 0 10px;
    white-space: nowrap;
  }

  .labelName:before {
    content: '[ '
  }

  .labelName:after {
    content: ' ]'
  }

  .labelitemText {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .upImgList {
    display: flex;
    flex-wrap: wrap;
  }

  .upImgList > div {
    margin-left: 10px;
  }

  .upImgList > input {
    display: none;
  }

  .imgItem {
    width: 200px;
    height: 180px;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgItem > img {
    max-width: 100%;
    max-height: 100%;
  }

  .deleteImgItem {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: rgba(0, 0, 0, .8);
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 20px;
    color: #ffffff;
    cursor: pointer;
  }
</style>
<!--<link rel="stylesheet" type="text/css"
      href="../../../styles/exper/css/reset.css"/>
<link rel="stylesheet" type="text/css"
      href="../../../styles/exper/css/secondPage/secondPublic.css"/>-->
