const express = require('express')

// 本次http请求的实例
const app = express()

// 以下的每一个处理函数都是一个中间件
// 只有执行了next方法，才会继续下一个中间件

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  // 假设在处理cookie
  req.cookie = {
    userId: 'abc123'
  }
  next()
})

app.use((req, res, next) => {
  // 假设在处理postData
  // 异步
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    }
    next()
  })
})

app.use('/api', (req, res, next) =>{
  console.log('处理/api路由')
  next()
})

app.get('/api', (req, res, next) =>{
  console.log('get /api路由')
  next()
})

app.post('/api', (req, res, next) =>{
  console.log('post /api路由')
  next()
})

// 模拟登陆验证
function loginCheck (req, res, next) {
  setTimeout(() => {
    console.log('模拟登陆失败') 
    res.json({
      error: -1,
      msg: '登陆失败'
    })
  });
}
app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /apu/get-cookir')
  res.json({
    error: 0, 
    data:req.cookie,
    body: req.body
  })
})

app.post('/api/get-post-data', (req, res, next) => {
  console.log('post /api/get-post-data')
  res.json({
    error: 0, 
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('处理404')
  res.json({
    error: -1,
    msg: '404 not fount'
  })
})

app.listen(3000, () => {
  console.log('listen port 3000')
})