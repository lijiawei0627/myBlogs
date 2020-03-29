const router = require('koa-router')()

// 路由前缀
router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  ctx.body = {
    error: 0,
    username,
    password
  }
})

router.get('/session-test', async function (ctx, next) {
  console.log(1)
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++

  ctx.body = {
    error: 0,
    viewCount: ctx.session.viewCount
  }
})

module.exports = router
