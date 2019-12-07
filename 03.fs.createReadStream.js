const fs = require('fs');
const bigfile = "./logs/bigdata.json";
var fileReadStream = fs.createReadStream(bigfile)
let count = 0;//chunk计算
let str = "";//目的字符串
//流读取时间函数
fileReadStream.on("data", (chunk) => {
  count++;
  console.log(`${count}  接受到长度为：${chunk.length}`);
  str += chunk;
})
//流读取完成监听函数
fileReadStream.on("end", () => {
  console.log("---结束---");
  console.log("接受总次数为：", count);
  // console.log("最终接受到所有数据是：", str) //太大了，不好显示
})
//流读取错误监听函数
fileReadStream.on("error", (err) => {
  console.log("读取出错，error：", err)
})
