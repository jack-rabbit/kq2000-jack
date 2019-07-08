import axios from 'axios'
import Qs from 'qs'


let TOKEN='';

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
//axios.defaults.headers.common["Authorization"] = '1234567890';//配置token

axios.defaults.baseURL = '';   //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {

    TOKEN=localStorage.getItem("token");
    if(TOKEN){
        console.log(1);
        config.headers.common['token'] = TOKEN;
        axios.defaults.headers.common["token"] = TOKEN;//配置token
    }else{
        console.log(0);
    }
    
    //console.log(config)

    //在发送请求之前做某件事
    if(config.method  === 'post'){
        config.data = Qs.stringify(config.data);//不转换可正常请求
    }
    return config;
},(error) =>{
    console.log('错误的传参')
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事
    console.log(res);
    if(!res.data.success){
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    console.log('网络异常')
    return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet,
}