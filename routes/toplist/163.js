const { formatTopList } = require('../../model/index.js')
const config = require('../../config/index.js')
const { Tips, OK_163 } = require('../../util/index.js')

// 排行榜 网易

module.exports = async (ctx, next, axios) => {
  const ft = ctx.query.format || config.format
  const params = {
    csrf_token: ''
  }
  await axios('/weapi/toplist/detail', 'post', params)
    .then(res => {
      const { code, list } = res
      if (code === OK_163) {
        const data = ft === 'open' ? formatTopList(list, '163') : list
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
