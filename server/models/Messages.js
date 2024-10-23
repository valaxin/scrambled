import mongoose from 'mongoose'

const Message = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
})

export default mongoose.model('Messages', Message)