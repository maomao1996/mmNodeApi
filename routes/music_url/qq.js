const { formatMusicUrl } = require('../../model/index.js');
const config = require('../../config/index.js');
const { Tips, OK_QQ, commonParams } = require('../../util/index.js');

// 歌曲 URL QQ

const getGuid = () => '' + (Math.round(Math.random() * 1e10) * new Date().getUTCMilliseconds()) % 1e9;

module.exports = async (ctx, next, axios) => {
    const { format: ft = config.format } = ctx.query;
    const id = ctx.request.body.id.split(',');
    const types = [];
    id.forEach(item => {
        types.push(0);
    });
    const comm = Object.assign({}, commonParams, {
        g_tk: 5381,
        platform: 'h5',
        needNewCode: 1,
        uin: 0
    });
    const guid = getGuid();
    const urlMid = {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
            guid,
            songmid: id,
            songtype: types,
            uin: '0',
            loginflag: 0,
            platform: '23'
        }
    };
    await axios(
        `https://u.y.qq.com/cgi-bin/musicu.fcg?_=${Date.now()}`,
        'post',
        { comm, url_mid: urlMid },
        { host: '' }
    )
        .then(res => {
            if (res.code === OK_QQ) {
                const midurlinfo = res.url_mid.data.midurlinfo;
                const data = ft === 'open' ? formatMusicUrl(midurlinfo, 'QQ') : midurlinfo;
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
