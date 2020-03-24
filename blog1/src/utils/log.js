const fs = require('fs')
const path = require('path')

// 写日志
function writeLog (writeStream, log) {
  writeStream.write(log + '\n')  //关键代码 
}

// 生成write Stream
function createWriteStream (fileName) {
  // 获取日志文件地址
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a' // 追加内容，而非覆盖
  })
  return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access (log) {
  // 如果是线上环境则直接打印日志，否则将日志写入文件中
  // if (process.env.NODE_ENV === 'dev') {
  //   console.log(log)
  // } else {
  //   writeLog(accessWriteStream, log) 
  // }
  writeLog(accessWriteStream, log) 
}

module.exports = {
  access
}