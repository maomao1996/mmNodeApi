const { Lyric } = require('../../model/index.js');
const config = require('../../config/index.js');
const { Tips, commonParams, OK_QQ } = require('../../util/index.js');

// 歌词 QQ

/* eslint-disable */
MusicJsonCallback_lrc = data => data;
/* eslint-enable */

module.exports = async (ctx, next, axios) => {
    const { id, format: ft = config.format } = ctx.query;
    const params = Object.assign({}, commonParams, {
        jsonpCallback: 'MusicJsonCallback_lrc',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        callback: 'MusicJsonCallback_lrc',
        pcachetime: +new Date(),
        g_tk: 181969821,
        songmid: id
    });
    await axios('/lyric/fcgi-bin/fcg_query_lyric_new.fcg', 'get', params)
        .then(res => {
			const { code, lyric } = eval(res); // eslint-disable-line
            if (code === OK_QQ) {
                const lrc = Buffer.from(lyric, 'base64').toString();
                const data = ft === 'open' ? new Lyric(lrc) : lrc;
                ctx.body = {
                    data,
                    ...Tips['qq']
                };
            } else {
                ctx.body = res;
            }
        })
        .catch(() => ctx.throw(500));
};
