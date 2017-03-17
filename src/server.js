import http from 'http'

const server = http.createServer((req, res) => {
    res.write('Hello world!')
    res.end()
})

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

export default {
    run: function(port) {
        server.listen(port, () => {
            console.log('server listening on port: ', port)
        })
    }
}