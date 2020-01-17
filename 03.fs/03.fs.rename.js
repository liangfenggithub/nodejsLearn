const fs = require("fs")
//参数：源名称、目的名称、回调函数
fs.rename("logs/test", "logs/test2", (err) => {
  if (err) {
    console.log("重命名失败，error：", err);
  } else {
    console.log("重命名成功");
  }
})