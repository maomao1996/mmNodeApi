/**
 * 歌单列表类模型
 */
const { Creator } = require('./base')

class PlayList {
  constructor({ id, name, picUrl, creator, playCount, platform }) {
    this.id = id // 歌单id
    this.name = name // 歌单名称
    this.picUrl = picUrl // 歌单封面
    this.creator = creator // 歌单创建者信息（头像、昵称、ID）
    this.playCount = playCount // 播放数
    this.platform = platform // 来源平台
  }
}

module.exports = function formatPlayList(data, platform) {
  switch (platform) {
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
              picUrl: item.creator.avatarUrl || null
            }),
            playCount: item.listennum,
            platform
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
            playCount: item.playCount,
            platform
          })
      )
    case 'migu':
      return data.map(
        item =>
          new PlayList({
            id: item.id,
            name: item.name,
            picUrl: item.musicListPicUrl,
            creator: new Creator({
              uid: item.userId,
              name: null,
              picUrl: null
            }),
            playCount: item.musicNum,
            platform
          })
      )
    default:
      return data
  }
}
