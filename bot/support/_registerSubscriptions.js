const { error } = require("node:console");
const { subscribe } = require("node:diagnostics_channel");
const fs = require("node:fs");
const path = require("node:path");
const dbpath = path.join(__dirname, "../data/cron-events.json");
const db = require('../data/cron-events.json')

module.exports = {
  async register(options) {
    // take in command options from discord
    // save them to an array with a json document

    const schema = {
      eventType: 'alarm',
      updatedAt: Date.now(),
      latestEvent: options,
      alarms: db.alarms === undefined ? [] : db.alarms
    }

    console.log(schema)

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
        }
      );

    } catch (error) {
      return error;
    }
  },

  async update() {},
};
