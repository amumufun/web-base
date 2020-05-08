const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    open: true,
    hot: true,
    // hotOnly: true,
    contentBase: path.join(__dirname, 'dist'),
    contentBasePublicPath: path.join(__dirname, 'public'),
    overlay: { // 编译错误信息在浏览器全屏显示
      warnings: true,
      errors: true
    },
  },
})