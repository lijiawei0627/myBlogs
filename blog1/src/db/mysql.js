const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 连接数据库
const con = mysql.createConnection(MYSQL_CONF);

// 开始连接
con.connect()

// 执行统一sql语句
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape
}