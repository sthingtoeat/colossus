import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkindexView'
import RecordIndexView from '../views/record/RecordindexView'
import RecordContentView from '../views/record/RecordContentView'
import RanklistIndexView from '../views/ranklist/RanklistindexView'
import UserBotIndexView from '../views/user/bot/UserBotindexView'
import NotFound from '../views/error/NotFound'
import UserAccountLoginView from '../views/user/account/UserAccountLoginView'
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView'
import store from '../store/index'

const routes = [
  {                       //输入地址home就会跳转至pk这里
    path:"/",
    name:"home",
    redirect:"/pk/" ,
    meta:{                //meta的名可以随意取，总之就是一个用来判断是否授权的变量，取flag:1 也行
      requestAuth: true,  //表示该页面需要进行授权
    }
  }, 
  {
    path:"/pk/",
    name:"pk_index",
    component:PkIndexView,  //component别拼成comment了
    meta:{                
      requestAuth: true,  
    }
  },
  {
    path:"/record/",
    name:"record_index",
    component:RecordIndexView,
    meta:{                
      requestAuth: true,  
    }
  },
  {
    path:"/record/:recordId/",  //路径可以添加参数
    name:"record_content",
    component:RecordContentView,
    meta:{                
      requestAuth: true,  
    }
  },
  {
    path:"/ranklist/",
    name:"ranklist_index",
    component:RanklistIndexView,
    meta:{                
      requestAuth: true,  
    }
  },
  {
    path:"/user/bot/",
    name:"user_bot_index",
    component:UserBotIndexView,
    meta:{                
      requestAuth: true,  
    }
  },
  {
    path:"/404/",
    name:"404",
    component:NotFound,
    meta:{                
      requestAuth: false, //表示该页面不需要授权  
    }
  },
  {
    path:"/user/account/login/",
    name:"user_account_login",
    component:UserAccountLoginView,
    meta:{                
      requestAuth: false,
    }
  },
  {
    path:"/user/account/register/",
    name:"user_account_register",
    component:UserAccountRegisterView,
    meta:{                
      requestAuth: false,
    }
  },
  {                             //如果上面的地址都没有被跳转，说明找不到，转到404页面
    path:"/:catchAll(.*)",
    redirect:"/404/"
  }
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//router在起作用之前会调用下面这个函数，to表示需要跳转到哪个页面，from表示从哪个页面来
router.beforeEach((to , from , next) => {//next表示页面需不需要执行下一步操作
  if(to.meta.requestAuth && !store.state.user.is_login){//如果未授权或者没有登录
    next({name:"user_account_login"});//跳转到登录页面

  }else{
    next();//啥都没填表示啥都不用干
  }
})

export default router
