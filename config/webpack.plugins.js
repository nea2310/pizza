const HTMLWebpackPlugin = require('html-webpack-plugin'); // упрощает создаение HTML файлов, добавления хеша в имена файлов
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // удаляет все ненужные файлы при перестройке проекта
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Он создает файл CSS для каждого файла JS, который содержит CSS
const FL = require('./filename');
const path = require('path');

module.exports = {

  plugins: [
    new CleanWebpackPlugin(),   // очищаем от лишних файлов в папке дист

    new HTMLWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, '../src/index.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),


    new MiniCssExtractPlugin({
      filename: FL.filename('css')
    }),

    new webpack.HotModuleReplacementPlugin({ multiStep: true }),
  ],

};