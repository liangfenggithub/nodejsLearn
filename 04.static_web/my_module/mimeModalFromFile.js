//通过文件扩展名获取对应的contentType
const fs = require("fs");
exports.getMimeFromFile = function (exname) {
  // fs.readFile("my_module/mime.json", (err, data) => {
  //   if (err) {
  //     console.log("mime文件不存在,error:", err)
  //   } else {
  //     let mimejsonData = JSON.parse(data.toString());
  //     console.log("文件内容是：", mimejsonData);
  //     return mimejsonData[exname];//因为mime是一个键值对，因此根据扩展名为键返回值
  //     //注意：由于readFile是一个异步函数，本函数执行完毕后，文件并未读取完成，
  //     //      也就是说崔颖的contentType并未返回，因此会导致webserver主程序错误，
  //     //      解决办法是使用readFileAnsy 同步读取函数。
  //   }
  // })

  const filedata = fs.readFileSync("my_module/mime.json");
  let jsonStr = filedata.toString();
  // console.log("文件内容是：", jsonStr);
  let mimejsonData = JSON.parse(jsonStr)
  return mimejsonData[exname];//因为mime是一个键值对，因此根据扩展名为键返回值
}