const { formatSearch } = require('../../model')
const { Tips, isTrue } = require('../../utils')

// 搜索 咪咕
const TYPE_MAP = {
  song: '{"song":1}',
  playlist: '{"songlist":1}'
}

const RESULT_MAP = {
  song: 'songResultData',
  playlist: 'songListResultData'
}

module.exports = async (ctx, next, axios) => {
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

  if (isTrue(format)) {
    const data = {
      type,
      page,
      size
    }
    const { totalCount, result } = res[RESULT_MAP[type]]
    data.total = totalCount
    data[`${type}s`] = formatSearch(result, 'migu', type)
    ctx.body = {
      ...Tips.migu,
      data
    }
    return
  }

  ctx.body = {
    ...Tips.migu,
    ...res
  }
}
