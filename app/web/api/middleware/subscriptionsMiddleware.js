const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

// interact with the static json database on behalf of the route handler
/*
const schema = {
  uuid: '',
  address: '',
  title: '',
  owner: '',
  interval: '',
  created: '',
}
*/

const dbPath = path.join(__dirname, '../../db/subscriptions.json')
console.log(`json database is located at "${dbPath}"`)
const db = require(dbPath);
module.exports = {
  registerNewFeed: async (req, res, next) => {
    if (req.get("content-type") === "application/json") {
      if ("address" && "owner" in req.body) {
        if (!("title" in req.body) || req.body.title === "") {
          req.body.title = req.body.address.split(".")[1];
        }
        req.body.uuid = crypto.randomUUID();
        req.body.created = Date.now();
      }
    }

    db.subscriptions.push(req.body)

    await fs.writeFile(
      path.join(__dirname, dbPath),
      JSON.stringify(db, null, 2),
      (error) => {
        if (error) {
          throw new Error("Sorry unable to write to the database ", error);
        }
        console.log("wrote to db!", new Date().toLocaleTimeString());
      }
    );

    next();
  },
  
};
