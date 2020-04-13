const os = require("os");

class Adapter {
    constructor() {
        this.system = os.platform();
    }

    /**操作系统的一些兼容信息
     *
     * 关于行尾分割符号
     * 根据资料，在windows中文件换行符是\r\n，linux下是\n，mac下是\r。
     * 开发者本人是mac，一番尝试后但似乎我用\n做分割符号也能正常显示。
     * 最终决定在程序运行时，windows用\r\n，mac和linux都用\n。
     *
     * 关于路径分割符号
     * windows风格的路径使用\，在字符串中加上转义就是\\
     * UNIX风格的路径使用/，mac和linux都适用
     *
     * @return {Object}
     */
    message() {
        if (this.system == "win32") {
            var endWith = "\r\n";
            var divider = "\\";
        } else if (this.system == "darwin" || system == "linux") {
            var endWith = "\n";
            var divider = "/";
        }
        return { endWith: endWith, divider: divider };
    }
}

module.exports = {
    Adapter: Adapter,
};
