const fs = require("fs");
const path = require("path");
const figlet = require("figlet");

//打印logo
console.log(figlet.textSync("Exercises Manager"));

const config = {
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
        size: "middle",
        align: "left",
        color: "red",
    },
};

//写入配置
fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));

//检查需要的目录是否被创建成功
console.log("create file");
for (let subdir of [
    config.origin.storage,
    config.data.storage,
    config.view.storage,
]) {
    let dir = path.join("data", subdir);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`create file ${dir}`);
}
console.log("create finshed.\n");
