const { formatPlayListDetail } = require('../../model/index.js');
const config = require('../../config/index.js');
const { Tips, commonParams, OK_QQ } = require('../../util/index.js');

// 排行榜 qq

module.exports = async (ctx, next, axios) => {
    const ft = ctx.query.format || config.format;
    const id = ctx.query.id;
    const params = Object.assign({}, commonParams, {
        topid: id,
        needNewCode: 1,
        uin: 0,
        tpl: 3,
        page: 'detail',
        type: 'top',
        platform: 'yqq'
    });
    await axios('/v8/fcg-bin/fcg_v8_toplist_cp.fcg', 'get', params)
        .then(res => {
            if (res.code === OK_QQ) {
                const data = ft === 'open' ? formatPlayListDetail(res, 'qqTOP') : res;
                ctx.body = {
                    data,
                    ...Tips['qq']
                };
            } else {
                ctx.body = res;
            }
        })
        .catch(e => ctx.throw(500));
};
