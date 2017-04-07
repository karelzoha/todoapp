import http from 'http'
import url from 'url'
import express, { Router } from 'express'
import bodyParser from 'body-parser'

export default function({ store }) {
    const app = express()
    const router = Router()

    router.get('/task/:taskId', (req, res) => {
        const taskId = req.params.taskId
        const task = store.getTask(parseInt(taskId, 10))
        res.status(200).json(task)
    })

    router.post('/task', (req, res) => {
        const body = req.body
        const result = JSON.stringify(body)
        res.status(200).json(body)
    })

    app.use(bodyParser.json())
    app.use('/v1.0.0/', router)

    return {
        run: function (port) {
            app.listen(port, () => {
                console.log('server listening on port: ', port)
            })
        }
    }
}