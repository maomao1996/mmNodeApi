const { formatSearchHot } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 热搜 网易

module.exports = async(ctx, next, axios) => {
  const format = ctx.query.format
  const params = {
    type: 1111
  }
  const res = await axios('/weapi/search/hot', 'post', params)

  if (isTrue(format)) {
    ctx.body = {
      ...Tips[163],
      data: formatSearchHot(res.result.hots, '163')
    }
    return
  }

  ctx.body = {
    ...Tips[163],
    ...res
  }
}
