const fs = require('fs')
const Router = require('koa-router')
const axios = require('./axios/index.js')
const { musicType } = require('../config/index.js')

// 路由包装函数
const func = (fn, type) => {
  const t = type === '163' ? 'netease' : type
  return (ctx, next) => fn(ctx, next, axios[t])
}

/**
 * 路由注册类
 * 通过读取指定目录下的文件自动注册路由
 */

module.exports = class Route {
  constructor(name, type = null) {
    this.name = name
    this.type = type
    this.router = new Router()
  }

  init() {
    const path = this.name.replace(/_/g, '/')
    fs
      .readdirSync(`./routes/${this.name}/`)
      .reverse()
      .forEach(file => {
        const fileName = file.replace(/.js/, '')
        if (this.type === 'post') {
          this.router.post(`/${fileName}`, func(require(`../routes/${this.name}/${file}`), fileName))
        } else {
          this.router.get(`/${fileName}`, func(require(`../routes/${this.name}/${file}`), fileName))
        }
      })
    this.router.redirect('/', `/${path}/${musicType}`)
    return this.router
  }
}
