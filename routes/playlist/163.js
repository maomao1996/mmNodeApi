const { formatPlayList } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 分类歌单 网易

module.exports = async(ctx, next, axios) => {
  const { order = 'hot', format } = ctx.query
  const page = parseInt(ctx.query.page || 0)
  const size = parseInt(ctx.query.size || 20)
  const params = {
    cat: '全部',
    order, // 热门 hot / 最新 new
    offset: page * size, // 偏移数量
    limit: size // 返回数量
  }
  const res = await axios('/weapi/playlist/list', 'post', params)

  if (isTrue(format)) {
    const { playlists, total } = res
    const data = {
      page,
      size,
      total,
      playlists: formatPlayList(playlists, '163')
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
