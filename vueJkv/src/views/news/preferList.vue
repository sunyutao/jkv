<template>
  <div>
    <Header link="news"></Header>
    <div id="topNav"></div>
    <!--<div class="n-bread-crumb">
      <div class="content">
        <span>当前位置：</span>
        <router-link target="_blank" to="/news/news">资讯</router-link>
        》
        <span>旅行活动</span>
      </div>
    </div>-->
    <div class="bread-crumb-container">
      <div class="bread-crumb">
        <span>当前位置：</span>
        <router-link target="_blank" to="/news">资讯</router-link>
        》
        <span>优惠信息</span>
      </div>
    </div>
    <div class="n-search-container">
      <div class="content">
        <div class="search-top">
          <div class="left">信息类型</div>
          <div class="right">
            <div class="no-limit" :class="typeNo?'th-cli':''" @click="typeNoFun()">不限</div>
            <ul class="type-list">
              <li :class="typeCheckedId == item.cateId?'th-cli':''" v-for="(item,index) in preferTypeList" :key="index"
                  @click="typeFun(item.cateId)">
                {{item.cateNm}}
              </li>
            </ul>
          </div>
        </div>
        <div class="search-bottom">
          <div class="left">区域国家</div>
          <div class="right">
            <div class="continent">
              <div class="no-limit" :class="areaNo?'th-cli':''" @click="areaNoFun()">不限</div>
              <ul>
                <li :class="areaContinent == item.regId?'th-cli2':''" v-for="(item,index) in continentList" :key="index"
                    @click="getCountry(item.regId)">{{item.regionNm}}
                </li>
              </ul>
            </div>
            <ul class="country">
              <li :class="areaCountry == item.regId?'th-cli':''" v-for="(item,index) in countryList" :key="index"
                  @click="countryFun(item.regId)">{{item.regionNm}}
              </li>
            </ul>
          </div>
        </div>
        <div class="search-day">
          <div class="left">时间筛选</div>
          <!--<div class="right" id="n_calendar">
            <input type="text" id="dt" placeholder="选择截止时间">
            <div id="dd"></div>
          </div>-->
          <el-date-picker
            v-model="pageData.eNowDate"
            type="date"
            placeholder="选择截止时间"
            @change="getPage()">
          </el-date-picker>
        </div>
        <div class="search-panel">
          <input id="chooseLabel" type="text" placeholder="标签关键字搜索" v-model="keyWord"/>
          <button @click="getPage()"></button>
          <ul class="lab-list"></ul>
        </div>
      </div>
    </div>
    <div class="n-list">
      <ul>
        <li class="list-4" v-for="item in pageList">
          <div>
            <span class="1-1"></span>
            <span class="1-2"></span>
          </div>
          <router-link target="_blank" :to='{path:"/preferDetail/"+item.preferId}'>{{item.title}}</router-link>
        </li>
      </ul>
    </div>
    <!--<div class="page" id="page"></div>-->
    <div class="page-container">
      <div class="content">
        <el-pagination :total="totalNum" :page-size="pageData.rows" @current-change="pageFun" background
                       layout="prev, pager, next"></el-pagination>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/header'
  import Footer from '@/components/footer'

  export default {
    data() {
      return {
        continentList: [],
        preferTypeList: [],
        areaNo: true,
        areaContinent: null,
        areaCountry: null,
        countryList: [],
        typeNo: true,
        typeCheckedId: null,
        pageData: {
          page: 1,
          rows: 20,
          preferType: "",
          labNm: "",
          rSec: "",
          eNowDate: ""
        },
        totalNum:0,
        pageList: [],
        actNum: 0,
        keyWord: "",//输入关键字
        labArr: []//标签关键字列表
      };
    },
    components: {
      Header, Footer
    },
    created() {
      this.getRegionList();
      this.getPreferTypeList();
      this.getPage();
      this.getKeyWordList();
    },
    methods: {
      //查询地区(洲)名称
      getRegionList: function () {
        let _this = this;
        _this.$ajax.post('/cnews/tips/inter/getRegionList.do', _this.$qs.stringify({regLevel: 1})).then(function (res) {
          if (res.data.flag) {
            _this.continentList = res.data.list;
            console.log(_this.continentList)
          }
        })
      },
      //获取类型列表
      getPreferTypeList: function () {
        let _this = this;
        _this.$ajax.post('/cnews/prefer/inter/getPreferTypeList.do').then(function (res) {
          if (res.data.flag) {
            _this.preferTypeList = res.data.list;
            console.log(_this.preferTypeList)
          }
        })
      },
      //获取国家列表
      getCountry: function (regId) {
        var _this = this;
        _this.$ajax.post('/cnews/tips/inter/getRegionList.do', _this.$qs.stringify({
          regLevel: 2,
          pId: regId
        })).then(function (res) {
          if (res.data.flag) {
            _this.countryList = res.data.list;
            console.log(_this.countryList)
          }
        }, function () {

        });
        _this.areaContinent = regId;
        // _this.areaNo = false
        _this.areaCountry = null

      },
      //不限地区
      areaNoFun: function () {
        var _this = this;
        _this.areaNo = true;
        _this.areaContinent = null;
        _this.countryList = [];
        _this.areaCountry = null;
        _this.pageData.rSec = "";
        //分页查询
        this.getPage();
      },
      //查州下的国家
      countryFun: function (countryId) {
        this
        this.areaNo = false;
        // _this.areaCou = null
        this.areaCountry = countryId;
        this.pageData.rSec = countryId;
        //分页查询
        this.getPage();
      },
      //不限类型
      typeNoFun: function () {
        var _this = this;
        _this.typeNo = true;
        _this.typeCheckedId = null;
        _this.pageData.preferType = "";
        //分页查询
        this.getPage();
      },
      typeFun: function (cateId) {
        this.typeNo = false;
        this.typeCheckedId = cateId;
        this.pageData.preferType = cateId;
        //分页查询
        this.getPage();
      },
      //分页查询
      getPage: function () {
        var _this = this;
        _this.pageData.labNm=_this.keyWord;//暂时 以后去掉
        _this.$ajax.post('/cnews/prefer/inter/getPrefersList.do', _this.$qs.stringify(_this.pageData)).then(function (res) {

          _this.pageList = res.data.preferList;
          _this.totalNum = res.data.pagetotal;
          console.log("pageList: "+_this.pageList)

        }, function () {

        });
        // _this.areaContinent = regId
        // _this.areaNo = false
        // _this.areaCountry = null

      },
      getKeyWordList: function () {
        var _this = this;
        _this.$ajax.get('/cnews/basedate/inter/getKeyList.do').then(function (res) {

          if (res.data.flag) {
            if (res.data.keyList && res.data.keyList.length && res.data.keyList.length > 0) {
              $.each(res.data.keyList, function (i, v) {
                _this.labArr.push(v.cateNm);
              });
              _this.bindLabSearch();
            }
          }
          console.log("关键字列表" + res.data.keyList)

        }, function () {

        });
      },
      bindLabSearch: function () {
        let _this = this;
        $("#chooseLabel").bind('input propertychange', function () {
          if ($('#chooseLabel').val() != '') {
            $(".search-panel button").css('background', 'url(../../assets/news/new/ss_b.png) no-repeat');
          } else {
            $(".search-panel button").css('background', 'url(../../assets/news/new/ss_a.png) no-repeat');
          }
          /*这个是全部数据的数组*/
          /*这个数组我是防止出现重复的数据进行数据去重复后的新数组*/
          var arrNew = [];
          var i;
          for (i = 0; i < _this.labArr.length; i++) {
            var arrItems = _this.labArr[i];
            if ($.inArray(arrItems, arrNew) == -1) {
              arrNew.push(arrItems);
            }
          }
          /*这是将input中输入的数据有关联的全部加入新生成的div中显示出来*/
          for (i = 0; i < arrNew.length; i++) {
            var arrWord = arrNew[i].toString();
            /*console.log(arrWord);*/
            if (((arrWord.indexOf($('#chooseLabel').val())) > -1) && ($('#chooseLabel').val().length > 0)) {
              var addArrWord = "<li>" + arrWord + "</li>";
              $(".search-panel ul").append(addArrWord);
//						$(".search-panel ul").removeClass("auto-hidden");
            }
          }
          /*将显示出来的div的内容去重复，input内容变动时去重复*/
          $(".search-panel ul li").each(function () {
            if ($(this).text().indexOf($('#chooseLabel').val()) < 0) {
              $(this).remove();
            }
            else if ($('#chooseLabel').val().length == 0) {
//						$(".search-panel ul").addClass("auto-hidden");
              $(".search-panel ul li").remove();
            }
          });
          /*弹出的提示div去重复*/
          $(".search-panel ul li").each(function (i, iText) {
            var iTextHtml = iText.innerHTML;
            $(".search-panel ul li").each(function (j, jText) {
              var jTextHtml = jText.innerHTML;
              if (i < j && iTextHtml == jTextHtml) {
                $(this).remove();
              }
            });
          });
          /*点击div获取文本传值*/
          $(".search-panel ul li").on("click", function () {
            //$("#chooseLabel").val($(this).text());
            _this.keyWord=$(this).text();
            _this.pageData.labNm =_this.keyWord;
//					$(".search-panel ul").addClass("auto-hidden");
            $(".search-panel ul li").remove();

            //searchType();
          });

        });
      },

      pageFun: function (res) {
        console.log(res)
        this.pageData.page = res
        this.getPage()
      }

    }
  };
</script>

<style lang="less">
  @import '../../styles/newsList.css';

  #topNav {
    padding-top: 110px;
  }

  .n-search-container {
    margin-top: 20px;
  }
</style>
