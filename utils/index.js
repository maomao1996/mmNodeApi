const code = require('./code')
const utils = require('./utils')

module.exports = {
  axios: require('./axios'),
  Route: require('./route'),
  Tips: require('./tips'),
  ...code,
  ...utils
}
