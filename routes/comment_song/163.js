const { formatComment } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 歌曲评论 网易

module.exports = async(ctx, next, axios) => {
  const { page = 0, size = 20, id: rid, before: beforeTime, format } = ctx.query
  const params = {
    beforeTime,
    rid,
    offset: page * size,
    limit: size
  }
  const res = await axios(
    `/api/v1/resource/comments/R_SO_4_${rid}`,
    'post',
    params
  )

  const { total, comments, hotComments } = res
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
    page,
    size,
    ...Tips[163]
  }
}
