const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy para a API principal
  app.use(
    '/leque-de-modas-api',
    createProxyMiddleware({
      target: 'https://lequedemodas.com.br:8443',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onError: function (err, req, res) {
        console.log('Proxy Error:', err);
      },
      onProxyReq: function (proxyReq, req, res) {
        console.log('Proxying request to:', proxyReq.path);
      },
      onProxyRes: function (proxyRes, req, res) {
        console.log('Proxy response status:', proxyRes.statusCode);
        // Adicionar headers CORS
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
      }
    })
  );

  // Proxy para imagens
  app.use(
    '/lojas',
    createProxyMiddleware({
      target: 'http://177.153.62.253',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    })
  );
};