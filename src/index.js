'use strict'
const http = require('http') 
const PORT = 3000

const server = http.createServer((req, res) => {
    res.write('Hello world!')
    res.end()
})

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(PORT)