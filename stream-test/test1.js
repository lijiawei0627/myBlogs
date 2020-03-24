

// 标准输入输出
// process.stdin.pipe(process.stdout)

// const http = require('http')
// const server = http.createServer((req, res) => {
//   if (req.method === "POST") {
//     req.pipe(res)
//   }
// })
// server.listen(8000)

// const fs = require('fs')
// const path = require('path')

// let fileName1 = path.resolve(__dirname, 'data.txt')
// let fileName2 = path.resolve(__dirname, 'data-bak.txt')
// // 读取文件的stream对象
// let readStream = fs.createReadStream(fileName1)
// // 写入文件的stream对象
// let writeStream = fs.createWriteStream(fileName2)
// // 执行拷贝
// readStream.pipe(writeStream)

// readStream.on('data', chunk => {
//   console.log(chunk.toString())
// })
// // 数据读取完成，即完成拷贝
// readStream.on('end', () => {
//   console.log('拷贝完成')
// })


// let http = require('http')
// let fs = require('fs')
// let path = require('path')

// let server = http.createServer((req, res) => {
//   let method = req.method
//   if (method === 'GET') {
//     let fileName = path.resolve(__dirname, 'data.txt');
//     let stream = fs.createReadStream(fileName)
//     stream.pipe(res)
//   }
// })

// server.listen(8000)