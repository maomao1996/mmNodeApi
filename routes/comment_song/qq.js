const { formatComment } = require('../../model/index.js')
const { Tips, commonParams, OK_QQ, isTrue } = require('../../util/index.js')

// 歌单列表

module.exports = async (ctx, next, axios) => {
  const { offset = 0, limit = 20, id: topid, format } = ctx.query

  const params = Object.assign({}, commonParams, {
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
  await axios('/base/fcgi-bin/fcg_global_comment_h5.fcg', 'get', params)
    .then(res => {
      const { code, comment, hot_comment } = res
      if (code === OK_QQ) {
        let data = {}
        if (isTrue(format)) {
          data.total = comment.commenttotal
          data.comments = formatComment(comment.commentlist, 'qq')
          hot_comment && (data.hotComments = formatComment(hot_comment.commentlist, 'qq'))
        } else {
          data = res
        }
        ctx.body = {
          data,
          ...Tips.qq
        }
      } else {
        ctx.body = res
      }
    })
    .catch(() => ctx.throw(500))
}
