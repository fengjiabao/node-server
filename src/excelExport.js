import express from 'express'
// import xlsParser from "node-xlrd" //读取文件,仅支持xls格式文件,不支持xlsx
import excelPort from 'excel-export'
import fs from 'fs'
let router = express.Router()

/* GET home page. */
router.get('/downloadfile', function (req, res, next) { // todo: find post not support reason
  let fileName = req.query.fileName
  let sheetConfig = {}// 表格配置对象
  // sheetConfig.stylesXmlFile = "styles.xml";
  sheetConfig.name = "sheet";
  sheetConfig.cols = // 列
  [
          {caption: '名称', type: 'string', width: 20},
          {caption: '年龄', type: 'number', width: 30},
          {caption: '地址', type: 'string', width: 30}
  ]
  let rowDatas = // 行数据
    [
          ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'] // 行数据
    ]
  sheetConfig.rows = rowDatas// 填充行数据
  exportToExcel(sheetConfig, `./public/${fileName}`, res, fileName)
})

function exportToExcel (conf, excelName, res, fileName) {
  let result = excelPort.execute(conf)
  let filePath = excelName + '.xlsx'

  fs.writeFile(filePath, result, 'binary', function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('filename----',fileName)
    res.download(filePath, `${fileName}.xlsx`)
  })
}

export default router
