var http = require("http");
var url = require("url");
var mongoClient = require("mongodb").MongoClient;//客户端引入
var mongoUrl = "mongodb://localhost:27017/student";// student是数据库名 

var server = http.createServer(function (req, res) {
  var requrl = url.parse(req.url, true);
  var pathname = requrl.pathname;

  if (pathname == "/") {
    res.writeHead(200, { "Content-Type": "text/html;charset=UTF8" });
    //数据库连接
    mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {//db是连接成功后的句柄或者实例
      if (err) {
        console.log("mongodb连接失败 err:", err);
        res.end("数据库连接失败");
        return;
      }
      res.write("恭喜，数据库连接成功");
      console.log("数据库连接成功");
      var dbo = db.db("student");//数据库选择命令 

      //像指定集合user插入一条记录
      dbo.collection("user").insertOne({ name: "alex" }, function (err, result) {
        if (err) {
          res.end("数据库写入失败");
          return;
        } else {
          if (result.result.ok == 1) {
            console.log("恭喜，数据写入成功");
            res.write("恭喜，数据成功写入");
            res.end();
          } else {
            console.log("遗憾，数据写入失败");
            res.write("遗憾，数据成功失败");
            res.end();
          }
          //最后关闭数据库
          db.close();
        }

      })
    })
  }
})
server.listen(9999);
console.log("MongoDB连接服务器例程运行于： http://127.0.0.1:9999");