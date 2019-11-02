const { formatPlayListDetail } = require('../../model/index.js')
const { Tips, commonParams, OK_QQ, isTrue } = require('../../util/index.js')

// 排行榜 qq

module.exports = async (ctx, next, axios) => {
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
  await axios('/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', 'get', params)
    .then(res => {
      if (res.code === OK_QQ) {
        const data = isTrue(format) ? formatPlayListDetail(res.cdlist[0], 'qq') : res.cdlist[0]
        ctx.body = {
          data,
          ...Tips.qq
        }
      } else {
        ctx.body = res
      }
    })
    .catch(e => ctx.throw(500))
}
