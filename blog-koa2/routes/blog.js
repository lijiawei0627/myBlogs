const router = require('koa-router')()

// 路由前缀
router.prefix('/api/blog')

// / ctx为req、res的集合体，next与express差不多
//   /api/blog/list
router.get('/list', async function (ctx, next) {
  const query = ctx.query
  ctx.body = {
    error: 0,
    query,
    data: '获取博客列表'
  }
})


module.exports = router
