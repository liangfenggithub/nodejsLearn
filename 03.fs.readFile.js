const fs = require("fs");
var path = "logs/20191206.log"

fs.readFile(path, "utf8", (err, data) => {
  if (err) {
    console.log("读物文件出错，error：", err);
  } else {
    console.log("文件内容是：", data);
  }
})