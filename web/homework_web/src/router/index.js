import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkIndexView'
import RecordIndexView from '../views/record/RecordIndexView'
import UserBotIndexView from '../views/user/bot/UserBotIndexView'
import NotFoundView from '../views/error/NotFoundView'
import RankListView from '../views/ranklist/RankListView'
import UserAccountLoginView from '../views/user/account/UserAccountLoginView'
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView'
import HomeIndexView from '../views/home/HomeIndexView'
import store from '../store/index'


const routes = [
  {
    // 重定向到pk页面（后期可修改成封面）
    path:"/",
    name:"home",
    // redirect:"/pk/",
    component: HomeIndexView,
    meta: {
       needAuth : true, 
    }
  },
  {
    path:"/pk/",
    name:"pk_index",
    component:PkIndexView,
    meta: {
      needAuth : true, 
   }
  },
  {
    path:"/record",
    name:"record_index",
    component:RecordIndexView,
    meta: {
      needAuth : true, 
   }
  },
  {
    path:"/ranklist/",
    name:"rank_list",
    component:RankListView,
    meta: {
      needAuth : true, 
   }
  },
  {
    path:"/userbot/",
    name:"user_bot_index",
    component:UserBotIndexView,
    meta: {
      needAuth : true, 
   }
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta: {
      // Login模块不需要授权
      needAuth : false, 
   }
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta: {
      // register模块不需要授权
      needAuth : false, 
   }
  },

  {
    // 404模块不需要授权
    path:"/404/",
    name:"404",
    component:NotFoundView,
    meta: {
      needAuth : false, 
   }
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


// 在router进入其他页面之前，会执行beforeEach函数，用于授权前端页面，强制用户登录
router.beforeEach((to, from, next) =>{
  // 需要授权但未登录，跳转到login页面
  if(to.meta.needAuth && !store.state.user.is_login){
    next({name: "user_account_login"});
  }
  else{
    next();
  }
})

export default router
