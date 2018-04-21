import express from 'express'
import query from './mysql.js'

var router = express.Router()

/**
 *  login
 **/
router.post('/process_post', function (req, res) {
  console.log('---------------', req.session.token)
  req.session.token = 111 // todo: random a string
        // + '_' + redomToken();
  console.log('+++++++++++++++', req.session.token)
  let token = req.body.name + req.session.token
  console.log('_________', token)
  let sql = `SELECT * from dat_user where user_name = "${req.body.name}" and password = "${req.body.pwd}" `
  console.log('sql', sql)
  query(sql, function (error, results, fields) {
    if (error) throw error
    let code = results[0] ? 200 : -1, msg = { code: code, token: token}
    res.end(JSON.stringify(msg))
  })
}
)

/**
 *  layout
 **/
router.post('/signout', function (req, res) {
  req.session.token = null
  res.send({
    c: 200,
    m: '感谢使用！'
  })
})

export default router
