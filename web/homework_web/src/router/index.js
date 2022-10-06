import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkIndexView'
import RecordIndexView from '../views/record/RecordIndexView'
import UserBotIndexView from '../views/user/bot/UserBotIndexView'
import NotFoundView from '../views/error/NotFoundView'
import RankListView from '../views/ranklist/RankListView'
import UserAccountLoginView from '../views/user/account/UserAccountLoginView'
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView'
import HomeIndexView from '../views/home/HomeIndexView'

const routes = [
  {
    // 重定向到pk页面（后期可修改成封面）
    path:"/",
    name:"home",
    // redirect:"/pk/",
    component: HomeIndexView
  },
  {
    path:"/pk/",
    name:"pk_index",
    component:PkIndexView
  },
  {
    path:"/record",
    name:"record_index",
    component:RecordIndexView
  },
  {
    path:"/userbot/",
    name:"user_bot_index",
    component:UserBotIndexView
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLoginView,
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegisterView,
  },

  {
    path:"/404/",
    name:"404",
    component:NotFoundView
  },
  {
    path:"/ranklist/",
    name:"rank_list",
    component:RankListView
  },
  {
    // 当输入不合法字符，重定向到404
    path:"/:catchAll(.*)",
    redirect:"/404/"   //注意有两个反斜杠，不然会堆栈溢出
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
