//路由演示程序，请手动输入以下url
// http://127.0.0.1:9999/login
// http://127.0.0.1:9999/register
// http://127.0.0.1:9999/loginout
let http = require("http");
let url = require("url");
let app = http.createServer((req, res) => {
  let urlinfo = url.parse(req.url, true);
  let pathname = urlinfo.pathname;
  console.log("当前请求的路由是：", pathname);
  let file = "";
  if (pathname == "/favicon.ico") return;//如果是icon请求则不处理。
  switch (pathname) {
    case "/login":
      file = "i am login.html"
      break;
    case "/register":
      file = "i am register.html"
      break;
    case "/loginout":
      file = "i am logiout.html"
      break;
    case "/":
      file = "路由演示程序，请手动输入以下url: http://127.0.0.1:9999/login或者http://127.0.0.1:9999/register或者http://127.0.0.1:9999/loginout";
      break;
    default:
      file = "请输入正确的路径";
      break;
  }
  // let getValue = urlinfo.query;
  // console.log("获取到的get值是：", getValue);
  res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" })
  res.write(file);
  res.end();
})
app.listen(9999, "127.0.0.1")
console.log("路由演示服务器监听在 127.0.0.1:9999")