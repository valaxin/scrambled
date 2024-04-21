module.exports = (filename, manifest) => {
  if (!manifest[filename]) {
    return new Error("Error! /validateCommand.js is unable to proceed.");
  } else {
    console.log(`[${Date.now()}] /${filename} OK!`);
    return {
      filename,
      command: manifest[filename],
      arguments: Object.keys(manifest[filename].arguments || {})
    };
  }
};
