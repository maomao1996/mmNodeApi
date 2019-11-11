// qq 请求参数
const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'json'
}

// qq 请求成功状态码
const OK_QQ = 0

// 网易 请求成功状态码
const OK_163 = 200

const isTrue = v => v === true

module.exports = {
  axios: require('./axios'),
  Route: require('./route'),
  Tips: require('./tips'),
  commonParams,
  OK_QQ,
  OK_163,
  isTrue
}
