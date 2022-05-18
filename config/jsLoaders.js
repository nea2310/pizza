
const DP = require('./isDev');
// работа с ts файлами 
module.exports = {
  jsLoaders: () => {
    let loaders = null;
    loaders = [
      {
        loader: 'ts-loader',
        options: {
          configFile: "tsconfig.web.json"
        }
      }
    ];

    if (DP.isDev) {
      loaders.push('eslint-loader'); // позволяет проводить анализ качества вашего кода, написанного на любом выбранном стандарте JavaScript
    }

    return loaders;
  }

};
