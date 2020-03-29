const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')

const blog = require('./routes/blog')
const user = require('./routes/user')

const { REDIS_CONF } = require('./conf/db')

// 错误监测
onerror(app)

// 处理postData数据，可以处理多种格式，最终转成JSON格式
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

// 日志插件，优化打印格式，没有记录日志的功能
app.use(logger())

// 将public目录暴露出去，为应用程序提供静态文件
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 打印当前服务信息
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session配置，提供一个类似于密钥的作用
app.keys = ['WJiol#23123_']
app.use(session({
  // 配置cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // 配置redis
  store: redisStore({
    // all: '127.0.0.1:6379'  // 暂时写死本地redis的server，线上根据实际情况而定
    all: `${REDIS_CONF}:${REDIS_CONF.port}`
  })
}))

// 使用koa-morgan日志插件
// 第一个参数规定格式（有多种格式选择，如果是线上环境，我们选择'combined'）
// 第二个参数相关配置
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境
  app.use(morgan('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'  // 追加内容，而非覆盖
  })
  app.use(morgan('combined', {
    stream: writeStream  // 将日志写入到access.log文件中
  }))
}

// routes
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())


// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
