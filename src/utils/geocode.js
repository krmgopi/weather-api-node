// load the request
const request = require("request");

// Changing to callback functions
const geocode = (address, callback) => {
  const url =
    "http://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZ29waWtybSIsImEiOiJja2lvN25mODQwZzFkMnJtbDk2anAzcWpnIn0.yDmTcvMmSNS1ht26PcCPnw";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the service", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location, try another search", undefined);
    } else {
      callback(undefined, {
        lattitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
