const fs = require("fs");
fs.readdir("logs", (err, files) => {
  if (err) {
    console.log("读取目录失败，error：", err)
  } else {
    console.log("该目录下内容是：", files)
  }
})