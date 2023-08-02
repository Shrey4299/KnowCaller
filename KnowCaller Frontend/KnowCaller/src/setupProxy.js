
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/validate',
        {
      target: "http://apilayer.net", // Your API server URL (without the endpoint)
      changeOrigin: true,
    })
  );
};