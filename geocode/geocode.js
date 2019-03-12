const request = require('request');

const geocodeAddress = (address, cb) => {
    const apiKey = process.env.GEOCODE_API_KEY;
    const encodedAddress = encodeURIComponent(address);
    const endpoint = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${encodedAddress}`;

    request({
        url: endpoint,
        json: true
    }, (error, response, body) => {
        if (error) {
            cb('Unable to connect to Mapquest servers');
        } else if (body.info.statuscode === 400) {
            cb('Unable to find that address');
        } else if (body.info.statuscode === 0) {
            cb(undefined, body.results[0].locations[0].latLng);
        }
    });
}

module.exports = {
    geocodeAddress
};