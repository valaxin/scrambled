const log = require('../support/_eventLogger.js');
module.exports = (filename, manifest) => {
  if (!manifest[filename]) {
    return new Error("Error! /validateCommand.js is unable to proceed.");
  } else {
    log(`/${filename}`, 'OK!');
    return {
      filename,
      command: manifest[filename],
      arguments: Object.keys(manifest[filename].arguments || {})
    };
  }
};
