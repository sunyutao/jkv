<template>
  <div>
    <Header link="exper"></Header>
    <!-- <div id="topNav"></div> -->
    <div class="container" style="padding-top: 100px;height:auto;">
      <div class="topicMsg">
        <h3>主题信息</h3>
        <div class="topicFillingBox">
          <div>
            <input type="text" placeholder="请输入主题名称" id='topicTitle' v-model="title"/>
          </div>
        </div>
      </div>
      <div style="display: none;">
        <form id="addInputForm" action="" method="post" enctype="multipart/form-data" style="height: 0; width: 0">
          <input id="addInputImg" type="file" multiple="multiple" name="addInputImg">
        </form>
        <input type="hidden" id='imgId' value='-1' />
      </div>

      <div class="topicUploadImage">
        <h3>
          上传图片 <span>注：图片尺寸不得小于1620*737，图片大小不得大于10M，支持jpg/gif/png格式</span>
        </h3>
        <!--<div class="clickUploadimgBox">
          <div class="clickUploadimg">
            <div class="imgload">
              <input type="hidden" id="fileNm" value="" />
              <button type="button" class="clickNoImg" onclick="$('#addInputImg').click();">
                <div>
                  <img src="/resources/exper/image/tianjia.png">
                  <p>点击添加图片</p>
                </div>
              </button>
            </div>
          </div>
        </div>-->
        <div style="padding:15px;">
            <el-upload
          :action='addressUrl+"/cexper/won/inter/kindImg.do"'
          list-type="picture-card"
          :multiple=true
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uploadImgListSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        </div>
        
      </div>
      <div class="">
        <h3>添加标签</h3>
        <ul class="labelList">
        </ul>
        <div class="upLoadLabel">
          <!--<div class="upLoadLabelText">
            <p>请选择</p>
            <i class="layui-icon layui-icon-triangle-d"></i>
            <div class="upLoadLabelTextList">
              <div class="upLoadLabelTextListTop">请选择</div>
              <ul class="upLoadLabelTextListCnt">
              </ul>
            </div>

          </div>-->
          <el-select v-model="value" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

      </div>

      <div class="topicUploadImage">
        <h3>主题封面</h3>
        <div class="clickUploadimgBox">
          <div class="clickUploadimg">
            <div class="imgload" id="view">

              <el-upload
                class="avatar-uploader"
                :action="addressUrl+'/cexper/won/inter/kindImg.do'"
                :show-file-list="false"
                :on-success="uploadImgSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
             <!-- <button type="button" class="clickNoImg" id="showUpImgBox"
                      style="background: none;" data-imgid="">
                <div>
                  <img src="/resources/exper/image/tianjia.png">
                  <p>点击上传封面图</p>
                </div>
              </button>-->

            </div>

          </div>
        </div>

      </div>
      <div class="topicText">
        <h3>主题内容</h3>
        <div class="topicTextBox">
          <textarea rows="" cols="" placeholder="请输入主题内容" id='wonDescr' v-model="context"></textarea>
        </div>
      </div>
      <div class="clickjBtn">
        <button type="button" class="clickPublish" thstatus="2" @click="publish">发表</button>
      </div>
    </div>
    <!--<div class="cutImgBoxOut disnone">
      <div class="cutImgBox">
        <h3>
          上传封面 <span id="offBox">×</span>
        </h3>
        <div id="clipArea"></div>
        <div class="FBtnBox">
          <div class="upIndexImg">
            上传封面图<input type="file" id="file">
          </div>
          &lt;!&ndash; <ul class="btnList">
                  <li class="LscaleImg"><img src="Lscale.png" ></li>
                  <li class="BscaleImg"><img src="Bscale.png" ></li>
                  <li class="roteImg"><img src="rote.png" ></li>
              </ul> &ndash;&gt;
        </div>
        <div class="submitImg">
          <button id="clipBtn">确定</button>
          <button id="offBtn">取消</button>
        </div>

      </div>
    </div>-->
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

        //主题名称
        title:"",

        //照片墙-多张
        dialogImageUrl: '',
        dialogVisible: false,
        imgIds:"",

        //标签下拉框
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: [],

        //主题封面-单张
        imageUrl: '',
        imgId:'',

        //主题内容
        context:"",

      };
    },
    components: {
      Header, Footer
    },
    created() {
      this.getLabelList()
    },
    methods: {

      getLabelList: function () {
        let _this = this;
        _this.$ajax.post('/cexper/base/inter/getLabelList.do', _this.$qs.stringify({labType:1})).then(function (res) {
          _this.options=[];
          if (res.data.flag) {
            for (let i = 0 ; i< res.data.labList.length;i++){
              _this.options.push()
              let option ={};
              option.label = res.data.labList[i].labNm;
              option.value=res.data.labList[i].labId
              _this.options.push(option)
            }

            console.log(_this.options)
          }
        })

      },
      publish:function () {
        let _this = this;
        if(this.imgId==""){
          _this.$message.error('请上传主题封面图!');
          return false;
        }

        if(this.title==""){
          _this.$message.error('主题名称不能为空!');
          return false;
        }

        if (this.value.length<=0) {
          _this.$message.error('至少选择一个标签!');
        }
        let labIdsStr = '';
        for (let lab of this.value) {
          labIdsStr +=lab;
        }
        labIdsStr = labIdsStr.substring(0,labIdsStr.length -1);


        if(this.imgIds==""){
          _this.$message.error('图片最少一张!',{icon: 5},{time:2000});
          return false;
        }

        if(this.context==""){
          _this.$message.error('主题内容不能为空!');
          return false;
        }

        let queryData = {labIds : labIdsStr,imgId:_this.imgIds,descr:_this.context,title:_this.title,bgImg:_this.imgId}
        _this.$ajax.post('/cexper/won/inter/addMainPosts.do', _this.$qs.stringify(queryData)).then(function (res) {
          if(res.data.flag){

            _this.$message({
              message: '发表成功，等待审核!',
              type: 'success',
            });
            setTimeout(function(){
              window.close();
            }, 1000);


          }else{
            _this.$message.error('添加出错了!');
          }
        })
      },
      //照片墙
      beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
        //console.log(file);

        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        debugger;
        const isLt10M = file.size / 1024 / 1024 < 10;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt10M) {
          this.$message.error('上传图片大小不能超过 10MB!');
          return false;
        }
        if (!isGIF && !isPNG && !isJPG) {
          this.$message.error('仅支持jpg/gif/png格式!');
          return false;
        }

        return true;
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
      uploadImgListSuccess: function (response, file, fileList) {
        let _this = this;
        console.log(response)
        console.log(file)
        console.log(fileList)
        if (response.data) {
          if (response.data.imgId) {
            this.imgIds += response.data.imgId + ",";
            console.log(_this.imgIds)
          }
        }
      },
      //上传封面图成功
      uploadImgSuccess: function (response, file, fileList) {
        let _this = this;
         console.log(response)
        // console.log(file)
        // console.log(fileList)
        if (response.data) {
          if (response.data.imgId) {
            this.imgId = response.data.imgId;
            this.imageUrl=this.addressUrl+response.data.src;
            console.log(_this.imgId)
          }
        }
      },
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
  @import '../../../styles/exper/css/thirdPage/addWon.css';


/*element */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
/*element */
</style>
<!--<link rel="stylesheet" type="text/css"
      href="../../../styles/exper/css/reset.css"/>
<link rel="stylesheet" type="text/css"
      href="../../../styles/exper/css/secondPage/secondPublic.css"/>-->
