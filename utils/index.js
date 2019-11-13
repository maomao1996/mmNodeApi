const code = require('./code')

// qq 请求参数
const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'json'
}

const isTrue = v => v === true

module.exports = {
  axios: require('./axios'),
  Route: require('./route'),
  Tips: require('./tips'),
  commonParams,
  isTrue,
  ...code
}
