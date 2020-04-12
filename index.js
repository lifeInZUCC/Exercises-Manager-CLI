const fs = require("fs");
const fileops = require("./lib/fileops");
const core = require("./lib/core");

//导入配置
const { origin, data, view } = require("./config.json");

/*
包装path字符串，目的是限制所有的非项目文件到一个特定的目录下，做到工程与使用的分离
pre设置为data意味着所有的origin、data、view文件都会被放到一个data子目录中
*/
function pathPack(path, pre = "data") {
    return `${pre}/${path}`;
}

/*
为了方便转换模式的时候变换path字符串
对于mode参数的说明：
0，代表path的格式应该切换到origin mode
1，代表path的格式应该切换到data mode
2，代表path的格式应该切换到view mode
*/
function pathSwitch(source, mode = 0) {
    modemap = [`${origin.storage}`, `${data.storage}`, `${view.storage}`];
    if (
        /^(data)\/(.*)\/(.*\..*)$/.test(source) ||
        /^(data)(\/)(.*\..*)$/.test(source)
    )
        return `${RegExp.$1}/${modemap[mode]}/${RegExp.$3}`;
}

var mode = [origin, data, view],
    name = ["origin", "data", "view"],
    behavior = [core.formData, core.dataView, null];

console.log("检查文件");
if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
}
for (let check of mode) {
    let path = pathPack(check.storage);
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        console.log(`mkdir ${path}`);
    } else {
        console.log(`${path} already exists`);
    }
}
console.log("检查完毕\n");

workflow = new Promise((resolve, reject) => {
    var fileSet = fileops.fileInDir(pathPack(mode[0].storage));
    resolve(fileSet);
});

for (let i = 0; i < mode.length - 1; i++) {
    workflow = workflow.then((fileSet) => {
        var nextSet = [];
        if (mode[i].switch) {
            console.log(`\nworkflow: ${name[i]}->${name[i + 1]}...`);
            mode[i].extra.dir.forEach((dir) => {
                fileops.fileInDir(dir).forEach((file) => {
                    fileSet.push(file);
                });
            });
            mode[i].extra.file.forEach((file) => {
                fileSet.push(file);
            });
            nextSet = fileSet.map((file) => {
                return fileops.replaceExt(
                    pathSwitch(file, i + 1),
                    mode[i + 1].template
                );
            });
            for (let j = 0; j < nextSet.length; j++) {
                console.log(`from ${fileSet[j]} to ${nextSet[j]}`);
                behavior[i](fileSet[j], nextSet[j]);
            }
            console.log("next work.\n");
        }
        return nextSet;
    });
}
