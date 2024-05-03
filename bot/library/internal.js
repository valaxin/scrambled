"use strict";

const path = require("node:path");
const chalk = require("chalk");

const { name, version } = require("../../package.json");
const manifest = require("../data/commands.json");

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
  const key = path.basename(filename).split(".")[0];
  const data = manifest.commands;
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

module.exports = { log, exists };
