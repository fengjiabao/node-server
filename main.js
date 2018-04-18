// var http = require('http');

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
import express from 'express';
// var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.end('hello');
});

var server = app.listen(8888,function(){
    var host = server.address().address;
    var port = server.address().port;
    // console.log('callDef',callDef)
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
console.log('Server running at http://127.0.0.1:8888/');