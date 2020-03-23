const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取将要设置给cookie的过期时间
const getCookieExpires = () => {
  const d = new Date()
  // 将d的时间设置为一天后
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  // 返回过期时间的GMT格式
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method
  // 登录
  if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {

        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname
        return new SuccessModel(data)
      }
      return new ErrorModel('登录失败')
    })
  }
  
  // 登录验证的测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          username: req.session
        })
      )
    }
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

module.exports = handleUserRouter