const { formatSearchHot } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 热搜 qq

module.exports = async (ctx, next, axios) => {
  const format = ctx.query.format
  const params = mergeQQParams({
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  const res = await axios('/splcloud/fcgi-bin/gethotkey.fcg', 'get', params)

  if (isTrue(format)) {
    ctx.body = {
      ...Tips.qq,
      data: formatSearchHot(res.data.hotkey, 'qq')
    }
    return
  }

  ctx.body = {
    ...Tips.qq,
    ...res
  }
}
