//构造大文本文件的辅助文件,修改程序中 lineCnt可以修改创建文件的行数
const line = 10000;//要创建的行数
const bigfile = "./logs/bigdata.json";//要操作的文件
const fs = require("fs");
fs.stat(bigfile, (err, status) => {
  if (err) {
    console.log(`指定路径文件${bigfile}不存在，开始创建...`);
    //出错说明该文件不存在，手动创建之
    fs.writeFile(bigfile, `大文本文件，一共${line}行`, (err) => {
      if (err) {
        console.log("写文件出错，请检查程序")
      } else {
        //追加大量文本信息
        let lineCnt = line;//行数限制，也是递归终止检测限制
        let appText = () => {
          fs.appendFile(bigfile, "i am append text,ha ha ha\r\n ", (err) => {
            if (err) {
              console.log("追加文件内容出错，请检查程序");
            } else {
              if (--lineCnt > 0) {
                //递归追加
                appText();
              } else {
                console.log("大文件创建完毕，一共创建了" + line + "行");
              }
            }
          })
        }
        //开始执行文本追加
        appText();
      }
    })
  } else {
    console.log(`指定路径文件${bigfile}存在，程序退出`);
    return;
  }
})