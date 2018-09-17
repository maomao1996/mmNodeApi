const axios = require('axios');
const querystring = require('querystring');
const Encrypt = require('./crypto.js');
const { randomUserAgent } = require('../util.js');

// 网络请求配置

const qq = axios.create({
    baseURL: 'https://c.y.qq.com',
    headers: {
        Referer: 'https://c.y.qq.com/',
        Host: 'c.y.qq.com',
        'User-Agent': randomUserAgent()
    }
});

// QQ请求配置
function qqAxios (url, method, data, headers = {}) {
    const options = {
        url,
        method,
        headers,
        [`${method === 'get' ? 'params' : 'data'}`]: data
    };
    console.log(`[qqAxios] ${options.method} ${options.url}`);
    return qq(options);
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
});

// 网易云请求配置
function neteaseAxios (url, method, data, headers = {}) {
    const cryptoreq = Encrypt(data);
    const options = {
        url,
        method,
        headers,
        data: querystring.stringify({
            params: cryptoreq.params,
            encSecKey: cryptoreq.encSecKey
        })
    };
    console.log(`[neteaseAxios] ${options.method} ${options.url}`);
    return netease(options);
}

[qq, netease].forEach(item => {
    item.interceptors.response.use(response => response.data, error => Promise.reject(error));
});

module.exports = {
    qq: qqAxios,
    netease: neteaseAxios,
    axios
};
