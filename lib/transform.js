const process = require("process");
const fs = require("fs");
const config = require("../config.json");
const options = require("./middleware/file_option");

//导入配置
const { titleLevel, tableHeader, tableNeck, colorMark } = config;

exports.toMarkdown = function (inputFile) {
    //定义输出文件
    let outputFile = options.replaceExt(inputFile, ".md");
    //读取JSON和相关处理
    fs.readFile(inputFile, (error, data) => {
        if (error) {
            console.error(error);
            return;
        } else {
            let topicSet = JSON.parse(data),
                index = 1,
                totalBuf = "";
            //JSON格式转到Markdown格式的主循环
            //目前只支持选择和判断题
            for (item of topicSet) {
                let { topic, choice, answer } = item;
                let buf = `${titleLevel} ${index}.${topic}\n${tableHeader}\n${tableNeck}\n`;
                for (each of choice) {
                    let { option, content } = each;
                    if (answer == option) {
                        buf += `|${colorMark}${option}|${colorMark}${content}|\n`;
                    } else {
                        buf += `|${option}|${content}|\n`;
                    }
                }
                totalBuf += buf + "\n";
                index++;
            }
            //写入到Markdown文件中
            fs.writeFile(outputFile, totalBuf, (error) => {
                if (error) {
                    console.error(error);
                    return;
                }
            });
        }
    });
};

//TODO format origin file to JSON
exports.format = function (inputfile) {
    let outputFile = options.replaceExt(inputFile, ".md");
};

//TODO merge two JSON file
exports.merge = function () {};

//TODO collect JSON file from dist
exports.collect = function () {};
