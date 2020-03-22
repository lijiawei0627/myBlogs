// 导入mysql模块
const mysql = require("mysql");

// 连接数据库
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123654",
    database: "myblog"
});

// 开始连接
con.connect()

// 执行sql语句
const sql = 'select * from users;'
con.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return
  }
  console.log(result)
})

/* const sql1 = `update users set realname='李四' where username='lisi'`
con.query(sql1, (err, result) => {
  if (err) {
    console.log(err);
    return
  }
  console.log(result)
}) */

// 关闭连接
con.end()