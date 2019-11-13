const { formatTopList } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 排行榜 网易

module.exports = async(ctx, next, axios) => {
  const format = ctx.query.format
  const params = { csrf_token: '' }
  const { list } = await axios('/weapi/toplist/detail', 'post', params)

  const data = isTrue(format) ? formatTopList(list, '163') : list
  ctx.body = {
    data,
    ...Tips[163]
  }
}
