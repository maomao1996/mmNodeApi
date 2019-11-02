/**
 * 评论列表类模型
 */
const { Creator } = require('./base.js')

// 回复
class Replied {
  constructor ({ creator, repliedCommentId, content, time, likedCount }) {
    this.creator = creator // 回复评论创建者信息（头像、昵称、ID）
    // this.repliedCommentId = repliedCommentId // 所回复的评论id
    this.content = content // 回复评论内容
  }
}

class Comment {
  constructor ({ creator, commentId, content, time, likedCount, replied }) {
    this.creator = creator // 评论创建者信息（头像、昵称、ID）
    this.commentId = commentId // 评论id
    this.content = content // 评论内容
    this.time = time // 评论时间
    this.likedCount = likedCount // 评论点赞数
    this.replied = replied // 回复评论
  }
}

function formatReplied ([data], type, comment) {
  if (!data) {
    return null
  }
  switch (type) {
    case 'qq':
      return new Replied({
        creator: new Creator({
          uid: data.replyeduin,
          name: data.replyednick,
          picUrl: null
        }),
        content: comment.rootcommentcontent
      })
    case '163':
      return new Replied({
        creator: new Creator({
          uid: data.user.userId,
          name: data.user.nickname,
          picUrl: null
        }),
        // repliedCommentId: data.beRepliedCommentId,
        content: data.content
      })
  }
}

module.exports = function formatComment (data, type) {
  switch (type) {
    case 'qq':
      return data.map(
        item => {
          const isReplied = !!item.middlecommentcontent
          return new Comment({
            creator: new Creator({
              uid: item.uin,
              name: item.nick,
              picUrl: item.avatarurl
            }),
            commentId: item.commentid,
            content: isReplied ? item.middlecommentcontent[0].subcommentcontent : item.rootcommentcontent,
            time: item.time,
            likedCount: item.praisenum,
            replied: isReplied ? formatReplied(item.middlecommentcontent, 'qq', item) : null
          })
        }
      )
    case '163':
      return data.map(
        item =>
          new Comment({
            creator: new Creator({
              uid: item.user.userId,
              name: item.user.nickname,
              picUrl: item.user.avatarUrl
            }),
            commentId: item.commentId,
            content: item.content,
            time: item.time,
            likedCount: item.likedCount,
            replied: formatReplied(item.beReplied, '163')
          })
      )
    default:
      return data
  }
}
