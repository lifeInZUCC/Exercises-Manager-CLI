const { origin, data, view } = require("../config.json");

/**为了防止数据污染项目，对数据做统一的包装，全部放到一个文件下，然后在.gitignore中忽略
 *
 * @param {String} path
 * @param {String} pre
 * pre默认为data，意味着数据放在data子目录下
 * @return {String}
 */
function pathPack(path, pre = "data") {
    return `${pre}/${path}`;
}

/**统一处理转换模式的时候需要变换路径的格式问题
 *
 * @param {String}source
 * @param {Number}mode
 * 对mode参数的说明：
 * * [0]切换到origin mode
 * * [1]切换到data mode
 * * [2]切换到view mode
 * @return {String}
 */
function pathSwitch(source, mode = 0) {
    modemap = [`${origin.storage}`, `${data.storage}`, `${view.storage}`];
    if (
        /^(data)\/(.*)\/(.*\..*)$/.test(source) ||
        /^(data)(\/)(.*\..*)$/.test(source)
    )
        return `${RegExp.$1}/${modemap[mode]}/${RegExp.$3}`;
}

module.exports = {
    pathPack: pathPack,
    pathSwitch: pathSwitch,
};
