<template>
  <div>
    <Header link="exper"></Header>
  
    <div class="container" style="padding-top: 100px;height:auto;">
      <!-- <h5 class="currentPosition">
        当前位置：<a class='nav-lab-style' target='_blank'
                href='#'>体验</a> 》精彩瞬间
      </h5> -->
      <div class="bread-crumb-container">
                <div class="bread-crumb">
                    <span>当前位置：</span>
                    <router-link target="_blank" to="/exper">体验</router-link> 》
                   <span>精彩瞬间</span>
                </div>
            </div>
      <div class="WonderfulMomentCnt">
        <div class="WonderfulMomentCntT-top">
          <ul class="WonderfulMomentCntT-top-label" >
            <li v-for="item in labList" :class="labChecked==item.labId?'active':''"  @click="getWonByLabel(item.labId)">{{item.labNm}}</li>
          </ul>
          <ul class="WonderfulMomentCntT-top-right">
            <li @click="isLogin('addOwnTheme')"><img
              src="../../../assets/exper/image/icon/imgIcon.png"
              style="margin-right: 10px;"> 添加主题
            </li>
          </ul>
        </div>
        <ul class="WonderfulMomentCnt-list" id="wonList">
          <li v-for="item in wonList">
            <div class="WMItemImgBox" >
              <router-link target="_blank" :to='{path:"/wonDetail/"+item.wonId}'>
                <img :src=addressUrl+item.imgUrl>
                <div class="WMItemFotMsg">
                  <p>{{item.title}}</p>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
        <div class="lodingImg">
          <img src="../../../assets/exper/image/icon/loding.png">
        </div>
        <div v-if="LoadMore=='查看更多'" @click="pageAddFun()" class="WMSeeMore">{{LoadMore}}</div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/header'
  import Footer from '@/components/footer'

  export default {
    name: "list",
    data() {
      return {
        labChecked:null,
        pageRows: 20,//每页条数
        page: 1,//页数
        lableQuery: {
          'labType': 1,
          'labNm': '',
          'showHome': ''
        },
        labList: [],
        wonList:[],
        LoadMore: "查看更多"

      };
    },
    components: {
      Header, Footer
    },
    created() {
      this.getLabList()
      this.getWonList()
    },
    methods: {
      //精彩瞬间标签点击查询
      getWonByLabel: function (labId) {
        let _this = this;
        _this.checked = true;
        _this.page = 1;
        _this.labChecked = labId;
        _this.getWonList(labId);
      },
      isLogin:function(url){
			let _this = this;
    		_this.$ajax.post("/travel/cmm/checkUser.do").then(function(res){
    			if(res.data && res.data.flag){
					const { href } = _this.$router.resolve({name: url})
                	window.open(href, '_blank')
    			}else{
    				_this.loginShow = true;
    			}
    		});
    	},
      pageAddFun:function(){
        var _this = this
        _this.page +=1
        _this.getWonList()

      },
      //标签列表
      getLabList: function () {
        let _this = this;
        _this.$ajax.post('/cexper/base/inter/getLabelList.do', _this.$qs.stringify(_this.lableQuery)).then(function (res) {
          if (res.data.flag) {
            _this.labList = res.data.labList;

            console.log(_this.labList)
          }
        })
      },
      //精彩瞬间列表
      getWonList: function (labId) {
        let _this = this;
        let data = {
          'showType': 1,
          'page': _this.page,
          'rows': _this.pageRows,
          'labId': labId
        };
        _this.$ajax.post('/cexper/won/inter/getWonList.do', _this.$qs.stringify(data)).then(function (res) {
          if (res.data.flag) {
            if (res.data.wonList.length < _this.pageRows) {
              //获取的条数小于每页行数 证明没有更多的数据了
              _this.LoadMore = "已全部加载!";
            }
            // _this.wonList = res.data.wonList;
            _this.wonList = _this.wonList.concat(res.data.wonList)

            console.log(_this.wonList)
          }
        })

      }
    }
  };
</script>


<style lang="less" scoped>
  @import '../../../styles/exper/css/reset.css';
  @import '../../../styles/exper/css/secondPage/secondPublic.css';



</style>
<!--<link rel="stylesheet" type="text/css"
      href="../../../styles/exper/css/reset.css"/>
<link rel="stylesheet" type="text/css"
      href="../../../styles/exper/css/secondPage/secondPublic.css"/>-->
