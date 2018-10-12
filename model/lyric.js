/**
 * 歌词解析类模型
 */
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
// const tagRegMap = {
//     title: 'ti',
//     artist: 'ar',
//     album: 'al',
//     offset: 'offset',
//     by: 'by'
// };

module.exports = class Lyric {
    constructor (lrc) {
        this.lrc = lrc;
        this.lyric = [];
        this._init();
    }

    _init () {
        this._initLines();
    }

    _initLines () {
        const lines = this.lrc.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            let result = timeExp.exec(line);
            if (result) {
                const txt = line.replace(timeExp, '').trim();
                if (txt) {
                    if (this.type === 'QQ') {
                        this.lyric.push({
                            time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
                            txt
                        });
                    } else {
                        this.lyric.push({
                            time: Number(result[1] * 60 * 1000) + Number(result[2] * 1000) + Number(result[3] || 0),
                            txt
                        });
                    }
                }
            }
        }

        this.lyric.sort((a, b) => {
            return a.time - b.time;
        });
    }
};
