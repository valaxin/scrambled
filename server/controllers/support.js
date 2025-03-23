import app from '../app.js'

export async function delayedEmit (req, res, next) {


  // expects access to web socket manager object via app

  console.log(app.io)
  console.log(req.body.saved)

  res.json(req.body.saved)

}

export default { delayedEmit }