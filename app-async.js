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

const getGeocode = async (address) => {
    const apiKey = process.env.GEOCODE_API_KEY;
    const encodedAddress = encodeURIComponent(address);
    const endpoint = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${encodedAddress}`;

    const response = await axios.get(endpoint);
    const { lat, lng } = response.data.results[0].locations[0].latLng;

    return { lat, lng };
}

const getWeather = async (location) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const units = 'si';
    const endpoint = `https://api.darksky.net/forecast/${apiKey}/${location.lat},${location.lng}?units=${units}`;

    const response = await axios.get(endpoint);
    const { temperature, apparentTemperature } = response.data.currently;
    
    return { temperature, apparentTemperature };
};

const printWeather = async (address) => {
    const location = await getGeocode(address);
    const weather = await getWeather(location);

    console.log(weather);
};

try {
    printWeather(argv.address);
} catch (err) {
    console.log(err);
}