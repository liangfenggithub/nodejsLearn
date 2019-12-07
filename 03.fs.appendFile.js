//追加文件
var fs = require("fs")
var path = "logs/20191206.log"
fs.appendFile(path, "哈哈哈哈", (err) => {
  if (err) {
    console.log("追加文件出错，错误原因:", err);
  } else {
    console.log("文件追加成功！")
  }
})

