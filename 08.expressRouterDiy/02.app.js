var http = require("http");
var url = require("url");
var router2 = require("./model/router2");
var app = router2();

//启动web服务
var server = http.createServer(app);
server.listen(9999);

// 注册路由
app.get("/", function (req, res) {
  res.send("访问了 / ")
})

app.get("/login", function (req, res) {
  res.send("访问到了登录");
})

app.get("/register", function (req, res) {
  res.send("访问到了注册")
})
app.get("/doget", function (req, res) {
  //访问 doget?abc=1&cdf=2
  res.send("get传参,具体参数查看后台log");
})
app.post("/dopost", function (req, res) {
  res.send("post传参,具体参数查看后台log")
})
console.log("router第二次改进运行在 http://localHost:9999")


