// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
import "babel-polyfill"




/**
 * axios http请求插件
 * qs 将json格式转换成适合axios提交数据的格式
 */
import axios from 'axios'
Vue.prototype.$axios = axios
import QS from 'qs'
Vue.prototype.qs = QS;

Vue.prototype.basePath= process.env.API_HOST;

//import 'iview/dist/styles/iview.css';
import '../my-them/index.css'

Vue.use(iView);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
