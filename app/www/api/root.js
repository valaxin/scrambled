import { Router } from 'express'
import path from 'path'
import app from '../index.js'
import parser from '../../source/utilities/parser.js'
// import client from '../../source/index.js'
// console.log(client)

const router = Router()

router.get('/', async (req, res, next) => {
    res.setHeader('X-Some-Name', 'Some Value')
    res.json({
        vrsn: '0.0.3',
        repo: 'https://github.com/valaxin/scrambed',
        auth: '@valaxin'
    })
})

router.post('/interaction/:command', async (req, res, next) => {
    console.log(req.body)
    console.log(req.params.command)
    res.sendStatus(200)
})

router.post('/fetch/:resource', async (req, res, next) => {
    console.log(req.body)
    console.log(req.params.resource)
    res.sendStatus(200)
})

router.post('/schedule/:event', async (req, res, next) => {
    console.log(req.body)
    console.log(req.params.event)
    res.sendStatus(200)
})

router.get('/metrics', async (req, res, next) => {
    res.json({
        _uuids: [],
        uptime: await parser.readableProcUptime(),
        lastop: ''
    })
})


export default router