import http from 'http'
import url from 'url'
import express, { Router } from 'express'

export default function({ store }) {
    const app = express()
    const router = Router()

    router.get('/task/:taskId', (req, res) => {
        const taskId = req.params.taskId
        const body = JSON.stringify(store.getTask(parseInt(taskId, 10)))
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'application/json; charset=utf-8'
        })
        res.write(body)
        res.end()
    })

    router.post('/task', (req, res) => {
        let body = ''
        req.setEncoding('utf8')

        req.on('data', (data) => {
            body = body + data
        })

        req.on('end', () => {
            res.statusCode = 200
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'application/json; charset=utf-8'
            })
            res.write(body)
            res.end()
        })
    })

    app.use('/v1.0.0/', router)

    return {
        run: function (port) {
            app.listen(port, () => {
                console.log('server listening on port: ', port)
            })
        }
    }
}