const fs = require('fs/promises');
const path = require('path');
const productsData = require('../config/products.json');

class Cube {
    constructor(id, name, description, imageUrl, level) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.level = level;
    }

    save() {
        productsData.push(this);

        return fs.writeFile(
            path.join(__dirname, '../config/products.json'),
            JSON.stringify(productsData),
        );
    }

    static getAll() {
        return productsData;
    }

    static getOne(id) {
        return productsData.find(x => x.id == id);
    }
}

module.exports = Cube;