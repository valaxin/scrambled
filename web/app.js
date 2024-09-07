import 'dotenv/config'

import path from 'path'
import http from 'http'
import logger from 'morgan'
import express from 'express'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import APIRouter from './router.js'
import ValidateToken from './middleware/authenticate.js' 

import songd from './services/songd.js'

const app = express()
const httpServer = http.createServer(app)

app.io = new Server(httpServer)
app.io.on('connection', (socket) => {
  console.log('[express] a new web socket connection has occured')
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve('./web/public')))

app.get('/favicon.ico', async (req, res, next) => {
  res.sendFile(path.resolve('./web/public/resources/favicon.ico'))
})

app.get('/resources/vendor/socket.io.js', async (req, res, next) => {
  res.sendFile(path.resolve('./node_modules/socket.io/client-dist/socket.io.js'))
})

app.get('/resources/vendor/socket.io.js.map', async (req, res, next) => {
  res.sendFile(path.resolve('./node_modules/socket.io/client-dist/socket.io.js.map'))
})

app.use('/api/v1/', ValidateToken, APIRouter)

app.use(async (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use(async (ex, req, res, next) => {
  res.locals.message = ex.message
  res.locals.error = ex
  res.status(err.status || 500)
  res.json(err)
})

httpServer.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`[express] your server is available at http://${process.env.HOST}:${process.env.PORT}`)
})

await songd(5000) // every 5 seconds

export default app
