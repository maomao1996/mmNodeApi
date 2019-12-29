const { Lyric } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 歌词 网易

module.exports = async(ctx, next, axios) => {
  const { id, format } = ctx.query
  const params = {
    id
  }
  const res = await axios(
    '/weapi/song/lyric?lv=-1&kv=-1&tv=-1',
    'post',
    params,
    {},
    'linuxapi'
  )

  if (isTrue(format)) {
    ctx.body = {
      ...Tips[163],
      data: new Lyric(res.lrc.lyric)
    }
    return
  }

  ctx.body = {
    ...Tips[163],
    ...res
  }
}
