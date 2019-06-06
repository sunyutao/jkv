<template>
    <div>
       <div class="small-tools-container">
            <div class="small-tools">
                <router-link to="/news"><div class="close-tools"></div></router-link>
                <div class="tools-top">
                    <p class="left">旅行小工具</p>
                    <div class="right">
                        <div class="layui-form">
                             <el-select v-model="value" placeholder="请选择">
                                <el-option value="1" label="境内"></el-option>
                                <el-option value="2" label="境外"></el-option>
                            </el-select>
                            <input v-model="areaName" type="text" name="" placeholder="请输入地区名称"  autocomplete="off" class="layui-input text-input">
                            <button @click="searchFun()">搜索</button>
                        </div>
                    </div>
                </div>
                <div class="tools-bottom">
                    <ul class="left">
                        <li v-if="weatherShow" @click="weatherTab()" :class="isShow == 'weather'|| isShow == 'weatherC'?'th-cli':''">天气</li>
                        <li v-if="currencyShow" @click="conTab('currency')" :class="isShow == 'currency'?'th-cli':''">货币</li>
                        <li v-if="policyShow" @click="conTab('policy')" :class="isShow == 'policy'?'th-cli':''">政策</li>
                        <li v-if="customsShow" @click="conTab('customs')" :class="isShow == 'customs'?'th-cli':''">风俗习惯</li>
                    </ul>
                    <div class="right">
                        <!--城市七天天气-->
                        <div v-if="isShow=='weather'&&isLocalWeatherShow" class="right-con weather">
                            <h1>{{areaShowName}}</h1>
                            <p class="my-address"></p>
                            <div v-if="valueNow == 2" class="return-weather">返回国家</div>
                            <div class="today" id="weather1">
                                <img class="big-weather" :src="'./static/bigImg/nbg_'+areaWeather[0].wea+'.jpg'" alt="">
                                <div class="t-l">
                                    <p>{{weatherUpdataTime}}更新</p>
                                    <span>数据来源：京东万象</span>
                                </div>
                                <div class="t-m">
                                    <p>{{areaWeather[0].tem2}} ~ {{areaWeather[0].tem1}}</p>
                                    <span>{{areaWeather[0].wea}}</span>
                                    <img class="small-weather1" :src="'./static/bigImg/icon/Weather_'+areaWeather[0].wea+'.png'" alt="">
                                </div>
                                <div class="t-r">
                                    <p>风向：{{areaWeather[0].win[0]}}</p>
                                    <p>风力等级：{{areaWeather[0].win_speed}}</p>
                                </div>
                            </div>
                            <ul id="weather6">
                                <li v-for="(item,index) in otherWeather" :key="index">
                                    <p>{{item.day}}</p>
                                    <p>{{item.tem2}} ~ {{item.tem1}}</p>
                                    <p>{{item.wea}}</p>
                                    <img class="small-weather2" :src="'./static/icon/icon_'+item.wea+'.png'" alt="">
                                </li>
                            </ul>
                        </div>
                        <div v-if="isShow=='weather'&&!isLocalWeatherShow" class="right-con weather" >
                            <h1>{{areaWeatherBasic.city}}</h1>
                            <p class="my-address"></p>
                            <div v-if="valueNow == 2" @click="isShow = 'weatherC'" class="return-weather">返回国家</div>
                            <div class="today" id="weather1">
                                <img class="big-weather" :src="'./static/bigImg/nbg_'+areaWeather[0].cond.txt_d+'.jpg'" alt="">
                                <div class="t-l">
                                    <!-- <p>{{weatherUpdataTime}}更新</p> -->
                                    <span>数据来源：京东万象</span>
                                    <p>实况天气</p>
                                </div>
                                <div class="t-m">
                                    <p>{{areaWeather[0].tmp.min}}℃ ~ {{areaWeather[0].tmp.max}}℃</p>
                                    <span>{{areaWeather[0].cond.txt_d}}</span>
                                    <img class="small-weather1" :src="'./static/bigImg/icon/Weather_'+areaWeather[0].cond.txt_d+'.png'" alt="">
                                </div>
                                <div class="t-r">
                                    <p>风向：{{areaWeather[0].wind.dir}}</p>
                                    <p>风力等级：{{areaWeather[0].wind.sc}}级</p>
                                </div>
                            </div>
                            <ul id="weather6">
                                <li v-for="(item,index) in otherWeather" :key="index">
                                    <p>{{item.date}}</p>
                                    <p>{{item.tmp.min}}℃ ~ {{item.tmp.max}}℃</p>
                                    <img class="small-weather2" :src="'./static/icon/icon_'+item.cond.txt_d+'.png'" alt="">
                                    <p>{{item.cond.txt_d}}</p>
                                </li>
                            </ul>
                        </div>
                        <!--国家多个城市当天天气-->
                        <div v-if="isShow == 'weatherC'" class="right-con weather-list">
                            <h1>{{areaShowName}}</h1>
                            <ul id="city_weather">
                                <div v-for="(item,index) in cityList" :key="index">
                                    <li @click="weatherDetailFun(item.result.HeWeather5[0].basic.city)" v-if="item.result.HeWeather5[0].status == 'ok'" >
                                        <h2 v-if="item.result.HeWeather5[0].basic">{{item.result.HeWeather5[0].basic.city}}</h2>
                                        <p v-if="item.result.HeWeather5[0].basic">{{item.result.HeWeather5[0].basic.update.loc}}</p>
                                        <p v-if="item.result.HeWeather5[0].daily_forecast">{{item.result.HeWeather5[0].daily_forecast[0].tmp.min}}℃ ~ {{item.result.HeWeather5[0].daily_forecast[0].tmp.max}}℃</p>
                                        <p v-if="item.result.HeWeather5[0].daily_forecast">{{item.result.HeWeather5[0].daily_forecast[0].cond.txt_d}}</p>
                                        <img :src="'./static/icon/icon_'+item.result.HeWeather5[0].daily_forecast[0].cond.txt_d+'.png'" alt="">
                                    </li>
                                </div>
                            </ul>
                            <button @click="pageFun()" style="margin:0 auto;display:block;background:none;border:1px solid #999;font-size:12px;">{{btnText}}</button>
                        </div>
                        <!--风俗习惯-->
                        <div v-if="isShow == 'customs'" class="right-con customs">
                            <h1>风俗习惯</h1>
                            <div v-html="customsMsg" class="con" id="customText"></div>
                        </div>
                        <!--货币-->
                        <div v-if="isShow == 'currency'" class="right-con currency">
                            <h1>货币</h1>
                            <div class="top-link" id="currencyType">
                                <a v-for="(item,index) in currencyList" :key="index" :href="'#link'+index">{{item.typeNm}}</a>
        				    </div>
                            <div class="con" id = "currencyText">
                                <div v-for="(item,index) in currencyList" :key="index" class="con-view">
                                    <h2><a :name="'link'+index" >{{item.typeNm}}</a></h2>
                                    <div v-html="currencyMd[index]" class="view"></div>
                                </div>
                            </div>
                        </div>
                        <!--政策-->
                        <div v-if="isShow == 'policy'" class="right-con policy">
                            <h1>政策</h1>
                            <div class="top-link" id="policyType">
                                 <a v-for="(item,index) in policyList" :key="index" :href="'#plink'+index">{{item.typeNm}}</a> 
                            </div>
                            <div class="download-con">
                                <div class="intro"><span>相关文件下载</span></div>
                                <div class="view" id="downLoadFile">
                                    <a :href="sourceUrl+item.fileUrl" v-for="(item,index) in policyFileList" :key="index" id="downloadVisa"><span></span>{{item.fileNm}}</a>
                                    <a :href="addressUrl+'/cnews/tools/policy/inter/downZipFiles.do?toolId='+areaMsg.toolId">全部下载</a>
                                </div>
                            </div>
                            <div class="con" id="policyText">
                                <div v-for="(item,index) in policyList" :key="index" class="con-view" >
                                    <h2><a :name="'plink'+index">{{item.typeNm}}</a></h2>
                                    <div v-html="policyMd[index]" class="view"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"smallToolNews",
        data(){
            return{
                value:'1',
                valueNow:'1',
                // placeholder:'请输入城市名称',
                areaName:'',
                areaWeather:[],
                areaWeatherBasic:{},
                otherWeather:[],
                weatherUpdataTime:'',
                areaMsg:{},
                customsMsg:'',
                isShow:'weather',
                currencyShow:true,
                policyShow:true,
                customsShow:true,
                weatherShow:true,
                areaShowName:'',
                areaList:[],
                isLocalWeatherShow:true,
                page:1,
                cityList:[],
                btnText:'加载更多',
                currencyList:[],
                currencyMd:[],
                policyList:[],
                policyMd:[],
                policyFileList:[]
                
            }
        },
        created(){
            this.loadWeather()
            this.areaMsgFun()
            this.currencyTypeFun()
            this.policyTypeFun()
            this.customsFun()
            this.currencyMdFun()
            this.policyMdFun()
        },
        watch:{
            areaShowName: function(newVal,oldVal){
                this.areaMsgFun()
            },
            currencyList: function(newVal,oldVal){
                this.currencyMdFun()
            },
            policyList: function(newVal,oldVal){
                this.policyMdFun()
            },
            areaMsg: function(newVal,oldVal){
                this.currencyTypeFun()
                this.policyTypeFun()
                this.customsFun()
            }
        //     areaMsg: {
        // 　　　　handler(newValue, oldValue) {
        // 　　　　　　this.currencyTypeFun()
        //             this.policyTypeFun()
        //             this.customsFun()
        // 　　　　},
        // 　　　　deep: true
        // 　　}
            
        },
        methods:{
            // inputHold:function(a){
            //     console.log(a)
            //     this.placeholder = a
            // }
            loadWeather:function(){
                var _this = this
                $.get('https://www.tianqiapi.com/api/?version=v1').then(function(res){
                    console.log(res)
                    _this.areaWeather = res.data
                    _this.areaShowName = res.city
                    _this.otherWeather = _this.areaWeather.slice(1)
                    _this.weatherUpdataTime = res.update_time

                },function(){

                })
            },
            areaMsgFun:function(){
                var _this = this
                
                _this.$ajax.post('/cnews/tools/inter/getTools.do',_this.$qs.stringify({regNm:_this.areaShowName})).then(function(res){
                    console.log(res.data)
                    if(res.data.flag){
                        _this.currencyShow = true
                         _this.policyShow = true
                         _this.customsShow = true
                        _this.areaMsg = res.data.tool
                    }
                    else{
                         _this.currencyShow = false
                         _this.policyShow = false
                         _this.customsShow = false
                    }
                    
                },function(){

                })
            },
            currencyTypeFun:function(){
                var _this = this
                _this.$ajax.post('/cnews/tools/currency/inter/getCurrencyList.do',_this.$qs.stringify({toolId:_this.areaMsg.toolId})).then(function(res){
                    console.log({toolId:_this.areaMsg.toolId})
                    console.log(res.data)
                    if(res.data.flag){
                        _this.currencyList = res.data.list
                    }else{
                        _this.currencyShow = false
                    }
                },function(){

                })
            },
            currencyMdFun:function(){
                var _this = this
                for(var i = 0;i < _this.currencyList.length;i++){
                    _this.$ajax.get(_this.sourceUrl+_this.currencyList[i].currencyUrl).then(function(res){
                        _this.currencyMd.push(marked(res.data).replace(/src="/g,'src="'+_this.addressUrl))
                    },function(){

                    })
                }
                console.log(_this.currencyMd)
                
            },
            policyTypeFun:function(){
                var _this = this
                _this.$ajax.post('/cnews/tools/policy/inter/getPolicyList.do',_this.$qs.stringify({toolId:_this.areaMsg.toolId})).then(function(res){
                    console.log(res.data)
                    if(res.data.flag){
                        _this.policyList = res.data.list
                        _this.policyFileList = res.data.fileList
                    }else{
                        _this.policyShow = false
                    }
                },function(){

                })
            },
            policyMdFun:function(){
                var _this = this
                for(var i = 0;i < _this.policyList.length;i++){
                    _this.$ajax.get(_this.sourceUrl+_this.policyList[i].policyUrl).then(function(res){
                        _this.policyMd.push(marked(res.data).replace(/src="/g,'src="'+_this.addressUrl))
                    },function(){

                    })
                }
                console.log(_this.policyMd)
                
            },
            customsFun:function(){
                var _this = this
                console.log(_this.sourceUrl+_this.areaMsg.customsUrl)
                _this.$ajax.get(_this.sourceUrl+_this.areaMsg.customsUrl).then(function(res){
                    console.log(res.data)
                    _this.customsMsg = marked(res.data)
                    console.log(_this.customsMsg)
                },function(){

                })
            },
            conTab:function(a){
                this.isShow = a
            },
            searchFun:function(){
                var _this = this
                // _this.$ajax.post('/cnews/tools/inter/getRegionList.do',_this.$qs.stringify({regNm:_this.areaName,inOutType:_this.value})).then(function(res){
                //     console.log(res.data)
                //     if(res.data.flag){
                //         _this.valueNow = _this.value
                //         _this.areaList = res.data.list
                //         _this.areaShowName = res.data.list[0].regionNm
                //         console.log(_this.areaShowName)
                //         console.log(_this.areaMsg.toolId)
                //     }
                // },function(){

                // })
                _this.$ajax.post('/cnews/tools/inter/getToolsWithInOutType.do',_this.$qs.stringify({regNm:_this.areaName,inOutType:_this.value})).then(function(res){
                    if(res.data.flag){
                        _this.isLocalWeatherShow = false
                        _this.valueNow = _this.value
                        _this.areaShowName = _this.areaName
                        if(_this.value ==1){
                            _this.isShow = 'weather'
                            _this.$ajax.get('/cnews/tools/weather/getWeatherByCity.do?city='+_this.areaName).then(function(res){
                                console.log(res.data)
                                if(res.data.flag){
                                    _this.areaWeather = JSON.parse(res.data.weatherStr).result.HeWeather5[0].daily_forecast
                                    console.log(_this.areaWeather)
                                    _this.areaWeatherBasic = JSON.parse(res.data.weatherStr).result.HeWeather5[0].basic
                                    _this.otherWeather = _this.areaWeather.slice(1)
                                }
                                else{
                                    _this.areaWeather = []
                                }
                            },function(){

                            })
                        }
                        else{
                            _this.isShow = 'weatherC'
                            _this.$ajax.post('/cnews/tools/weather/weatherAreaPage.do',_this.$qs.stringify({page:_this.page,rows:'12',country:_this.areaName})).then(function(res){
                                console.log(res.data)
                                if(res.data.flag){
                                    
                                    for(var i = 0;i < res.data.weatherList.length;i++){
                                        res.data.weatherList[i] = JSON.parse(res.data.weatherList[i])
                                    }
                                    console.log(res.data.weatherList)
                                    _this.cityList = res.data.weatherList
                                }
                                else{
                                    _this.cityList = []
                                    // if(_this.currencyShow){
                                    //     _this.isShow = 'currency'
                                    // }
                                    // else{
                                    //     if(_this.policyShow){
                                    //         _this.isShow = 'policy'
                                    //     }
                                    //     else{
                                    //         if(_this.customsShow){
                                    //             _this.isShow = 'customs'
                                    //         }
                                    //         else{
                                    //              _this.$message({message: '暂无该地区信息',type: 'warning'});
                                    //              return false
                                    //         }
                                    //     }
                                    // }
                                }
                                console.log(_this.cityList)
                            },function(){

                            })
                        }
                    }
                    else{
                         _this.$message({message: '暂无该地区信息',type: 'warning'});
                         return false
                    }
                },function(){

                })
                
            },
            weatherTab:function(){
                if(this.valueNow == 1){
                    this.isShow = 'weather'
                }
                else{
                    this.isShow = 'weatherC'
                }
            },
            pageFun:function(){
                var _this = this
                _this.page +=1
                _this.$ajax.post('/cnews/tools/weather/weatherAreaPage.do',_this.$qs.stringify({page:_this.page,rows:'12',country:_this.areaName})).then(function(res){
                        console.log(res.data)
                        if(res.data.flag){
                            for(var i = 0;i < res.data.weatherList.length;i++){
                                res.data.weatherList[i] = JSON.parse(res.data.weatherList[i])
                            }
                            console.log(res.data.weatherList)
                            if(res.data.weatherList.length>0){
                                // _this.cityList = res.data.weatherList
                            _this.cityList= _this.cityList.concat(res.data.weatherList)
                            }
                            else{
                                _this.btnText = '没有更多了'
                            }
                            
                        }
                    },function(){

                    })
            },
            weatherDetailFun:function(a){
                var _this = this
                 _this.isShow = 'weather'
                _this.$ajax.get('/cnews/tools/weather/getWeatherByCity.do?city='+a).then(function(res){
                    if(res.data.flag){
                        _this.areaWeather = JSON.parse(res.data.weatherStr).result.HeWeather5[0].daily_forecast
                        _this.areaWeatherBasic = JSON.parse(res.data.weatherStr).result.HeWeather5[0].basic
                        console.log(_this.areaWeatherBasic)
                        console.log(_this.areaWeather)
                         _this.otherWeather = _this.areaWeather.slice(1)
                    }
                    else{
                         _this.areaWeather = []
                    }
                },function(){

                })
            },
        }
    }
</script>

<style lang="less">
    @import '../../styles/smallTools.css';
</style>
<style lang="">
    .el-select{
        width: 100px;
    }
</style>