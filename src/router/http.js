import axios from 'axios'

//请求拦截
axios.interceptors.request.use(function (config) {
    console.log(config)
    if(localStorage.getItem('usertoken')){
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('usertoken')
    }
    return config
}, function (error) {
    return Promise.reject(error)
});
//响应拦截
axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log("error"+error);
    if(error.response.data.code == 401 || error.response.data.code == 402){
        this.$router.push('/login');
        localStorage.removeItem('usertoken');
    }
    return Promise.reject(error)
});
export default axios