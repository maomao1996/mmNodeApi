const { formatPlayList } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 分类歌单 网易

module.exports = async(ctx, next, axios) => {
  const { order = 'hot', format } = ctx.query
  const offset = parseInt(ctx.query.offset || 0)
  const limit = parseInt(ctx.query.limit || 20)
  const params = {
    cat: '全部',
    order, // 热门 hot / 最新 new
    offset, // 偏移数量
    limit // 返回数量
  }
  const res = await axios('/weapi/playlist/list', 'post', params)

  const { playlists, total } = res
  const data = isTrue(format) ? formatPlayList(playlists, '163') : playlists
  ctx.body = {
    data,
    total,
    offset,
    limit,
    ...Tips[163]
  }
}
