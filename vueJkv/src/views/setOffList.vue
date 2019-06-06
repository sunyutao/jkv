<template>
    <div>
        <Header link="setOff"></Header>
        <div class="set-off-list-container">
            <div class="bread-crumb-container">
                <div class="bread-crumb">
                    <span>当前位置：</span>
                    <router-link target="_blank" to="/setOff">出发</router-link> 》
                    <span>酒店</span>
                </div>
            </div>
            <div class="search-container">
                <div class="content">
                    <div class="area">
                        <div class="left">国家</div>
                        <div class="right">
                            <div class="top">
                                <div :class="areaNo?'no-limit-cl':''" class="no-limit" @click="areaNoFun()">不限</div>
                                <ul class="country">
                                    <li :class="areaCou == index?'li-cl':''" v-for="(item,index) in countryList" :key="index" @click="getCity(item.rId,index)">{{item.regNm}}</li>
                                </ul> 
                            </div>
                            <ul class="city">
                                <li :class="areaCity == item.rId?'li-cl':''" v-for="(item,index) in cityList" :key="index" @click="cityFun(item.rId)">{{item.regNm}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="service">
                        <div class="left">服务</div>
                        <div class="right">
                            <div :class="serviceNo?'no-limit-cl':''" class="no-limit" @click="serviceNoFun()">不限</div>
                            <ul class="s-list">
                                <li v-for="(item,index) in serviceLabList" :key="index">
                                    <input type="checkbox" name="service" :id="'service'+index">
                                    <label @click="serviceFun(item.labId)" :for="'service'+index">{{item.labNm}}</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="type">
                        <div class="left">类型</div>
                        <div class="right">
                            <div :class="typeNo?'no-limit-cl':''" class="no-limit">不限</div>
                            <ul class="t-list">
                                <li v-for="(item,index) in customizeLabList" :key="index">
                                    <input type="checkbox" name="type" :id="'type'+index">
                                    <label @click="typeFun(item.labId)" :for="'type'+index">{{item.labNm}}</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button @click="getArticleFun()" class="sbit">确定</button>
                </div>
            </div>
            <div class="go-list-container">
                <div class="content">
                    <h1>{{hotelNum}}家酒店符合条件</h1>
                    <div class="list">
                        <router-link target="_blank" v-for="(item,index) in hotelList" :key="index" :to='{path:"/setOffDetail/"+item.artId}'>
                            <div class="left">
                                <img :src="addressUrl+item.bdImgUrl" alt="">
                            </div>
                            <div class="right">
                                <h2>{{item.artTitle}}</h2>
                                <div class="infor">金凯观点</div>
                                <p class="view">{{item.jkvContent}}</p>
                                <div class="bottom">
                                    <div class="label">
                                        <span v-for="(lab,index) in item.statusLabList" :key="index">{{lab.labNm}}</span>
                                    </div>
                                    <div class="num">
                                        <span class="out">评论数<span>{{item.needNum}}</span></span>
                                        <span class="out">咨询数<span>{{item.commNum}}</span></span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="page-container">
                <div class="content">
                    <el-pagination :total="hotelNum" :page-size="rows" @current-change="pageFun" background layout="prev, pager, next"></el-pagination>
                </div>
            </div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/header'
    import Footer from '@/components/footer'
    export default {
        name:"setOffListView",
        data(){
            return{
                countryList:[],
                cityList:[],
                serviceLabList:[],
                customizeLabList:[],
                areaNo:true,
                areaCou:null,
                areaCity:null,
                serviceNo:true,
                typeNo:true,
                serviceLab:'',
                typeLab:'',
                page:1,
                rows:20,
                hotelList:[],
                hotelNum:'0'
            }
        },
        components:{
            Header,Footer
        },
        created(){
            this.getCountry()
            this.getServiceLab()
            this.getCustomizeLab()
            this.getArticleFun()
        },
        methods:{
            getCountry:function(){
                var _this =this
                _this.$ajax.post('/ctrip/base/getRegionList.do').then(function(res){
                    if(res.data.flag){
                        _this.countryList = res.data.list
                        console.log(_this.countryList)
                    }
                },function(){

                })
            },
            getCity:function(a,b){
                var _this = this
                _this.$ajax.post('/ctrip/base/getRegionList.do',_this.$qs.stringify({regId:a})).then(function(res){
                    if(res.data.flag){
                        _this.cityList = res.data.list
                        console.log(_this.cityList)
                    }
                },function(){

                })
                _this.areaCou = b
                // _this.areaNo = false
                // _this.areaCity = null

            },
            getServiceLab:function(){
                var _this = this
                _this.$ajax.post('/ctrip/base/getLabelList.do',_this.$qs.stringify({labType:2})).then(function(res){
                    if(res.data.flag){
                        _this.serviceLabList = res.data.lablist
                        console.log(_this.serviceLabList)
                    }
                },function(){

                })
            },
            getCustomizeLab:function(){
                var _this = this
                _this.$ajax.post('/ctrip/base/getLabelList.do',_this.$qs.stringify({labType:1})).then(function(res){
                     if(res.data.flag){
                        _this.customizeLabList = res.data.lablist
                        console.log(_this.customizeLabList)
                    }
                },function(){

                })
            },
            areaNoFun:function(){
                var _this = this
                _this.areaNo = true
                _this.areaCou = null
                _this.cityList = []
                _this.areaCity =null
            },
            cityFun:function(a){
                var _this = this
                _this.areaNo = false
                // _this.areaCou = null
                _this.areaCity = a
            },
            serviceNoFun:function(){
                _this.serviceNo = true

            },
            serviceFun:function(a){
                var _this = this
                a = a + ','
                if(_this.serviceLab.indexOf(a) > -1){
                   _this.serviceLab =  _this.serviceLab.replace(a,'')
                }
                else{
                    _this.serviceLab = _this.serviceLab + a 
                    
                }
                console.log(_this.serviceLab)
                if(_this.serviceLab == ''){
                    _this.serviceNo = true
                }
                else{
                    _this.serviceNo = false
                }
            },
            typeFun:function(a){
                var _this = this
                a = a + ','
                if(_this.typeLab.indexOf(a) > -1){
                    _this.typeLab = _this.typeLab.replace(a,'')
                }
                else{
                    _this.typeLab = _this.typeLab + a
                }
                if(_this.typeLab == ''){
                    _this.typeNo = true
                }
                else{
                    _this.typeNo = false
                }
            },
            getArticleFun:function(){
                var _this = this
                if(!_this.serviceLab == ''){
                    _this.serviceLab = _this.serviceLab.substring(0,_this.serviceLab.length-1)
                }
                if(!_this.typeLab == ''){
                    _this.typeLab = _this.typeLab.substring(0,_this.typeLab.length-1)
                }
                _this.$ajax.post('/ctrip/art/inter/getArtList.do',_this.$qs.stringify({page:_this.page,rows:_this.rows,useYn:"Y",cityId:_this.areaCity,userdefinedLabId:_this.typeLab,statusLabId:_this.serviceLab})).then(function(res){
                    console.log({page:1,rows:20,useYn:"Y",cityId:_this.areaCity,userdefinedLabId:_this.typeLab,statusLabId:_this.serviceLab})
                    if(res.data.flag){
                        console.log(res.data)
                        _this.hotelList = res.data.list
                        _this.hotelNum = res.data.total
                        console.log(_this.hotelList)
                    }
                    if(!_this.serviceLab == ''){
                        _this.serviceLab = _this.serviceLab + ','
                    }
                    if(!_this.typeLab == ''){
                        _this.typeLab = _this.typeLab + ','
                    } 
                },function(){

                })
                 
            },
            pageFun:function(res){
                console.log(res)
                this.page = res
                this.getArticleFun()
            }
        }
    }
</script>

<style lang="less" scoped>
    .set-off-list-container{
        padding-top: 110px;
        .search-container{
            width: 100%;
            background-color: #f9f9f9;
            .content{
                width: 1170px;
                margin: 0 auto;
                background-color: #fff;
                position: relative;
                .area{
                    padding-top: 6px;
                    padding-bottom: 6px;
                    border-bottom: 2px solid #f9f9f9;
                    width: 1170px;
                    &:after{
                        content: '';
                        height: 0;
                        visibility: hidden;
                        display: block;
                        clear: both;
                    }
                    .left{
                        float: left;
                        font-size: 16px;
                        width: 110px;
                        height: 34px;
                        box-sizing: border-box;
                        padding-left: 20px;
                        color: #333;
                        line-height: 34px;
                    }
                    .right{
                        float: right;
                        width: 1060px;
                        padding-right: 20px;
                        box-sizing: border-box;
                        .top{
                            &:after{
                                content: '';
                                height: 0;
                                visibility: hidden;
                                display: block;
                                clear: both;
                            }
                            .no-limit{
                                float: left;
                                height: 34px;
                                line-height: 34px;
                                padding-left: 18px;
                                padding-right: 18px;
                                font-size: 14px;
                                color: #666;
                                cursor: pointer;
                            }
                            .no-limit-cl{
                                // background-color: #fffaef;
                                color: #FFBF43;
                            }
                            .country{
                                float: left;
                                    &:after{
                                    content: '';
                                    height: 0;
                                    visibility: hidden;
                                    display: block;
                                    clear: both;
                                }
                                li{
                                    cursor: pointer;
                                    float: left;
                                    height: 34px;
                                    line-height: 34px;
                                    padding-left: 18px;
                                    padding-right: 18px;
                                    font-size: 14px;
                                    color: #666;
                                    /* background: url(/resources/trip/img/xj.png) no-repeat right center; */
                                    &:hover{
                                        color: #ffbf43;
                                    }
                                }
                                .li-cl{
                                    background-color: #fffaef;
                                    color: #333;
                                }
                            }
                        }
                        .city{
                            width: 1040px;
                            background-color: #fffaef;
                            &:after{
                                content: '';
                                height: 0;
                                visibility: hidden;
                                display: block;
                                clear: both;
                            }
                            li{
                                cursor: pointer;
                                float: left;
                                height: 34px;
                                line-height: 34px;
                                padding-left: 18px;
                                padding-right: 18px;
                                font-size: 14px;
                                color: #666;
                                &:hover{
                                    color: #ffbf43;
                                }
                            }
                            .li-cl{
                                color: #ffbf43;
                            }
                        }
                    }
                }
                .service{
                    padding-top: 6px;
                    padding-bottom: 6px;
                    width: 1080px;
                    &:after{
                        content: '';
                        height: 0;
                        visibility: hidden;
                        display: block;
                        clear: both;
                    }
                    .left{
                        float: left;
                        font-size: 16px;
                        width: 110px;
                        height: 34px;
                        box-sizing: border-box;
                        padding-left: 20px;
                        color: #333;
                        line-height: 34px;
                    }
                    .right{
                        float: left;
                        &:after{
                            content: '';
                            height: 0;
                            visibility: hidden;
                            display: block;
                            clear: both;
                        }
                        .no-limit{
                            float: left;
                            height: 34px;
                            line-height: 34px;
                            padding-left: 18px;
                            padding-right: 36px;
                            font-size: 14px;
                            color: #666;
                            cursor: pointer;
                        }
                        .no-limit-cl{
                            color: #ffbf43;
                        }
                        ul{
                            float: left;
                            &:after{
                                content: '';
                                height: 0;
                                visibility: hidden;
                                display: block;
                                clear: both;
                            }
                            li{
                                cursor: pointer;
                                float: left;
                                font-size: 14px;
                                color: #666;
                                height: 34px;
                                line-height: 34px;
                                margin-right: 34px;
                                input{
                                    position: absolute;
                                    clip: rect(0, 0, 0, 0);
                                }
                                input[type="checkbox"] + label::before {
                                    content: "\a0";  /* 不换行空格 */
                                    display: inline-block;
                                    vertical-align: 0px;
                                    width: 10px;
                                    height: 10px;
                                    margin-right: 10px;
                                    border: 1px solid #666;
                                    background-color: #fff;
                                    text-indent: 2px;
                                    line-height: .65; 
                                    cursor: pointer;
                                }
                                input[type="checkbox"]:checked + label::before {
                                    content: "\2713"; /* 对号的 Unicode 编码 */
                                    border: 1px solid #FFBF43;
                                }
                                input[type="checkbox"] + label{
                                    cursor: pointer;
                                }
                                input[type="checkbox"]:checked + label{
                                    color: #FFBF43;
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                }
                .type{
                    padding-top: 6px;
                    padding-bottom: 6px;
                    width: 1080px;
                    &:after{
                        content: '';
                        height: 0;
                        visibility: hidden;
                        display: block;
                        clear: both;
                    }
                    .left{
                        float: left;
                        font-size: 16px;
                        width: 110px;
                        height: 34px;
                        box-sizing: border-box;
                        padding-left: 20px;
                        color: #333;
                        line-height: 34px;
                    }
                    .right{
                        float: left;
                        &:after{
                            content: '';
                            height: 0;
                            visibility: hidden;
                            display: block;
                            clear: both;
                        }
                        .no-limit{
                            float: left;
                            height: 34px;
                            line-height: 34px;
                            padding-left: 18px;
                            padding-right: 36px;
                            font-size: 14px;
                            color: #666;
                            cursor: pointer;
                        }
                        .no-limit-cl{
                            color: #ffbf43;
                        }
                        ul{
                            float: left;
                            li{
                                cursor: pointer;
                                float: left;
                                font-size: 14px;
                                color: #666;
                                height: 34px;
                                line-height: 34px;
                                margin-right: 34px;
                                input{
                                    position: absolute;
                                    clip: rect(0, 0, 0, 0);
                                }
                                input[type="checkbox"] + label::before {
                                    content: "\a0";  /* 不换行空格 */
                                    display: inline-block;
                                    vertical-align: 0px;
                                    width: 10px;
                                    height: 10px;
                                    margin-right: 10px;
                                    border: 1px solid #666;
                                    background-color: #fff;
                                    text-indent: 2px;
                                    line-height: .65; 
                                    cursor: pointer;
                                }
                                input[type="checkbox"]:checked + label::before {
                                    content: "\2713"; /* 对号的 Unicode 编码 */
                                    border: 1px solid #FFBF43;
                                }
                                input[type="checkbox"] + label{
                                    cursor: pointer;
                                }
                                input[type="checkbox"]:checked + label{
                                    color: #FFBF43;
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                }
                .sbit{
                    cursor: pointer;
                    display: block;
                    width: 50px;
                    height: 26px;
                    background-color: #f9f9f9;
                    font-size: 14px;
                    color: #666;
                    border: none;
                    position: absolute;
                    right: 28px;
                    bottom: 36px;
                    outline: none;
                    &:hover{
                        background-color: #ffbf43;
                        color: #fff;
                    }
                }
            }
        }
        .go-list-container{
            width: 100%;
            background-color: #f9f9f9;
            .content{
                width: 1170px;
                margin: 0 auto;
                h1{
                    font-size: 14px;
                    color: #333;
                    padding-top: 15px;
                    font-weight: normal;
                }
                .list{
                    a{
                        border-top: 1px dashed #dadada;
                        display: block;
                        padding: 20px 0;
                        &:after{
                            content: '';
                            height: 0;
                            visibility: hidden;
                            display: block;
                            clear: both;
                        }
                        .left{
                            float: left;
                            width: 356px;
                            height: 200px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .right{
                            float: right;
                            width: 814px;
                            height: 200px;
                            padding-left: 20px;
                            padding-right: 30px;
                            box-sizing: border-box;
                            h2{
                                font-size: 16px;
                                color: #000;
                                font-weight: normal;
                                margin-bottom: 10px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            .infor{
                                background: url(../assets/lb.png) no-repeat 0 1px;
                                font-size: 14px;
                                color: #000;
                                padding-left: 30px;
                                margin-bottom: 10px;
                                height: 20px;
                                line-height: 20px;
                            }
                            .view{
                                font-size: 14px;
                                color: #666;
                                letter-spacing: 0.5px;
                                line-height: 24px;
                                margin-bottom: 40px;
                                height: 78px;
                                overflow: hidden;
                            }
                            .bottom{
                                &:after{
                                    content: '';
                                    height: 0;
                                    visibility: hidden;
                                    display: block;
                                    clear: both;
                                }
                                .label{
                                    float: left;
                                    span{
                                        font-size: 12px;
                                        background-color: #FFBF43;
                                        color: #fff;
                                        padding: 3px;
                                        margin-right: 5px;
                                    }
                                }
                                .num{
                                    float: right;
                                    .out{
                                        font-size: 12px;
                                        color: #666;
                                        display: inline-block;
                                        margin-left: 6px;
                                        span{
                                            font-size: 16px;
                                            color: #FFBF43;
                                            margin-left: 6px;
                                        }
                                        &:nth-child(1){
                                            border-right: 1px solid #999;
                                            padding-right: 6px;
                                        }
                                    }
                                }
                            }
                        }
                        &:nth-child(1){
                            border-top: none;
                        }
                    }
                }
            }
        }
        .page-container{
            width: 100%;
            background-color: #f9f9f9;
            padding-top: 50px;
            padding-bottom: 20px;
            .content{
                width: 1170px;
                margin: 0 auto;
                .el-pagination{
                    text-align: center;
                    
                }
            }
        }
        
    }
</style>
<style lang="less">
    .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #ffbf43;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover{
        background-color: #ffbf43;
        color: #fff;
    }
</style>