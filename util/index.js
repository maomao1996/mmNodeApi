// QQ 请求参数
const commonParams = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'json'
};

// QQ 请求成功状态码
const OK_QQ = 200;

// 网易 请求成功状态码
const OK_163 = 200;

module.exports = {
    axios: require('./axios/index.js'),
    Route: require('./route.js'),
    Tips: require('./tips.js'),
    commonParams,
    OK_QQ,
    OK_163
};
