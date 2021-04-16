const { formatPlayListDetail } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 歌单详情 qq

module.exports = async (ctx, next, axios) => {
  const { id, format } = ctx.query
  const params = mergeQQParams({
    disstid: id,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  const res = await axios('/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', 'get', params)

  if (isTrue(format)) {
    ctx.body = {
      ...Tips.qq,
      data: formatPlayListDetail(res.cdlist[0], 'qq')
    }
    return
  }

  ctx.body = {
    ...Tips.qq,
    ...res
  }
}
