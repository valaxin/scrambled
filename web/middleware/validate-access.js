'use strict'

export default async function validateToken (req, res, next) {
  try {
    if ('token' in req.body) {
      if (req.body.token === process.env.SCRAMBLED) {
        req.body.token = true
        next()
      } else {
        res.sendStatus(401)
      }
    } else {
      res.sendStatus(401)
    }
  } catch (ex) {
    res.sendStatus(500)
  }
}
