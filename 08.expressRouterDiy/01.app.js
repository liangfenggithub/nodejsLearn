var http = require("http");
var path = require("path");
var url = require("url");
var router = require("./model/router.js")
//路由并不存在，路由是自己定义，每个pathname对应一个处理函数
var app = http.createServer(function (req, res) {
  var method = req.method;
  var path = url.parse(req.url).pathname.replace("/", "");
  // console.log("method:", method);
  // console.log("path:", path);

  if (path != "favicon.ico") {
    try {
      //按照路由来匹配执行处理函数
      router[path](req, res);
    } catch{
      //匹配不成功则返回首页
      router['index'](req, res);
    }
  }

  res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
  res.end("自定义路由测试1");
})
app.listen(9999);
console.log("app listen on http://127.0.0.1:9999")