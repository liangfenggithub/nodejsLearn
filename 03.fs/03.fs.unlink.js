const fs = require("fs");
let filename = "test.html"
fs.unlink(`logs/${filename}`, (err) => {
  if (err) {
    console.log(`删除文件${filename}失败，error：`, err)
  } else {
    console.log(`成功删除了文件:${filename}`)
  }
})