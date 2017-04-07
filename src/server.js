import http from 'http'
import url from 'url'
import express, { Router } from 'express'
import bodyParser from 'body-parser'

export default function({ store }) {
    const app = express()
    const router = Router()

    router.get('/task/:taskId', (req, res) => {
        const taskId = parseInt(req.params.taskId, 10)
        const task = store.getTask(taskId)
        res.status(200).json({
            status: 'OK',
            item: task
        })
    })

    router.put('/task', (req, res) => {
        const body = req.body
        store.addTask(body)
        res.status(200).json({
            status: 'OK',
            item: body
        })
    })

    router.post('/task', (req, res) => {
        const body = req.body
        if (body.list) {
            const {total, tasks } = store.listTasks(body.list)
            res.status(200).json({
                status: 'Ok',
                total,
                items: tasks 
            })
        } else {
            res.status(400).json({
                status: 'ERR',
                errorText: 'missing required operation'
            })
        }
    })

    router.delete('/task/:taskId', (req, res) => {
        const taskId = parseInt(req.params.taskId, 10)
        const task = store.getTask(taskId)
        store.deleteTask(taskId)
        res.status(200).json({
            status: 'OK',
            item: task
        })
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