//获取post传值演示程序，利用postman软件像本程序发送post请求
// http://127.0.0.1:9999/login?user="abc"&psd="123"
let http = require("http");
let url = require("url");
let app = http.createServer((req, res) => {
  if (req.method.toLowerCase() == "post") {
    console.log("这是一个post请求");
    let postData = "";
    //监听post数据
    req.on("data", (dataChunk) => {
      postData += dataChunk;//分块接受post数据（如果数据小一次就能接受完成）
    })
    req.on("end", () => {
      console.log("接受到post数据为：", postData);
      res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" })
      res.write("成功取得post数据");
      res.end();
    })
  }
})
app.listen(9999, "127.0.0.1")
console.log("POST取值演示服务器监听在 127.0.0.1:9999")