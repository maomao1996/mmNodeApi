const { formatSearchHot } = require('../../model')
const { Tips, commonParams, OK_QQ, isTrue } = require('../../utils')

// 热搜 qq

module.exports = async(ctx, next, axios) => {
  const format = ctx.query.format
  const params = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  await axios('/splcloud/fcgi-bin/gethotkey.fcg', 'get', params)
    .then(res => {
      if (res.code === OK_QQ) {
        const data = isTrue(format)
          ? formatSearchHot(res.data.hotkey, 'qq')
          : res.data.hotkey
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
