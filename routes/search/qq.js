const { formatSearch } = require('../../model')
const { Tips, commonParams, isTrue } = require('../../utils')

// 搜索 qq

const getParams = (type, keywords, offset, limit) => {
  let url = '/soso/fcgi-bin/search_for_qq_cp'
  let obj
  if (type === 'song') {
    obj = {
      platform: 'h5',
      uin: 0,
      needNewCode: 1,
      zhidaqu: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      remoteplace: 'txt.yqq.playlist',
      w: keywords,
      p: offset / limit,
      perpage: limit,
      n: limit
    }
  } else if (type === 'playlist') {
    url = 'soso/fcgi-bin/client_music_search_songlist'
    obj = {
      remoteplace: 'txt.yqq.playlist',
      flag_qc: 0,
      page_no: offset / limit,
      num_per_page: limit,
      query: keywords
    }
  }
  return {
    params: Object.assign({}, commonParams, obj),
    url
  }
}

module.exports = async(ctx, next, axios) => {
  const { keywords, format, type = 'song' } = ctx.query
  if (!keywords) {
    ctx.body = Tips[1001]
    return
  }
  const offset = parseInt(ctx.query.offset || 0)
  const limit = parseInt(ctx.query.limit || 20)
  const { params, url } = getParams(type, keywords, offset, limit)
  const { data } = await axios(url, 'get', params)

  const body = {
    type,
    offset,
    limit,
    ...Tips.qq
  }
  if (type === 'song') {
    body.data = isTrue(format)
      ? formatSearch(data.song.list, 'qq', type)
      : data.song.list
    body.total = data.song.totalnum
  } else if (type === 'playlist') {
    body.data = isTrue(format) ? formatSearch(data.list, 'qq', type) : data.list
    body.total = data.sum
  } else {
    body.data = data
  }
  ctx.body = body
}
