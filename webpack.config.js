// ./webpack.config.js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/app.js', // 表示webpakc的入口文件,指定打包的文件,可以一个或者多个
  output: {
    path: path.resolve(__dirname, 'target'), // 输出的路径
    filename: 'index.js', // 输出的文件名
    clean: true
  },
  mode: 'development', // 表示打包的环境(production,会把index.js文件里的代码压缩成一行),使用CssMinimizerPlugin必须是production
  /**
   * loader
   */
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/, // 正则匹配需要处理的文件后缀名
            // loader: 'style-loader' // 使用loader字段时,可以只传入一个loader,而使用use,则需要多个
            use: [
              // 'style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['postcss-preset-env']
                  }
                }
              }
            ] // 处理样式资源 style-loader和css-loader缺一不可
          },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              'less-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['postcss-preset-env']
                  }
                }
              }
            ] // 处理less需要这三个,缺一不可
          },
          {
            test: /\.sass$/, // postcss识别不了sass语法
            use: ['style-loader', 'css-loader', 'sass-loader'] // 处理sass需要这三个,缺一不可
          },
          {
            test: /\.(png|jpe?g|gif|svg|webp)$/,
            type: 'asset/resource',
            parser: {
              dataUrlCondition: {
                maxSize: 200 * 1024
              }
            },
            generator: {
              filename: 'static/imgs/[hash][ext][query]' // target/static/imgs/....
            }
          },
          {
            test: /\.(ttf|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
              filename: 'static/fonts/[hash][ext][query]'
            }
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/,
            include: path.resolve(__dirname, './src'), // 只转换src目录下的代码
            // use: ['babel-loader'],
            loader: 'babel-loader', // 开启缓存就需要注释use: ['babel-loader'],并且缓存文件在 node_modules/.bin
            options: {
              cacheDirectory: true,
              cacheCompression: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/index.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new CssMinimizerPlugin()
  ],
  devtool: 'source-map'
}
config.mode = process.env.NODE_ENV
console.log('===========================', config.mode)
if (config.mode === 'development') {
  config.devServer = {
    host: 'localhost',
    open: true,
    port: 9000
  }
}
module.exports = config
