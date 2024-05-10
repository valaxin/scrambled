"use strict";

const axios = require("axios");

module.exports = async function (key, options) {
  if (!key) throw new Error("Missing OMDB Key");
  if (!options.query || options.query < 1) throw new Error("Missing Query");

  try {
    const endpoint = `https://www.omdbapi.com/?apikey=${key}&s=${encodeURI(
      options.query
    )}`;
    const response = await axios.get(endpoint);
    const jsondata = await response.data.Search.map((result) => {
      return result.Type === options.type ? result : null;
    })[0];

    if (jsondata === null)
      throw new Error("Sorry! Nothing found for that query.");

    const domains = ["vidsrc.in", "vidsrc.pm", "vidsrc.xyz", "vidsrc.net"];

    if (options.type === "series") {
      jsondata.urls = domains.map((domain) => {
        return `https://${domain}/embed/tv?imdb=${jsondata.imdbID}&season=${options.season}&episode=${options.episode}`;
      });
    }

    if (options.type === "movie") {
      jsondata.urls = domains.map((domain) => {
        return `https://${domain}/embed/movie?imdb=${jsondata.imdbID}`;
      });
    }

    return jsondata;
  } catch (error) {
    console.report(error, 2);
    return error;
  }
};
