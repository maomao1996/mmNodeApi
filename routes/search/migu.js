const { formatSearch } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 搜索 咪咕
const TYPE_MAP = {
  song: '{"song":1}',
  playlist: '{"songlist":1}'
}

module.exports = async(ctx, next, axios) => {
  const { keywords, format, type = 'song' } = ctx.query
  const page = parseInt(ctx.query.page || 0)
  const size = parseInt(ctx.query.size || 20)
  const params = {
    ua: 'Android_migu',
    version: '5.0.1',
    text: keywords,
    pageNo: page + 1,
    pageSize: size,
    searchSwitch: TYPE_MAP[type]
    // searchSwitch: '{"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":0}'
  }
  const res = await axios('/search_all.do', 'get', params)
  const body = {
    type,
    page,
    size,
    ...Tips.migu
  }
  if (type === 'song') {
    const { totalCount, result } = res.songResultData
    body.data = isTrue(format) ? formatSearch(result, 'migu', type) : res
    body.total = totalCount
  } else if (type === 'playlist') {
    const { totalCount, result } = res.songListResultData
    body.data = isTrue(format) ? formatSearch(result, 'migu', type) : result
    body.total = totalCount
  } else {
    body.data = res
  }
  ctx.body = body
}
