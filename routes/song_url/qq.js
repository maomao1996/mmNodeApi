const { formatSongUrl } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 歌曲 URL qq

const getGuid = () =>
  '' +
  ((Math.round(Math.random() * 1e10) * new Date().getUTCMilliseconds()) % 1e9)

module.exports = async(ctx, next, axios) => {
  const format = ctx.query.format
  const { id } = ctx.request.body
  const songmid = Array.isArray(id) ? id : JSON.parse(id)
  const songtype = []
  songmid.forEach(item => {
    songtype.push(0)
  })
  const comm = mergeQQParams({
    platform: 'h5',
    needNewCode: 1,
    notice: 0,
    uin: 0
  })
  const guid = getGuid()
  const urlMid = {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      uin: '0',
      loginflag: 0,
      platform: '23',
      guid,
      songmid,
      songtype
    }
  }
  const res = await axios(
    `https://u.y.qq.com/cgi-bin/musicu.fcg?_=${Date.now()}`,
    'post',
    { comm, url_mid: urlMid },
    { host: '' }
  )

  if (isTrue(format)) {
    const { midurlinfo } = res.url_mid.data
    ctx.body = {
      ...Tips.qq,
      data: formatSongUrl(midurlinfo, 'qq')
    }
    return
  }

  ctx.body = {
    ...Tips.qq,
    ...res
  }
}
