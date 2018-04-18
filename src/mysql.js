import mysql from 'mysql'
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
})

var query = function (sql, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null)
    } else {
      conn.query(sql, function (qerr, vals, fields) {
        conn.release()// 释放链接
        console.log('A connection has been release')
        callback(qerr, vals, fields)// 事件驱动回掉
      })
    }
  })
}

export default query
