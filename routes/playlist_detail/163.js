const { formatPlayListDetail } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 歌单详情 网易

module.exports = async(ctx, next, axios) => {
  const { id, format } = ctx.query
  const params = {
    n: 100000,
    s: 8,
    csrf_token: '',
    id
  }
  const { playlist } = await axios(
    '/weapi/v3/playlist/detail',
    'post',
    params,
    {},
    'linuxapi'
  )

  const data = isTrue(format) ? formatPlayListDetail(playlist, '163') : playlist
  ctx.body = {
    data,
    ...Tips[163]
  }
}
