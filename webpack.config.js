// ./webpack.config.js
const path = require('path')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/app.js', // 表示webpakc的入口文件,指定打包的文件,可以一个或者多个
  output: {
    path: path.resolve(__dirname, 'target'), // 输出的路径
    filename: 'index.js', // 输出的文件名
    clean: true
  },
  mode: 'development', // 表示打包的环境(production,会把index.js文件里的代码压缩成一行)
  /**
   * loader
   */
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配需要处理的文件后缀名
        // loader: 'style-loader' // 使用loader字段时,可以只传入一个loader,而使用use,则需要多个
        use: [
          'style-loader',
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
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] }
    ]
  }
}
