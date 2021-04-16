/**
 * 搜索类模型
 */
const { formatSongs } = require('./song')
const formatPlayList = require('./playlist')

module.exports = function formatSearch(data, platform, type) {
  switch (type) {
    case 'song':
      return formatSongs(data, platform)
    case 'playlist':
      return formatPlayList(data, platform)
    default:
      return data
  }
}
