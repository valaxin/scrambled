import Request from '../../models/Requests.js'
import { createHmac } from 'node:crypto'

export async function createAndSaveUniqueRequest(req, res, next) {
  console.warn('[express://controllers/database/request.js] Incoming Request!')
  try {
    if (res._hasBody === true) {
      const data = encodeURI(`user=${req.body.author}&source=${req.body.source}&content=${req.body.url}`)
      req.body.hash = createHmac('sha256', 'a secret').update(data).digest('hex')
      const existingRequest = await Request.findOne({ hash: req.body.hash }).countDocuments()
      if (existingRequest == 0) {
        req.body.token = true
        req.body.timestamp = new Date()
        const newRequest = new Request({
          url: req.body.url,
          host: req.body.host,
          author: req.body.author,
          time: req.body.timestamp,
          hash: req.body.hash,
          source: req.body.source,
          createdAt: Date.now()
        })
        const saved = await newRequest.save()
        res.status = 201
        // res.json(saved)
        req.body.saved = saved
        console.warn('[express://controllers/database/request.js] 201 Successful!')
        next()
      } else {
        console.warn('[express://controllers/database/request.js] 409 Conflict!')
        res.sendStatus(409)
      }
    }
  } catch (error) {
    console.error('[express://controllers/database/request.js] 500 Server Error!', error)
    res.sendStatus(500)
  }
}

export async function getRequestQueue(req, res) {
  console.warn('[express://controllers/database/request.js::getRequestQueue()] Incoming Request!')
    try {
      let requests = await Request.find({}) // find all
      res.json({ total: requests.length, requests })
    } catch (error) {
      console.error('[express://controllers/database.js::getRequestQueue()]', error)
      res.sendStatus(500)
    }
}

export async function getRequestById(req, res) {
  console.warn('[express://controllers/database/request.js::getRequestById()] Incoming Request!')
  try {
    let request = await Request.findOne({ _id: req.params.id })
    !request ? res.sendStatus(404) : res.json(request)
  } catch (error) {
    console.error('[express://controllers/database/request.js::getRequestById()]', error)
    res.sendStatus(500)
  }
}

// set a limit on how long they can live in the database
export async function deleteRequestByTimeout(req, res) {}
