<template>
    <div>
        <div v-if="boon" class="progress-bar-container">
            <el-progress :text-inside="true" :stroke-width="5" :percentage="pro"></el-progress>
            <div class="center">
                <router-link target="_blank" to="/"></router-link>
                <router-link target="_blank" v-if="mainTit=='exp'" to="/sexplore">探索</router-link>
                <router-link target="_blank" v-if="mainTit=='plan'" to="/plan">计划</router-link>
				<span class="con-title">{{textName}}</span>
			</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"progressBarComponents",
        props:['pro','boon','textName','mainTit']
    }
</script>

<style lang="less" scoped>
    .progress-bar-container{
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 200;
        background-color: #fff;
        overflow: hidden;
        .el-progress{
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            height: 12px;
        }
        .center{
            width: 1170px;
            margin: 0 auto;
            height: 80px;
            line-height: 80px;
            color: #333;
            font-size: 16px;
            letter-spacing: 1px;
            a{
                color: #333;
                margin-right: 5px;
                font-size: 16px;
                &:nth-child(1){
                    display: inline-block;
                    position: relative;
                    top: 5px;
                    background: url(../assets/logo2.png);
                    width: 54px;
                    height: 36px;
                }
            }
        }
    }
</style>
<style lang="less">
    .el-progress-bar__outer{
        background-color: #fff;
    }
    .el-progress-bar__inner{
        background-color: #ffbf43;
        -webkit-transition: width 0s;
        transition: width 0s;
    }
</style>