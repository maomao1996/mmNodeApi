const { formatPlayListDetail } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 排行榜详情 qq

module.exports = async(ctx, next, axios) => {
  const { id, format } = ctx.query

  const params = mergeQQParams({
    topid: id,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'yqq'
  })
  const res = await axios('/v8/fcg-bin/fcg_v8_toplist_cp.fcg', 'get', params)

  const data = isTrue(format) ? formatPlayListDetail(res, 'qqTOP') : res
  ctx.body = {
    data,
    ...Tips.qq
  }
}
