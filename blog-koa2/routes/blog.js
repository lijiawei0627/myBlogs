const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const router = require('koa-router')()

// 路由前缀
router.prefix('/api/blog')

// / ctx为req、res的集合体，next与express差不多
//   /api/blog/list
router.get('/list', async function (ctx, next) {
  const author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''
  // 从数据库获取数据，注意getList返回的是一个promise
  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

// 获取博客详情
router.get('/detail', async (ctx, next) => {
  // 从数据库获取数据，注意getDetail返回的result为一个promise
  const data = await getDetail(req.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async (req, res, next) => {
  const body = ctx.reqest.body
  body.author = ctx.session.username
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})
  
// 更新一篇博客
router.post('/update', loginCheck, (req, res, next) => {
  const val = await updateBlog(ctx.query.id, ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})
// 删除一篇博客
router.post('/delete', loginCheck, (req, res, next) => {
  const author = ctx.session.username
  const val = await delBlog(req.query.id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})


module.exports = router
