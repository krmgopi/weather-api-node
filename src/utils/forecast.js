const request = require("request");

// create forecast
const forecast = (lattitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1ad93d334fc6fab5d69e7e1786eff96e&query=" +
    lattitude +
    "," +
    longitude +
    "&units=f";
  console.log(url);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the service", undefined);
    } else if (body.error) {
      callback("unable to find location, try another search", undefined);
    } else {
      // callback(undefined, "it is currently " + body.current.temperature);
      callback(undefined, {
        country: body.location.country,
        region: body.location.region,
        localtime: body.location.localtime,
        obsTime: body.current.observation_time,
        pressure: body.current.pressure,
        humidity: body.current.humidity,
        cloudcover: body.current.cloudcover,
        temp: body.current.temperature,
        isDay: body.current.is_day,
        desc: body.current.weather_descriptions,
      });
    }
  });
};

module.exports = forecast;
