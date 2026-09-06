import { Schema, model } from 'mongoose'

const membersSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: false,
    },
    alias: {
      type: String,
      unique: false,
      required: false,
    },
  },
  { timestamps: true },
)

export default model('Members', membersSchema)
