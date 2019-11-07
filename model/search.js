/**
  * 搜索类模型
  */
const { formatSongs } = require('./song')

module.exports = function formatSearch(data, musicType, type) {
  switch (type) {
    case 'song':
      switch (musicType) {
        case 'qq':
          return formatSongs(data, musicType)
        case '163':
          return formatSongs(data, musicType)
        default:
          return data
      }
    default:
      return data
  }
}
