class Sequence {
    /**
     * 数字生成器
     * @param {Number} value 初始值
     * @param {Number} step 步长
     */
    numberIter(value, step = 1) {
        function iterator() {
            return (value += step);
        }
        return iterator;
    }
}

module.exports = {
    Sequence: Sequence,
};
