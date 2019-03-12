const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
    
const encodedAddress = encodeURIComponent(argv.address);
const geocodeApiKey = process.env.GEOCODE_API_KEY;
const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${geocodeApiKey}&location=${encodedAddress}`;

axios.get(geocodeUrl)
    .then((response) => {
        if (response.data.info.statuscode === 400) {
            throw new Error('Unable to find that address');
        }

        const { lat, lng } = response.data.results[0].locations[0].latLng;
        const forecastApiKey = process.env.WEATHER_API_KEY;
        const units = 'si';
        const forecastUrl = `https://api.darksky.net/forecast/${forecastApiKey}/${lat},${lng}?units=${units}`;

        return axios.get(forecastUrl);
    }).then((response) => {
        const { temperature, apparentTemperature } = response.data.currently;

        console.log(`It's ${temperature}, it feels like ${apparentTemperature}`);
    }).catch((err) => {
        if (err.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(err.message);
        }
    });