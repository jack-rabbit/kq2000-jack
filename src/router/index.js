import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login/login_box'
import Log from '@/components/home/log'
import Config from '@/components/home/config'
import Attend from '@/components/attend/attend'


Vue.use(Router)

let routes =  [
    {
    path: '/',
    name: 'login',
    component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect:'/home/config',
      children:[      
        {
          path:'config',
          name:'config',
          component:Config
        },
        {
          path:'log',
          name:'log',
          component:Log
        },
        {
          path:"attend",
          name:"attend",
          component:Attend
        }
      ]
    }
  ];

  const router = new Router({
    history: true,
    routes : routes
  });
router.beforeEach((to, from, next) => {
    console.log(to.matched);
    if (to.matched.length ===0) {                                        //如果未匹配到路由
      from.name ? next({ name:from.name }) : next('/home/config');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    } else {
      next();                                                                            //如果匹配到正确跳转
    }
  });

export default router
