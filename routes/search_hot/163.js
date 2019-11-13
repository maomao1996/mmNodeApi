const { formatSearchHot } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 热搜 网易

module.exports = async(ctx, next, axios) => {
  const format = ctx.query.format
  const params = {
    type: 1111
  }
  const { result } = await axios('/weapi/search/hot', 'post', params)

  const data = isTrue(format)
    ? formatSearchHot(result.hots, '163')
    : result.hots
  ctx.body = {
    data,
    ...Tips[163]
  }
}
