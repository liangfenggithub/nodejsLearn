var http = require('http');
http.createServer(function (request, response) {
	//发送http头部
	//HTTP 状态值：200 ok
	//设置HTTP头部,状态码是200，文件类型是html，字符集是utf8
	response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });

	//发送响应数据 "hello world"
	response.end("哈哈哈，helloworld");
}).listen(9999);
//终端打印如下信息
console.log("server runing at http://127.0.0.1:9999")
