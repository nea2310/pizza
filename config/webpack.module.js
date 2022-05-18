

const DP = require('./isDev');
const CL = require('./cssLoaders');
const JL = require('./jsLoaders');
const PATHS = require('./paths');


module.exports = {

  module: {
    rules: [  // описание правил как вебПаку работать с тем или иным расширением файлов.
      {
        test: /\.css$/,
        use: CL.cssLoaders(),
      },

      { // работа с препроцессором SCSS
        test: /\.s[ac]ss$/,
        use: CL.cssLoaders('sass-loader') // преобразовать scss в css
      },

      { // работа с файлами шрифтов
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          outputPath: `${PATHS.assets}fonts\\`,
          // eslint-disable-next-line max-len
          publicPath: DP.isAbsPath ? `${PATHS.public}/assets/fonts/` : '/assets/fonts/',
        },
      },

      { // работа с ts файлами
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,  // игнорируем эту папку. что бы не обрабатывать файлы от туда. 
        use: JL.jsLoaders(),
      },

      { // работа с графическими файлами
        test: /\.(png|jpg|svg|gif|webp|avif)$/,
        loader: 'file-loader',
        options: {
          outputPath: `${PATHS.assets}images/`,
          // eslint-disable-next-line max-len
          publicPath: DP.isAbsPath ? `${PATHS.public}/assets/images/` : '/assets/images/',
        },
      },
    ],
  },

};