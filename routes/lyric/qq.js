const { Lyric } = require('../../model/index.js')
const { Tips, commonParams, OK_QQ, isTrue } = require('../../util/index.js')

// 歌词 qq

/* eslint-disable */
MusicJsonCallback_lrc = data => data;
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
  await axios('/lyric/fcgi-bin/fcg_query_lyric_new.fcg', 'get', params)
    .then(res => {
            const { code, lyric } = eval(res); // eslint-disable-line
      if (code === OK_QQ) {
        const data = isTrue(format) ? new Lyric(lyric) : lyric
        ctx.body = {
          data,
          ...Tips.qq
        }
      } else {
        ctx.body = res
      }
    })
    .catch(() => ctx.throw(500))
}
