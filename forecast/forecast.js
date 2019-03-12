const request = require('request');

const getWeather = (location, cb) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const units = 'si';
    const endpoint = `https://api.darksky.net/forecast/${apiKey}/${location.lat},${location.lng}?units=${units}`;

    request({
        url: endpoint,
        json: true
    }, (error, response, body) => {
        if (error) {
            cb('Unable to connect to Forecast.io servers');
        } else if (response.statusCode !== 200) {
            cb('Unable to fetch weather for this address');
        } else {
            cb(undefined, body);
        }
    });
};

module.exports = {
    getWeather
};