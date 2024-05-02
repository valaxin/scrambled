"use strict";

const store = require("./storage.js");
const path = require("node:path");
const { log } = require('../support/internal.js')

const filename = path.join(__dirname, `./_database.json`);

async function checkIfLive(username) {
  try {
    const response = await fetch(`https://twitch.tv/${username}`);
    const sourceCode = await response.text();
    if (sourceCode.includes("isLiveBroadcast")) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error occurred:", error);
    return error;
  }
}

module.exports = async function monitor(channel, timeout, creators) {
  
  creators = !creators ? ["rektcorpse", "piratesoftware"] : creators;
  
  let start = true;
  let tick = 0;
  let limit = 96;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const routine = async (creators) => {
    const incoming = await creators.map(async (creator) => {
      const output = {
        username: creator,
        url: `https://twitch.tv/${creator}`,
        live: await checkIfLive(creator),
      };
      return output;
    });
    const status = await Promise.all(incoming);
    return { creators, status };
  };

  while (start) {
    const current = await store.read(filename);
    const updated = await routine(creators);
    updated.creators = current.creators
    for (let pos = 0; pos < current.status.length; pos++) {
      if (
        current.status[pos].live === false &&
        updated.status[pos].live === true
      ) {
        log(`${current.creators[pos]} online`);
      }
    }
    await store.write(filename, updated);
    await delay(timeout);
    log(`monitor ${tick}/${limit}`, 0);
    tick++;
    if (tick === limit) {
      start = false;
      console.log(`done looping,`)
    }
  }
};
