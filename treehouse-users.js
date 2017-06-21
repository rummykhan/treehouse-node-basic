
const profile = require('./treehouse-users/profile');

// Just to cut the first and second arguments
// As node consider node as first argument,
// filename.js as 2nd argument. and so on..
const usernames = process.argv.slice(2);

usernames.forEach(profile.get);