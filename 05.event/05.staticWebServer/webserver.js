const fs = require("fs");
const url = require("url");
const http = require("http");
const path = require("path");
const events = require("events");
const mimeModal = require("./module/mimeModalByEvent.js")
const app = http.createServer(function (req, res) {
  if (req.url == "/") {
    req.url = "/index.html";
  }
  if (req.url == "/favicon.ico") {
    return;
  }
  let pathname = url.parse(req.url).pathname;//获取要请求的文件
  console.log("请求的pathname是：", pathname);
  let exname = path.extname(pathname);//获取文件扩展名
  console.log("文件扩展名是：", exname);

  let fileLocation = "../../04.static_web/static/" + pathname;
  let notFound = "../../04.static_web/static/404.html";
  fs.readFile(fileLocation, (err, data) => {
    if (err) {
      console.log(404);
      console.log(`文件${pathname}没有在 ${fileLocation} 处找到！`)
      res.writeHead(404, { "Content-Type": "text/html;charset='utf-8'" });
      res.write(notFound);//发送404页面
      res.end();
    } else {
      // 获取文件扩展名对应的ContentType
      let eventEmitter = new events.EventEmitter();
      mimeModal.getMime(eventEmitter, exname);

      eventEmitter.on("readContentTypeOk", (val) => {
        console.log("监听到了readContentTypeOk事件，开始像浏览器返回数据");
        res.writeHead(200, { "Content-Type": val + ";charset='utf-8'" });
        res.write(data);
        res.end();
      })
    }
  })


});
app.listen(9999, "127.0.0.1")
console.log("server listen on 127.0.0.1:9999")