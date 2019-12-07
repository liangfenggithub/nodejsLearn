const fs = require("fs");
fs.rmdir("logs/test2", (err) => {
  if (err) {
    console.log("删除指定目录失败，error：", err);
  } else {
    console.log("成功删除了目录！");
  }
})
