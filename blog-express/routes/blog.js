const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
var express = require('express');
var router = express.Router();

// 注意：在除了app.use之外，其他的如get、post都不会匹配父路由
// 例如：访问/api/blog/list 时，不会匹配app.get('/api')，但是会访问app.use('/api')

router.get('/list', loginCheck, (req, res, next) => {
  // express中的req自带了query，不用再去手动解析query
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  // 从数据库获取数据，注意返回的result为一个promise
  const result = getList(author, keyword)
  result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});

// 获取博客详情
router.get('/detail', (req, res, next) => {
  // 从数据库获取数据，注意返回的result为一个promise
  const result = getDetail(req.query.id)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
})

// 新建一篇博客
router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
})
  
// 更新一篇博客
router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  result.then(val => {
    if (val) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})
// 删除一篇博客
router.post('/delete', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = delBlog(req.query.id, author)
  result.then(val => {
    if (val) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('删除博客失败'))
    }
  })
})

module.exports = router;
