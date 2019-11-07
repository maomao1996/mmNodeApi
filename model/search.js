/**
  * 搜索类模型
  */
const { formatSongs } = require('./song')

module.exports = function formatSearch(data, platform, type) {
  switch (type) {
    case 'song':
      switch (platform) {
        case 'qq':
          return formatSongs(data, platform)
        case '163':
          return formatSongs(data, platform)
        default:
          return data
      }
    default:
      return data
  }
}
