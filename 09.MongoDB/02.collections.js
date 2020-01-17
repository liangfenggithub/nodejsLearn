var mongoClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017/student";

mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
  if (err) {
    console.log("连接数据库发生错误，err：", err);
  } else {
    console.log("数据库连接成功");
    var dbo = db.db("student")
    var result = [];
    var userRel = dbo.collection("user").find();
    userRel.each(function (err, doc) {
      if (err) {
        console.log("游标遍历错误");
        return;
      }
      if (doc != null) {//当doc== null时，说明遍历完成
        result.push(doc);
      } else {
        console.log("result:", result);
        db.close();

      }
    })
  }
})