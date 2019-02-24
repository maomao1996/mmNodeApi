/**
 * 歌曲 URL 类模型
 */

class MusicUrl {
    constructor ({ id, url }) {
        this.id = id; // 歌曲id
        this.url = url; // 歌曲播放地址
    }
}

module.exports = function formatMusicUrl (data, type) {
    switch (type) {
    case 'qq':
        return data.reduce((arr, item) => {
            arr.push(new MusicUrl({ id: item.songmid, url: item.purl }));
            return arr;
        }, []);
    case '163':
        return data.reduce((arr, item) => {
            arr.push(new MusicUrl({ id: item.id, url: item.url }));
            return arr;
        }, []);
    default:
        return data;
    }
};
