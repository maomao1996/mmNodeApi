const { formatPlayList } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 用户歌单列表 网易

module.exports = async (ctx, next, axios) => {
  const { uid, format } = ctx.query
  const offset = 0 // parseInt(ctx.query.offset || 0)
  const limit = 1000 // parseInt(ctx.query.limit || 1000)
  const params = {
    uid: uid,
    limit,
    offset
  }
  const res = await axios('/weapi/user/playlist', 'post', params)

  if (isTrue(format)) {
    ctx.body = {
      ...Tips[163],
      data: formatPlayList(res.playlist, '163')
    }
    return
  }

  ctx.body = {
    ...Tips[163],
    ...res
  }
}
