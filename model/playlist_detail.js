/**
 * 歌单详情类模型
 */
const { Creator } = require('./base.js')
const { formatSongs } = require('./song.js')

class PlayListDetail {
  constructor({
    id,
    name,
    picUrl,
    creator,
    createTime,
    updateTime,
    desc,
    songCount,
    playCount,
    shareCount,
    commentCount,
    songList
  }) {
    this.id = id // 歌单ID
    this.name = name // 歌单名称
    this.picUrl = picUrl // 歌单封面
    this.creator = creator // 歌单创建者信息（头像、昵称、ID）
    this.createTime = createTime // 歌单创建时间
    this.updateTime = updateTime // 歌单更新时间
    this.desc = desc // 歌单描述
    this.songCount = songCount // 歌曲数量
    this.playCount = playCount // 播放数
    this.shareCount = shareCount // 分享数
    this.commentCount = commentCount // 评论数
    this.songList = songList // 歌曲列表
  }
}

module.exports = function formatPlayListDetail(data, type) {
  switch (type) {
    case 'qqTOP':
      // qq 排行榜详情
      return new PlayListDetail({
        id: Number(data.topinfo.topID),
        name: data.topinfo.ListName,
        picUrl: data.topinfo.pic,
        creator: null,
        createTime: null,
        updateTime: data.update_time,
        desc: data.topinfo.info,
        songCount: data.total_song_num,
        playCount: null,
        shareCount: null,
        commentCount: data.comment_num,
        songList: formatSongs(data.songlist, 'qq')
      })
    case 'qq':
      // qq 歌单详情
      return new PlayListDetail({
        id: Number(data.disstid),
        name: data.dissname,
        picUrl: data.logo,
        creator: new Creator({
          uid: data.uin,
          name: data.nickname,
          picUrl: data.headurl
        }),
        createTime: data.ctime,
        updateTime: data.update_time,
        desc: data.desc,
        songCount: data.total_song_num,
        playCount: data.visitnum,
        shareCount: null,
        commentCount: null,
        songList: formatSongs(data.songlist, 'qq')
      })
    case '163':
      return new PlayListDetail({
        id: data.id,
        name: data.name,
        picUrl: data.coverImgUrl,
        creator: new Creator({
          uid: data.creator.userId,
          name: data.creator.nickname,
          picUrl: data.creator.avatarUrl
        }),
        createTime: data.createTime,
        updateTime: data.updateTime,
        desc: data.description,
        songCount: data.trackCount,
        playCount: data.playCount,
        shareCount: data.shareCount,
        commentCount: data.commentCount,
        songList: formatSongs(data.tracks, '163')
      })
    default:
      return data
  }
}
