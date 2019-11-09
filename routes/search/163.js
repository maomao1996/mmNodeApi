const { formatSearch } = require('../../model/index.js')
const { Tips, OK_163, isTrue } = require('../../util/index.js')

// 搜索 网易

const TYPE_MAP = {
  song: 1,
  playlist: 1000
}

module.exports = async(ctx, next, axios) => {
  const { keywords: s, format, type = 'song' } = ctx.query
  if (!s) {
    ctx.body = Tips[1001]
    return
  }
  const offset = parseInt(ctx.query.offset || 0)
  const limit = parseInt(ctx.query.limit || 20)
  const params = {
    type: TYPE_MAP[type],
    offset,
    limit,
    s
  }
  await axios('/weapi/search/get', 'post', params)
    .then(res => {
      const { code, result } = res
      if (code === OK_163) {
        const body = {
          type,
          offset,
          limit,
          ...Tips.qq
        }
        if (type === 'song') {
          body.data = isTrue(format) ? formatSearch(result.songs, '163', type) : result.songs
          body.total = result.songCount
        } else if (type === 'playlist') {
          body.data = isTrue(format) ? formatSearch(result.playlists, '163', type) : result.playlists
          body.total = result.playlistCount
        } else {
          body.data = result
        }
        ctx.body = body
      } else {
        ctx.body = res
      }
    })
    .catch(() => ctx.throw(500))
}
