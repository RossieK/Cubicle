const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const fs = require('fs');
const productsData = require('../config/products.json');

function getAll() {
    return productsData;
}

function getOne(id) {
    return productsData.find(x => x.id == id);
}

function createProduct(data, callback) {
    let cube = new Cube(uniqid(), data.name, data.description, data.imageUrl, data.difficultyLevel);

    productsData.push(cube);

    fs.writeFile(__dirname + '/../config/products.json', JSON.stringify(productsData), callback);
}

module.exports = {
    create: createProduct,
    getAll,
    getOne
}