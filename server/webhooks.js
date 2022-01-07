import { Router } from 'express'
import client from '../index.js'

const router = Router()

router.post('/ping', async (req, res, next) => {

  console.log(req.body)

  // bot.message.send('pong')

  client.channels.fetch('702760553814163567')
    .then(channel => channel.send('hello!'))
    .catch(console.error)

  res.json({ message: 'request received'})

})

export default router