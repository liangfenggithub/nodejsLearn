const http = require("http");
const fs = require("fs");
const ejs = require('ejs');
const url = require('url');
let app = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  console.log("您访问的pathname是：", pathname);
  let data = "我是从数据库拿到的数据，哈哈哈";

  let list = [
    "我是张三",
    "我是李四",
    "我是王五",
    "我们都是假装从数据库拿到的数据"
  ];
  //把数据库的数据渲染到模板上面
  ejs.renderFile('view/test.ejs', {  //注意：这个读取函数是异步的！
    msg: data,
    list: list
  }, function (err, data) {
    res.end(data);
  })

})
app.listen(9999, "127.0.0.1");
console.log("ejs测试程序监听在 127.0.0.1:9999");