import mongoose from 'mongoose'
import { createHmac } from 'node:crypto'

const Request = new mongoose.Schema({
  url: {
    type: Array,
    default: [ 'anonymous' ],
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
  }
})

Request.pre('save', function(next) {
  console.log(thi)
  return createHmac('sha256', null).update(this.url.join('')).digest('hex')
})

export default mongoose.model('Requests', Request)