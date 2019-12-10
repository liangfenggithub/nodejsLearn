//获取get传值演示程序，请手动输入以下url
// http://127.0.0.1:9999/login?user="abc"&psd="123"
let http = require("http");
let url = require("url");
let app = http.createServer((req, res) => {
  let urlinfo = url.parse(req.url, true);
  let pathname = urlinfo.pathname;
  console.log("当前请求的路由是：", pathname);
  let data = "";
  if (pathname == "/favicon.ico") return;//如果是icon请求则不处理。
  switch (pathname) {
    case "/":
      data = "请输入 http://127.0.0.1:9999/login?user='abc'&psd='123'"
      break;
    case "/login":
      let queryValue = urlinfo.query;
      console.log("get拿到的值是：", queryValue);
      data = `请在后台命令行查看拿到的值get值`;
      break;
    default: //如果是
      data = "请输入正确的路径";
      break;
  }
  // let getValue = urlinfo.query;
  // console.log("获取到的get值是：", getValue);
  res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" })
  res.write(data);
  res.end();
})
app.listen(9999, "127.0.0.1")
console.log("GET取值演示服务器监听在 127.0.0.1:9999")