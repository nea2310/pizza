
const path = require('path');
const PATHS = require('./paths');
const FL = require('./filename');
const DP = require('./isDev');
const OPT = require('./optimization');

const { merge } = require('webpack-merge');
const devServ = require('./webpack.devServer.js');

let demoM = [];
if (DP.isProd) {
  demoM.push('./index.tsx');
} else {
  demoM.push('webpack/hot/dev-server');
  demoM.push('./index.tsx');
}

let pubPath;
if (DP.isAbsPath) pubPath = PATHS.public;

module.exports = merge(devServ, {

  target: 'web',
  devtool: 'source-map',
  entry: {
    demo: demoM,
  },

  context: PATHS.src, // корень исходников
  mode: DP.isDev ? 'development' : 'production',   // собираем проект в режиме разработки
  output: {
    filename: FL.filename('js'),
    path: PATHS.dist, // каталог в который будет выгружаться сборка.
    publicPath: pubPath,
  },


  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],  // когда мы прописываем тут расширения то при импуте в index.js их можно не прописывать 
    alias: {
      '@plugins': `${PATHS.src}\\plugins`,
      '@styles': `${PATHS.src}${PATHS.assets}styles`,
      '@typescript': `${PATHS.src}${PATHS.assets}ts`,
      '@img': `${PATHS.src}${PATHS.assets}images`,
      '@': PATHS.src,
      '~': path.join(__dirname, '../src/react-APP'),
      '~c': path.join(__dirname, '../src/react-APP/components'),
      '~p': path.join(__dirname, '../src/react-APP/pages'),
      '~s': path.join(__dirname, '../src/react-APP/store'),
      '~r': path.join(__dirname, '../src/react-APP/routes')
    }
  },

  optimization: OPT.optimization(), // минификация и оптимизация файлов на выходе  (если это Продакшен)

});
