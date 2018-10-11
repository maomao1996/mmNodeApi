const { formatPlayList } = require('../../model/index.js');
const config = require('../../config/index.js');
const { Tips, OK_163 } = require('../../util/index.js');

// 排行榜 网易

module.exports = async (ctx, next, axios) => {
    const ft = ctx.query.format || config.format;
    const { order = 'hot' } = ctx.query;
    const offset = parseInt(ctx.query.offset || 0);
    const limit = parseInt(ctx.query.limit || 20);
    const params = {
        cat: '全部',
        order, // 热门 hot / 最新 new
        offset, // 偏移数量
        limit // 返回数量
    };
    await axios('/weapi/playlist/list', 'post', params)
        .then(res => {
            const { code, playlists, total } = res;
            if (code === OK_163) {
                const data = ft === 'open' ? formatPlayList(playlists, '163') : playlists;
                ctx.body = {
                    data,
                    total,
                    offset,
                    limit,
                    ...Tips[163]
                };
            } else {
                ctx.body = res;
            }
        })
        .catch(() => ctx.throw(500));
};
