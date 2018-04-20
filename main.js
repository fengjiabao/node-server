import express from 'express'
import bodyParser from 'body-parser'
import query from './src/mysql.js'
import session from 'express-session'
import parseurl from 'parseurl'
import cookieParser from 'cookie-parser'
import users from './src/users.js'
// import index from './src/index.js'
// import cors from 'cors'

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

/**
 *  使用session模块
 *  这里不使用数据库存储session， 不使用数据库存储session， 不使用数据库存储session
 *  使用内存的session存储
 **/
app.use(session({
    secret: 'demo_test',
    name: 'mydemo',                         //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {  maxAge: 30 * 60 * 1000 },    //设置maxAge是30分钟，即30分钟后session和相应的cookie失效过期
    resave: false,                         // 每次请求都重新设置session cookie
    saveUninitialized: true                // 无论有没有session cookie，每次请求都设置个session cookie
}));

// app.get('/', function (req, res) {
//   // res.end('hello')
//   console.log('req.session.views',req.session.views['/'])
//   res.send('you viewed this page ' + req.session.views['/'] + ' times')
// })

app.all('*', function(req, res, next) {
  // res.header("Access-Control-Allow-Credentials", true)
  // res.header("Access-Control-Allow-Origin", "http://localhost:8080");//http://localhost:8080
  // res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  // // res.header("X-Powered-By",' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  
  // next()

  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-with, X_Requested_With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
      res.end('options ok');
  } else {
      next();
  }
})
app.use('/', users);

// app.use('/users', users);

// app.post('/process_post', function (req, res,next) {//todo: export
//   // console.log('req.session',req.session)
//   // if (!req.session.names) {
//   //       console.log('44444444444444444')
//   //       // req.session.names = {}
//   //   }
//   console.log(req.session)
//   req.session = '111'

//   // console.log(req.session)
  
//     // console.log('req.session.viewsprocess_post',req.session.views['/process_post'])  
//   // req.session.names[req.body.name] = req.body.name
//   // console.log('req.session.names',req.session.names)
//   // let sql = `SELECT * from dat_user where user_name = "${req.body.name}" and password = "${req.body.pwd}" `
//   // // console.log('sql',sql)
//   // query(sql, function (error, results, fields) {
//   //   if (error) throw error
//   //   let code = results[0] ? 1 : -1,msg = {code: code} 
//   //   res.end(JSON.stringify(msg))
//   // })
// })

var server = app.listen(8888, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})

console.log('Server running at http://127.0.0.1:8888/')


