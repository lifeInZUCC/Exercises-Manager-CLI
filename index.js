const command = require("child_process");
const fs = require("fs");
const config = require("./config.json");
let { input, output } = config;

command.exec(
    `node lib/command/j2m.js -i data/${input} -o data/${output}`,
    (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    }
);
