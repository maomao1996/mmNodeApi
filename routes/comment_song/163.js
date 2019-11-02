const { formatComment } = require('../../model/index.js')
const config = require('../../config/index.js')
const { Tips, OK_163 } = require('../../util/index.js')

// 热搜 网易

module.exports = async (ctx, next, axios) => {
  const { offset = 0, limit = 20, id: rid, before: beforeTime, format: ft = config.format } = ctx.query
  const params = {
    offset,
    limit,
    beforeTime,
    rid
  }
  await axios(`/api/v1/resource/comments/R_SO_4_${rid}`, 'post', params)
    .then(res => {
      const { code, total, comments, hotComments } = res
      if (code === OK_163) {
        let data = {}
        if (ft === 'open') {
          data.total = total
          data.comments = formatComment(comments, '163')
          hotComments && (data.hotComments = formatComment(hotComments, '163'))
        } else {
          data = res
        }
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
