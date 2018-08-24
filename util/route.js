const fs = require('fs');
const Router = require('koa-router');
const { qq, netease, axios } = require('./axios/index.js');

// 路由包装函数
const func = (fn, type) => {
    switch (type) {
    case 'qq':
        return (ctx, next) => fn(ctx, next, qq, axios);
    case '163':
        return (ctx, next) => fn(ctx, next, netease, axios);
    }
};

/**
 * 路由注册类
 * 通过读取指定目录下的文件自动注册路由
 */

module.exports = class Route {
    constructor (name) {
        this.name = name;
        this.router = new Router();
    }
    init () {
        const path = this.name.replace(/_/g, '/');
        fs
            .readdirSync(`./routes/${this.name}/`)
            .reverse()
            .forEach(file => {
                const fileName = file.replace(/.js/, '');
                this.router.get(`/${fileName}`, func(require(`../routes/${this.name}/${file}`), fileName));
            });
        this.router.redirect(`/`, `/${path}/qq`);
        return this.router;
    }
};
