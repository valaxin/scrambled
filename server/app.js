import 'dotenv/config'

import path from 'path'
import http from 'http'
import logger from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from "express-session"
import * as socket from 'socket.io'
import mongoose from "mongoose"
import MongoStore from "connect-mongo" 

// locals
import APIRouter from './router.js'
import ValidateToken from './controllers/tokens.js' 

const app = express()
const httpServer = http.createServer(app)
const mongoConnection = mongoose.connect(process.env.DB_URI)

// setup socket.io
app.io = new socket.Server(httpServer)
app.io.on('connection', () => { console.log(`[express] >> [socket.io] A new client connection occured`) })
app.io.on('scrambled-stage.spotify-pong', (data) => console.log(data, 'SOMETHING HERE BOSS'))

const oneday_ms = 86400000

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  resave: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: oneday_ms },
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    ttl: 1 * 24 * 60 * 60, // = 14 days
    autoRemove: 'native', // Default
    touchAfter: 24 * 3600, // time period in seconds
    stringify: false
  })
}))


app.use(express.static(path.resolve('./server/public')))

// define some semi-static resource routes
app.get('/favicon.ico', async (req, res, next) => {
  res.sendFile(path.resolve('./server/public/resources/favicon.ico'))
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

import trackd from './daemons/current-spotify-track.js'

// tell express to listen on defined interface:port
httpServer.listen(process.env.PORT, process.env.HOST, async () => {
  console.log(`[express] Available at http://${process.env.HOST}:${process.env.PORT}`)

  // after server is started... start daemons
  // await trackd(app)
})



export default app
