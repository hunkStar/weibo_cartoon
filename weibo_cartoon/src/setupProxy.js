const proxy = require('http-proxy-middleware')
module.exports = function(app) {
    app.use(
        proxy.createProxyMiddleware('/carton', { //`cartoon`是需要转发的请求
            target: 'https://manhua.weibo.cn', // 这里是接口服务器地址
            changeOrigin: true,
            pathRewrite: {
                '^/carton': ''
            }
        }),
    )
}