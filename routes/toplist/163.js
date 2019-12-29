const { formatTopList } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 排行榜 网易

module.exports = async(ctx, next, axios) => {
  const format = ctx.query.format
  const params = { csrf_token: '' }
  const res = await axios('/weapi/toplist/detail', 'post', params)

  if (isTrue(format)) {
    ctx.body = {
      ...Tips[163],
      data: formatTopList(res.list, '163')
    }
    return
  }

  ctx.body = {
    ...Tips[163],
    ...res
  }
}
