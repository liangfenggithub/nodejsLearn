const http = require("http");
const url = require("url");
const ejs = require("ejs");

//字符串键值分离函数，输入字符串 "a=1&b=2",返回{a=1,b=2}
function devideKeyAndVal(str) {
  let arr = str.split("&");//分离post数据
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i].split("=")[0]] = arr[i].split("=")[1];
  }
  return obj;
}

let app = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  let method = req.method.toLowerCase();//获取请求方式
  console.log("请求的pathname是：", pathname);
  console.log("请求的method是：", method);
  switch (pathname) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
      res.write("请访问 http://127.0.0.1:9999/login 进行post传值测试，或者 http://127.0.0.1:9999/register 进行get测试");
      res.end();
      break;
    //get传值待补充
    // case "/register"
    //   if(method == "get")
    //   break;
    case "/login":
      //如果是get请求，则返回登录页面
      if (method == "get") {
        ejs.renderFile("view/login.ejs", function (err, data) {
          if (err) {
            console.log("err is :", err);
          } else {
            // console.log(data);
            res.end(data);//将渲染完的数据返回给浏览器
          }
        })
      } else if (method == "post") {
        //如果是post请求则接收用户名和密码，判断是否正确并返回页面
        //开始接受post数据
        let postData = "";
        req.on("data", function (dataChunk) {//数据监听函数
          postData += dataChunk;
        })
        req.on("end", function () {//数据结束传输监听函数
          let loginFlag = false;
          console.log("接受完毕的原始post数据是：", postData);
          let userData = devideKeyAndVal(postData);
          console.log("解析后的postdata是：", userData);
          if ((userData.username == "admin") && (userData.password == "123456")) {
            console.log("用户名和密码正确");
            loginFlag = true;
          } else {
            console.log("用户名和密码错误");
          }

          ejs.renderFile("view/result.ejs", {
            result: loginFlag
          }, function (err, data) {
            if (err) {
              console.log("ejs模板引擎解析失败，err：", err);
            } else {
              res.end(data);//将结果返回
            }
          })


        })
      }
      break;

    default: break;

  }

})
app.listen(9999, "127.0.0.1");
console.log("ejs和get/post接收数据的综合联系程序运行在 127.0.0.1:9999")