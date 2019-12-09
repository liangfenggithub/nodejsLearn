//通过过回调函数实现同步编写异步功能方式二：直接传入回调函数
let aysnGetData = function (callback) {
  let result = null;
  setTimeout(() => {
    result = "apple";
    callback(result);
  }, 1000);
}
aysnGetData(function (res) {
  console.log(res);
});