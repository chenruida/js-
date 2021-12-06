const fs = require("fs");
const { parse } = require("json2csv");

const path = "/Users/crd/Code/Data";

const join = (path, file) => {
  return path + "/" + file;
};

const getFiles = (filePath) => {
  let files = []; //遍历的文件全push进这个数组，方便后续操作（记住，push进去的是文件路径，后续需读取）
  function findFile(path) {
    //遍历查找函数
    let _files = fs.readdirSync(path); //异步读取文件
    _files.forEach(function (item, index) {
      // 判断是不是 macos垃圾
      if (item !== ".DS_Store") {
        //判断是否为文件或为文件夹从而执行push操作或递归操作
        let fPath = join(path, item); //拼合文件路径
        let stat = fs.statSync(fPath);
        if (stat.isDirectory()) {
          //该路径的东西是文件夹？
          findFile(fPath);
        }
        if (stat.isFile()) {
          //该路径的东西是文件？
          let strArr = item.split("/");
          var obj = {
            collectionCode: [],
            code: [],
            name: [],
          };
          files.push(obj);
        }
      }
    });
  }
  findFile(filePath);
  return files;
};

let files = getFiles(path);
console.log(files);
