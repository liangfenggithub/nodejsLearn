const fs = require("fs");
let fileName = "./logs/writeFile.data"
let createWriteStream = fs.createWriteStream(fileName);
createWriteStream.write("我是通过流写入的数据\r\n", "UTF8");//以指定编码写入内容
createWriteStream.end();//标记文件末尾
createWriteStream.on("error", (err) => {
  console.log("文件写入出错,error:", err);
})
createWriteStream.on("finish", (err) => {
  console.log("文件写入完成！");
})
console.log("程序执行完毕");//注意：因为上述监听函数都是异步，因此这行函数被先执行。
