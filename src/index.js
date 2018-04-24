var express = require('express')
var router = express.Router()
var xlsParser = require('node-xlrd')
var excelPort = require('excel-export')
var fs = require('fs')

/* GET home page. */
router.get('/downloadfile', function (req, res, next) { // todo: find post not support reason
  var sheetConfig = {}// 表格配置对象
  sheetConfig.cols = // 列
  [
          {caption: '名称', type: 'string', width: 20},
          {caption: '年龄', type: 'number', width: 30},
          {caption: '地址', type: 'string', width: 30}
  ]
  var rowDatas = // 行数据
    [
          ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'] // 行数据
    ]
  sheetConfig.rows = rowDatas// 填充行数据
  let name = 'expTest'
  exportToExcel(sheetConfig, `./public/${name}`, res, name)
})

function exportToExcel (conf, excelName, res, name) {
  var result = excelPort.execute(conf)
  var filePath = excelName + '.xlsx'

  fs.writeFile(filePath, result, 'binary', function (err) {
    if (err) {
      console.log(err)
      return
    }
    res.download(filePath, `${name}.xlsx`)
    // res.end(name) //todo: find get send method
    console.log('----解析成功----')
  })
}

module.exports = router
