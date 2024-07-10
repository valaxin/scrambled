import path from 'path'
import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { Server } from 'socket.io'
import http from 'http'

import controller from './routes/basics.js'

const app = express()
const httpServer = http.createServer(app)

app.io = new Server(httpServer)

app.io.on('connection', (socket) => {
  console.log('> A new web socket connection has occured!')
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve('./web/public')))

app.get('/vendor/socket.io.js', (req, res, next) => {
  res.sendFile(path.resolve('./node_modules/socket.io/client-dist/socket.io.js'))
})

app.get('/vendor/socket.io.js.map', (req, res, next) => {
  res.sendFile(path.resolve('./node_modules/socket.io/client-dist/socket.io.js.map'))
})

app.use('/api', controller)

app.use(async (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use(async (err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = err
  res.status(err.status || 500)
  res.json(err)
})

httpServer.listen(3000, () => {
  console.log('> your express server is running...')
  console.log('> http://localhost:3000')
})

export default app
