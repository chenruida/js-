const fs = require("fs");
const { parse } = require("json2csv");

const initPath = "D:/dm/achieve/";
const initType= "2-Archive-levelModel";

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
        //该路径的东西是文件？
        if (stat.isFile()) {
          let format = item.split(".")[1]
          if (format == "wrp") {
            let pathArray = fPath.split("/");
            let collectionId = pathArray[4].split('.')[1].split('-')[0];
            let name =  pathArray[4].split('.')[1].split('-')[1];
            let obj = {
              "name": name+"-存档级模型",
              "id": collectionId + "-" + format + "-" + name,
              "collectionId": collectionId,
              "resourceClass": "存档级模型",
              "type": "三维模型",
              "formate": format,
              "filename": item,
              "path": fPath.slice(initPath.length,-3)+"zip",
            }

            files.push(obj);
          }

        }
      }
    });
  }
  findFile(filePath);
  return files;
};

function exportCSV(data) {
  let csv = parse(data);
  fs.writeFile("./wrp.csv", csv, function (err) {
    if (err) throw err;
    console.log("file saved");
  });
}


let files = getFiles(initPath+initType);
exportCSV(files);
