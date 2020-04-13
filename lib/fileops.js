const path = require("path");
const fs = require("fs");

const system = require("../config.json").system;
/**列出一个目录下所有的内容
 *
 * @param {String} dir
 * 需要列出所有内容的文件夹的路径
 * @param {String[]} itemList
 * 初始化内容列表
 * @param {String} type
 * 列出的类型，可选: [dir，file]
 * @param {Number} depth
 * 列出的深度
 * @return {String[]}
 */
function itemsInDir(dir, itemList = [], type = "dir", depth = 1) {
    if (depth == 0) return;
    const items = fs.readdirSync(dir);
    items.forEach((item) => {
        let fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (type == "dir") {
            if (stat.isDirectory()) {
                itemList.push(fullPath);
                itemsInDir(fullPath, itemList, "dir", depth - 1);
            }
        } else if (type == "file") {
            if (stat.isDirectory()) {
                itemsInDir(fullPath, itemList, "file", depth - 1);
            } else {
                itemList.push(fullPath);
            }
        }
    });
    return itemList;
}

/**列出一个目录下所有的文件(不包括子目录下的)
 *
 * @param {String} dir 需要列出所有文件的文件夹路径
 * @param {String[]} filesList 初始化文件列表
 * @return {String[]}
 */
function fileInDir(dir, filesList = []) {
    return itemsInDir(dir, filesList, "file", 1);
}

/**列出一个目录下所有的子目录
 *
 * @param {String} dir 需要列出所有子目录的文件夹路径
 * @param {String[]} subdirList 初始化子目录列表
 * @return {String[]}
 */
function subdirInDir(dir, subdirList = []) {
    return itemsInDir(dir, subdirList, "dir", 1);
}

/**列出一个目录下所有的文件(包括子目录下的)
 *
 * @param {String} dir
 * 需要列出所有文件(包括子目录下的文件)的文件夹路径
 * @param {String[]} filesInDir
 * 初始化文件列表
 * @return {String[]}
 */
function deepFileInDir(dir, filesInDir = []) {
    return itemsInDir(dir, filesInDir, "file", 1000);
}

/**后缀名替换
 *
 * @param {String} filename
 * @param {String} newExt
 * @return {String}
 */
function replaceExt(filename, newExt) {
    if (/^(.*\.)[\w]+$/.test(filename)) return `${RegExp.$1}${newExt}`;
    if (/^(.*)$/.test(filename)) return `${RegExp.$1}.${newExt}`;
}

/**递归创建目录
 *
 * @param {String} dirname
 */
function mkdirs(dirname) {
    if (!fs.existsSync(dirname)) {
        if (RegExp(`${system.divider}`).test(dirname))
            mkdirs(path.dirname(dirname));
        fs.mkdirSync(dirname);
        console.log(`mkdir ${dirname}`);
    }
}

/**递归删除一个目录
 *
 * @param {String} path
 */
function rmdirs(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        for (let file of files) {
            var curPath = path + system.divider + file;
            if (fs.statSync(curPath).isDirectory()) {
                rmdirs(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        }
        fs.rmdirSync(path);
    }
}

module.exports = {
    fileInDir: fileInDir,
    subdirInDir: subdirInDir,
    deepFileInDir: deepFileInDir,
    replaceExt: replaceExt,
    mkdirs: mkdirs,
    rmdirs: rmdirs,
};
