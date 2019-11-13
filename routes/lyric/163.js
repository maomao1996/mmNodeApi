const { Lyric } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 歌词 网易

module.exports = async(ctx, next, axios) => {
  const { id, format } = ctx.query
  const params = {
    id
  }
  const { lrc } = await axios(
    '/weapi/song/lyric?lv=-1&kv=-1&tv=-1',
    'post',
    params,
    {},
    'linuxapi'
  )

  const data = isTrue(format) ? new Lyric(lrc.lyric) : lrc
  ctx.body = {
    data,
    ...Tips[163]
  }
}
