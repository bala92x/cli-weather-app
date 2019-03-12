const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        forecast.getWeather(results, (errorMessage, results) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It is: ${results.currently.temperature}`);
                console.log(`It feels: ${results.currently.apparentTemperature}`);
            }
        });
    }
});