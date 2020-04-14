const fs = require("fs");
const path = require("path");
const figlet = require("figlet");

console.log(figlet.textSync("Exercises Manager"));

var Config = {
    origin: {
        switch: true,
        template: "txt",
        storage: "origin",
        extra: {
            file: [],
            dir: [],
        },
    },
    data: {
        switch: true,
        template: "json",
        storage: "data",
        extra: {
            file: [],
            dir: [],
        },
    },
    view: {
        template: "md",
        storage: "view",
    },
    viewformat: {
        titleLevel: "###",
        tableHeader: "|编号|选项|",
        tableNeck: "|:-|:-|",
        colorMark: '<font color="red">',
    },
};

fs.writeFileSync("config.json", JSON.stringify(Config, null, "\t"));

//检查需要的目录是否被创建成功
console.log("create file");
for (let subdir of [
    Config.origin.storage,
    Config.data.storage,
    Config.view.storage,
]) {
    let dir = path.join("data", subdir);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`create file ${dir}`);
}
console.log("create finshed.\n");
