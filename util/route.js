const Router = require('koa-router');
const { qq, netease, axios } = require('./axios/index.js');

const fnQQ = fn => (ctx, next) => fn(ctx, next, qq, axios);
const fnNetease = fn => (ctx, next) => fn(ctx, next, netease, axios);

module.exports = class Route {
    constructor (name) {
        this.name = name;
        this.router = new Router();
    }
    init () {
        const path = this.name.replace(/_/g, '/');
        this.router.get('/qq', fnQQ(require(`../routes/${this.name}/qq.js`)));
        this.router.get('/163', fnNetease(require(`../routes/${this.name}/163.js`)));
        this.router.redirect(`/`, `/${path}/qq`);
        return this.router;
    }
};
