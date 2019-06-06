<template>
    <div>
        <Header foo="foo"></Header>
        <div class="credentials-detail">
            <div class="ourbanner">
                <img src="../assets/about/ourbanner.jpg" alt=""/>
                <h2 class="ourtit">运营资质</h2>
            </div>
            <div class="comwrap">
                <div class="credentials-box">
                    <img class="permit" src="../assets/about/permit.jpg" alt=""/>
                    <img class="cence" src="../assets/about/cence.jpg" alt=""/>
                </div>
            </div>
        </div>
        <Footer  link="home"></Footer>
    </div>
</template>
<script>
import Header from '@/components/header';
import Footer from '@/components/footer';
export default {
    name:"credentialsView",
    components:{
        Header,Footer
    }
}
</script>
<style  lang="less" scoped>
    .credentials-detail{
        width: 100%;
        background: #fff;
        .ourbanner{
            width:100%;
            height:400px;
            position:relative;
            overflow:hidden;
            img{
                width:100%;
                min-width:1100px;
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                -ms-transform:translate(-50%,-50%);
                -moz-transform:translate(-50%,-50%);
                -webkit-transform:translate(-50%,-50%);
                -o-transform:translate(-50%,-50%);
            }
            .ourtit{
                font-size:34px;
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,0);
                 -ms-transform:translate(-50%,0);
                -moz-transform:translate(-50%,0);
                -webkit-transform:translate(-50%,0);
                -o-transform:translate(-50%,0);
                color:#fff;
                font-weight:400;
            }
        }
        .comwrap{
            .credentials-box{
                text-align:center;
                margin-top:90px;
                .permit{
                    width:289px;
                    margin-bottom:30px;
                }
                .cence{
                    width:652px;
                }
            }
        }
    }

</style>