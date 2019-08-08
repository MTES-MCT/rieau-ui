import { env } from 'utils/env-helper';
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', { target: env('REACT_APP_API_URL'), changeOrigin: true })
  );
};
