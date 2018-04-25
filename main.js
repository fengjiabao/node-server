import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import users from './src/users.js'
import excelExport from './src/excelExport'

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(__dirname + '/public'))//不用路由时可使用

app.use(session({
  secret: 'fengjb',
  name: 'noderserver',                         // ,这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: { maxAge: 30 * 60 * 1000 },    // 设置maxAge是30分钟，即30分钟后session和相应的cookie失效过期
  resave: false,                         // 每次请求都重新设置session cookie
  saveUninitialized: true                // 无论有没有session cookie，每次请求都设置个session cookie
}))

app.all('*', function (req, res, next) { // cors
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-with, X_Requested_With')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  res.header('Content-Type', 'application/json; charset=utf-8')

  if (req.method === 'OPTIONS') {
    res.end('options ok')
  } else {
    next()
  }
})

app.use('/', excelExport)
app.use('/', users)// import login

var server = app.listen(8888, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})

console.log('Server running at http://127.0.0.1:8888/')
