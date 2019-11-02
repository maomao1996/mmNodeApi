const { Lyric } = require('../../model/index.js')
const { Tips, OK_163, isTrue } = require('../../util/index.js')

// 歌词 网易

module.exports = async (ctx, next, axios) => {
  const { id, format } = ctx.query
  const params = {
    id
  }
  await axios(
    '/weapi/song/lyric?lv=-1&kv=-1&tv=-1',
    'post',
    params,
    {},
    'linuxapi'
  )
    .then(res => {
      const { code, lrc } = res
      if (code === OK_163) {
        const data = isTrue(format) ? new Lyric(lrc.lyric) : lrc
        ctx.body = {
          data,
          ...Tips[163]
        }
      } else {
        ctx.body = res
      }
    })
    .catch(() => ctx.throw(500))
}
