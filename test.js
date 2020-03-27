// process.nextTick(() => {
//   console.log('nextTick1')
// })
// process.nextTick(() => {
//   console.log('nectTick2')
// })

// setImmediate(() => {
//   console.log('setImmediate1')
//   process.nextTick(() => {
//     console.log('强势插入')
//   })
// })

// setImmediate(() => {
//   console.log('setImmediate2')
// })
// console.log('start')

console.log(process.memoryUsage())
