import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login/login_box'
import Log from '@/components/home/log'
import Config from '@/components/home/config'
import Attend from '@/components/attend/attend'
import ConfigEdit from '@/components/home/config_edit'

Vue.use(Router)

export default new Router({
  routes: [
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
          path:'config-edit',
          name:'config-edit',
          component:ConfigEdit
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
  ]
})
