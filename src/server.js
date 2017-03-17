import http from 'http'
import url from 'url'



export default function({ store }) {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url)
        const parsedTaskUrl = parsedUrl.pathname.match(/\/v1\.0\.0\/task(\/)?([0-9]*)/)
        if (typeof parsedUrl.pathname === 'string' && parsedTaskUrl) {
            const taskId = parseInt(parsedTaskUrl[2], 10)
            if(req.method === 'GET' && taskId !== NaN) {
                const body = JSON.stringify(store.getTask(taskId))
                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(body),
                    'Content-Type': 'application/json; charset=utf-8' 
                })
                res.write(body)    
                res.end()
            } else {
                res.statusCode = 400
                res.statusMessage = 'Not implemented'
                res.end()
            }
        } else {
            res.statusCode = 400
            res.statusMessage = 'Bad request'
            res.end()
        }
    })

    server.on('clientError', (err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })

    return {
        run: function(port) {
            server.listen(port, () => {
                console.log('server listening on port: ', port)
            })
        }
    }
}