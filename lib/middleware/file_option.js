const path = require("path");
const fs = require("fs");

function itemsInDir(dir, itemList = [], type = "dir", depth = 1) {
    if (depth == 0) return;
    const items = fs.readdirSync(dir);
    items.forEach((item, index) => {
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

function fileInDir(dir, filesList = []) {
    return itemsInDir(dir, filesList, "file", 1);
}

function subdirInDir(dir, subdirList = []) {
    return itemsInDir(dir, subdirList, "dir", 1);
}

function deepFileInDir(dir, filesInDir = []) {
    return itemsInDir(dir, filesInDir, "file", 1000);
}

function replaceExt(filename, newExt) {
    let newFileName = filename.replace(/\.[\w]+$/, newExt);
    return filename == newFileName ? `${newFileName}${newExt}` : newFileName;
}

module.exports = {
    fileInDir: fileInDir,
    subdirInDir: subdirInDir,
    deepFileInDir: deepFileInDir,
    replaceExt: replaceExt,
};
