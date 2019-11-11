const axios = require('axios')
const querystring = require('querystring')
const encrypt = require('./crypto')
const { randomUserAgent } = require('../utils')

// 网络请求配置

const qq = axios.create({
  baseURL: 'https://c.y.qq.com',
  headers: {
    Referer: 'https://c.y.qq.com/',
    Host: 'c.y.qq.com',
    'User-Agent': randomUserAgent()
  }
})

// QQ请求配置
function qqAxios(url, method, data, headers = {}) {
  const options = {
    url,
    method,
    headers,
    [`${method === 'get' ? 'params' : 'data'}`]: data
  }
  return qq(options)
}

const netease = axios.create({
  baseURL: 'https://music.163.com',
  headers: {
    Accept: '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
    Connection: 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    Referer: 'https://music.163.com/',
    Host: 'music.163.com',
    Origin: 'https://music.163.com',
    'User-Agent': randomUserAgent()
  }
})

// 网易云请求配置
function neteaseAxios(url, method, data, headers = {}, crypto = 'weapi') {
  if (crypto === 'weapi') {
    data = encrypt.weapi(data)
    url = url.replace(/\w*api/, 'weapi')
  } else if (crypto === 'linuxapi') {
    data = encrypt.linuxapi({
      url: `https://music.163.com${url}`.replace(/\w*api/, 'api'),
      params: data,
      method
    })
    url = 'https://music.163.com/api/linux/forward'
  }
  const options = {
    url,
    method,
    headers,
    data: querystring.stringify(data)
  }
  return netease(options)
}

;[axios, qq, netease].forEach(item => {
  item.interceptors.response.use(
    response => {
      console.log(`${response.config.method} ${response.config.url}`)
      return response.data
    },
    error => Promise.reject(error)
  )
})

module.exports = {
  qq: qqAxios,
  netease: neteaseAxios,
  axios
}
