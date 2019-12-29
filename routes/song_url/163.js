const { formatSongUrl } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 歌曲 URL 网易

module.exports = async(ctx, next, axios) => {
  const format = ctx.query.format
  const { id } = ctx.request.body
  const ids = Array.isArray(id) ? id : JSON.parse(id)
  const params = {
    ids,
    br: 999000,
    csrf_token: ''
  }
  const res = await axios('/weapi/song/enhance/player/url', 'post', params)

  if (isTrue(format)) {
    ctx.body = {
      ...Tips[163],
      data: formatSongUrl(res.data, '163')
    }
    return
  }

  ctx.body = {
    ...Tips[163],
    ...res
  }
}
