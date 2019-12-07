var tools = {
  sayhello: function () {
    return "hello world"
  },
  add: function (x, y) {
    return x + y;
  }
}
//暴露
exports.sayHello = tools.sayhello;
exports.add = tools.add;