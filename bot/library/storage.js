"use strict";

const fs = require("node:fs");

module.exports.read = function (file) {
  const data = fs.readFileSync(file, "utf8", (err, data) => {
    if (err) {
      console.report(`sorry, unable to read ${file} -- ${err}`, 2);
      return [];
    }
  });
  return JSON.parse(data);
};

module.exports.write = function (file, data) {
  return fs.writeFileSync(file, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.report(`sorry, unable to write ${file} -- ${err}`, 2);
      return false;
    }
    return true;
  });
};
