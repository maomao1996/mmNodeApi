const { formatSearch } = require('../../model')
const { Tips, isTrue } = require('../../utils')

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
  const page = parseInt(ctx.query.page || 0)
  const size = parseInt(ctx.query.size || 20)
  const params = {
    type: TYPE_MAP[type],
    offset: page * size,
    limit: size,
    s
  }
  const { result } = await axios('/weapi/search/get', 'post', params)

  const body = {
    type,
    page,
    size,
    ...Tips[163]
  }
  if (type === 'song') {
    body.data = isTrue(format)
      ? formatSearch(result.songs, '163', type)
      : result.songs
    body.total = result.songCount
  } else if (type === 'playlist') {
    body.data = isTrue(format)
      ? formatSearch(result.playlists, '163', type)
      : result.playlists
    body.total = result.playlistCount
  } else {
    body.data = result
  }
  ctx.body = body
}
