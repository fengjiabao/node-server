// var http = require('http')

// http.createServer(function (request, response) {

//     // 发送 HTTP 头部
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'}); //text/plain: 纯文本格式；text/html:html格式；text/xml;text/jpeg、png\gif; application/json：json数据格式；multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');
import express from 'express'
import bodyParser from 'body-parser'
import query from './src/mysql.js'
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
  res.end('hello')
})

app.post('/process_post', urlencodedParser, function (req, res) {
      // 输出 JSON 格式
  var response = {
    'first_name': req.body.first_name,
    'last_name': req.body.last_name
  }
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log('response', response)
  res.end(JSON.stringify(response))
})

var server = app.listen(8888, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
console.log('Server running at http://127.0.0.1:8888/')

query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error
  console.log('The solution is: ', results[0].solution)
})
