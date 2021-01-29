const Accessory = require('../models/Accessory');

function createAccessory(data) {
    let accessory = new Accessory(data);

    return accessory.save();
}

module.exports = {
    createAccessory
};