let events = require("events");
let EventEmitter = new events.EventEmitter();
//监听函数
EventEmitter.on("getDataOk", function (val) {
  console.log("监听到了 getDataOk 事件")
  console.log("获取数据成功,result的值是：", val);
})
setTimeout(() => {
  console.log("开始触发 getDataOk事件")
  EventEmitter.emit("getDataOk", "apple")
}, 1000);