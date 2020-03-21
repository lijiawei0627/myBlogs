const getList = (author, keyword) => {
  // 先返回假数据（格式是正确的）
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1546612712,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1546612712,
      author: 'lisi'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1546612712,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) =>{
  // blogData 是一个博客对象，包含title content属性
  return {
    id: 3 // 表示新建博客，插入到数据表中的id
  }
}
const updateBlog = (id, blogData = {}) => {
  // id就是要更新博客的id
  // blogData是一个博客对象，包含title和content属性
  return true
}

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