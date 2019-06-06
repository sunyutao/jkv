<template>
    <div>
        <Header foo="foo"></Header>
        <div class="about-jkv-detail">
            <div class="ourbanner">
                <img src="../assets/about/ourbanner.jpg" alt=""/>
                <h2 class="ourtit">关于我们</h2>
            </div>
            <div class="comwrap">
                <div class="ourtext">
                    <p class="text-title">
                        关于金凯视界 <i class="circle_i"></i>
                    </p>
                    <div class="ourintro">
                        河北金凯国际旅行社有限公司成立于2003年，十几年的发展，我们深深感觉到旅游真的不只是拍拍照或出去瞧瞧那么简单，尽管有些人觉得自己就是出去转转休息下。渐渐的我们觉得“告诉游客应该用什么样的视角、什么姿态打开这个世界”这才应该是旅行社的使命，就像我们一直认为的那样：人生就像场旅行，而旅行不只是享受，更像是一场修行。在自然中感悟人生，在繁华中学习文明，在舒适的配套下享受生活，这些都是人生旅途上的修行。
                    </div>
                    <div class="ourintro">
                        2016年，我们不再满足于一个个走马光观花式的基础旅行安排，于是几个年轻人聚在一起，重新启航。我们在全球的目的地收集灵感，发现生活的一切可能；我们绞尽脑汁，重现体验，告诉你打开这个世界的最佳姿势；我们要做真正懂旅游的人，提供更简单、更专业的旅游服务；我们贩卖有态度的生活方式，要知道选择旅行就是选择生活方式。
                    </div>
                    <div class="ourintro">
                        我们要告诉你金凯的视野、眼界。告诉你应该用人生的视角看待这个世界上的一草一木，用探索求知的执着走过城市的角角落落，用人生沉淀下来的放松的去享受生活的精致，不然，你眼里有的只是那枯树、那绿草、那海水、那点石头，那条破河，那个城市都是人之类。在自然中感悟人生至理，当然也可以在繁华中感悟人生，但是繁华中感悟的是什么，大概是那些似是而非的做人道理，我们更愿意相信这个世界上有一种向上的力量，就在那一河一木，一花一草，一人一城之中。
                    </div>
                    <div class="ourintro">
                        旅行本没那么多意义。只不过是里面的人想出来，外面的人想进去，但是里面的人，你真的了解你生活的地方吗？外面的人，你真的想明白自己要去玩的方式吗？这些也许只是因为人们对空间和时间的向往没有止境，想换个姿势，探索世界，求变于平凡而伟大的生活，发现生活的一切可能，或许这才是旅行的真谛。
                    </div>
                    <div class="ourintro ourintrolast">
                        我们想用我们的全部来捍卫我们的旅行理念，让你总是在陌生的地方，发现久违的感动，也许很久之后想起这一次的旅行，能够想起的只有那座山，那个城，那些人，那些事……
                    </div>
                    <div class="ourintroimg">
                        <img src="../assets/about/ourintro.png" alt=""/>
                    </div>
                    <p>
                        <i class="circle_i"></i><img src="../assets/about/ourworld.png" alt=""/>
                    </p>
                    <div class="ourintro">
                        就全世界而言，你可能只是一个人；但是对某个人来说，你可能就是她的全世界。 <br/>
                        To the world，you may be one person；but to one person，you may be  the world。
                    </div>
                </div>
            </div>
        </div>
        <Footer link="home"></Footer>
    </div>
</template>
<script>
import Header from '@/components/header';
import Footer from '@/components/footer';
export default {
    name:"aboutJkvView",
    components:{
        Header,Footer
    }
}
</script>
<style lang="less" scoped>
    .about-jkv-detail{
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
            .ourtext{
                width:800px;
                margin:0 auto;
                padding:30px 0 0;
                .circle_i{
                    position:absolute;
                    top:50%;
                    left:-20px;
                    width:8px;
                    height:8px;
                    margin-top:-4px;
                    border-radius:10px;
                    background:#333;
                }
                p{
                    position:relative;
                }
                .ourintro{
                    line-height:24px;
                    padding:20px 0;
                    color: #333;
                    font-size: 14px;
                    border-bottom:1px dotted #666;
                }
                .ourintrolast{
                    border:none;
                }
                .ourintroimg {
                    text-align:center;
                    margin:20px 0 30px;
                }
                .text-title{
                    font-size:24px;
                }
            }
        }
    }

</style>