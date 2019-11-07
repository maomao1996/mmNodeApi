/**
 * 歌曲类模型
 */
const { BaseSong, Album, Singer } = require('./base.js')

class Song extends BaseSong {
  constructor({ id, mid, name, singer, album, duration, platform, privilege = null }) {
    super({ name, singer }) // 歌曲名称 歌手
    this.id = id // 歌曲ID
    this.mid = mid // 歌曲ID
    this.album = album // 专辑
    this.duration = duration // 时长
    if (privilege !== null) {
      this.privilege = privilege // 是否能播放
    }
    this.platform = platform // 来源平台
  }
}

// 格式化歌手
function formatSinger(singers) {
  return singers.reduce((arr, item) => {
    arr.push(
      new Singer({
        id: item.id,
        mid: item.id,
        name: item.name
      })
    )
    return arr
  }, [])
}

function filterSinger(singers) {
  const arr = []
  singers.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

// 格式化歌曲数据
function formatSongs(data, platform) {
  switch (platform) {
    case 'qq':
      return data.reduce((arr, item) => {
        const obj = item.data ? item.data : item
        if (obj.songid && obj.songmid) {
          arr.push(
            new Song({
              id: obj.songid,
              mid: obj.songmid,
              name: obj.songname,
              singer: obj.singer,
              album: new Album({
                id: obj.albumid,
                mid: obj.albummid,
                name: obj.albumname,
                picUrl: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${obj.albummid}.jpg?max_age=2592000`
              }),
              duration: obj.interval,
              platform
            })
          )
        }
        return arr
      }, [])
    case '163':
      return data.reduce((arr, item) => {
        if (item.id) {
          const singer = item.ar || item.artists
          const album = item.al || item.album
          const duration = item.dt || item.duration
          arr.push(
            new Song({
              id: item.id,
              mid: item.id,
              name: item.name,
              singer: formatSinger(singer),
              album: new Album({
                id: album.id,
                mid: album.id,
                name: album.name,
                picUrl: album.picUrl || null
              }),
              duration: duration / 1000,
              platform
            })
          )
        }
        return arr
      }, [])
    default:
      return data
  }
}

module.exports = {
  filterSinger,
  Song,
  formatSongs
}
