<template>
  <div>
    <div class="lunbo-left">
      <input type="hidden" id="currDay" value="" />
      <div id="carousel1" class="carousel-content">
          <ul class="carousel">
              <li class="li1" id="li1">
                  <div class="yuehao" id="yuehao">
                      <router-link target="_blank" :to="calId == '-1'?'':{ path: '/calDetail', query: { calId: dataInfo.calId,day:date}}">{{date.substring(5)}}</router-link>
                  </div>
              </li>
          </ul>
          <div class="carousel-prev" @click="nextDate()"></div>
          <div class="carousel-next" @click="prevDate()"></div>
          <div class="contont">
          </div>
          <div class="riqi" :class="rqclick=='riqi-cli'?rqclick:''" @mousedown="rqshow1()" @mouseup="rqshow2()" >
              <!-- <img src="../../assets/news/5_33.png"> -->
          </div>
          <Calendar v-on:choseDay="clickDay" v-show="play"></Calendar>
          <div class="zhezhao">
              <p class="list1" id="calDescr">{{dataInfo.descr}}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Calendar from 'vue-calendar-component';
  export default {
      name:"calComponents",
      props:['calInfo'],
      components: {
          Calendar
      },
      data(){
          return{
              play:false,
              dataInfo:'',
              calId:-1,
              date:'',
              rqclick:''
          }
      },
      watch: {
          calInfo: function(newVal,oldVal){
              this.dataInfo = newVal;
              if(this.dataInfo.calDate){
                this.date = this.dataInfo.calDate;
              }
              if(this.dataInfo.calId){
                this.calId = this.dataInfo.calId;
              }

          }
      },
      created(){
          this.formatterDate(new Date());
      },
      methods:{
        httpCalInfo:function(){
             var _this = this;
            _this.$ajax.post('/cnews/cal/inter/getCalInAndDayInfo.do',_this.$qs.stringify({calDate:_this.date})).then(function(res){
                _this.calId = -1;
                if(res.data && res.data.flag && res.data.cal){
                    _this.dataInfo = res.data.cal;
                    if(res.data.cal.calId){
                      _this.calId = res.data.cal.calId;
                    } 
                }
            },function(){
                _this.calId = -1;
            });
        },
        prevDate:function(){
          var day = this.addDate(this.date,-1);
          if(day){
            this.date = day;
            this.httpCalInfo();
          }
          
        },
        nextDate:function(){
          var day = this.addDate(this.date,1);
          if(day){
            this.date = day;
            this.httpCalInfo();
          }
        },
        rqshow1:function(){
            this.rqclick = "riqi-cli";
            this.play = !this.play;
        },
        rqshow2:function(){
            this.rqclick = "";
        },
        addDate:function(date,days){
          if (days == undefined || days == '') {
              days = 1;
          }
          date = new Date(date);
          date.setDate(date.getDate() + days);
          var month = date.getMonth() + 1;
          var day = this.getFormatDate(date.getDate());
          return date.getFullYear() + '-' + this.getFormatDate(month) + '-' + day;      
        },
        formatterDate:function(date){
            date = new Date(date);
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            this.date = currentdate;        
        },
        getFormatDate:function(arg){
          if (arg == undefined || arg == '') {
              return '';
          }
          var re = arg + '';
          if (re.length < 2) {
              re = '0' + re;
          }
          return re;
        },
        clickDay(data) {
           //选中某天
          this.formatterDate(data);
          this.httpCalInfo();
          this.play = !this.play;
        }
      }
  }
</script>
<style lang="less" scoped>
  .lunbo-left{
    width: 784px;
    height: 400px;
    /*background-color: blue;*/
    background-image:url('../../assets/news/back-img.png');
    float: left;
    position: relative;
    .carousel-content{
        width: 784px;
        height: 400px;
        position: relative;
        &:hover{
            .zhezhao{
                opacity:1;
            }
        }
        .carousel{
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            li{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .li1{
                float: left;
                position: absolute;
                .yuehao{
                    width: 194px;
                    height: 60px;
                    background-color: #ffbf43;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-left: -82px;
                    margin-top: -30px;
                    border: 1px solid #ffbf43;
                    border-radius: 30px;
                    font-size: 30px;
                    opacity:0.8;
                    a{
                        display: block;
                        text-align: center;
                        line-height: 58px;
                        color: white;
                    }
                }
            }
            .li2{
                background-color:red;
            }
            .li3{
                background-color:green;
            }
            
        }
        .carousel-prev{
            position: absolute;
            bottom: 24px;
            right: 25px;
            cursor: pointer;
            width: 20px;
            height: 20px;
            line-height: 16px;
            text-align: center;
            color:#ffbf43;
            z-index: 3;
            background:url(../../assets/news/Rightcut_a.png) no-repeat;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .carousel-next{
            position: absolute;
            right: 58px;
            bottom:24px;
            cursor: pointer;
            width: 20px;
            height: 20px;
            line-height: 16px;
            text-align: center;
            color:#ffbf43;
            z-index: 3;
            background:url(../../assets/news/Leftcut_a.png) no-repeat;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .carousel-prev-in{
            background:url(../../assets/news/Rightcut_b.png) no-repeat;
        }
        .carousel-next-in{
            background:url(../../assets/news/Leftcut_b.png) no-repeat;
        }
        .contont{
            ul{
                li{
                    width: 194px;
                    height: 60px;
                    background-color: #ffbf43;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-left: -82px;
                    margin-top: -30px;
                    border:1px solid #ffbf43;
                    border-radius: 30px;
                    font-size: 30px;
                }
            }
            a{
                display: block;
                text-align: center;
                line-height: 60px;
                color: white;
            }
        }
        .zhezhao{
          width: 784px;
          padding:5px 10px 0;
          box-sizing:border-box;
          height:97px;
          background-color:rgba(0,0,0,0.5);
          position: absolute;
          left: 0;
          bottom:0;
          opacity:0;
          transition:opacity 0.3s;
          -webkit-transition:opacity 0.3s;
          .list1{
            line-height:24px;
            font-size:14px;
            color:#cccccc;
          }
        }
        .riqi{
            cursor:pointer;
            width: 50px;
            height: 50px;
            position: absolute;
            right: 22px;
            top: 22px;
            background:url(../../assets/news/rili_often.png);
            &:hover{
                background:url(../../assets/news/rili_hover.png);
            }
        }
        .riqi-cli{
            background:url(../../assets/news/rili_click.png);
            &:hover{
                background:url(../../assets/news/rili_click.png);
            }
        }
    }
}
</style>
<style  lang="css" scoped>
  .wh_container{
    position: absolute;
      right: 100px;
      top: 60px;
      z-index:9;
  }
  .wh_container >>> .wh_content_all {
    background-color: #FFFFFF !important;
    box-shadow: 2px 2px 15px 2px #e3e3e3;
      border-radius: 5px;
  }
  .wh_container >>> .wh_content_item{
    color:#333;
  }
  .wh_container >>> .wh_content_item .wh_top_tag{
    color:#ccc;
  }
  .wh_container >>> .wh_top_changge li{
    color:#ccc;
  }
  .wh_container >>> .wh_top_changge li .wh_jiantou1{
    border-top: 2px solid #ccc;
      border-left: 2px solid #ccc;
  }
  .wh_container >>> .wh_top_changge li .wh_jiantou2{
    border-top: 2px solid #ccc;
      border-right: 2px solid #ccc;
  }
</style>