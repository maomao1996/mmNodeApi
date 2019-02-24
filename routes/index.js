const fs = require('fs');
const Router = require('koa-router');
const { Route } = require('../util/index.js');

const router = new Router();

// POST 路由映射
const POSTRouterFileMap = ['song_url'];

// 读取 routes 目录中的文件, 根据命名规则自动注册路由
fs
    .readdirSync('./routes/')
    .reverse()
    .forEach(file => {
        if (/^(?!.*\.js)/.test(file)) {
            const fileName = file.replace(/_/g, '/');
            if (POSTRouterFileMap.includes(file)) {
                router.use(`/${fileName}`, new Route(file, 'post').init().routes());
            } else {
                router.use(`/${fileName}`, new Route(file).init().routes());
            }
        }
    });

module.exports = router;
