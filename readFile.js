const fs = require("fs");
const { parse } = require("json2csv");

const path = "/Volumes/移动硬盘/东明数据/3.正射影像/8.正射影像";

// 同步读取上级目录下的所有文件到files中
const files = fs.readdirSync(path);

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

  // const oldName = path + "/" + element + "/" + "缩略图";
  const newName = path + "/" + element + "/" + s[0];
  const newDir = "/Volumes/移动硬盘/东明数据/img" + "/" + s[0];
  chageName(newName, newDir);
});

function chageName(oldName, newName) {
  fs.rename(oldName, newName, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(newName);
    }
  });
}
function exportCSV(data) {
  let csv = parse(data);
  fs.writeFile("./file.csv", csv, function (err) {
    if (err) throw err;
    console.log("file saved");
  });
}
