# iview

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 安装axios
```bash
npm install vue-axios --save
```

## 安装qs，它的作用是能把json格式的直接转成data所需的格式

```bash
npm insrall qs.js --save
```

## axios跨域问题

### 1.打开config/index.js

### 2.在这里面找到proxyTable{}

### 3.添加以下代码
```javascript
proxyTable: {
      '/api': {
        target: 'http://121.41.130.58:9090',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      }
    }
```
## iview国际化

### 1.安装语言包

```bash
  cnpm install --save vue-i18n@5.0.3
```

### 2.在项目根目录增加文件夹language

```bash
  |-build
  |-config
  |-dist
  |-language    //增加语言文件夹
    |-zh-CN.json  //自定义中文包
    |-index.js    //配置js
    |-en-US.json  //自定义英文包
  ···
```

### 3.在language文件夹中新增文件：index.js,zh-CN.json,en-US.json

> index.js:

```javascript
  /**
 * 引入vue-i18n
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

/**
 * 导入iview自带语言包
 */
import zh from 'iview/dist/locale/zh-CN';
import en from 'iview/dist/locale/en-US';

/**
 * 导入APP json语言包
 */
import app_zh from './zh-CN.json'
import app_en from './en-US.json';

/**
 * 多语言配置  
 * Object.assign(zh,app_zh)  
 * zh       : iview 语言包
 * app_zh   : App json语言包
 */
Vue.locale('zh-CN',Object.assign(zh,app_zh))
Vue.locale('en-US',Object.assign(en,app_en))

// 自动设置语言
//获取本机系统语言
const navLang = navigator.language;  
let localLang = false;

if(navLang == "en"){
    localLang="en-US"
}else if(navLang == "zh"){
    localLang="zh-CN"
}else{
    localLang=false;
}
//const localLang = (navLang == "zh" || navLang == "en") ? navLang : false;
/**
 * localStorage.getItem(key):获取指定key本地存储的值
 * localStorage.setItem(key,value)：将value存储到key字段
 * localStorage.removeItem(key):删除指定key本地存储的值
 */
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';


//配置默认语言
//Vue.config.lang = 'zh-CN'; 默认为中文
//Vue.config.lang = 'en-US'; //默认为英文
Vue.config.lang = lang;

export default{}
```

> zh-CN.json

```javascript
  {
    "product_model" : "产品型号",
    "refresh" : "刷新",
    "language":"语言"
  }
```

> en-US.json

```javascript
  {
    "product_model" : "Product Model",
    "refresh" : "Refresh",
    "language":"Language"
  }
```

### 4.在main.js中导入language/index.js文件

```javascript
  import Vue from 'vue'
  import App from './App'
  import router from './router'
  import iView from 'iview'
  import store from './store'
  import "babel-polyfill"
  import '../language'
```
### 5.使用

```html
  <p>{{ $t('product_model') }}</p> 
```


# 问题记录

## 1.ie浏览器访问时报错，Promise未定义

``` bash
  ie浏览器不支持es6语言

  #安装babel-polyfill 
  npm install babel-polyfill --save

  #在main.js中引入babel-polyfill 
  import 'babel-polyfill'
    
``` 

## 2.ie中正则表达式的反向预搜索报错

```bash
  (?<=通用话费余额：).*?(?=元) 报错：错误的数量词
```
```javascript
  var reg=new RegExp("(?<=通用话费余额：).*?(?=元)");
```
改为
```javascript
  var reg=new RegExp("(?=通用话费余额：).*?(?=元)");
  reg.exec(res.bill).toString().replace("通用话费余额：","")
```
## 3.打包问题

  > 在开发环境中axios中配置了跨域，build后接口请求会出现404错误；

  ```bash

   开发环境中：

  # proxyTable中将/api重写成了空字符串‘’
  # localhost:8080/api/getDevice等价于localhost:8080/getDevice
  https.fetchPost('api/getDevice',params )

   生产环境中：

  # 没有proxyTable，所有的接口都会加上/api这个路径，所以会报错。
  https.fetchPost('api/getDevice',params )

  ```

  > 解决方法：

  #### 1.在config/dev.env.js文件中添加代码：

  ```javascript

  module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_HOST: '"//localhost:8080/api"'
  })

  ```  

  #### 2.在config/prod.env.js中添加代码：

  ```javascript

  module.exports = {
    NODE_ENV: '"production"',
    API_HOST:'""'
  }

  ```

  #### 3.在main.js中添加代码：

  ```javascript

  Vue.prototype.basePath= process.env.API_HOST;

  ```

  #### 4.所有的api接口地址改为

  ```javascript

  https.fetchPost(this.basePath+'/getDevice',params )

  ```  
  