var http = require("http");
var url = require("url");
var mongoClient = require("mongodb").MongoClient;//客户端引入
var mongoUrl = "mongodb://localhost:27017/student";// student是数据库名 

var server = http.createServer(function (req, res) {
  var requrl = url.parse(req.url, true);
  var pathname = requrl.pathname;

  res.writeHead(200, { "Content-Type": "text/html;charset=UTF8" });
  if (pathname == "/") {
    res.end("请分别访问 /add、/view、/edit、/delete 来查看CURD效果");
  } else if (pathname == "/add") {
    mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {//数据库连接
      if (err) {
        res.end("数据库连接失败");
        return;
      }
      //像student数据库的user集合user插入一条随机记录
      db.db("student").collection("user").insertOne({
        name: "user_" + Math.ceil(Math.random() * 100),
        age: Math.ceil(Math.random() * 100),
        sex: Math.random() > 0.5 ? "man" : "woman"
      }, function (err, result) {
        if (err) {
          res.end("数据库写入失败");
          return;
        } else {
          if (result.result.ok == 1) {
            res.write("恭喜，数据成功写入");
            res.end();
          } else {
            res.write("遗憾，数据成功失败");
            res.end();
          }
          //最后关闭数据库
          db.close();
        }
      })
    })
  } else if (pathname == "/view") {
    mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
      if (err) {
        res.end("数据库连接错误");
        return;
      }
      console.log("数据库连接成功");
      db.db("student").collection("user").find().toArray(function (err, result) {
        if (err) {
          res.end("遗憾，数据查询失败");
          console.log("err", err);

        } else {
          console.log("reslut", result);
          res.end("数据查询成功，请前往后台运行界面查看结果");
        }
        db.close();
      });
    })
  } else if (pathname == "/edit") {
    mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
      if (err) {
        res.end("数据库连接错误");
        return;
      }
      console.log("数据库连接成功");
      db.db("student").collection("user").updateOne({
        "name": "happy" //要替换文档（记录）的检索条件
      }, {//替换目标内容
        $set: {
          name: "happy update ok",
          age: "100",
        }
      }, function (err, result) {
        if (err) {
          res.end("遗憾，数据更新失败");
          console.log("err", err);
        } else {
          console.log("result", result.result.ok);
          res.end("数据更新成功");
        }
        db.close();
      })
    })
  } else if (pathname == "/delete") {
    mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
      if (err) {
        res.end("数据库连接错误");
        return;
      }
      console.log("数据库连接成功");
      db.db("student").collection("user").deleteOne({
        name: "zhangsan" //要删除文档（记录）的检索条件
      }, function (err, result) {
        if (err) {
          res.end("遗憾，数据删除失败");
          console.log("err", err);
        } else {
          console.log("result", result.result.ok);
          res.end("数据删除成功");
        }
        db.close();
      })
    })
  }

})
server.listen(9999);
console.log("MongoDB连接服务器例程运行于： http://127.0.0.1:9999");