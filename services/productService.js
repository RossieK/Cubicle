const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const productData = require('../data/productData');

function getAll(query) {
    let result = productData.getAll();

    if (query.search) {
        result = result.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }

    if (query.from) {
        result = result.filter(x => Number(x.level) >= query.from);
    }

    if (query.to) {
        result = result.filter(x => Number(x.level) <= query.to);
    }


    return result;
}

function getOne(id) {
    return productData.getOne(id);
}

function createProduct(data, callback) {
    let cube = new Cube(uniqid(), data.name, data.description, data.imageUrl, data.difficultyLevel);

    return productData.create(cube, callback);
}

module.exports = {
    create: createProduct,
    getAll,
    getOne
}