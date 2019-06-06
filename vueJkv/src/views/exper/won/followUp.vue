<template>
  <div>
    <div class="followUpCnt">
      <!-- 跟帖图片 -->
      <div>
        <h4 class="followUpTitle">
          跟帖图片 <span>注：图片尺寸不得小于1620*737,图片大小不得大于10M,支持jpg/gif/png格式</span>
        </h4>
        <div class="clickUpImg">
          <div class="upImgList">
            <button type="button" class="clickNoImg" id="upload">
              <img src="/resources/exper/image/icon/uploadImgIcon.png"> <input
              type="hidden" id="threImgId" value="-1" />
              <p>点击添加图片</p>
            </button>
            <!-- <div class="imgItem">
                          <span class="deleteImgItem">×</span>
                          <img src="/resources/exper/image/icon/uploadImgIcon.png" >
                      </div> -->
          </div>
        </div>
        <!-- <div class="imgLabel">
                  <h6>图片标签</h6>
                  <div class="selectLabel">
                      <input class="labelText addtopicLabel" id="search_label"
                          type="text" placeholder="输入标签文字" />
                      <div>
                          <p class="Ylabel">
                              <span id='addLabNm'></span>
                              <button type="button" class="clickHandleUpLabel">添加标签</button>
                          </p>
                          <ul class="labelList upLoadLabelTextListCnt">
                              <li>标签</li>
                              <li>标签</li>
                              <li>标签</li>
                              <li>标签</li>
                          </ul>
                      </div>
                  </div>
                  <ul class="addlabelList">
                  </ul>
              </div> -->


      </div>
      <!-- 跟帖内容 -->
      <div>
        <!-- <h4 class="followUpTitle">跟帖内容</h4> -->
        <div class="followUpText">
          <!-- <textarea rows="" cols="" id='wonDescr' placeholder="请输入跟帖内容"></textarea> -->
          <div>
            <button type="button" class="clickPublish">发表</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "follow-up"
    }
    //---
    window.onload = function(){
      var val = 0;
      // 上传图片
      layui.use('upload', function(){
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
          elem: '#upload' //绑定元素
          ,url: '/cexper/won/inter/kindImg.do' //上传接口
          ,multiple: true //上传多图
          ,done: function(res){
            //上传完毕回调
            if(res.code == 0){
              val += res.data.imgId+','
              $('#threImgId').val(val)
              $('.upImgList').append(
                '<div class="imgItem">'+
                '<span class="deleteImgItem" data-id="'+ res.data.imgId +'">×</span>'+
                '<img src="'+ res.data.src +'" >'+
                '</div>'
              );
            }
          }
          ,error: function(){
            //请求异常回调
          }
        });
      });

      //添加标签设置
      initLabel();
    };
    $(document).on('click','.deleteImgItem',function(){
      $(this).parent('.imgItem').remove();
    });
    //标签列表信息设置
    function initLabel(){
      // 展开隐藏标签列表
      $('.labelText').bind('input propertychange', function() {
        if($('.labelText').val()!==''){
          $('.selectLabel>div').show();
        }else{
          $('.selectLabel>div').hide();
        }

      });
      /* 	$('.labelText').blur(function(){
                  $('.selectLabel>div').hide();
              }); */

      //绑定标签
      $(document).on('mousedown','.labelList>li',function(){
        var html = "<li data-id='"+$(this).attr('data-id')+"'>"+$(this).find('.labelName').text()+"<span class='labRemove'>×</span></li>";
        $('#search_label').val('');
        $('.addlabelList').append(html);
        $('.selectLabel>div').hide();
      });
      //移除绑定标签
      $(document).on('click','.addlabelList>li>.labRemove',function(){
        $(this).parent().remove();
      });

      //模糊查询标签列表
      $('#search_label').keyup(function(){
        var value = $('#search_label').val();
        $('#addLabNm').text(value);
        if(value && value != '' && value != ' '){
          $.ajax({
            url:'/cexper/base/inter/getLabelList.do',
            type:'POST',
            data:{labNm : value},
            dataType:'json',
            success:function(data){
              var html = '';
              if(data.flag){
                if(data.labList && data.labList.length && data.labList.length > 0){
                  $.each(data.labList,function(i,v){
                    html += '<li data-id="'+v.labId+'"><span class="labelType">地址</span><span class="labelName">'+v.labNm+'</span><span class="labelitemText">标标签描述标签描述标签描述标签描述标签描述标签描述签描述</span></li>' ;
                  });
                }
              }
              $('.upLoadLabelTextListCnt').html(html);
            }
          });
        }
      });

      //添加标签
      $('.clickHandleUpLabel').on('mousedown',function(){
        var labNm = $('#addLabNm').text();
        $('.selectLabel>div').hide();
        $('#search_label').val('');
        addLabel({labNm:labNm,labType:''});
        /* var labNm = $('#addLabNm').text();
            if(labNm && labNm != '' && labNm != ' '){
                layer.prompt({
                    formType: 0,
                      value: '',
                      title: '请输入标签【'+labNm+'】的类型'
                }, function(val, index){
                     if(val && val != '' ){
                         addLabel({labNm:labNm,labType:val});
                         layer.close(index);
                     }else{
                         layer.msg('标签类型不能为空!',{icon: 5},{time:2000});
                     }
                });

            }else{
                layer.msg('标签名称不能为空!',{icon: 5},{time:2000});
            } */
      });


      //保存话题
      $(document).on('click','.clickPublish',function(){
        saveThreWon();
      });
    }
    //添加标签到数据库
    function addLabel(data){
      var labNm = data.labNm;
      $.ajax({
        url:'/cexper/base/inter/addLabel.do',
        type:'POST',
        data:data,
        dataType:'json',
        success:function(data){
          if(data.flag){
            if(data.labId){
              var html = "<li data-id='"+data.labId+"'>"+labNm+"<span class='labRemove'>×</span></li>";
              $('.addlabelList').append(html);
              layer.msg('标签添加成功!',{icon: 6},{time:2000});
            }
          }else{
            layer.msg('添加标签出错了!',{icon: 5},{time:2000});
          }
        }
      });
    }
    function saveThreWon(){
      /* var str = '';
          $('.addlabelList li').each(function(i,v){
              str += $(this).attr('data-id') ? ($(this).attr('data-id')+','):'';
          });
          if(str.length > 0){
              str = str.substring(0,str.length -1);
          } */

      var imgId = $("#threImgId").val();
      if(!imgId || imgId == -1){
        layer.msg('请上传跟帖图片!',{icon: 5},{time:2000});
        return false;
      }
      /* var descr = $('#wonDescr').val();
          if(!descr){
              layer.msg('主题描述不能为空!',{icon: 5},{time:2000});
              return false;
          } */
      var json = {showType : 1,imgIds:imgId,wonId:'${wonId}'};
      $.ajax({
        url:'/cexper/won/inter/addFollowPosts.do',
        type:'POST',
        data:json,
        dataType:'json',
        success:function(data){
          if(data.flag){
            layer.msg('发表成功，等待审核!',{icon: 6,time:2000},function(){
              //window.parent.location.reload();
              //window.open("","_self").close();
              var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
              //layer.msg(index);
              parent.layer.close(index);
            });
          }else{
            layer.msg('添加出错了!',{icon: 5},{time:2000});
          }
        }
      });
    }




</script>

<style scoped>
  @import '../../../styles/exper/css/reset.css';

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

  .followUpTitle>span {
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

  .clickNoImg>img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }

  .clickNoImg>p {
    color: #A6A6A6;
    font-size: 14px;
  }

  .imgLabel>h6 {
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

  .selectLabel>div {
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

  .labelList>li {
    padding: 5px 15px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
  }

  .labelList>li:hover {
    background: #F2F2F2;
  }

  .followUpText {
    padding: 15px 0;
  }

  .followUpText>textarea {
    width: 100%;
    height: 100px;
    border-radius: 5px;
    box-sizing: border-box;
    resize: none;
    padding: 10px 15px;
    outline: none;
  }

  .followUpText>div {
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

  .imgLabel .addlabelList>li {
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

  .upLoadLabelTextListCnt {
    max-height:
  }

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

  .upImgList>div {
    margin-left: 10px;
  }

  .upImgList>input {
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

  .imgItem>img {
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
