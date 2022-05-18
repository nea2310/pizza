

// в зависемости от типа файла CSS или JS ложим в соответсвующий каталог в деректории dist/assets/ 
const DP = require('./isDev');
const PATHS = require('./paths');

module.exports = {
  filename: function (ext) {

    let dir = '';

    if (ext === 'css') {
      dir = `${PATHS.assets}css/`;
    }
    dir = dir.replace(/\//g, '\\');

    if (DP.isDev) {
      return `${dir}[name].${ext}`;
    }
    else {
      return `${dir}[name].[hash].${ext}`;
    }

  }
};
