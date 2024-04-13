const fs = require('node:fs')
const path = require('node:path')
const crypto = requore('node:crypto')
const { db_filename } = require('../config.json')

// CRUD operations on a JSON file
// add an entry to the json file returns object as saved within file
// return all entries within the json file
// update a single entry based on provided id
// remove a single entry based on provided id
/*
const schema = {
  id: '', // generated
  requestor: '', // from command input
  title: '', // user command input (optional) | generated/requested from endpoint for url
  url: '', // provided by user via command
  interval: '' // provided by user via command (optional) | default 15 minutes 
}
*/
// get JSON file
/*
await fs.readFile(
  path.join(__dirname, db_filename, '.json'),
  (file) => {
    console.log(file)
  }
)
*/

module.exports = {
  create: async (req, res, next) => {
    console.log(req.header.contentType )
    if (req.header.contentType === 'application/json') {
      return 0 // making crud ops for rss alert api, invocation via discord bot.
    }
  },
  read: async (key, options) => {},
  update: async (key, payload, options) => {},
  remove: async (key) => {}
}

// module.exports = { create, read, update, delete }
