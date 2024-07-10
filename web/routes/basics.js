import { Router } from 'express'
import app from '../app.js'

const router = Router()

router.get('/alert', (req, res, next) => {
    console.log(req.body)
    app.io.emit('dsply', req.body)
    res.json(true)
})
  
router.post('/reload', (req, res, next) => {
    try {
        console.log('> Manual refresh of application requested')
        app.io.emit('reload-application-view', req.body)
        res.json({ sent: true })
    } catch (ex) {
        res.json({ ex })
    }
})
  
export default router