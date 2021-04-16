/**
 * 歌手类模型
 */
const { BaseSinger } = require('./base')

class Singer extends BaseSinger {
  constructor({ id, mid, name, picUrl, platform }) {
    super({ id, mid, name })
    this.picUrl = picUrl
    this.platform = platform
  }
}

// 格式化歌手
function formatSingerList(data, platform) {
  switch (platform) {
    case 'qq':
      return data.map(
        (item) =>
          new Singer({
            id: item.singer_id,
            mid: item.singer_mid,
            name: item.singer_name,
            picUrl: item.singer_pic,
            platform: 'qq'
          })
      )
    case '163':
      return data.map(
        (item) =>
          new Singer({
            id: item.id,
            mid: item.id,
            name: item.name,
            picUrl: item.picUrl,
            platform: '163'
          })
      )
    default:
      return data
  }
}

module.exports = formatSingerList
