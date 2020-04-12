const fileops = require("../lib/fileops");
const chai = require("chai"),
    expect = chai.expect;
const fs = require("fs");

describe("模块测试 dir_fileops", () => {
    describe("函数测试 mkdirs", () => {
        it("创建目录(存在父目录)", () => {
            fileops.mkdirs("data/extra");
            expect(fs.existsSync("data/extra")).is.true;
        });
        it("创建目录(不存在父目录)", () => {
            fileops.mkdirs("data/temp/extra");
            expect(fs.existsSync("data/temp/extra")).is.true;
        });
        after(() => {
            fs.rmdirSync("data/extra");
            fs.rmdirSync("data/temp/extra");
            fs.rmdirSync("data/temp");
        });
    });

    describe("函数测试 fileInDir", () => {
        var result;
        before(() => {
            fs.writeFileSync("data/1.json", " ");
            fs.writeFileSync("data/2.md", " ");
            fs.writeFileSync("data/origin/3.txt", " ");
            result = fileops.fileInDir("data");
        });
        it("返回类型是数组?", () => {
            expect(result).to.be.an("array");
        });
        it("搜寻出了当前目录下所有文件?", () => {
            expect(result).to.include("data/1.json");
            expect(result).to.include("data/2.md");
        });
        it("没有搜寻出更深层目录下的文件?", () => {
            expect(result).to.not.include("data/origin/3.txt");
        });
        after(() => {
            fs.unlinkSync("data/1.json");
            fs.unlinkSync("data/2.md");
            fs.unlinkSync("data/origin/3.txt");
        });
    });

    describe("函数测试 subdirInDir", () => {
        before(() => {
            fs.writeFileSync("data/1.json", " ");
            fs.writeFileSync("data/2.md", " ");
        });
        let result = fileops.subdirInDir("data");
        it("返回类型是数组?", () => {
            expect(result).to.be.an("array");
        });
        it("没有搜寻出文件?", () => {
            expect(result).to.not.include("data/1.json");
            expect(result).to.not.include("data/2.md");
        });
        it("搜寻到了当前目录下的所有子目录?", () => {
            expect(result).to.include("data/data");
            expect(result).to.include("data/origin");
            expect(result).to.include("data/view");
        });
        after(() => {
            fs.unlinkSync("data/1.json");
            fs.unlinkSync("data/2.md");
        });
    });

    describe("函数测试 deepFileInDir", () => {
        var result;
        before(() => {
            fs.writeFileSync("data/1.json", " ");
            fs.writeFileSync("data/2.md", " ");
            fs.writeFileSync("data/origin/3.txt", " ");
            result = fileops.deepFileInDir("data");
        });
        it("返回类型是数组?", () => {
            expect(result).to.be.an("array");
        });
        it("搜寻出了当前目录下所有文件?", () => {
            expect(result).to.include("data/1.json");
            expect(result).to.include("data/2.md");
        });
        it("搜寻出了更深层目录下的文件?", () => {
            expect(result).to.include("data/origin/3.txt");
        });
        after(() => {
            fs.unlinkSync("data/1.json");
            fs.unlinkSync("data/2.md");
            fs.unlinkSync("data/origin/3.txt");
        });
    });

    describe("函数测试 replaceExt", () => {
        it("普通替换", () => {
            expect(fileops.replaceExt("index.json", "js")).is.equal("index.js");
        });
        it("大小写敏感", () => {
            expect(fileops.replaceExt("main.c", "C")).is.equal("main.C");
        });
        it("无后缀替换成有后缀", () => {
            expect(fileops.replaceExt("README", "md")).is.equal("README.md");
        });
        it("相同后缀替换", () => {
            expect(fileops.replaceExt("README.md", "md")).is.equal("README.md");
        });
    });

    describe("函数测试 rmdirs", () => {
        before(() => {
            fs.mkdirSync("data/extra");
            fs.mkdirSync("data/temp");
            fs.mkdirSync("data/temp/extra");
        });
        it("删除目录(存在父目录)", () => {
            fileops.rmdirs("data/extra");
            expect(fs.existsSync("data/extra")).is.false;
        });
        it("删除目录(不存在父目录)", () => {
            fileops.rmdirs("data/temp/extra");
            expect(fs.existsSync("data/temp/extra")).is.false;
        });
        after(() => {
            fs.rmdirSync("data/temp");
        });
    });
});
