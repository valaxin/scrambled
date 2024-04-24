const fs = require("node:fs");
const path = require("node:path");
const chalk = require("chalk");

// internal calls
const { name, version } = require("../../package.json");
const dbpath = path.join(__dirname, "../data/scheduled.json");
const manifest = require('../manifest.json')
const db = require(dbpath);

async function log(message, status) {
  let types = ["OK!", "WARN!", "ERR!"];
  const color1 = chalk.magenta.bold;
  const color2 = chalk.green;
  console.log(
    color1(
      `[${name}@${version}] [${color2(Date.now())}] ${message} ${color2(
        types[status]
      )}`
    )
  );
}

function exists(filename) {
  const key = path.basename(filename).split(".")[0]
  const data = manifest.commands
  // console.log(data)
  if (!data[key]) {
    return new Error();
  }
  log(`Command "/${key}"`, 0);

  return {
    name: key,
    command: data[key],
    arguments: Object.keys(data[key].arguments || {}),
  };
}

const jobObjectTemplate = {
  eventType: "alarm",
  updatedAt: "",
  latestEvent: {},
  alarms: db.alarms === undefined ? [] : db.alarms,
};

async function alarm(options) {
  jobObjectTemplate.updatedAt = Date.now()
  jobObjectTemplate.latestEvent = options
  jobObjectTemplate.alarms.push(options)
  try {
    return await fs.writeFile(
      dbpath,
      JSON.stringify(jobObjectTemplate, null, 2),
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
}

module.exports = { log, exists, register: { alarm }}