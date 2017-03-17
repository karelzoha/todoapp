import http from 'http'
import url from 'url'

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url)
    if (typeof parsedUrl.pathname === 'string' && parsedUrl.pathname.match(/\/v1\.0\.0\/task(\/)?/)) {
        res.write('Hello world!')    
        res.end()
    } else {
        res.statusCode = 400
        res.statusMessage = 'Bad request'
        res.end()
    }
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