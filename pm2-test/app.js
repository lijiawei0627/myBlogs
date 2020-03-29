const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'appliction/json')
  res.end(JSON.stringify({
    error: 0,
    msg: 'pm2 test server 1'
  }))
})

server.listen(3000)
console.log('server is listening on port 8000')