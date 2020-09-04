// Vue项目配置文件 讲解参考：https://blog.csdn.net/qq_21567385/article/details/107634781
'use strict'
// nodejs 的 path 模块
const path = require('path')

/**
 * 获取目录的绝对路径
 *
 * @param {String} dir 目录
 * @return {String} 目录的绝对路径
 */
function resolve(dir) {
  // __dirname 当前模块目录绝对路径
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8081

module.exports = {

  /*
   * 如果该项目是某个网站下的子项目，则这里要配置成子项目名的路径
   * 比如这个子项目是 https://foo.github.io/bar/，那publicPath应该设置为 '/bar/'
   * 在其他大多数情况下，都是直接设置成 '/' 的
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_DEV === 'development',
  // 去除打包后最终打包文件中的map文件
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
    // before: require('./mock/mock-server.js') mock注入

  },
  // webpack的配置放在此处
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        // 配置@指向src目录
        '@': resolve('src')
      }
    }
  },
  // webpack内部配置
  // 定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改
  chainWebpack(config) {
    // preload预加载，webpack优化
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当打开的页面过多，prefetch会产生大量无意义的请求
    config.plugins.delete('prefetch')

    // 非开发环境下的配置
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          // runtime.js的处理策略
          // 使 runtime 代码内联在 index.html 中
          // 下次变动哪个路由就只有被改动的路由 js 会改变，对其他路由 js 文件没有影响。
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          // chunks资源分块
          // 如果使用了某些长期不会改变的库，像 element-ui ，打包完成有 600 多 KB ，包含在默认 vendor 中显然不合适，每次用户都要加载这么大的文件体验不好，所以要单独打包：
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // runtime.js的处理策略，让runtime代码单独抽取打包
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
