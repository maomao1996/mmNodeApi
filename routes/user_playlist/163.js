const { formatPlayList } = require('../../model')
const { Tips, OK_163, isTrue } = require('../../utils')

// 歌曲 URL 网易

module.exports = async(ctx, next, axios) => {
  const { uid, format } = ctx.query
  const offset = parseInt(ctx.query.offset || 0)
  const limit = parseInt(ctx.query.limit || 1000)
  const params = {
    uid: uid,
    limit,
    offset
  }
  await axios('/weapi/user/playlist', 'post', params)
    .then(res => {
      if (res.code === OK_163) {
        const data = isTrue(format)
          ? formatPlayList(res.playlist, '163')
          : res.playlist
        ctx.body = {
          data,
          ...Tips[163]
        }
      } else {
        ctx.body = res
      }
    })
    .catch(() => ctx.throw(500))
}
