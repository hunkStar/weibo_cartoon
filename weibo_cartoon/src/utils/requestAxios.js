import axios from "axios"
const instance = axios.create({
    // baseURL: "https://manhua.weibo.cn/"
});

// 添加请求的拦截器
instance.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
});

// 添加响应的拦截器
instance.interceptors.response.use(function(response) {
    return response.data;
}, function(error) {
    return Promise.reject(error);
});

export default instance;