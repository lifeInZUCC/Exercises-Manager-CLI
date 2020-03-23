const process = require("process");
const fs = require("fs");
const config = require("../config.json");

exports.toMarkdown = function(inputFile, outputFile) {
    let { titleLevel, choiceHeader, choiceNeck, colorMark } = config;
    fs.readFile(inputFile, (error, data) => {
        if (error) {
            console.error(error);
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
                    console.error(error);
                    return;
                }
            });
        }
    });
};

//TODO format origin file to JSON
exports.format = function() {};

//TODO merge two JSON file
exports.merge = function() {};

//TODO collect JSON file from dist
exports.collect = function() {};
