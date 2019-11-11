const { formatPlayList } = require('../../model')
const { Tips, commonParams, OK_QQ, isTrue } = require('../../utils')

// 歌单列表

module.exports = async(ctx, next, axios) => {
  const { order = 'hot', format } = ctx.query
  const offset = parseInt(ctx.query.offset || 0)
  const limit = parseInt(ctx.query.limit || 20)
  const params = Object.assign({}, commonParams, {
    picmid: 1,
    rnd: Math.random(),
    g_tk: 452748401,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: order === 'new' ? 2 : 5, // 热门 5 / 最新 2
    sin: offset, // 偏移数量
    ein: parseInt(offset + limit - 1) // 返回数量
  })
  await axios('/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', 'get', params)
    .then(res => {
      if (res.code === OK_QQ) {
        const { list, sum } = res.data
        const data = isTrue(format) ? formatPlayList(list, 'qq') : list
        ctx.body = {
          data,
          total: sum,
          offset,
          limit,
          ...Tips.qq
        }
      } else {
        ctx.body = res
      }
    })
    .catch(() => ctx.throw(500))
}
