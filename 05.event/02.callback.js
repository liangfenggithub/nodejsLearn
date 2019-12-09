//通过回调函数实现异步功能
let aysnGetData = function (callback) {
  let result = null;
  setTimeout(() => {
    result = "apple";
    callback(result);
  }, 1000);
}

function output(res) {//callback函数
  console.log(res);
}

aysnGetData(output);
