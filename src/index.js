var express = require('express');
var router = express.Router();
var xlsParser = require('node-xlrd');
var excelPort = require('excel-export');
var fs=require('fs');
router.get('/', function(req, res, next) {
  res.end(expTest.xlsx);
});
/* GET home page. */
router.post('/downloadfile', function(req, res, next) {
  var sheetConfig = {};//表格配置对象
  sheetConfig.cols = //列
      [
          {caption: '名称', type: 'string', width: 20},
          {caption: '年龄', type: 'number', width: 30},
          {caption: '地址', type: 'string', width: 30},
      ];
  var rowDatas = //行数据
      [
          ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],
    ['kk', 18, '莲花新村'],//行数据
      ];
  sheetConfig.rows = rowDatas;//填充行数据
  exportToExcel(sheetConfig, 'expTest',res);
  // var content =  fs.readFileSync('./expTest.xlsx',"binary");   
  // res.writeHead(200, "Ok");
  // res.write(content,"binary"); //格式必须为 binary，否则会出错
  // res.end();
});

function exportToExcel(conf,excelName,res)
{
    var result = excelPort.execute(conf);
    var filePath = excelName+ ".xlsx";

    fs.writeFile(filePath, result, 'binary', function (err)
    {
        if (err)
        {
            console.log(err);
            return;
        }
        res.end('ok')
        console.log("----解析成功----");
    });
}

module.exports = router;