/**
 * 排行榜类模型
 */

const { BaseSong } = require('./base.js');

class TopList {
    constructor ({ id, img, name, songs }) {
        this.id = id; // id
        this.img = img; // 图片
        this.name = name; // 标题
        this.songs = songs; // 热门歌曲列表
    }
}

// 格式化热门歌曲
function formatSongs (data, type) {
    let arr;
    switch (type) {
    case 'QQ':
        arr = data.map(
            item =>
                new BaseSong({
                    name: item.songname,
                    singer: item.singername
                })
        );
        break;
    case '163':
        arr = data.map(
            item =>
                new BaseSong({
                    name: item.first,
                    singer: item.second
                })
        );
        break;
    default:
        arr = data;
        break;
    }
    return arr;
}

// 排行榜列表格式化
module.exports = function formatTopList (data, type) {
    let newData;
    switch (type) {
    case 'QQ':
        newData = data.map(item => {
            const songs = formatSongs(item.songList, type);
            return new TopList({
                id: item.id,
                img: item.picUrl,
                name: item.topTitle,
                songs
            });
        });
        break;
    case '163':
        newData = data.map(item => {
            const songs = formatSongs(item.tracks, type);
            return new TopList({
                id: item.id,
                img: item.coverImgUrl,
                name: item.name,
                songs
            });
        });
        break;
    default:
        newData = data;
        break;
    }
    return newData;
};
