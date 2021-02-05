const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

async function register({ username, password }) {

    //TODO: Check if username exists

    let salt = await bcrypt.genSalt(config.SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hash });
    return user.save();
}

async function login({ username, password }) {
    let user = await User.findOne({ username });

    if (!user) throw { message: 'User not found!' };

    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw {
        message: 'Password doesn\'t match!'
    }

    let token = jwt.sign({ _id: user._id }, config.SECRET);
    return token;
}

module.exports = {
    register,
    login
}