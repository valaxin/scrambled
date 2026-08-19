import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    guild: {
      type: String,
      required: true,
    },
    duedate: {
      type: String,
      required: true,
      maxlength: 10,
    },
    catagory: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Ticket', ticketSchema)
