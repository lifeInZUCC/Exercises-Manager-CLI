const fs = require("fs");

//导入配置
const {
    titleLevel,
    tableHeader,
    tableNeck,
    colorMark,
} = require("../config.json");

/**用于把题目的JSON数据转换成Markdown的表格，来展示题目数据。
 *
 * @param {String}inputfile 
 * 一个用于作为输入的JSON文件路径
 * @param {String}outputfile 
 * 一个用于存放输出的文件路径
 */
exports.dataView = function (inputfile, outputfile) {
    //读取JSON和相关处理
    var data = fs.readFileSync(inputfile);
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
            buf +=
                answer == option
                    ? `|${colorMark}${option}|${colorMark}${content}|\n`
                    : `|${option}|${content}|\n`;
        }
        totalBuf += buf + "\n";
        index++;
    }
    //写入到Markdown文件中
    fs.writeFileSync(outputfile, totalBuf);
};

/**我们提供一种题目模版，遵循这个模版格式的题目可以通过这个函数转换成JSON，以供存储和后续的相关处理。
 *
 * @param {String}inputfile 
 * 一个用于作为输入的文件路径，文件的内容需要满足模版。
 * @param {String}outputfile 
 * 一个用于存放输出的文件路径
 */
exports.formData = function (inputfile, outputfile) {
    let subjects = [];
    //读取题目和相关处理
    var data = fs.readFileSync(inputfile);
    let splitList = data.toString().split("\n");
    /* 算法解释
            我们首先定义三个开关，控制当前读取的类型。
            当getTopic为false的时候，代表要读取题目的标题
            当getTopic为true，而getChoice为true的时候，代表要读取题目的选项
            当getTopic为true，getChoice为false的时候，代表要读取题目的答案
            当getAns为true，代表答案也读取完毕，这个时候置三者重回false的状态
        */
    let getTopic = false,
        getChoice = false,
        getAns = false;
    for (let item of splitList) {
        if (!getTopic) {
            //一个题目的数据结构
            var subject = {
                topic: "",
                choice: [],
                answer: "",
            };
            //如果匹配标题成功，会置getTopic为true
            getTopic = /^[0-9]+\.(.*)$/.test(item);
            if (getTopic) subject.topic = RegExp.$1;
        } else {
            //如果匹配选项成功，会置getChoice为true
            getChoice = /^([ABCD])\.(.*)$/.test(item);
            if (getChoice)
                subject.choice.push({
                    option: RegExp.$1,
                    content: RegExp.$2,
                });
            if (!getChoice) {
                //如果匹配答案成功，会置getAns为true
                getAns = /^([ABCD])$/.test(item);
                if (getAns) {
                    subject.answer = RegExp.$1;
                    getChoice = getTopic = getAns = false;
                    subjects.push(subject);
                }
            }
        }
    }
    //写入JSON数据
    fs.writeFileSync(outputfile, JSON.stringify(subjects, null, "\t"));
};

/**合并两个JSON数据
 *
 * @param {String[]}source 
 * 一系列的JSON文件的路径
 * @return {Object[]}
 * @todo 过滤掉相同的内容
 */
exports.mergeData = function (...source) {
    let result = [];
    for (let path of source) {
        result.push(JSON.parse(fs.readFileSync(path, "utf-8")));
    }
    return result.reduce((data1, data2) => {
        return data1.concat(data2);
    }, []);
};

//TODO collect JSON file from dist
function collect() {}
