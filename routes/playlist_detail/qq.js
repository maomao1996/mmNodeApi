const { formatPlayListDetail } = require('../../model')
const { Tips, commonParams, isTrue } = require('../../utils')

// 歌单详情 qq

module.exports = async(ctx, next, axios) => {
  const { id, format } = ctx.query
  const params = Object.assign({}, commonParams, {
    disstid: id,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  const res = await axios(
    '/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    'get',
    params
  )

  const data = isTrue(format)
    ? formatPlayListDetail(res.cdlist[0], 'qq')
    : res.cdlist[0]
  ctx.body = {
    data,
    ...Tips.qq
  }
}
