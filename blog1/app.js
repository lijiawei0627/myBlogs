const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

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
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json');

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析query
  req.query = querystring.parse(url.split('?')[1])

  // 处理post data
  getPostData(req).then(postData => {
    req.body = postData
    
    // 处理blog路由
    // blogResult为返回的promise
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 处理user路由
    const userData = handleUserRouter(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return
    }

    // 未命中路由，返回404
    res.writeHead(404, { "Content-type": "text/plain" })
    res.write("404 Not Found\n")
    res.end()
  })
}

module.exports = serverHandle;