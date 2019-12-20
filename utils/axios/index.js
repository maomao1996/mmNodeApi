const axios = require('axios')
const querystring = require('querystring')
const encrypt = require('./crypto')
const { randomUserAgent, isPlainObject } = require('../utils')
const { HTTP_CODE_MAP } = require('../code')

// 网络请求配置

const qq = axios.create({
  baseURL: 'https://c.y.qq.com',
  headers: {
    Referer: 'https://c.y.qq.com/',
    Host: 'c.y.qq.com',
    'User-Agent': randomUserAgent()
  },
  platform: 'qq'
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
  },
  platform: 'netease'
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

// 咪咕请求配置
const migu = axios.create({
  baseURL: 'http://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content',
  headers: {
    Referer: 'http://music.migu.cn/',
    Host: 'music.migu.cn',
    'User-Agent': randomUserAgent()
  }
})
function miguAxios(url, method, data, headers = {}) {
  const options = {
    url,
    method,
    headers,
    [`${method === 'get' ? 'params' : 'data'}`]: data
  }
  return migu(options)
}

;[axios, qq, netease, migu].forEach(item => {
  item.interceptors.response.use(
    response => {
      console.log(`${response.config.method} ${response.config.url}`)
      if (
        item.defaults.platform &&
        isPlainObject(response.data) &&
        response.data.code !== HTTP_CODE_MAP[item.defaults.platform]
      ) {
        return Promise.reject(response)
      }
      return response.data
    },
    error => Promise.reject(error)
  )
})

module.exports = {
  qq: qqAxios,
  netease: neteaseAxios,
  migu: miguAxios,
  axios
}
