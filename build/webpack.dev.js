const path = require('path');
const merge = require('webpack-merge');
process.env.NODE_ENV = 'development';
const base = require('./webpack.base.js');

module.exports = merge(base, {
  output: {
    filename: '[name].js'
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    logLevel: 'silent',
    clientLogLevel: 'silent',
    open: true,
    hot: true,
    inline: true,
    // hotOnly: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    overlay: { // 编译错误信息在浏览器全屏显示
      warnings: false,
      errors: true
    }
  }
});
