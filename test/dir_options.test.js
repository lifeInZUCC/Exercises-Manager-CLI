const options = require("../lib/middleware/file_option");
const chai = require("chai"),
    expect = chai.expect;

before(() => console.info("开始单元测试:"));

describe("模块测试 dir_options", () => {
    describe("函数测试 fileInDir", () => {
        let result = options.fileInDir("example/testdata");
        it("返回类型是数组?", () => {
            expect(result).to.be.an("array");
        });
        it("搜寻出了当前目录下所有文件?", () => {
            expect(result).to.include("example/testdata/input.json");
            expect(result).to.include("example/testdata/output.md");
        });
        it("没有搜寻出更深层目录下的文件?", () => {
            expect(result).to.not.include("example/testdata/deeper/data.json");
        });
    });

    describe("函数测试 deepFileInDir", () => {
        let result = options.deepFileInDir("example/testdata");
        it("返回类型是数组?", () => {
            expect(result).to.be.an("array");
        });
        it("搜寻出了当前目录下所有文件?", () => {
            expect(result).to.include("example/testdata/input.json");
            expect(result).to.include("example/testdata/output.md");
        });
        it("搜寻出了更深层目录下的文件?", () => {
            expect(result).to.include("example/testdata/deeper/data.json");
        });
    });

    describe("函数测试 subdirInDir", () => {
        let result = options.subdirInDir("example/testdata");
        it("返回类型是数组?", () => {
            expect(result).to.be.an("array");
        });
        it("没有搜寻出文件?", () => {
            expect(result).to.not.include("example/testdata/input.json");
            expect(result).to.not.include("example/testdata/output.md");
        });
        it("搜寻到了当前目录下的所有子目录?", () => {
            expect(result).to.include("example/testdata/deeper");
        });
    });

    describe("函数测试 replaceExt", () => {
        it("普通替换", () => {
            expect(options.replaceExt("index.json", ".js")).is.equal("index.js");
        });
        it("大小写敏感", () => {
            expect(options.replaceExt("main.c", ".C")).is.equal("main.C");
        });
        it("无后缀替换成有后缀", () => {
            expect(options.replaceExt("README", ".md")).is.equal("README.md");
        });
        it("相同后缀替换", () => {
            expect(options.replaceExt("README.md", ".md")).is.equal(
                "README.md.md"
            );
        });
    });
});
