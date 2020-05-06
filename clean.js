const fs = require("fs");
const commander = require("commander");
const process = require("process");

commander
    .option("-a, --all", "remove all files and dirs")
    .option("-f, --file [value]", "remove a file")
    .option("-d, --dir [value]", "remove a dir")
    .parse(process.argv);

if (commander.all) {
    if (fs.existsSync("data")) fs.rmdirSync("data", { recursive: true });
}
if (commander.file) {
    if (fs.existsSync(commander.file)) fs.unlinkSync(commander.file);
}
if (commander.dir) {
    if (fs.existsSync(commander.dir))
        fs.rmdirSync(commander.dir, { recursive: true });
}
