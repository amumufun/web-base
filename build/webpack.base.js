const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/main.js',
  output: {
    filename: devMode ? '[name].js' : '[name][chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.s[ac]ss$/i,
      include: /src/,
      use: [
        devMode ? 'vue-style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
            hmr: process.env.NODE_ENV === 'development',
            // sourceMap: devMode, // 默认值取决于devtool
            // prependData: '$env: ' + process.env.NODE_ENV + ';', // 在文件顶部添加内容
          },
        },
        'css-loader',
        'sass-loader',
      ]
    }, {
      test: /\.(png|svg|jpe?g|gif)$/i,
      include: /src/,
      use: [{
        loader: 'url-loader',
        options: {
          name(resourcePath, resourceQuery) {
            // `resourcePath` - `/absolute/path/to/file.js`
            // `resourceQuery` - `?foo=bar`
            return devMode ? '[path][name].[ext]' : '[contenthash].[ext]'; 
          },
          limit: 8192,
          outputPath: 'img',
        },
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      include: /src/,
      use: [{
        loader: 'file-loader',
        options: {
          name(resourcePath, resourceQuery) {
            // `resourcePath` - `/absolute/path/to/file.js`
            // `resourceQuery` - `?foo=bar`
            return devMode ? '[path][name].[ext]' : '[contenthash].[ext]'; 
          },
          outputPath: 'font',
        },
      }]
    }, {
      test: /\.m?js$/i,
      exclude: file => (/node_modules/.test(file) && !/\.vue\.js/.test(file)),
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // publicPath // 默认为output.path
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
      ignoreOrder: false, // CSS排序 等下测试一下，似乎是输出css是否排序
      // moduleFilename // 配置css模块名字
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      showErrors: true, // 错误信息显示在html页面上
    }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: { // 配置单独提取js、css
      }
    },
    runtimeChunk: 'single',
  },
  // externals: {} // 提取库作为单独的文件
};
