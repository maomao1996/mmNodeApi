/**
 * 排行榜类模型
 */

const { BaseSong } = require('./base.js')

class TopList {
  constructor({ id, picUrl, name, songs }) {
    this.id = id // id
    this.picUrl = picUrl // 图片
    this.name = name // 标题
    this.songs = songs // 热门歌曲列表
  }
}

// 格式化热门歌曲
function formatSongs(data, platform) {
  switch (platform) {
    case 'qq':
      return data.map(
        item =>
          new BaseSong({
            name: item.songname,
            singer: item.singername
          })
      )
    case '163':
      return data.map(
        item =>
          new BaseSong({
            name: item.first,
            singer: item.second
          })
      )
    default:
      return data
  }
}

// 排行榜列表格式化
module.exports = function formatTopList(data, platform) {
  switch (platform) {
    case 'qq':
      return data.map(item => {
        const songs = formatSongs(item.songList, platform)
        return new TopList({
          id: item.id,
          picUrl: item.picUrl,
          name: item.topTitle,
          songs
        })
      })
    case '163':
      return data.map(item => {
        const songs = formatSongs(item.tracks, platform)
        return new TopList({
          id: item.id,
          picUrl: item.coverImgUrl,
          name: item.name,
          songs
        })
      })
    default:
      return data
  }
}
