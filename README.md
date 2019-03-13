# cli-weather-app
Simple Node.js cli weather app, that gets temperature information about the given location. The application fetches the following services:

- [MapQuest API](http://www.mapquestapi.com) - to fetch latitude and longitude from a location string
- [Dark Sky API](https://darksky.net) - to fetch weather informations from latitude and longitude

Most of the source code is part of [The Complete Node.js Developer Course](https://www.udemy.com/the-complete-nodejs-developer-course-2) by [Andrew Mead](https://github.com/andrewjmead)

## Config
The app expects the following environment variables:

```
GEOCODE_API_KEY=<your_mapquest_api_key>
WEATHER_API_KEY<your_darksky_api_key>
```
## Usage
Example input:
```
node app.js --address="15 Example Street, Example City"
```

Exaple output:
```
It is: 24.49
It feels: 26.12
```
