const fs = require("fs");
const fileops = require("./lib/fileops");
const core = require("./lib/core");

//导入配置
const { origin, data, view } = require("./config.json");

function pathPack(path, pre = "data") {
    return `${pre}/${path}`;
}

function pathSwitch(source = "", mode = 0) {
    modemap = [`${origin.storage}`, `${data.storage}`, `${view.storage}`];
    return source.replace(/^(data)\/(.*)\/(.*\..*)$/, `$1/${modemap[mode]}/$3`);
}

function init() {
    console.log("初始化...");
    fs.mkdir(pathPack(origin.storage), (err) => {
        if (err) console.warn(err.message);
    });
    fs.mkdir(pathPack(data.storage), (err) => {
        if (err) console.warn(err.message);
    });
    fs.mkdir(pathPack(view.storage), (err) => {
        if (err) console.warn(err.message);
    });
    fs.writeFileSync(".init", "init mark");
    console.log("初始化完成");
}

var isinit = fs.existsSync(".init");
if (!isinit) init();

var originSet = fileops.fileInDir(pathPack(origin.storage));
originSet.forEach((file) => {
    core.formData(file, pathSwitch(file, 1));
});

var dataSet = fileops.fileInDir(pathPack(data.storage));
dataSet.forEach((file) => {
    core.dataView(file, pathSwitch(file, 2));
});
