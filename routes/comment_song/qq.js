const { formatComment } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 歌曲评论 qq

module.exports = async (ctx, next, axios) => {
  const { page = 0, size = 20, id: topid, format } = ctx.query

  const params = mergeQQParams({
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    reqtype: 2,
    biztype: 1,
    cmd: 8,
    domain: 'qq.com',
    topid,
    pagenum: page,
    pagesize: size
  })
  const res = await axios('/base/fcgi-bin/fcg_global_comment_h5.fcg', 'get', params)

  if (isTrue(format)) {
    const { comment, hot_comment: hot } = res
    const data = {
      page,
      size,
      total: comment.commenttotal,
      comments: formatComment(comment.commentlist, 'qq')
    }
    hot && (data.hotComments = formatComment(hot.commentlist, 'qq'))
    ctx.body = {
      ...Tips.qq,
      data
    }
    return
  }

  ctx.body = {
    ...Tips.qq,
    ...res
  }
}
