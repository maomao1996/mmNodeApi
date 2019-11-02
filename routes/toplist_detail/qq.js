const { formatPlayListDetail } = require('../../model/index.js')
const { Tips, commonParams, OK_QQ, isTrue } = require('../../util/index.js')

// 排行榜 qq

module.exports = async (ctx, next, axios) => {
  const { id, format } = ctx.query
  const params = Object.assign({}, commonParams, {
    topid: id,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'yqq'
  })
  await axios('/v8/fcg-bin/fcg_v8_toplist_cp.fcg', 'get', params)
    .then(res => {
      if (res.code === OK_QQ) {
        const data = isTrue(format) ? formatPlayListDetail(res, 'qqTOP') : res
        ctx.body = {
          data,
          ...Tips.qq
        }
      } else {
        ctx.body = res
      }
    })
    .catch(e => ctx.throw(500))
}
