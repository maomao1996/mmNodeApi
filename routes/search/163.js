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
  const res = await axios('/weapi/search/get', 'post', params)

  if (isTrue(format)) {
    const { result } = res
    const data = {
      type,
      page,
      size
    }
    if (type === 'song') {
      data.total = result.songCount
      data.songs = formatSearch(result.songs, '163', type)
    } else if (type === 'playlist') {
      data.total = result.playlistCount
      data.playlists = formatSearch(result.playlists, '163', type)
    }
    ctx.body = {
      ...Tips[163],
      data
    }
    return
  }

  ctx.body = {
    ...Tips[163],
    ...res
  }
}
