const { formatPlayList } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 分类歌单 qq

module.exports = async(ctx, next, axios) => {
  const { order = 'hot', format } = ctx.query
  const page = parseInt(ctx.query.page || 0)
  const size = parseInt(ctx.query.size || 20)
  const params = mergeQQParams({
    picmid: 1,
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: order === 'new' ? 2 : 5, // 热门 5 / 最新 2
    sin: page * size, // 偏移数量
    ein: (page + 1) * size - 1 // 返回数量
  })
  const res = await axios(
    '/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
    'get',
    params
  )

  const { list, sum } = res.data
  const data = isTrue(format) ? formatPlayList(list, 'qq') : list
  ctx.body = {
    data,
    total: sum,
    page,
    size,
    ...Tips.qq
  }
}
