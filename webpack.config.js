/*webpack.config.js webpack的配置文件
* 作用：指示webpack 干哪些活（当你运行webpack指令时，会加载里面的配置）
* 所有构件工具都是基于nodejs平台运行的~模块化默认采用commonjs*/

/*
* loader: 1.下载 2.使用（配置loader）
* plugins: 1.下载 2.引入 3.使用*/

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { resolve } = require('path')
const path = require('path')

module.exports = {
  // webpack配置
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'),
    // publicPath: '/'
  },
  // loader配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        // 匹配哪些文件
        test: /\.less$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          'css-loader',
          // 将less文件编译成css文件
          'less-loader'
        ]
      },
      {
        // 处理图片资源
        // 问题：处理不了html中img图片
        test: /\.(jpg|png|gif)$/,
        // 下载 url-loader file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理，根据实际情况定义limit大小
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用ES6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭url-loader的ES6模块化，使用commonjs解析
          esModule: false,
          name: '[hash:10].[ext]',
          outputPath: 'assets/img', // 为你的文件配置自定义 output 输出目录 ; 用来处理图片路径问题
          publicPath: 'assets/img', // 为你的文件配置自定义 public 发布目录 ; 用来处理图片路径问题
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        // webpack4：只需要配置url-loader的esModule:false   webpack5：url-loader和 html-loader都需要配置
        options: {
          esModule: false
        }
      },
      // 打包其他资源（除了css、js、html以外的资源）
      {
        // 排除css、js、html资源
        exclude: /\.(css|js|html|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  // plugins配置
  plugins: [
    // 详细plugins配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的html，引入打包输出的所有资源（js/css）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 ./src/index.html 文件，并自动引入所有资源
      template: './src/index.html'
    })
  ],
  // 模式
  mode: 'development',
  // mode:'production',

  // 开发服务器 devServer： 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3096,
    // 自动打开浏览器
    open: true
  }
}
