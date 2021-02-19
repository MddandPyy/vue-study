import axios from 'axios'
import router from './index'

//请求拦截
axios.interceptors.request.use(function (config) {
    console.log("请求"+JSON.stringify(config))
    if(config.url != "/api/login"){
        if(localStorage.getItem('usertoken')){
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('usertoken')
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
});
//响应拦截
axios.interceptors.response.use(function (response) {
    console.log("response----"+JSON.stringify(response));
    if(response.data.flag == false){
        if(response.data.code == 400){
            localStorage.removeItem('usertoken');
            router.push("/nologin");
        }
    }
    return response
}, function (error) {
    console.log("error"+error);
    return Promise.reject(error)
});
export default axios