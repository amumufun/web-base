const webpack = require('webpack');
const merge = require('webpack-merge');
process.env.NODE_ENV = 'production';
const base = require('./webpack.base.js');

module.exports = merge(base, {
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: { // 配置单独提取js、css
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single' // 提取runtime为单独文件
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin({
      hashDigest: 'hex'
    })
  ]
});
