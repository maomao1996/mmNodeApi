const { Lyric } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 歌词 咪咕

module.exports = async(ctx, next, axios) => {
  const { id, format } = ctx.query
  const params = {
    copyrightId: id
  }
  const res = await axios(
    'http://music.migu.cn/v3/api/music/audioPlayer/getLyric',
    'get',
    params,
    {}
  )

  if (isTrue(format)) {
    ctx.body = {
      ...Tips.migu,
      data: new Lyric(res.lyric, 'migu')
    }
    return
  }

  ctx.body = {
    ...Tips.migu,
    ...res
  }
}
