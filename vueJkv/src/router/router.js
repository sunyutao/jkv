import Vue from 'vue'
import Router from 'vue-router'
import SexplorePlan from '@/views/sexplorePlan'
import Sexplore from '@/views/sexplore'
import Plan from '@/views/plan'
import SexploreDetail from '@/views/sexploreDetail'
import PlanDetail from '@/views/planDetail'
import SetOff from '@/views/setOff'
import SetOffList from '@/views/setOffList'
import SetOffDetail from '@/views/setOffDetail'
import Develop from '@/views/develop'
import AboutJkv from '@/views/aboutJkv'
import Credentials from '@/views/credentials'
import Legal from '@/views/legal'
import Complaint from '@/views/complaint'
import Join from '@/views/join'
import Contactus from '@/views/contactus'
import News from '@/views/news/news'
import ActList from '@/views/news/actList'
import ActDetail from '@/views/news/actDetail'
import PolicyList from '@/views/news/policyList'
import PolicyDetail from '@/views/news/policyDetail'
import TipsList from '@/views/news/tipsList'
import TipsDetail from '@/views/news/tipsDetail'
import PreferList from '@/views/news/preferList'
import PreferDetail from '@/views/news/preferDetail'
import SmallTool from '@/views/news/smallTool'
import Login from '@/views/user/login'
import Regist from '@/views/user/regist'
import ForgetPwd from '@/views/user/forgetPwd'
import Home from '@/views/home'
import CalDetail from '@/views/news/calDetail'
import ThingList from '@/views/exper/thing/thingList'
import AddThing from '@/views/exper/thing/addThing'
import ThingDetail from '@/views/exper/thing/thingDetail'
import Exper from '@/views/exper/exper'
import TopicList from '@/views/exper/topic/topicList'
import TopicDetail from '@/views/exper/topic/topicDetail'
import AddTopic from '@/views/exper/topic/addTopic'
import WonList from '@/views/exper/won/list'
import WonDetail from '@/views/exper/won/detail'
import AddOwnTheme from '@/views/exper/won/addOwnTheme'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sexplorePlan',
      name: 'sexplorePlan',
      component: SexplorePlan
    },
    {
      path: '/sexplore',
      name: 'sexplore',
      component: Sexplore
    },
    {
      path: '/plan',
      name: 'plan',
      component: Plan
    },
    {
      path: '/sexploreDetail/:id',
      name: 'sexploreDetail',
      component: SexploreDetail
    },
    {
      path: '/planDetail/:id',
      name: 'planDetail',
      component: PlanDetail
    },
    {
      path: '/setOff',
      name: 'setOff',
      component: SetOff
    },
    {
      path: '/setOffList',
      name: 'setOffList',
      component: SetOffList
    },
    {
      path: '/setOffDetail/:id',
      name: 'setOffDetail',
      component: SetOffDetail
    },
    {
      path: '/develop',
      name: 'develop',
      component: Develop
    },
    {
      path: '/aboutJkv',
      name: 'aboutJkv',
      component: AboutJkv
    },
    {
      path: '/credentials',
      name: 'credentials',
      component: Credentials
    },
    {
      path: '/legal',
      name: 'legal',
      component: Legal
    },
    {
      path: '/complaint',
      name: 'complaint',
      component: Complaint
    },
    {
      path: '/join',
      name: 'join',
      component: Join
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: Contactus
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      children:[
        {
          path: 'smallTool',
          name: 'smallTool',
          component: SmallTool,
        }
      ]
    },
    {
      path: '/actList',
      name: 'actList',
      component: ActList
    },
    {
      path: '/actDetail/:id',
      name: 'actDetail',
      component: ActDetail
    },
    {
      path: '/policyList',
      name: 'policyList',
      component: PolicyList
    },
    {
      path: '/policyDetail/:id',
      name: 'policyDetail',
      component: PolicyDetail
    },
    {
      path: '/tipsList',
      name: 'tipsList',
      component: TipsList
    },
    {
      path: '/tipsDetail/:id',
      name: 'tipsDetail',
      component: TipsDetail
    },
    {
      path: '/preferList',
      name: 'preferList',
      component: PreferList
    },
    {
      path: '/preferDetail/:id',
      name: 'preferDetail',
      component: PreferDetail
    },
    {
      path: '/calDetail',
      name: 'calDetail',
      component: CalDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login 
    },
    {
      path: '/regist',
      name: 'regist',
      component: Regist 
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: ForgetPwd 
    },
    {
      path: '/thingList',
      name: 'thingList',
      component: ThingList 
    },
    {
      path: '/addThing',
      name: 'addThing',
      component: AddThing 
    },
    {
      path: '/thingDetail/:id',
      name: 'thingDetail',
      component: ThingDetail 
    },
    {
      path: '/exper',
      name: 'exper',
      component: Exper
    },
    {
      path: '/topicList',
      name: 'topicList',
      component: TopicList,
    },
    {
      path: '/topicDetail/:id',
      name: 'topicDetail',
      component: TopicDetail,
    },
    {
      path: '/addTopic',
      name: 'addTopic',
      component: AddTopic,
    },
    {
      path: '/wonList',
      name: 'wonList',
      component: WonList
    },
    {
      path: '/wonDetail/:id',
      name: 'wonDetail',
      component: WonDetail
    },
    {
      path: '/addOwnTheme',
      name: 'addOwnTheme',
      component: AddOwnTheme
    }
  ]
})
