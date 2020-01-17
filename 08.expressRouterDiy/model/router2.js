var url = require("url")


//response 包装
var rewriteRes = function (res) {
  var end = res.end;
  res.end = function (data, encoding, callback) {

    if (data && !(data instanceof Buffer) && (typeof data != "function")) {
      if (typeof data === "object") {
        data = JSON.stringify(data);
      } else if (typeof data === 'number') {
        data = data.toString();
      }
    }
    //调用
    end.call(res, data, encoding, callback);
  }

  res.send = function (data, type) {
    res.writeHead(200, { //访问头
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/' + (type || 'plain') + '; charset=UTF-8'
    })
    res.end(data);
  }

  res.sendImg = function (data, type, timeout) {
    res.writeHead(200, { //访问头，具体含义是？？？
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'image/' + (type || 'png'),
      'Content-Length': Buffer.byteLength(data),
      'Cache-Control': 'max-age=' + (timeout || 5184000)
    })
    res.end(data);
  }
  return res;
}


var self; //全局指针
var router2 = function () {
  self = this;
  this._get = [];//匹配路由结构数组,全局变量，用闭包来实现
  this._post = [];

  var dispatch = function (req, res) {
    rewriteRes(res);//疑问：为什么修改形参后能改变实参呢？？？？？
    var Url = url.parse(req.url, true);
    var pathname = Url.pathname;
    console.log("请求路径是：", pathname);

    var method = req.method.toLowerCase();
    console.log("请求方法是：", method);


    if (!pathname.startsWith("/")) {
      pathname = "/" + pathname;
    }
    if (!pathname.endsWith("/")) {
      pathname = pathname + "/"
    }

    //拿到请求参数
    if (method == "post") {
      // post的请求参数需要通过数据流的方式拿到
      var postStr = "";
      req.on("data", function (dataChunk) {
        postStr += dataChunk;
      })
      //接受结束捕捉函数
      req.on("end", function () {
        try {
          req.query = JSON.parse(postStr);
        } catch{
          console.log("post 请求解析失败")
        }
      })
    } else {
      //get请求的参数直接就可以拿到
      req.query = Url.query;
    }

    //根据path路径和请求方法调用注册的函数
    if (self['_' + method][pathname]) {//如果指定路径存在的话则执行对应的回调函数。
      console.log("请求参数是：", req.query)
      self['_' + method][pathname](req, res);
    } else {
      res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
      res.send(method + "请求路由不存在：" + pathname);
    }

  }
  //路由注册
  dispatch.get = function (str, callback) {
    console.log("get函数的参数 str：", str);
    if (!(str.startsWith("/"))) {
      str = "/" + str;
    }
    if (!str.endsWith("/")) {
      str = str + "/";
    }
    self._get[str] = callback;
  }

  dispatch.post = function (str, callback) {
    if (!(str.startsWith("/"))) {
      str = "/" + str;
    }
    if (!str.endsWith("/")) {
      str = str + "/";
    }
    self._post[str] = callback;
  }
  return dispatch;
}


module.exports = function () {
  //疑问：为什么返回 router2()不行呢？
  return new router2();

}