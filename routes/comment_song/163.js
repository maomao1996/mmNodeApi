const { formatComment } = require('../../model/index.js')
const { Tips, OK_163, isTrue } = require('../../util/index.js')

// 热搜 网易

module.exports = async(ctx, next, axios) => {
  const { offset = 0, limit = 20, id: rid, before: beforeTime, format } = ctx.query
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
        if (isTrue(format)) {
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
