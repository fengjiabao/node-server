var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('---------------',req.session.token);
  if (req.session.views) {
      req.session.views++;
      res.send('第 ' + req.session.views + ' 次访问');
  } else {
      req.session.views = 1;
      res.send('欢迎您，请刷新试试');
  }
});


router.get('/home', function (req, res, next) {
    console.log(req.session.id);
    if (req.session.token) {
        res.send(req.session.token)
    } else {
        res.send('授权过期重新登录')
    }
});

/**
 *  登录
 **/
router.post('/process_post', function (req, res) {
       console.log('---------------',req.session.token);
        req.session.token = 111
        // + '_' + redomToken();
        console.log('+++++++',req.session.token);
        res.send({
            code: 200,
            token: req.session.token,
            errmsg: '登录成功'
        })
    }
)

/**
 *  退出
 **/
router.post('/signout', function (req, res) {
    req.session.token = null;
    res.send({
        c: 200,
        m: '感谢使用！'
    });
})

module.exports = router;
