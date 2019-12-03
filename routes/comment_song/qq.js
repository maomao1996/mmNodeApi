const { formatComment } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 歌曲评论 qq

module.exports = async(ctx, next, axios) => {
  const { offset = 0, limit = 20, id: topid, format } = ctx.query

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
    pagenum: offset / limit,
    pagesize: limit
  })
  const res = await axios(
    '/base/fcgi-bin/fcg_global_comment_h5.fcg',
    'get',
    params
  )

  const { comment, hot_comment } = res
  let data = {}
  if (isTrue(format)) {
    data.total = comment.commenttotal
    data.comments = formatComment(comment.commentlist, 'qq')
    hot_comment &&
      (data.hotComments = formatComment(hot_comment.commentlist, 'qq'))
  } else {
    data = res
  }
  ctx.body = {
    data,
    ...Tips.qq
  }
}
