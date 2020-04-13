"use strict";

const os = require("os");
const fs = require("fs");
const path = require("path");

function listAllFile(dirname) {
    var itemList = [];
    const items = fs.readdirSync(dirname);
    items.forEach((item) => {
        let fullPath = path.join(dirname, item);
        const stat = fs.statSync(fullPath);
        if (stat.isFile()) {
            itemList.push(fullPath);
        }
    });
    return itemList;
}

function extchange(filename, newext) {
    return filename.replace(/(.*)\.([\w]+)$/, `$1.${newext}`);
}

module.exports = {
    listAllFile: listAllFile,
    extchange: extchange,
};
