import { Router } from 'express'
import path from 'path'
import app from './server.js'

const router = Router()

router.get('/', async (req, res, next) => {
    res.json({ version: '0.0.1', repository: 'https://github.com/valaxin/scrambed' })
})

router.post('/interaction/:command', async (req, res, next) => {
    console.log(req.body)
    console.log(req.params.command)

    switch (req.params.command) {
        case 'anime-query-api' :
            console.log('hello!')
            break
        
        deafult :
            console.log(`${req.params.command} not found!`)
            break

    }

    res.sendStatus(200)
})

router.post('/fetch/:resource', async (req, res, next) => {
    console.log(req.body)
    console.log(req.params.resource)
    res.sendStatus(200)
})


export default router