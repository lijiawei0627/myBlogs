var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

// 初始化app实例
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 使用morgan日志插件
app.use(logger('dev'));
// 将post请求中的JSON格式的数据赋给req.body。使得我们可以通过req.body直接访问。
app.use(express.json());
// 兼容post请求中的其他格式的数据，同样存放到req.body中
app.use(express.urlencoded({ extended: false }));
// 注册cookieParse插件之后，可以直接通过req.cookies访问cookie
app.use(cookieParser());
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
