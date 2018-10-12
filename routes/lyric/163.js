const { Lyric } = require('../../model/index.js');
const config = require('../../config/index.js');
const { Tips, OK_163 } = require('../../util/index.js');

// 歌词 网易

module.exports = async (ctx, next, axios) => {
    const { id, format: ft = config.format } = ctx.query;
    await axios(`/weapi/song/lyric?os=osx&id=${id}&lv=-1&kv=-1&tv=-1`, 'post', {})
        .then(res => {
            const { code, lrc } = res;
            if (code === OK_163) {
                const data = ft === 'open' ? new Lyric(lrc.lyric) : lrc;
                ctx.body = {
                    data,
                    ...Tips[163]
                };
            } else {
                ctx.body = res;
            }
        })
        .catch(() => ctx.throw(500));
};
