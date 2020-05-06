const fs = require("fs");
const commander = require("commander");
const process = require("process");
const config = require("./config.json");
const path = require("path");

function rmdir(dir) {
    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, { recursive: true });
        console.log(`create file ${dir}`);
    }
}

commander
    .option("-o, --origin", "remove all files and dirs")
    .option("-d, --data", "remove a file")
    .option("-v, --view", "remove a dir")
    .parse(process.argv);

if (commander.origin) {
    rmdir(path.join("data", config.origin.storage));
    fs.mkdirSync("data/origin");
}
if (commander.data) {
    rmdir(path.join("data", config.data.storage));
    fs.mkdirSync("data/data");
}
if (commander.view) {
    rmdir(path.join("data", config.view.storage));
    fs.mkdirSync("data/view");
}
if (!commander.origin && !commander.data && !commander.view) {
    rmdir("data");
    fs.mkdirSync("data");
    fs.mkdirSync("data/data");
    fs.mkdirSync("data/origin");
    fs.mkdirSync("data/view");
}
