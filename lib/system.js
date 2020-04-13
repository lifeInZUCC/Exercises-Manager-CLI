"use strict";

const os = require("os");
const fs = require("fs");
const path = require("path");

function listAllFile(dirname) {
    var itemList = [];
    const items = fs.readdirSync(dirname);
    items.forEach((item) => {
        let fullPath = path.join(dirname, item);
        const stat = fs.statSync(fullPath);
        if (stat.isFile()) {
            itemList.push(fullPath);
        }
    });
    return itemList;
}

function extchange(filename, newext) {
    return filename.replace(/(.*)\.([\w]+)$/, `$1.${newext}`);
}

/**系统兼容层
 * @private
 */
class Adapter {
    /**
     * 操作系统的一些兼容信息说明
     *
     * - 关于行尾分割符号
     *   根据资料，在windows中文件换行符是\r\n，linux下是\n，mac下是\r。
     *   开发者本人是mac，一番尝试后但似乎我用\n做分割符号也能正常显示。
     *   这部分有待商议，暂时把两个都作为分割符号，具体到业务中处理。
     *
     * - 关于路径分割符号
     *   windows风格的路径使用\，在字符串中加上转义就是\\
     *   我的想法是对路径进行强检测和矫正，因为我们的项目对性能要求并不高，
     *   所以牺牲一点性能做强矫正我觉得不是不行
     *
     */
    constructor() {
        //默认设置为UNIX
        this.name = os.platform();
        this.linefeeds = /[\n]|[\r]/;
        this.separators = ["/", "\\"];
    }

    /**返回兼容性设置
     *
     * 目前兼容的平台：win，mac
     *
     * @return {Adapter}
     */
    eval() {
        if (this.name == "win32") this.path = { separator: "\\" };
        if (this.name == "darwin") this.path = { separator: "/" };
        return this;
    }
}

/**获取行尾标志
 *
 * @return {RegExp}
 */
function lineFeeds() {
    return new Adapter().eval().linefeeds;
}

module.exports = {
    lineFeeds: lineFeeds,
    listAllFile: listAllFile,
    extchange: extchange,
};
