/**
 * 基础类
 */

class BaseSong {
    constructor ({ name, singer }) {
        this.name = name; // 歌曲名
        this.singer = singer; // 歌手名
    }
}

module.exports = {
    BaseSong
};
