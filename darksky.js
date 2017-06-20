const https = require('https');

const API_KEY = 'f90db4033a81294c08d2e99c52e233b7';

const displayWeather = (lat, long, timezone, summary, time, temparature) => {
    const message = `${lat}, ${long} corresponds to ${timezone} timezone, currently at ${time} weather is ${summary} and temparature is ${temparature}`;
    console.log(message);
};

const parseJSON = (res) => {

    return new Promise((resolve, reject) => {

        let body = "";

        res.on('data', (data) => {
            body += data.toString();
        });

        res.on('end', () => {
            resolve(JSON.parse(body));
        });

    });

};

const getWeather = (lat, long) => {

    const url = `https://api.darksky.net/forecast/${API_KEY}/${lat},${long}`;

    https.get(url, (res) => {

        if (res.statusCode === 200) {
            parseJSON(res)
                .then(response => {
                    displayWeather(
                        lat,
                        long,
                        response.timezone,
                        response.currently.summary,
                        response.currently.time,
                        response.currently.temperature
                    );
                });

        } else {
            console.error(`DarkSky return status code ${res.statusCode}`);
        }

    });

};

const [lat, long] = process.argv.slice(2);

getWeather(lat, long);