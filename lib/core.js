const fs = require("fs");
const path = require("path");
const system = require("./system");
const utils = require("./utils");

class Workflow {
    constructor() {
        const config = require("../config.json");

        //绑定配置文件和行为
        this.mode = [
            { setting: config.origin, name: "origin", behavior: this.formData },
            { setting: config.data, name: "data", behavior: this.dataView },
            { setting: config.view, name: "view", behavior: null },
        ];

        //使用Promise来定义一个workflow
        this.work = new Promise((resolve) => {
            resolve();
        });
    }

    /**我们提供一种题目模版，遵循这个模版格式的题目可以通过这个函数转换成JSON，以供存储和后续的相关处理。
     *
     * @param {String}inputfile
     * 一个用于作为输入的文件路径，文件的内容需要满足模版。
     * @param {String}outputfile
     * 一个用于存放输出的文件路径
     */
    formData(inputfile, outputfile) {
        let subjects = [];
        //读取题目和相关处理
        var data = fs.readFileSync(inputfile).toString().split(/\n|\r/);
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
        for (let item of data) {
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
        return this;
    }

    /**用于把题目的JSON数据转换成Markdown的表格，来展示题目数据。
     *
     * @param {String}inputfile
     * 一个用于作为输入的JSON文件路径
     * @param {String}outputfile
     * 一个用于存放输出的文件路径
     */
    dataView(inputfile, outputfile) {
        const {
            titleLevel,
            tableHeader,
            tableNeck,
            colorMark,
        } = require("../config.json").viewformat;
        //读取JSON和相关处理
        var data = JSON.parse(fs.readFileSync(inputfile));
        let index = 1,
            totalBuf = "";
        //JSON格式转到Markdown格式的主循环
        //目前只支持选择和判断题
        for (let item of data) {
            let { topic, choice, answer } = item;
            let buf = `${titleLevel} ${index}.${topic}\n${tableHeader}\n${tableNeck}\n`;
            for (let each of choice) {
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
        return this;
    }

    /**合并两个JSON数据
     *
     * @param {String[]}source
     * 一系列的JSON文件的路径
     * @return {Object[]}
     * @todo 过滤掉相同的内容
     */
    mergeData(...source) {
        let result = [];
        for (let path of source) {
            result.push(JSON.parse(fs.readFileSync(path, "utf-8")));
        }
        return result.reduce((data1, data2) => {
            return data1.concat(data2);
        }, []);
    }

    loop() {
        for (let i = 0; i < this.mode.length - 1; i++) {
            this.work = this.work.then(() => {
                var nextSet = [];
                //确认流开关是否开启
                if (this.mode[i].setting.switch) {
                    console.log(
                        `\nworkflow: ${this.mode[i].name}->${
                            this.mode[i + 1].name
                        }...`
                    );
                    //从模式存储路径获得所有文件
                    let dirname = path.join(
                        "data",
                        this.mode[i].setting.storage
                    );
                    var fileSet = system.listAllFile(dirname).filter((file) => {
                        return (
                            path.extname(file) ==
                            "." + this.mode[i].setting.template
                        );
                    });
                    console.log(fileSet);
                    //并入其他汇合流，单文件合并
                    this.mode[i].setting.extra.dir.forEach((dir) => {
                        system.listAllFile(dir).forEach((file) => {
                            fileSet.push(file);
                        });
                    });
                    //并入其他汇合流，多文件合并(目录合并)
                    this.mode[i].setting.extra.file.forEach((file) => {
                        fileSet.push(file);
                    });
                    console.log(fileSet);
                    //获得流的下一个状态
                    nextSet = fileSet.map((file) => {
                        file = system.extchange(
                            file,
                            this.mode[i + 1].setting.template
                        );
                        console.log(file);
                        return path.join(
                            "data",
                            this.mode[i + 1].setting.storage,
                            path.basename(file)
                        );
                    });
                    console.log(nextSet);
                    //处理流
                    for (let j = 0; j < nextSet.length; j++) {
                        //冲突检测与处理，通过不断在流的后面添加一个递增数字
                        let iter = new utils.Sequence().numberIter(0);
                        while (fs.existsSync(nextSet[j])) {
                            nextSet[j] = nextSet[j].replace(
                                /([0-9]*)\.(.*)$/,
                                `${iter()}.$2`
                            );
                        }
                        console.log(`from ${fileSet[j]} to ${nextSet[j]}`);
                        //写入下一个文件流
                        this.mode[i].behavior(fileSet[j], nextSet[j]);
                    }
                    console.log("next work.\n");
                }
            });
        }
    }
}

module.exports = {
    Workflow: Workflow,
};
