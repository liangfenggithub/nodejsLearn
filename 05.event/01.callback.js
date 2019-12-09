//延时一秒获取数据，能实现吗？
const asynGetData = function () {//错误的示范
  let result = null;
  setTimeout(() => {
    result = "apple";
  }, 1000);
  return result;
}
console.log(asynGetData());
