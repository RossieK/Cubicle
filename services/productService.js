const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const fs = require('fs');
const productsData = require('../config/products.json');

function createProduct(data) {
    let cube = new Cube(uniqid(), data.name, data.description, data.imageUrl, data.difficultyLevel);

    productsData.push(cube);

    fs.writeFile(__dirname + '/../config/products.json', JSON.stringify(productsData), (err) => {
        if (err) {
            console.error(err);
            return;
        }

    });
}

module.exports = {
    create: createProduct
}