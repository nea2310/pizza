const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Он создает файл CSS для каждого файла JS, который содержит CSS
// работа с файлами стилей
module.exports = {
  cssLoaders: extra => {
    const loaders = [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                "autoprefixer",
                {
                  // Options
                },
                'css-mqpacker',
                {
                  // Options
                },
                'cssnano',
                {
                  preset: [
                    'default', {
                      discardComments: {
                        removeAll: true,
                      }
                    }
                  ]
                }
              ],
            ],
          }
        }
      }
    ];

    const processGlob = {
      loader: 'sass-resources-loader',
      options: {
        resources: [
          path.join(__dirname, '../src/assets/styles/glob.scss'),
        ],
      },
    };


    if (extra) {
      loaders.push(extra);
      loaders.push(processGlob);
    }

    return loaders;
  }

};