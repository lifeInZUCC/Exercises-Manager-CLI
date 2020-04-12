const generator = require("../lib/generator");
const chai = require("chai"),
    expect = chai.expect;

describe("模块测试 generator", () => {
    describe("函数测试 numberGenerate", () => {
        var iter = generator.numberGenerate();
        it("生成1", () => {
            expect(iter()).to.be.equal(1);
        });
        it("生成10", () => {
            for (let i = 0; i < 8; i++) {
                iter();
            }
            expect(iter()).to.be.equal(10);
        });
    });
});
