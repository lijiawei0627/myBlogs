const express = require('./like-express')
const app = express()

app.use((req, res, next) => {
  console.log('hello, world')
  next()
})

app.get('/api/list', (req, res, next) => {
  res.json('success')
})

app.listen(3000, () => {
  console.log('listen')
})