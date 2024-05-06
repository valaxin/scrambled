"use strict";

const chalk = require("chalk");
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
        styles.default(`[${name}] ${message} ${styles.success(type[status])}`)
      );
      break;
    case 1:
      console.log(
        styles.default(`[${name}] ${message} ${styles.warning(type[status])}`)
      );
      break;
    case 2:
      console.log(
        styles.default(`[${name}] ${message} ${styles.failure(type[status])}`)
      );
      break;
    case 3:
      console.log(
        styles.default(
          `[${name}] ${message} ${styles.information(type[status])}`
        )
      );
      break;
  }
};
