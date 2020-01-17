var http = require("http");
var app = require("./model/express_router")
var fs = require("fs")
var ejs = require("ejs")
var server = http.createServer(app);
server.listen(9999);
app.get("/", function (req, res) {
  console.log("访问到了 /");
  res.send("访问到了 /");
})
// 网站标题图片
app.get("favicon.ico", function (req, res) {
  fs.readFile("./view/favicon.ico", function (err, data) {
    if (err) {
      console.log("读取 favicon.ico 失败,err:", err);
    } else {
      //这里应该设置图片类型
      res.send(data);
    }
  })
})

app.get("/login", function (req, res) {
  ejs.renderFile("./view/login.ejs", {}, function (err, data) {
    if (err) {
      console.log("read login.ejs err:", err);
    } else {
      res.send(data);
    }
  })
})
//接受post请求
app.post("/dologin", function (req, res) {
  console.log("req.query", req.query);
  res.send("<script>alert('登录完成')</script>")
})
app.get("/register", function (req, res) {
  ejs.renderFile("./view/register.ejs", {}, function (err, data) {
    if (err) {
      console.log("read register.ejs err:", err);
    } else {
      res.send(data);
    }
  })
})

//渲染变量到ejs中
app.get("/result", function (req, res) {
  ejs.renderFile("./view/result.ejs", {
    operate: "渲染变量",
    result: "成功",
  }, function (err, data) {
    if (err) {
      console.log("read result.ejs err:", err);
    } else {
      res.send(data);
    }
  })
})

console.log("自定义的类express应用运行于 http://127.0.0.1:9999")