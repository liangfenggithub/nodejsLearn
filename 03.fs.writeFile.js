var fs = require("fs");
var data = "hello world"
var path = "logs/20191206.log"
fs.writeFile(path, data, (err) => {
  if (err) {
    console.log("写入错误，error：", err)
  } else {
    console.log("成功写入文件")
  }
})