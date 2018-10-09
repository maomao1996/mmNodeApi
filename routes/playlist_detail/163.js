const { formatPlayListDetail } = require('../../model/index.js');
const config = require('../../config/index.js');
const { Tips, OK_163 } = require('../../util/index.js');

// 歌单详情 网易

module.exports = async (ctx, next, axios) => {
    const ft = ctx.query.format || config.format;
    const id = ctx.query.id;
    const params = {
        n: 100000,
        s: 8,
        csrf_token: '',
        id
    };
    await axios('/weapi/v3/playlist/detail', 'post', params)
        .then(res => {
            const { code, playlist } = res;
            if (code === OK_163) {
                const data = ft === 'open' ? formatPlayListDetail(playlist, '163') : playlist;
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
