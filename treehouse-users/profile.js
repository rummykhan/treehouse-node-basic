const https = require('https');
const http = require('http');

const displayProfile = (username, badges, totalPoints) => {
    const message = `User ${username} has ${badges} badges and total points in Java Script are ${totalPoints}`;

    console.log(message);
};

const printError = (error) => {
    console.error(error.message);
};

const getProfile = (username) => {

    const url = `https://teamtreehouse.com/${username}.json`;

    const request = https.get(url, (res) => {

        if (res.statusCode === 200) {
            let body = "";

            res.on('data', (data) => {
                body += data.toString();
            });

            res.on('end', () => {
                body = JSON.parse(body);
                displayProfile(body.profile_name, body.badges.length, body.points.JavaScript);
            })
        } else {
            const errorMessage = `There is an error while getting profile for ${username} - (${http.STATUS_CODES[res.statusCode]})`;
            const statusError = new Error(errorMessage);
            printError(statusError);
        }
    });

    request.on('error', (e) => {
        console.log(`Error during request: ${e.message}`);
    });
};

module.exports.get = getProfile;