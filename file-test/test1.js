const fs = require('fs')
const path = require('path')

// __dirname是node.js中的一个全局变量，它可以获得当前文件所在目录从盘符开始的全路径
const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   // data是二进制类型，需要转换为字符串
//   console.log(data.toString())
// })


// 写入文件
// const content = '这是新写入的内容\n'
// const opt = {
//   flag: 'a' // 追加写入。覆盖用'w'
// }
// fs.writeFile(fileName, content, opt, (err) => {
//   if (err) {
//     console.error(err)
//   }
// })


// 判断文件是否存在
// fs.exists(fileName, (exist) => {
//   console.log('exist', exist)
// })


// process.stdin.pipe(process.stdout)
// const http = require('http')
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     // `nodejs`中，网络请求和响应都具有流的特性
//     req.pipe(res)
//   }
// });
// server.listen(8000)