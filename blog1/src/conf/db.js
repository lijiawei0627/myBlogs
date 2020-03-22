const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123654",
    database: "myblog"
  }
}

if (env === 'production') {
  // 此处在实际开发中，应该使用线上的实际配置
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123654",
    database: "myblog"
  }
}

module.exports = {
  MYSQL_CONF
}