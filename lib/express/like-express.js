const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor () {
    // 存放中间件的列表
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }
  register (path) {
    const info = {}
    if (typeof path === 'string') {
      // 当显式的传入路由地址时
      info.path = path
      // 从第二个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      // 从第二个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 0)
    }
    return info
  }
  use () {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }
  get () {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }
  post () {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }
  match (method, url) {
    // 存储可用的中间件
    let stack = []
    if (url === '/favicon.ico') {
      return stack
    }

    // 获取routes
    let curRoutes = []
    // 添加use注册的中间件
    curRoutes = curRoutes.concat(this.routes.all)
    // 添加get/post注册的中间件
    curRoutes = curRoutes.concat(this.routes[method])
    curRoutes.forEach(routeInfo => {
      if (url.indexOf(routeInfo.path) === 0) {
        // 注意此处只适合app.use处理情况
        // url === 'api/get-cookie' 时，不应该执行app.get('/api')中的中间件
        // 而在此处我们忽略了以上情况，因此该代码时十分不完善的
        // url === '/api/get-cookie' 且 'routeInfo.path === '/'
        // url === '/api/get-cookie' 且 'routeInfo.path === '/api'
        // url === '/api/get-cookie' 且 'routeInfo.path === '/api/get-cookie'
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }
  // 核心的next机制
  handle (req, res, stack) {
    const next = () => {
      // 从头获取匹配的中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        // 如果在middleware中，执行了next函数，那么将会再次执行该next方法
        // 以此执行stack，并最终执行完stack中所有函数，退出
        middleware(req, res, next)
      }
    }
    next()
  }
  callback () {
    return (req, res) => {
      // 定义res.json方法
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(data))
      }
      const url = req.url
      const method = req.method.toLowerCase()

      // 匹配可用的中间件列表
      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }
  listen (...args) {
    // 创建http服务
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress()
}