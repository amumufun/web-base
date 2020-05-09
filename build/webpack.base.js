const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const PreloadPlugin = require('@vue/preload-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const outputDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

function getAssetName(dir) {
  const devMode = process.env.NODE_ENV !== 'production';
  return devMode ? '[path][name].[ext]' : `${dir}/[contenthash:8].[ext]`;
}

function getUrlLoaderOptions(dir) {
  return {
    loader: 'url-loader',
    options: {
      name: getAssetName(dir),
      limit: 10000,
      esModule: false,
      fallback: {
        loader: 'file-loader',
        options: {
          name: getAssetName(dir),
          esModule: false
        }
      }
    }
  };
}

function getCssLoaderOptions() {
  const devMode = process.env.NODE_ENV !== 'production';
  return [
    devMode ? 'vue-style-loader' : {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: devMode
        // esModule: false,
        // sourceMap: devMode, // 默认值取决于devtool
        // prependData: '$env: ' + process.env.NODE_ENV + ';', // 在文件顶部添加内容
      }
    },
    'css-loader'
  ];
}

function getProdPlugins() {
  const plugins = [];
  const devMode = process.env.NODE_ENV !== 'production';
  if (!devMode) {
    plugins.push(new CleanWebpackPlugin());
    // plugins.push(new PreloadPlugin({ // 也可以通过写webpack特有注释的方式
    //   rel: 'prefetch',
    //   include: 'asyncChunks'
    // }));
    plugins.push(new MiniCssExtractPlugin({
      // publicPath // 默认为output.path
      filename: devMode ? '[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : 'css/[id].[contenthash].css',
      ignoreOrder: false // CSS排序 等下测试一下，似乎是输出css是否排序
      // moduleFilename // 配置css模块名字
    }));
  }
  return plugins;
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: outputDir,
    publicPath: '/'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      use: ['cache-loader', 'vue-loader']
    }, {
      test: /\.css$/,
      use: getCssLoaderOptions()
    }, {
      test: /\.s[ac]ss$/i,
      include: /src/,
      use: [
        ...getCssLoaderOptions(),
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
      use: getUrlLoaderOptions('img')
    }, {
      test: /\.(svg)(\?.*)?$/,
      exclude: path.resolve(__dirname, '../src/assets/icons'),
      use: [{
        loader: 'file-loader',
        options: {
          name: getAssetName('img'),
          esModule: false
        }
      }, 'svgo-loader']
    }, {
      test: /\.(svg)(\?.*)?$/,
      include: path.resolve(__dirname, '../src/assets/icons'),
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          // extract: true,
          // spriteFilename: '[name].[hash].svg',
          symbolId: 'icon-[name]'
          // spriteModule: 'svg-sprite-loader/runtime/browser-sprite.build', // 根据webpack的target自动配置
        }
      }, 'svgo-loader']
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: getUrlLoaderOptions('media')
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
      use: getUrlLoaderOptions('fonts')
    }, {
      test: /\.m?jsx?$/,
      exclude: (file) => (/node_modules/.test(file) && !/\.vue\.js/.test(file)),
      use: {
        loader: 'babel-loader'
      }
    }],
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/ // 设置不需要解析的包
  },
  plugins: [
    ...getProdPlugins(),
    new Dotenv(),
    new CopyPlugin([{
      from: publicDir,
      to: outputDir,
      toType: 'dir',
      ignore: ['.DS_Store', '../public/index.html']
    }]),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      showErrors: true // 错误信息显示在html页面上
    }),
    new SpriteLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
    // modules: ['node_modules'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  target: 'web'
  // resolveLoader: {}, // 同resolve 仅用于loader
  // externals: {} // 提取库作为单独的文件
};
