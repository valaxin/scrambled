"use strict";

const chalk = require("chalk");
const fs = require("node:fs");
const { name } = require("../../package.json");

console.__proto__.report = (message, status) => {
  const type = ["OK!", "WARN!", "ERR!", "INFO!"];
  const styles = {
    default: chalk.white,
    success: chalk.green.bold,
    failure: chalk.red.bold,
    warning: chalk.yellow.bold,
    information: chalk.blue,
  };
  switch (status) {
    default:
      console.log(
        styles.default(`[${name}] [${styles.success(type[status])}] ${message}`)
      );
      break;
    case 1:
      console.log(
        styles.default(`[${name}] [${styles.warning(type[status])}] ${message}`)
      );
      break;
    case 2:
      console.log(
        styles.default(`[${name}] [${styles.failure(type[status])}] ${message}`)
      );
      break;
    case 3:
      console.log(
        styles.default(
          `[${name}] [${styles.information(type[status])}] ${message}`
        )
      );
      break;
  }
};

JSON.__proto__.readLocalFileSync = (filepath) => {
  const result = fs.readFileSync(filepath, "utf8", (error) => {
    if (error) {
      console.report(`sorry, unable to read ${file} -- ${err}`, 2);
      return [ err     ];
    }
    console.log(`hi fromt he JSON.localRead(path)`, data);
  });
  return JSON.parse(result);
};

JSON.__proto__.writeLocalFileSync = (filepath, data) => {
  return fs.writeFileSync(filepath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.report(`sorry, unable to write ${filepath} -- ${err}`, 2);
      return false;
    }
    return { successful: true, data };
  });
};
