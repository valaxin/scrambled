'use strict'

export default async function token(req, res, next) {
  try {
    if ('token' in req.body) {
      if (req.body.token === process.env.SCRAMBLED) {
        req.body.token = true 
        next() // successful
      } else {
        res.send(401)
      }
    } else {
      res.send(401)
    }
  } catch (ex) {
    res.send(500) // exeception has occurd
  }
}
