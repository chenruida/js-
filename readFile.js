const fs = require("fs");
const { parse } = require("json2csv");

// 同步读取上级目录下的所有文件到files中
const files = fs.readdirSync(
  "/Volumes/移动硬盘/东明数据/3.正射影像/8.正射影像"
);
var data = [];

files.forEach((element) => {
  var s = element.split("-");
  ipos = s[0].indexOf(".");
  s[0] = s[0].substring(ipos + 1, s[0].length);
  var obj = {
    code: s[0],
    name: s[1],
  };
  data.push(obj);
});

console.log(data);
const fields = ["code", "name"];

const opts = { fields };
let csv = parse(data);
fs.writeFile("./file.csv", csv, function (err) {
  if (err) throw err;
  console.log("file saved");
});
