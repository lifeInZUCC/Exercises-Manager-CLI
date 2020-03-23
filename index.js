const command = require("child_process");
const fs = require("fs");

fs.readFile("config.json", (err, data) => {
    if (err) {
        console.err(err);
        return;
    } else {
        let { input, output } = JSON.parse(data);
        command.exec(
            `node lib/command/j2m.js -i ${input} -o ${output}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                console.error(stderr);
            }
        );
    }
});
