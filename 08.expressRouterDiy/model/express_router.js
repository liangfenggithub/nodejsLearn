var url = require("url");

//res的rewrite
var rewriteRes = function (res) {
  res.send = function (data) {
    res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
    res.end(data);
  }
}

var router = function (req, res) {
  var self = this;//保存this，用来实现闭包后的访问
  this._get = [];
  this._post = [];


  var handle = function (req, res) {
    rewriteRes(res);//为什么修改形参却会修改了实参？？？
    var reqUrl = url.parse(req.url, true);
    var pathname = reqUrl.pathname;
    if (!pathname.startsWith("/")) {
      pathname = "/" + pathname;
    }
    if (!pathname.endsWith("/")) {
      pathname = pathname + "/";
    }
    console.log("请求路径是：", pathname);

    var method = req.method.toLowerCase();
    console.log("请求方法是：", method);

    console.log("_post", self._post);
    if (self["_" + method][pathname]) {
      var query = req.query;
      if (method == "get") {
        req.query = query;
        console.log("请求参数是：", req.query);
        self["_" + method][pathname](req, res);
      } else if (method == "post") {
        var chunk = "";
        req.on("data", function (data) {
          chunk += data;
        })
        req.on("end", function () {
          // console.log("chunk is：", chunk)
          try {
            let queryData = {}
            // chunk is： username=asfas&password=12134
            let chunkArr = chunk.split("&");
            // console.log("chunkArr", chunkArr);
            chunkArr.forEach((item) => {
              let key = item.split("=")[0];
              let val = item.split("=")[1];
              queryData[key] = val;
            })
            // console.log("queryData", queryData);
            req.query = queryData;
            //如果要实现程序健壮，这里需要怎么处理。
            console.log("请求参数是：", req.query);
            self["_" + method][pathname](req, res);
          } catch{
            console.log("post传参解析错误")
          }
        })
      }
    } else {
      console.log("访问的pathname不存在:", pathname);
      res.send("404");
    }

    return handle;

  }

  //路由处理函数的注册函数，分为get和post两种
  handle.get = function (str, callback) {
    if (!str.startsWith("/")) {
      str = "/" + str;
    }

    if (!str.endsWith("/")) {
      str = str + "/";
    }

    self._get[str] = callback;

  }

  handle.post = function (str, callback) {
    if (!str.startsWith("/")) {
      str = "/" + str;
    }

    if (!str.endsWith("/")) {
      str = str + "/";
    }

    self._post[str] = callback;
  }


  return handle;

}
module.exports = router();

