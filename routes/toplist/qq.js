const { formatTopList } = require('../../model/index.js')
const { Tips, commonParams, OK_QQ, isTrue } = require('../../util/index.js')

// 排行榜 qq

module.exports = async (ctx, next, axios) => {
  const format = ctx.query.format
  const params = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  await axios('/v8/fcg-bin/fcg_myqq_toplist.fcg', 'get', params)
    .then(res => {
      if (res.code === OK_QQ) {
        const data = isTrue(format) ? formatTopList(res.data.topList, 'qq') : res.data.topList
        ctx.body = {
          data,
          ...Tips.qq
        }
      } else {
        ctx.body = res
      }
    })
    .catch(() => ctx.throw(500))
}
