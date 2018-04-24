import express from 'express'
import query from './mysql.js'

var router = express.Router()

/**
 *  login
 **/
router.post('/login', function (req, res) {
  if (!req.session.users) {
    req.session.users = {}
  }
  let token 
  console.log('+++++++++++++++', req.session.users)

  let sql = `SELECT * from dat_user where user_name = "${req.body.name}" and password = "${req.body.pwd}" `

  query(sql, function (error, results, fields) {
    if (error) throw error
    let code = results[0] ? 200 : -1, msg = { code: code, token: token }
    if(code === 200){
      if(req.session.users[req.body.name]){
        console.log(`${req.body.name} already login success!`)
        return res.end(JSON.stringify({code: 200, token: req.session.users[req.body.name]}))
      }else{
        token = req.body.name + '_' + randomString()
        req.session.users[req.body.name] = token
      }
    }
    res.end(JSON.stringify(msg))
  })

  function randomString(len) {// random a string
    　len = len || 32
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      let maxPos = $chars.length
      let pwd = ''
    　　for (let i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    　　}
    　　return pwd
    }
})



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
