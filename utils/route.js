const fs = require('fs')
const Router = require('koa-router')
const axios = require('./axios')
const { platform } = require('../config')

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
  constructor(name, type = 'get') {
    this.name = name
    this.type = type
    this.router = new Router()
    return this.init()
  }

  init() {
    const path = this.name.replace(/_/g, '/')
    fs.readdirSync(`./routes/${this.name}/`)
      .reverse()
      .forEach(file => {
        const fileName = file.replace(/.js/, '')
        this.router[this.type](
          `/${fileName}`,
          func(require(`../routes/${this.name}/${file}`), fileName)
        )
      })
    this.router.redirect('/', `/${path}/${platform}`)
    return this.router.routes()
  }
}
