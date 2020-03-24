const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
// 获取日志写入函数
const { access } = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 获取将要设置给cookie的过期时间
const getCookieExpires = () => {
  const d = new Date()
  // 将d的时间设置为一天后
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  // 返回过期时间的GMT格式
  return d.toGMTString()
}

// session数据
// const SESSION_DATA = {}


// 用户处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    // 如果post请求传递的数据不是json格式，返回空对象
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = '';
    // 通过流的方式接受数据，每次接受到数据，都会触发data事件（事件监听）
    req.on('data', chunk => {
      // chunk是二进制格式，应转换成字符串
      postData += chunk.toString();
    })
    // 数据接收完毕
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 记录 access log（访问日志）
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json');

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析query
  req.query = querystring.parse(url.split('?')[1])

  // 解析cookie，将string类型的cookie解析为对象
  req.cookie = {};
  const cookieStr = req.headers.cookie || '' // k1 = v1; k2 = v2
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=');
    const key = arr[0]
    const val = arr[1]
    req.cookie[key] = val
  })

  // 解析session
  // let needSetCookie = false
  // let userId = req.cookie.userid;
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   // 如果cookie中没有username，则需要设置
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]
  
  // 解析session （使用redis）
  let needSetCookie = false
  let userId = req.cookie.userid
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化redis中的session值
    set(userId, {})
    req.session = {}
  }
  // 获取session
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      set(req.sessionId, {})
      req.session = {}
    } else {
      req.session = sessionData
    }
    // 处理post data
    // 注意此处有异步操作，考虑到后续代码需要使用到req.session
    // 需等req.session处理完成之后，再执行后续代码
    // 否则可能会造成req.session为undefined，而导致报错
    return getPostData(req)
  })
  .then(postData => {
    req.body = postData
    
    // 处理blog路由
    // blogResult为返回的promise
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      if (needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
      }
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 处理user路由
    // const userData = handleUserRouter(req, res)
    // if (userData) {
    //   res.end(JSON.stringify(userData))
    //   return
    // }
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      if (needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
      }
      userResult.then(userData => {
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 未命中路由，返回404
    res.writeHead(404, { "Content-type": "text/plain" })
    res.write("404 Not Found\n")
    res.end()
  })
}

module.exports = serverHandle;