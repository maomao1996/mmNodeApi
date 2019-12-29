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
  const res = await axios(
    '/weapi/v3/playlist/detail',
    'post',
    params,
    {},
    'linuxapi'
  )

  if (isTrue(format)) {
    ctx.body = {
      ...Tips[163],
      data: formatPlayListDetail(res.playlist, '163')
    }
    return
  }

  ctx.body = {
    ...Tips[163],
    ...res
  }
}
