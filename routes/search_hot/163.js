const { formatSearchHot } = require('../../model/index.js')
const { Tips, OK_163, isTrue } = require('../../util/index.js')

// 热搜 网易

module.exports = async (ctx, next, axios) => {
  const format = ctx.query.format
  const params = {
    type: 1111
  }
  await axios('/weapi/search/hot', 'post', params)
    .then(res => {
      const { code, result } = res
      if (code === OK_163) {
        const data = isTrue(format) ? formatSearchHot(result.hots, '163') : result.hots
        ctx.body = {
          data,
          ...Tips[163]
        }
      } else {
        ctx.body = res
      }
    })
    .catch(() => ctx.throw(500))
}
