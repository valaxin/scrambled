import 'dotenv/config'

import path from 'path'
import http from 'http'
import logger from 'morgan'
import express from 'express'
import * as socketio from 'socket.io'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import APIRouter from './router.js'
import ValidateToken from './middleware/tokens.js' 

const app = express()
const httpServer = http.createServer(app)

// setup socket.io
app.io = new socketio.Server(httpServer)
app.io.on('connection', () => { console.log(`new client connection occured`) })
app.io.on('scrambled-stage.spotify-pong', (data) => console.log(data, 'SOMETHING HERE BOSS'))

// setup express.js server
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve('./web/public')))

// define some semi-static resource routes
app.get('/favicon.ico', async (req, res, next) => {
  res.sendFile(path.resolve('./web/public/resources/favicon.ico'))
})
app.get('/resources/vendor/socket.io.js', async (req, res, next) => {
  res.sendFile(path.resolve('./node_modules/socket.io/client-dist/socket.io.js'))
})
app.get('/resources/vendor/socket.io.js.map', async (req, res, next) => {
  res.sendFile(path.resolve('./node_modules/socket.io/client-dist/socket.io.js.map'))
})

// define api route handler
app.use('/api', ValidateToken, APIRouter)

// basic error handling
app.use(async (req, res, next) => {
  const ex = new Error('404 Not Found!')
  ex.status = 404
  next(ex)
})

app.use(async (ex, req, res, next) => {
  res.locals.message = ex.message
  res.locals.error = ex
  res.status(ex.status || 500)
  res.json(ex)
})

// tell express to listen on defined interface:port
httpServer.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`[express] Available at http://${process.env.HOST}:${process.env.PORT}`)
})

export default app
