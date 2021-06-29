# Webpack

- 前端资源构建工具，静态模块打包器（module bundler）
- 将js、json、css、img、less等静态文件作为模块处理
- 根据模块的依赖关系进行静态分析，打包成对应的静态资源（bundle）

## 1.核心概念

### 1.1 Entry

入口，webpack以哪个文件为入口起点开始打包，分析构建内部依赖图

### 1.1 Output

输出，webpack打包后的资源bundles输出到哪里去，以及如何命名

### 1.1 Loader

Loader让webpack能够去处理那些非Javascript文件（webpack自身只理解js）

### 1.1 Plugins

插件可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直等到重新定义环境中的变量等

### 1.1 Mode

模式  
development 开发模式  
production 生产模式
