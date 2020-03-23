const process = require("process");
const commander = require("commander");
const fs = require("fs");
const config = require("../../config.json");

commander
    .name("j2m")
    .version("0.2.0", "-v, --version")
    .usage("[options] <file ...>")
    .option("-i, --input <files>", "Set input file for command")
    .option("-o, --output <files>", "Set output file for command")
    .parse(process.argv);

let inputFile, outputFile;
if (commander.input) inputFile = commander.input;
if (commander.output) outputFile = commander.output;

let { titleLevel, choiceHeader, choiceNeck, colorMark } = config;

fs.readFile(inputFile, (error, data) => {
    if (error) {
        console.err(err);
        return;
    } else {
        let topicSet = JSON.parse(data),
            index = 1,
            totalBuf = "";
        for (item of topicSet) {
            let { topic, choice, answer } = item;
            let buf = `${titleLevel} ${index}.${topic}\n${choiceHeader}\n${choiceNeck}\n`;
            for (each of choice) {
                let { option, content } = each;
                if (answer == option) {
                    buf += `${colorMark}${option}|${colorMark}${content}|\n`;
                } else {
                    buf += `${option}|${content}|\n`;
                }
            }
            totalBuf += buf;
            index++;
        }
        fs.writeFile(outputFile, totalBuf, error => {
            if (error) {
                console.err(err);
                return;
            }
        });
    }
});
