const { Lyric } = require('../../model')
const { Tips, commonParams, isTrue } = require('../../utils')

// 歌词 qq

/* eslint-disable */
MusicJsonCallback_lrc = data => data
/* eslint-enable */

module.exports = async(ctx, next, axios) => {
  const { id, format } = ctx.query
  const params = Object.assign({}, commonParams, {
    jsonpCallback: 'MusicJsonCallback_lrc',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    callback: 'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    g_tk: 181969821,
    songmid: id,
    nobase64: 1
  })
  const res = await axios(
    '/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
    'get',
    params
  )

  const { lyric } = eval(res) // eslint-disable-line
  // console.log(eval(res))
  const data = isTrue(format) ? new Lyric(lyric) : lyric
  ctx.body = {
    data,
    ...Tips.qq
  }
}
