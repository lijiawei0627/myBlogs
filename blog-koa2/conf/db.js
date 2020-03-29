const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  // mysql
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123654",
    database: "myblog"
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  // 在实际开发中，应该使用线上的实际配置
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123654",
    database: "myblog"
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}