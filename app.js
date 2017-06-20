const https = require('https');

const displayProfile = (username, badges, totalPoints) => {
    const message = `User ${username} has ${badges} badges and total points in Java Script are ${totalPoints}`;

    console.log(message);
};

const getProfile = (username) => {

    const url = `https://teamtreehouse.com/${username}.json`;

    https.get(url, (res) => {

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
            console.error(`There is no user with username ${username}`);
        }
    });
};

// Just to cut the first and second arguments
// As node consider node as first argument,
// filename.js as 2nd argument. and so on..
const usernames = process.argv.slice(2);

usernames.forEach((username) => {
    getProfile(username);
});