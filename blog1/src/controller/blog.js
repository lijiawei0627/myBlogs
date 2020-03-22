const { exec } = require('../db/mysql')

// 查询列表详情数据
const getList = (author, keyword) => {
  // 此处加上`where 1=1`是为了方便后续添加查询条件
  let sql = ` select * from blogs where 1=1 `
  if (author) {
    sql += `and author = ${author} `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  // 返回一个promise
  return exec(sql)
}

// 查询博客详情数据
const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  // 返回一个promie
  return exec(sql).then(rows => {
    // 每个id只针对一条数据，所以我们将数据从数组中取出来，返回一个对象
    return rows[0]
  })
}

// 新建博客
const newBlog = (blogData = {}) =>{
  // blogData 是一个博客对象，包含title content属性
  return {
    id: 3 // 表示新建博客，插入到数据表中的id
  }
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
  // id就是要更新博客的id
  // blogData是一个博客对象，包含title和content属性
  return true
}

// 删除博客
const delBlog = (id) => {
  // id为要删除博客的id
  return true
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}