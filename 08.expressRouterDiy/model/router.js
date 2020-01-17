var ejs = require("ejs");
var fs = require("fs");
var path = require("path");

var router = {
  login: function (req, res) {
    console.log("访问到了 login");
    var pathname = path.resolve(__dirname, "../view/login.ejs")
    ejs.renderFile(pathname, {}, function (err, data) {
      if (err) {
        console.log("err", err);
      } else {
        res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
        res.end(data);
      }
    })
  },
  index: function (req, res) {
    console.log("访问到了 index,请尝试访问login和register 查看结果");
    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
    res.write("index");
    res.end();
  },
  register: function (req, res) {
    console.log("访问到了 register")
    var pathname = path.resolve(__dirname, "../view/register.ejs");//获取绝对地址
    console.log(pathname);
    ejs.renderFile(pathname, {}, function (err, data) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("data", data);
        res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
        res.write(data);
        res.end();
      }
    })
  }
}

module.exports = router;
// exports.router = router; //与上者的区别是导入的是整个文件，还需要点操作下。