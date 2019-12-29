const { formatSingerList } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 歌手列表

module.exports = async(ctx, next, axios) => {
  const { format } = ctx.query
  const params = mergeQQParams({
    '-': 'getUCGI' + (Math.random() + '').replace('0.', ''),
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      comm: { ct: 24, cv: 0 },
      singerList: {
        module: 'Music.SingerListServer',
        method: 'get_singer_list',
        param: {
          area: -100,
          sex: -100,
          genre: -100,
          index: -100,
          sin: 0,
          cur_page: 1
        }
      }
    }
  })
  const res = await axios(
    'https://u.y.qq.com/cgi-bin/musicu.fcg',
    'get',
    params,
    {
      Origin: 'https://y.qq.com',
      Referer: 'https://y.qq.com',
      Host: 'u.y.qq.com'
    }
  )

  if (isTrue(format)) {
    const { singerlist } = res.singerList.data
    ctx.body = {
      ...Tips.qq,
      data: formatSingerList(singerlist, 'qq')
    }
    return
  }

  ctx.body = {
    ...Tips.qq,
    ...res
  }
}
