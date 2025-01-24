import mongoose from 'mongoose'
import { createHmac } from 'node:crypto'

const Request = new mongoose.Schema({
  url: {
    type: Array,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: false
  },
  createdAt:{
    type: Date,
    expires: 3600,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
})


export default mongoose.model('Requests', Request)