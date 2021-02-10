const mongoose = require('mongoose');
const ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => {
                return `Username ${props.value} is invalid, it should consist only of english letters and digits`;
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => {
                return `Invalid password, it should consist only of english letters and digits`;
            }
        },
        minlength: 8
    }
});

module.exports = mongoose.model('User', userSchema);