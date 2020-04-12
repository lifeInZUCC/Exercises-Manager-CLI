/**数字生成器
 * 返回一个数字生成器，每次调用这个生成器会返回一个递增的数字。
 * @return {Function}
 */
function numberGenerate() {
    var n = 1;
    function iterator() {
        return n++;
    }
    return iterator;
}

module.exports = {
    numberGenerate: numberGenerate,
};
