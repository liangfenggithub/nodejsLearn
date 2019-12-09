const fs = require("fs");
exports.getMime = function (eventEmitter, exname) {
  fs.readFile("./mime.json", (err, data) => {
    if (err) {
      console.log("mime.json读取失败")
    } else {
      let contentType = JSON.parse(data.toString())[exname];
      eventEmitter.emit("readContentTypeOk", contentType);
    }
  })
}