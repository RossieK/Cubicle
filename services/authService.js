const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/config');

async function register({ username, password }) {

    //TODO: Check if username exists
    console.log(config.SALT_ROUNDS);
    let salt = await bcrypt.genSalt(config.SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hash });
    return user.save();
}

module.exports = {
    register
}