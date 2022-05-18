

const PATHS = require('./paths');

module.exports = {
  devServer: { // локальный сервер который будет запущен на http://localhost:8080/
    contentBase: PATHS.dist.replace(/\/\//g, "/") + '\\',
    compress: true,
    port: 8080,
    historyApiFallback: true,
    open: true,
    proxy: {
      '/reactcourseapi/**': {
        target: 'http://faceprog.ru',
        secure: false,
        changeOrigin: true
      }
    }
  },

};

