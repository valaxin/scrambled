import mongoose from 'mongoose'

const Message = new mongoose.Schema({
  source: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false
  },
  hash: {
    type: String,
    required: false
  }
})

export default mongoose.model('Messages', Message)