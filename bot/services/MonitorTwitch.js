"use strict";

const path = require("node:path");
const store = require("../library/storage.js");
const filename = path.join(__dirname, `../data/database.json`);

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
  // creators = !creators ? ["rektcorpse", "piratesoftware"] : creators;
  let start = true;
  let tick = 0;
  let limit = 2;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const routine = async (creators) => {
    const incoming = await creators.map(async (creator) => {
      console.report(`checking status of "${creator}"`, 3)
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
    updated.creators = current.creators;
    for (let pos = 0; pos < current.status.length; pos++) {
      if (
        current.status[pos].live === false &&
        updated.status[pos].live === true
      ) {
        console.report(`${current.creators[pos]} online`, 3);
      }
    }
    await store.write(filename, updated);
    await delay(timeout);
    console.report(`monitor ${tick + 1}/${limit}`, 0);
    tick++;
    if (tick === limit) {
      start = false;
      console.report(`done looping,`, 0);
    }
  }
};
