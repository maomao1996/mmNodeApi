const { formatPlayList } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 用户歌单列表 网易

module.exports = async(ctx, next, axios) => {
  const { uid, format } = ctx.query
  const offset = parseInt(ctx.query.offset || 0)
  const limit = parseInt(ctx.query.limit || 1000)
  const params = {
    uid: uid,
    limit,
    offset
  }
  const res = await axios('/weapi/user/playlist', 'post', params)

  const data = isTrue(format)
    ? formatPlayList(res.playlist, '163')
    : res.playlist
  ctx.body = {
    data,
    ...Tips[163]
  }
}
