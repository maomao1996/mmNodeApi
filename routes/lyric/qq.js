const { Lyric } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 歌词 qq

/* eslint-disable */
MusicJsonCallback_lrc = (data) => data
/* eslint-enable */

module.exports = async (ctx, next, axios) => {
  const { id, format } = ctx.query
  const params = mergeQQParams({
    jsonpCallback: 'MusicJsonCallback_lrc',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    callback: 'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    songmid: id,
    nobase64: 1
  })
  const res = await axios('/lyric/fcgi-bin/fcg_query_lyric_new.fcg', 'get', params)

  const evalRes = eval(res) // eslint-disable-line
  // console.log(eval(res))

  if (isTrue(format)) {
    ctx.body = {
      ...Tips.qq,
      data: new Lyric(evalRes.lyric, 'qq')
    }
    return
  }

  ctx.body = {
    ...Tips.qq,
    ...evalRes
  }
}
