const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAll(query) {
    let result = await Cube.find({}).lean();

    if (query.search) {
        result = result.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }

    if (query.from) {
        result = result.filter(x => Number(x.difficultyLevel) >= query.from);
    }

    if (query.to) {
        result = result.filter(x => Number(x.difficultyLevel) <= query.to);
    }


    return result;
}

function getOne(id) {
    return Cube.findById(id).lean();
}

function getOneWithAccessories(id) {
    return Cube.findById(id).populate('accessories').lean();
}

function createProduct(data, userId) {
    let cube = new Cube({...data, creator: userId });

    return cube.save();
}

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId);
    let accessory = await Accessory.findById(accessoryId);

    product.accessories.push(accessory);
    return product.save();
}

function updateOne(productId, data) {
    return Cube.updateOne({ _id: productId }, data);
}

function deleteOne(productId) {
    return Cube.deleteOne({ _id: productId });
}

module.exports = {
    create: createProduct,
    getAll,
    getOne,
    attachAccessory,
    getOneWithAccessories,
    updateOne,
    deleteOne
}