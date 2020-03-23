const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.log(err)
})

function set (key, val) {
  // 如果val是对象，则应该先转为字符串类型，因为redis无法存储object类型数据
  // 如果不经转换直接存储，那么会先调用对象的tostring方法，再存储
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

function get (key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }

      // 此处为了兼容转换JSON格式
      try {
        resolve(JSON.parse(val))
      } catch (err) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}