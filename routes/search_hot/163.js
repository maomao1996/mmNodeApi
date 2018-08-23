const { formatSearchHot } = require('../../model/index.js');
const config = require('../../config/index.js');
const { Tips, OK_163 } = require('../../util/index.js');

// 热搜 网易

module.exports = async (ctx, next, netease, axios) => {
    const ft = ctx.query.format || config.format;
    const params = {
        type: 1111
    };
    await netease('/weapi/search/hot', 'post', params)
        .then(res => {
            const { code, result } = res;
            if (code === OK_163) {
                const data = ft === 'open' ? formatSearchHot(result.hots, '163') : result.hots;
                ctx.body = {
                    data,
                    ...Tips[163]
                };
            } else {
                ctx.body = res;
            }
        })
        .catch(() => {
            ctx.throw(502, 'fetch error');
        });
};
