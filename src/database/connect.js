import 'dotenv/config'
import mongoose from 'mongoose'

// define data constants
const db = {
  protocol: 'mongodb+srv://',
  user: `${process.env.DB_USER}:${process.env.DB_PASS}`,
  address: `@${process.env.DB_ADDRESS}`
}

// connect
export default async function connect() {
  try {
    await mongoose.connect(encodeURI(`${db.protocol}${db.user}${db.address}`), {})
    console.log(`[mongodb] logged into "${process.env.DB_ADDRESS.split('/')[0]}" as "${process.env.DB_USER}"`)
  } catch (err) {
    console.error('[mongodb] inital connect error:', err.message)
    return false
  }
}

// other handlers
mongoose.connection.on('disconnected', () => console.log('[mongodb] disconnected'))
mongoose.connection.on('error', (err) => console.error('[mongodb] error:', err))

