module.exports = {
  devServer: {
    open: true,
    proxy: {
      // key表示如果一旦请求地址和它吻合 ，就会触发代理，代理的信息 在对象 value
      // localhost:8888/api/user  => http://ihrm-java.itheima.net/api/user  这是我们需要的地址
      // localhost:8888/api/user  => http://ihrm-java.itheima.net/user

      '/api': {
        target: 'http://ihrm-java.itheima.net/', // 要代理的目标地址
        // target: 'http://127.0.0.1:3000', // 要代理的目标地址
        changeOrigin: true // 是否跨域
        // localhost:8888/api/user => 触发代理 =>
        //  http://www.baidu.com/user  想要这种
        //  http://www.baidu.com/api/user  下面是目前的
        // pathRewrite: {
        //   '^/api': '' // 相当于将跨域代理之后的地址进行再次替换 就可以将 /api去掉
        // }
      }
    }
  },
  lintOnSave: false
}
