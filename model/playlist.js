/**
 * 歌单列表类模型
 */
const { Creator } = require('./base.js')

class PlayList {
  constructor ({ id, name, picUrl, creator, playCount }) {
    this.id = id // 歌单id
    this.name = name // 歌单名称
    this.picUrl = picUrl // 歌单封面
    this.creator = creator // 歌单创建者信息（头像、昵称、ID）
    this.playCount = playCount // 播放数
  }
}

module.exports = function formatPlayList (data, type) {
  switch (type) {
    case 'qq':
      return data.map(
        item =>
          new PlayList({
            id: item.dissid,
            name: item.dissname,
            picUrl: item.imgurl,
            creator: new Creator({
              uid: item.creator.encrypt_uin,
              name: item.creator.name,
              picUrl: item.creator.avatarUrl
            }),
            playCount: item.listennum
          })
      )
    case '163':
      return data.map(
        item =>
          new PlayList({
            id: item.id,
            name: item.name,
            picUrl: item.coverImgUrl,
            creator: new Creator({
              uid: item.creator.userId,
              name: item.creator.nickname,
              picUrl: item.creator.avatarUrl
            }),
            playCount: item.playCount
          })
      )
    default:
      return data
  }
}
