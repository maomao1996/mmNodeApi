const { formatSearchHot } = require('../../model')
const { Tips, commonParams, isTrue } = require('../../utils')

// 热搜 qq

module.exports = async(ctx, next, axios) => {
  const format = ctx.query.format
  const params = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  const res = await axios('/splcloud/fcgi-bin/gethotkey.fcg', 'get', params)

  const data = isTrue(format)
    ? formatSearchHot(res.data.hotkey, 'qq')
    : res.data.hotkey
  ctx.body = {
    data,
    ...Tips.qq
  }
}
