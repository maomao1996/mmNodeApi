/**
 * 基础类
 */

// 歌曲信息
class BaseSong {
    constructor ({ name, singer }) {
        this.name = name; // 歌曲名
        this.singer = singer; // 歌手名
    }
}

// 创建者信息
class Creator {
    constructor ({ uid, name, picUrl }) {
        this.uid = uid; // uid
        this.name = name; // 名称
        this.picUrl = picUrl; // 头像
    }
}

module.exports = {
    BaseSong,
    Creator
};
