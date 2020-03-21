const handleUserRouter = (req, res) => {
  const method = req.methodl

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '这是登录接口'
    }
  }
  // 注册
  if (method === 'POST' && req.path === '/api/user/register') {
    return {
      msg: '这是注册接口'
    }
  }
}

module.exports = handleUserRouter