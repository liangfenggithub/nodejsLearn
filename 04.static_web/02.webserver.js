//简单的web服务器，
var fs = require("fs");
var http = require("http");
var url = require("url");
var path = require("path");
var mimeModal = require("./my_module/mimeModal");
var app = http.createServer(function (req, res) {
  //获取浏览器请求文件名
  let requestUrl = req.url;//获取请求的url
  requestUrl = url.parse(requestUrl).pathname;//过滤掉查询字符串
  console.log("请求的url是，url:", requestUrl);
  if (requestUrl == "/favicon.ico") {
    return;
  }
  if (requestUrl == "/") {
    requestUrl = "/index.html";
  }
  //获取浏览器请求文件的扩展名
  let exname = path.extname(requestUrl);
  console.log("扩展名是：", exname);
  let contentType = mimeModal.getMime(exname);
  fs.readFile(`./static/${requestUrl}`, (err, file) => {
    if (err) {
      console.log(`文件 ./static/${requestUrl}  不存在`);
      //返回404
      fs.readFile("./static/404.html", (err, data404) => {
        if (err) {
          console.log("404文件读取出错")
        } else {
          res.writeHead(404, { "Content-Type": "text/html;charset=UTF-8" });
          res.write(data404);
          res.end();
        }
      })

    } else {
      //根据浏览器请求文件扩展名返回对应的content-type

      res.writeHead(200, { "Content-Type": `${contentType};charset=UTF-8` });  //状态码200，字符集utf8，文件类型html
      res.write(file)//发送响应数据 
      res.end();//结束响应
    }
  })
})
app.listen(9999, "127.0.0.1");
console.log("server listen on 127.0.0.1:9999")