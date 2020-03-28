var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')

const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

// 初始化app实例
var app = express();



// 使用morgan日志插件
// 第一个参数规定格式（有多种格式选择，如果是线上环境，我们选择'combined'）
// 第二个参数相关配置
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'  // 追加内容，而非覆盖
  })
  app.use(logger('combined', {
    stream: writeStream  // 将日志写入到access.log文件中
  }))
}
// app.use(logger('dev', {
//   stream: process.stdout  // 默认参数，输出到控制台
// }));
// 将post请求中的JSON格式的数据赋给req.body。使得我们可以通过req.body直接访问。
app.use(express.json());
// 兼容post请求中的其他格式的数据，同样存放到req.body中
app.use(express.urlencoded({ extended: false }));
// 注册cookieParse插件之后，可以直接通过req.cookies访问cookie
app.use(cookieParser());

const sessionStore = new RedisStore({
  client: redisClient
})
// 查看该cookie存储的connect.sid是否存在于session中，如果存在则获取session给req.session，
// 否则生成一个cookie，返回给用户，同时将session赋值为{cookie: {...}} (cookie的一些配置)
app.use(session({
  secret: 'WJiol#23123_', // 提供一个类似于密钥的作用
  cookie: {
    path: '/', // 默认为'/'
    httpOnly: true,  // 默认为true
    // 过期时间为24小时后
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore // 会将session自动存储到redis中
}))

// 将public目录暴露出去，为应用程序提供静态文件
// app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
// 如果找不到定义的路由,则404处理
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 服务器发生错误时,如果在开发环境,则抛出错误
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // 设置局部变量，仅在开发中提供错误设置局部变量，仅在开发中提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
