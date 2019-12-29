const { formatSingerList } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 歌手列表

module.exports = async(ctx, next, axios) => {
  const { format } = ctx.query
  const offset = 0 // parseInt(ctx.query.offset || 0)
  const limit = 80 // parseInt(ctx.query.limit || 50)
  const params = {
    offset, // 偏移数量
    limit, // 返回数量
    total: true
  }
  const res = await axios('/weapi/artist/list', 'post', params)

  if (isTrue(format)) {
    ctx.body = {
      ...Tips[163],
      data: formatSingerList(res.artists, '163')
    }
    return
  }

  ctx.body = {
    ...Tips[163],
    ...res
  }
}
