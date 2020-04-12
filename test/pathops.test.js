const pathops = require("../lib/pathops");
const chai = require("chai"),
    expect = chai.expect;

describe("模块测试 pathops", () => {
    describe("函数测试 pathPack", () => {
        it("默认包装", () => {
            expect(pathops.pathPack("origin")).to.be.equal("data/origin");
        });
        it("更改包装", () => {
            expect(pathops.pathPack("origin", "extra")).to.be.equal(
                "extra/origin"
            );
        });
    });
    
    describe("函数测试 pathSwitch", () => {
        it("中间存在过渡目录", () => {
            expect(pathops.pathSwitch("data/origin/1.txt", 1)).to.be.equal(
                "data/data/1.txt"
            );
        });
        it("中间无过渡目录", () => {
            expect(pathops.pathSwitch("data/1.txt", 1)).to.be.equal(
                "data/data/1.txt"
            );
        });
    });
});
