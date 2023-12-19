
import path from 'path'
import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import http from 'http'
import APIController from './api/index.js'

const PORT = '3000'
const HOST = 'localhost'

const app = express()
const httpServer = http.createServer(app)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api', APIController)

app.get('/', (req, res, next) => {
  console.log(`[express] request for '/'`)
  res.json({ whoami: 'scrambled' })
})

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
  console.log(`[express] available at ${HOST}:${PORT}`)
})

export default app