const fs = require("fs");
const { parse } = require("json2csv");

// 同步读取上级目录下的所有文件到files中

const files = fs.readdirSync(
  "/Users/admin/工作/项目/东明博物馆/东明数据/缩略图"
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
