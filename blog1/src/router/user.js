const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const result = loginCheck(username, password)
    return result.then(data => {
      if (data.username) {
        return new SuccessModel(data)
      }
      return new ErrorModel('登录失败')
    })
  }
  // 注册
  if (method === 'POST' && req.path === '/api/user/register') {
    return {
      msg: '这是注册接口'
    }
  }
}

module.exports = handleUserRouter