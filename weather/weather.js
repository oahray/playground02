const request = require('request');

var getWeather = (address, latitude, longitude, callback) => {
   request({
    url: `https://api.darksky.net/forecast/b45937afe6bb1614aeb7a6b8ae3db84f/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    }
  });
};

module.exports = {
  getWeather
}