<template>
  <div>
    <Header foo="foo"></Header>
  <div class="our">
    <div class="ourbanner">
      <img src="../assets/about/ourbanner.jpg" alt=""/>
      <h2 class="ourtit">加入我们</h2>
    </div>
    <div class="comwrap">
      <div class="ourjoin">
        <p>为什么选择金凯视界 <i class="circle_i"></i></p>
        <ul>
          <li>
            <b>多元团队</b>
            <i>同事们有说英文的，德语的，荷兰语的……</i>
          </li>
          <li>
            <b>环境舒适</b>
            <i>累了就来杯咖啡，透过落地窗望望外景</i>
          </li>
          <li>
            <b>诱人薪资</b>
            <i>极具竞争力的薪资和股权</i>
          </li>
          <li>
            <b>弹性工作</b>
            <i>自然醒，喝个早茶，再上班</i>
          </li>
          <li>
            <b>带薪年假</b>
            <i>还有可！报！销！的境外旅游，一共15天！</i>
          </li>
          <li>
            <b>零食料理</b>
            <i>包餐，并提供来自世界各地健康的和不健康的零食</i>
          </li>
          <li>
            <b>无限畅饮</b>
            <i>洋的？白的？啤的？来一杯放松下啦！</i>
          </li>
          <li>
            <b>无尽饮料</b>
            <i>汽水，果汁，现磨咖啡…… 老是喝不完！</i>
          </li>
        </ul>
        <p>职位 <i class="circle_i"></i></p>
        <div class="job">
          <span>简历发送至 : <i>hr@jkv-travel.com</i></span>
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
        tabIndex: '1',
        planData: {
          page: 1,
          rows: 10,
          sort: 'newest'
        },
        planList: [],
        loadText: '加载更多'
      }
    },
    components: {
      Header, Footer
    },
    created() {
      /* $.get("/nav/homeNav.do",function(data){//调取nav
         $("#nav1").html(data.data);//初始化加载界面
       });
       //footer导航
       $.get("/nav/footer.do",function(data){//调取footer
         $("#footer").html(data.data);//初始化加载界面
       });*/
    },
    methods: {}
  }
</script>

<style lang="css" scoped>
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

  .comwrap {
    position:relative;
    width:1170px;
    margin: 0 auto;
  }
  .comwrap:after{
    content:"";
    display:block;
    clear:both;
  }

</style>
