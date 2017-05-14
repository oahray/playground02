const axios = require('axios');
const yargs = require('yargs');

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.')
  }

  var address = response.data.results[0].formatted_address;
  var latitude = response.data.results[0].geometry.location.lat;
  var longitude = response.data.results[0].geometry.location.lng;
  console.log('Address: ', address);
  var weatherUrl = (`https://api.darksky.net/forecast/b45937afe6bb1614aeb7a6b8ae3db84f/${latitude},${longitude}`);
  return axios.get(weatherUrl);
})
.then((response) => {
  var summary = response.data.currently.summary;
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.temperature;
  console.log(`It is currently ${summary} in and the temperature is ${temperature}. It feels like ${apparentTemperature}.`);
})
.catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
