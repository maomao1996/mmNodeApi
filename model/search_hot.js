/**
 * 热搜类模型
 */

module.exports = function formatSearchHot(data, platform) {
  switch (platform) {
    case 'qq':
      return data.map((item) => item.k)
    case '163':
      return data.map((item) => item.first)
    default:
      return data
  }
}
