//练习程序：读取指定目录下的所有目录
const fs = require("fs");

let readDir = (path) => {
  let dirArray = [];
  fs.readdir(path, (err, files) => {
    if (err) {
      console.log("目录读取失败,error:", err);

    } else {
      //这里的files是一个字符串组成的数组，有目录有文件，需要手动判断下。
      files.forEach((file) => {

        //拼接相对路径，如果是目录则继续读取
        let pathTarget = `${path}/${file}`
        //判断是目录还是文件
        fs.stat(pathTarget, (err, status) => {
          if (err) {
            console.log(`读取目录${file}失败，error：`, err)
          } else {
            if (status.isDirectory()) {
              dirArray.push(file);
              // 打印目录
              console.log(`|-${file}\r\n`);
              //递归读取
              readDir(pathTarget)
            }
            if (status.isFile()) {
              //打印文件名
              console.log(`|--${file}\r\n`);
            }

            //疑问， 如何判断递归读取完毕了？
            //      回调函数如何判断函数已经执行完毕了呢？
            //      也就是何时打印出dirArray呢？
          }
        })
      })
    }
  })
}

//开始执行
readDir("./");