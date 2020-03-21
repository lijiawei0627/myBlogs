const fs = require('fs')
const path = require('path')

// 用promise获取文件内容
function getFileContent (fileName) {
  let promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName);
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
        return
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promise
}
getFileContent('a.json')
.then(aData => {
  console.log('a.data', aData)
  return getFileContent(aData.next)
}, err => console.log(err))
.then(bData => {
  console.log(bData);
  return getFileContent(bData.next)
})
.then(cData => console.log(cData))

// // callback方式获取一个文件的内容
// function getFileContent (fileName, callback) {
//   // 获取a.json的绝对路径D:\NODE-PROJECT\myBlogs\promise-test\files\a.json
//   const fullFileName = path.resolve(__dirname, 'files', fileName)
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) return new Error(err)
//     callback(JSON.parse(data.toString()))
//   })
// }

// getFileContent('a.json', aData => {
//   console.log('a.data', aData)
//   getFileContent(aData.next, bData => {
//     console.log('b.data', bData)
//     getFileContent(bData.next, cData => {
//       console.log('c.data', cData)
//     })
//   })
// })


