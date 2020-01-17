// mkdir类似linux中mkdir目录，用于创建目录
const fs = require("fs")

fs.mkdir("logs", (err) => {
  if (err) {
    console.log("创建目录发生错误", err)
  } else {
    console.log("成功创建目录：logs")
  }
})