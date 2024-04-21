'use strict'

const fs = require("node:fs");
const path = require("node:path");
const dbpath = path.join(__dirname, "../data/scheduled.json");
const db = require(dbpath)

/**
 * 
 * what does this function need to do...
 * ---
 * check for and read the existing json file
 * take the incoming data and combine it with the existing data
 * save as a json file overwriting existing without prompt
 * 
 */

const schema = {
  eventType: 'alarm',
  updatedAt: '',
  latestEvent: {},
  alarms: db.alarms === undefined ? [] : db.alarms
}

module.exports = {
  async register(options) {
    schema.updatedAt = Date.now(),
    schema.latestEvent = options,
    schema.alarms.push(options)
    try {
      return await fs.writeFile(
        dbpath,
        JSON.stringify(schema, null, 2),
        "utf8",
        (error) => {
        if (error) {
          return error;
        }
        return true;
      });
    } catch (error) {
      return error;
    }
  }
};
