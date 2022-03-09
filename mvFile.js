const fs = require("fs");

const dirPath = "/Users/admin/工作/项目/东明博物馆/东明数据/缩略图";
// 同步读取上级目录下的所有文件到files中
const files = fs.readdirSync(dirPath);

files.forEach((element) => {
  if (element != ".DS_Store") {
    let sourceFile = dirPath + "/" + element + "/1.jpg";
    var s = element.split("-");
    ipos = s[0].indexOf(".");
    s[0] = s[0].substring(ipos + 1, s[0].length);
    if (
      !fs.existsSync("/Users/admin/工作/项目/东明博物馆/东明数据/img/" + s[0])
    ) {
      fs.mkdirSync("/Users/admin/工作/项目/东明博物馆/东明数据/img/" + s[0]);
    }
    let destPath =
      "/Users/admin/工作/项目/东明博物馆/东明数据/img/" + s[0] + "/1.jpg";
    fs.rename(sourceFile, destPath, function (err) {
      if (err) throw err;
      fs.stat(destPath, function (err, stats) {
        if (err) throw err;
        console.log("stats: " + JSON.stringify(stats));
      });
    });
  }
});
