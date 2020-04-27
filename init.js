const fs = require("fs");
const path = require("path");
const figlet = require("figlet");
const config = require("./config.json");

console.log(figlet.textSync("Exercises Manager"));

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
