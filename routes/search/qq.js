const { formatSearch } = require('../../model')
const { Tips, mergeQQParams, isTrue } = require('../../utils')

// 搜索 qq

const getParams = (type, keywords, page, size) => {
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
      p: page,
      perpage: size,
      n: size
    }
  } else if (type === 'playlist') {
    url = 'soso/fcgi-bin/client_music_search_songlist'
    obj = {
      remoteplace: 'txt.yqq.playlist',
      searchid: 0,
      flag_qc: 0,
      page_no: page,
      num_per_page: size,
      query: keywords,
      loginUin: 0,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq.json'
    }
  }
  return {
    params: mergeQQParams(obj),
    url
  }
}

module.exports = async(ctx, next, axios) => {
  const { keywords, format, type = 'song' } = ctx.query
  if (!keywords) {
    ctx.body = Tips[1001]
    return
  }
  const page = parseInt(ctx.query.page || 0)
  const size = parseInt(ctx.query.size || 20)
  const { params, url } = getParams(type, keywords, page, size)
  const { data } = await axios(url, 'get', params)

  const body = {
    type,
    page,
    size,
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
