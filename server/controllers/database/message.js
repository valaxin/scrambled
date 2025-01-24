import Message from '../../models/Messages.js'
import { createHmac } from 'node:crypto'

// CREATE NEW
export async function createAndSaveNewMessage(req, res) {
  try {
    if (res._hasBody === true) {
      const data = encodeURI(`user=${req.body.author}&source=${req.body.source}&content=${req.body.content}`)
      req.body.hash = createHmac('sha256', 'a secret').update(data).digest('hex')
      const existingMessages = await Message.findOne({ hash: req.body.hash }).countDocuments()
      if (existingMessages == 0) {
        req.body.token = true
        req.body.timestamp = new Date()
        const newMessage = new Message({
          hash: req.body.hash,
          author: req.body.author,
          source: req.body.source,
          content: req.body.content,
        })
        const saved = await newMessage.save()
        res.status = 201
        res.json(saved)
      } else {
        res.sendStatus(409)
      }
    }
  } catch (error) {
    console.error('[express://controllers/database.js] createAndSaveNewMessage()', error)
    res.sendStatus(500)
  }
}

// DELETE ONE BY ID
export async function deleteMessageById(req, res) {
  try {
    let result = await Message.findOneAndDelete({ _id: req.params.id })
    !result ? res.sendStatus(410) : res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

// DELETE ALL BY AUTHOR
export async function deleteAllMessagesByAuthor(req, res) {
  try {
    let deleted = []
    let messages = await Message.find({ author: req.params.author })
    if (!messages || messages.length === 0) {
      res.sendStatus(404)
    } else {
      for (let message of messages) {
        let result = await Message.findOneAndDelete({ _id: message._id })
        if (result) {
          deleted++
        }
      }
      if (deleted !== messages.length) {
        throw new Error('[express://controllers/database.js] >> unable to deleted everything...')
      } else {
        res.sendStatus(204)
      }
    }
  } catch (error) {
    console.error('[express://controllers/database.js] deleteAllMessagesByAuthor()', error)
    res.sendStatus(500)
  }
}

// GET ALL
export async function getAllMessages(req, res) {
  try {
    let messages = await Message.find({}) // find all
    res.json({ total: messages.length, messages })
  } catch (error) {
    console.error('[express://controllers/database.js] getAllMessages()', error)
    res.sendStatus(500)
  }
}

// GET ALL BY AUTHOR
export async function getAllMessagesByAuthor(req, res) {
  try {
    let messages = await Message.find({ author: req.params.author })
    if (!messages) {
      res.sendStatus(404)
    } else {
      res.json({ author: req.params.author, total: messages.length, messages })
    }
  } catch (error) {
    console.error('[express://controllers/database.js] getAllMessagesByAuthor()', error)
    res.sendStatus(500)
  }
}

// GET ONE BY ID
export async function getMessageById(req, res) {
  try {
    if (req.params.id.length < 24) {
      res.sendStatus(400)
    }
    let message = await Message.findOne({ _id: req.params.id })
    if (!message) {
      res.sendStatus(404)
    } else {
      res.json(message)
    }
  } catch (error) {
    console.error('[express://controllers/database.js] getMessageById()', error)
    res.sendStatus(500)
  }
}

export default {
  createAndSaveNew: createAndSaveNewMessage,
  deleteById: deleteMessageById,
  deleteAllByAuthor: deleteAllMessagesByAuthor,
  getAll: getAllMessages,
  getAllByAuthor: getAllMessagesByAuthor,
  getOneById: getMessageById,
}
