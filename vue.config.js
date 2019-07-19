// const express = require('express')
// const app = express()
// let allPoints = require('./src/datas/allPoints.json')  //本地json文件数据
// //let allPoints = require('http://140.143.193.163:8080/mapDemo/getAllMapPoint.ypc')
// let apiRoutes = express.Router();
// app.use('/api',apiRoutes)
module.exports = {
  baseUrl:'/map/',
  devServer:{
    // before(app) {
    //   app.get('/api1/allPoints', (req, res) => {
    //     res.json({
    //         errno: 0,   // 这里是你的json内容
    //         data: allPoints
    //     })
    //   })
    // },
    proxy: {
      '/api2': {
          target: 'http://127.0.0.1:11008',
          ws: true, // 是否启用websockets
          changeOrigin: true,//允许跨域
          pathRewrite: {
            '^/api2': ''
          }
      },
      '/api3': {
          target: 'http://140.143.193.163:8080/',
          ws: true, // 是否启用websockets
          changeOrigin: true,//允许跨域
          pathRewrite: {
            '^/api3': ''
          }
      }
    }
  },
  configureWebpack: {
    externals: {
      "BMap": "BMap"
    }
  }
}