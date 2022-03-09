var fs = require("fs");

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
  fs.access(dist, function (err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if (err) {
      callback(err);
    } else {
      fs.readdir(src, function (err, paths) {
        if (err) {
          callback(err);
        } else {
          paths.forEach(function (path) {
            var _src = src + "\\" + path;
            var _dist = dist + "\\" + path;
            fs.stat(_src, function (err, stat) {
              if (err) {
                callback(err);
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback);
                }
              }
            });
          });
        }
      });
    }
  }
}

/**
 *  原文件夹地址
 */
const srcDir = "F:\\1.原始数据\\印章\\1.10";
/**
 * 要复制到哪个文件夹下,复制后直接是 1.10\\XC-11\\1.jpg 去掉了调色后这一级
 */
const outDir = "D:\\test2";

const file = fs.readdirSync(srcDir);
file.forEach((element) => {
  const srcPath = srcDir + "/" + element + "/" + "调色后";
  const outPath = outDir + "/" + element;
  copyDir(srcPath, outPath);
  console.log(element + "复制成功");
});
