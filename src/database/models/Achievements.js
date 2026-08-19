import { Schema, model } from 'mongoose'

// when a user is setup for retro achevement alerts, since ra doesn't provide
// we need to cache the first call (no alert) then we can poll every 15 minutes
// and get the diff between responses

const achievementsSchema = new Schema(
  {
    recently: {
      type: Schema.Types.Mixed,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    created: {
      type: Number,
      required: true
    },
    last: {
      type: Number,
      required: true
    }
  },
  { timestamps: true },
)

// create new user / new list
// update with achevements



export default model('Achievements', achievementsSchema)
