//fs模块的stat函数，用于判断是目录还是文件
const fs = require("fs");
fs.stat("01.server.js", (err, status) => {
  if (err) {
    console.log(err);
  } else {
    console.log(status);
    console.log(`文件：${status.isFile()}`)
    console.log(`目录：${status.isDirectory()}`)
  }
})