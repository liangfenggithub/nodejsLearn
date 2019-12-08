//通过文件扩展名获取对应的contentType
exports.getMime = function (name) {
  switch (name) {
    case ".css":
      return "text/css";
    case ".html":
      return "text/html"
    case ".js":
      return "text/javascript"
    default:
      return "text/html"
  }
}