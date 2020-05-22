const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  // 其中一个接口的反向代理配置
  app.use(
    '/ajax', // 公共前缀（参考要请求的地址） 凡是以ajax开头的请求本地没有就都被转到目标主机去请求
    createProxyMiddleware({
      target: 'https://m.maoyan.com', // 目标主机
      changeOrigin: true,
    })
  );
};
