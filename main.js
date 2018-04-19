import express from 'express'
import bodyParser from 'body-parser'
import query from './src/mysql.js'
import session from 'express-session'
import parseurl from 'parseurl'

var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.use(session({//todo : export
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
 
app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }
 
  // get the url pathname
  var pathname = parseurl(req).pathname
 
  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
 
  next()
})

app.get('/', function (req, res) {
  // res.end('hello')
  console.log('req.session.views',req.session.views['/'])
  res.send('you viewed this page ' + req.session.views['/'] + ' times')
})

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next()
})

app.post('/process_post', urlencodedParser, function (req, res,next) {//todo: export
  let sql = `SELECT * from dat_user where user_name = "${req.body.name}" and password = "${req.body.pwd}" `
  console.log('sql',sql)
  query(sql, function (error, results, fields) {
    if (error) throw error
    let code = results[0] ? 1 : -1,msg = {code: code} 
    res.end(JSON.stringify(msg))
  })
})

var server = app.listen(8888, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})

console.log('Server running at http://127.0.0.1:8888/')


