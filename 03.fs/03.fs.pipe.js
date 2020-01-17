const fs = require("fs");
const readFile = "./logs/bigdata.json";
const writeFile = "./logs/writeFile.data";
let readStream = fs.createReadStream(readFile);
let writeStream = fs.createWriteStream(writeFile);

//利用管道将文件流入输出中
readStream.pipe(writeStream);
console.log("程序执行完毕");