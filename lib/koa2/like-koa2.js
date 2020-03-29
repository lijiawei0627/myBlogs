const http = require('http')

// 组合中间件
function compose (middlewareList) {
  return function (ctx) {
    // 核心的next机制
    function dispatch (i) {
      const fn = middlewareList[i]
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1))) // 保证中间件返回的都是一个Promise对象
      } catch (err) {
        return Promise.reject(err)  // 保证中间件返回的都是一个Promise对象
      }
    }
    return dispatch[0]
  }
}

class LikeKoa2 {
  constructor () {
    this.middlewareList = []
  }

  use (fn) {
    // 收集中间件
    this.middlewareList.push(fn)
    return this
  }

  createContext (req, res) {
    // 创建ctx
    const ctx = {req, res}
    ctx.query = req.query
    return ctx
  }

  handleRequest (ctx, fn) {
    // 开始执行中间件
    return fn(ctx)
  }

  callback () {
    const fn = compose(this.middlewareList)
    return (req, res) => {
      const ctx = this.createContext(req, res)
      // 开始执行中间件
      return this.handleRequest(ctx, fn)
    }
  }

  listen (...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = LikeKoa2