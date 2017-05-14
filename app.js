const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather =  require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeather(argv.address, results.latitude, results.longitude, (anyError, weatherResults) => {
      if (anyError) {
        console.log(anyError);
      } else {
        console.log(`The temperature at ${results.address} is ${weatherResults.temperature} but it feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});

