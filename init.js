const fs = require("fs");
const pathPack = require("./lib/pathops").pathPack;
const fileops = require("./lib/fileops");
const adapter = require("./lib/adapter");

var Config = {
    system: {},
    format: {
        titleLevel: "###",
        tableHeader: "|编号|选项|",
        tableNeck: "|:-|:-|",
        colorMark: '<font color="red">',
    },
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
};

const sysmsg = new adapter.Adapter().message();
Config.system = sysmsg;
fs.writeFileSync("config.json", JSON.stringify(Config, null, "\t"));

//检查需要的目录是否被创建成功
console.log("create file");
for (let check of [Config.origin, Config.data, Config.view]) {
    let path = pathPack(check.storage);
    fileops.mkdirs(path);
}
console.log("create finshed.\n");
