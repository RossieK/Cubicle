const fs = require('fs');
const path = require('path');
const productsData = require('../config/products.json');

module.exports = {
    getAll() {
        return productsData;
    },

    getOne(id) {
        return productsData.find(x => x.id == id);
    },

    create(product, callback) {
        productsData.push(product);
        return fs.writeFile(path.join(__dirname, '../config/products.json'), JSON.stringify(productsData), callback);
    }
}