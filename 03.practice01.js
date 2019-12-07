//练习： 判断服务器是否有upload文件夹，用于上传图片的存放，如果没有该文件夹自动创建
const fs = require("fs");
let path = "logs/upload"
//文件夹创建函数
let createDir = () => {
  fs.mkdir(path, (err) => {
    if (err) {
      console.log(`创建${path}失败！error：`, err);
    } else {
      console.log(`${path}创建成功！`);
    }
  })
}


fs.stat(path, (err, status) => {
  if (err) {//如果读不到指定文件名说明不存在，手动创建
    console.log(`文件夹${path}不存在，开始手动创建。。。`);
    createDir();
  } else {
    if (status.isDirectory()) {
      console.log(`${path}存在！`);
    } else {//如果读到的不是文件夹，则手动创建
      createDir();
    }
  }
})