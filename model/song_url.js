/**
 * 歌曲 URL 类模型
 */

class SongUrl {
    constructor ({ id, url }) {
        this.id = id; // 歌曲id
        this.url = url; // 歌曲播放地址
    }
}

module.exports = function formatSongUrl (data, type) {
    switch (type) {
    case 'qq':
        return data.reduce((arr, item) => {
            arr.push(new SongUrl({ id: item.songmid, url: item.purl }));
            return arr;
        }, []);
    case '163':
        return data.reduce((arr, item) => {
            arr.push(new SongUrl({ id: item.id, url: item.url }));
            return arr;
        }, []);
    default:
        return data;
    }
};
