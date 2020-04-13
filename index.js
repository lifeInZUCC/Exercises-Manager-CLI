const fs = require("fs");
const fileops = require("./lib/fileops");
const core = require("./lib/core");
const numberGenerate = require("./lib/generator").numberGenerate;
const pathPack = require("./lib/pathops").pathPack;
const pathSwitch = require("./lib/pathops").pathSwitch;

//导入配置
const { origin, data, view } = require("./config.json");

//定义一些变量，方便在workflow代码的重用
var mode = [origin, data, view],
    name = ["origin", "data", "view"],
    behavior = [core.formData, core.dataView, null];

//检查需要的目录是否被创建成功
console.log("check file");
for (let check of mode) {
    let path = pathPack(check.storage);
    fileops.mkdirs(path);
}
console.log("check finshed.\n");

//使用Promise来定义一个workflow
workflow = new Promise((resolve, reject) => {
    resolve();
});

//workflow主循环
for (let i = 0; i < mode.length - 1; i++) {
    workflow = workflow.then(() => {
        var nextSet = [];
        //确认流开关是否开启
        if (mode[i].switch) {
            console.log(`\nworkflow: ${name[i]}->${name[i + 1]}...`);
            //从模式存储路径获得所有文件
            var fileSet = fileops
                .fileInDir(pathPack(mode[i].storage))
                .filter((file) => RegExp(`${mode[i].template}$`).test(file));
            //并入其他汇合流，单文件合并
            mode[i].extra.dir.forEach((dir) => {
                fileops.fileInDir(dir).forEach((file) => {
                    fileSet.push(file);
                });
            });
            //并入其他汇合流，多文件合并(目录合并)
            mode[i].extra.file.forEach((file) => {
                fileSet.push(file);
            });
            console.log(fileSet);
            //获得流的下一个状态
            nextSet = fileSet.map((file) => {
                console.log(file);
                return fileops.replaceExt(
                    pathSwitch(file, i + 1),
                    mode[i + 1].template
                );
            });

            //处理流
            for (let j = 0; j < nextSet.length; j++) {
                //冲突检测与处理，通过不断在流的后面添加一个递增数字
                let iter = numberGenerate();
                while (fs.existsSync(nextSet[j])) {
                    nextSet[j] = nextSet[j].replace(
                        /([0-9]*)\.(.*)$/,
                        `${iter()}.$2`
                    );
                }
                console.log(`from ${fileSet[j]} to ${nextSet[j]}`);
                //写入下一个文件流
                behavior[i](fileSet[j], nextSet[j]);
            }
            console.log("next work.\n");
        }
    });
}
