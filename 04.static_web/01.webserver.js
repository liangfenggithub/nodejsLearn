//简单的web服务器，
var fs = require("fs");
var http = require("http");
var url = require("url");
var app = http.createServer(function (req, res) {
  let data = null;
  let url = req.url;//获取请求的url
  console.log("请求的url是，url:", url);
  if (url == "/favicon.ico") {
    return;
  }
  if (url == "/") {
    url = "/index.html";
  }
  fs.readFile(`./static/${url}`, (err, file) => {
    if (err) {
      console.log(`文件 ./static/${url}  不存在`)
    } else {
      res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });  //状态码200，字符集utf8，文件类型html
      res.write(file)//发送响应数据 
      res.end();//结束响应
    }
  })
})
app.listen(9999, "127.0.0.1");
console.log("server listen on 127.0.0.1:9999")