// CRUD Operations On a JSON file ?

const fs = require("node:fs");
const { log } = require("./internal.js");

function read(file) {
  const data = fs.readFileSync(file, "utf8", (err, data) => {
    if (err) {
      log(`sorry, unable to read ${file}`, 2, err);
      return [];
    }
  });
  return JSON.parse(data)
}

function write(file, data) {
  return fs.writeFileSync(file, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      log(`sorry, unable to write`, 2, err);
      return false;
    }
    return true;
  });
}

module.exports = {
  write,
  read,
};
